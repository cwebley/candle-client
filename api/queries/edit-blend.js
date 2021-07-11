const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");

module.exports = function editBlend(db, blendId, data, cb) {
  const waxWeightOfNewItems = data.items
    .filter((item) => item.type === "wax")
    .reduce((total, waxItem) => (total += parseFloat(waxItem.weightOunces)), 0);
  const additiveWeightOfNewItems = data.items
    .filter((item) => item.type === "additive")
    .reduce(
      (total, additiveItem) => (total += parseFloat(additiveItem.weightOunces)),
      0
    );
  const newItemWeightOunces = data.items.reduce(
    (total, newItem) => (total += parseFloat(newItem.weightOunces)),
    0
  );
  console.log("DATA :", data.items);

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }

    updateBlends(
      db,
      blendId,
      data,
      waxWeightOfNewItems,
      additiveWeightOfNewItems,
      newItemWeightOunces,
      (err, result) => {
        if (err) {
          return rollback(db, err, cb);
        }

        // filter item array and add each type to its corresponding table
        const additives = data.items.filter((item) => item.type === "additive");
        const waxes = data.items.filter((item) => item.type === "wax");

        async.parallel(
          {
            waxes: (done) =>
              insertBlendsWaxes(db, waxes, blendId, data.whenCreated, done),
            additives: (done) =>
              insertBlendsAdditives(
                db,
                additives,
                blendId,
                data.whenCreated,
                done
              ),
          },
          (err, results) => {
            if (err) {
              console.error(err);
              return rollback(db, err, cb);
            }
            let errorReasons = [];
            Object.keys(results).forEach((k) => {
              let expectedRows = 0;
              switch (k) {
                case "waxes":
                  expectedRows = waxes.length;
                  break;
                case "additives":
                  expectedRows = additives.length;
                  break;
              }
              if (results[k] && results[k].affectedRows !== expectedRows) {
                errorReasons.push({
                  message: `failed to post. check the hashId for ${k}.`,
                });
              }
            });
            if (errorReasons.length) {
              err = new Error("Failed to add blend to database");
              err.reasons = errorReasons;
              return rollback(db, err, cb);
            }

            // end transaction
            db.commit((err) => {
              if (err) {
                return rollback(db, err, cb);
              }

              return cb(null, {
                blendId,
              });
            });
          }
        );
      }
    );
  });
};

function updateBlends(
  db,
  blendId,
  data,
  totalWaxWeightOunces,
  totalAdditiveWeightOunces,
  totalWeightOunces,
  cb
) {
  let params = [blendId];

  let nameSlugSql = "";
  let nameSlugValues = "";
  let nameSlugUpdate = "";

  let notesSql = "";
  let notesValues = "";
  let notesUpdate = "";

  if (data.name) {
    nameSlugSql = "name, slug,";

    params.push(data.name);
    params.push(slug(data.name, { lower: true }));
    nameSlugValues = "?, ?,";
    nameSlugUpdate = "name = VALUES(name), slug = VALUES(slug),";
  }

  params.push(
    totalWaxWeightOunces,
    totalAdditiveWeightOunces,
    totalWeightOunces
  );

  if (data.notes) {
    notesSql = "notes,";
    notesValues = "?,";
    notesUpdate = "notes = VALUES(notes),";

    params.push(data.notes);
  }

  params.push(data.lastUpdated);

  const sql = `
      INSERT INTO blends
        (id, ${nameSlugSql} total_wax_weight_ounces, total_additive_weight_ounces, remaining_ounces, ${notesSql}
          last_updated)
      VALUES
        (?, ${nameSlugValues} ?, ?, ?, ${notesValues} ?)
      ON DUPLICATE KEY UPDATE
        ${nameSlugUpdate}
        total_wax_weight_ounces = total_wax_weight_ounces + VALUES(total_wax_weight_ounces),
        total_additive_weight_ounces = total_additive_weight_ounces + VALUES(total_additive_weight_ounces),
        remaining_ounces = remaining_ounces + VALUES(remaining_ounces),
        ${notesUpdate}
        last_updated = VALUES(last_updated)
    `;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    return cb(err, result);
  });
}

function insertBlendsAdditives(db, data, blendId, date, cb) {
  console.log("ADDITIVE DATA: ", data);
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, ?, ?, a.id, ?
    FROM additives a
    WHERE a.hash_id = ?`;

  let sql = `
      INSERT INTO blends_additives
        (blend_id, weight_ounces, combine_id, additive_id, when_added)
    `;
  let params = [];
  let decrementCases = [];
  let finishedCases = [];
  let decrementParams = [];
  let finishedParams = [];
  let allHashIds = [];
  let finishedHashIds = [];
  data.forEach((d, i) => {
    if (i !== 0) {
      sql += ` UNION ALL `;
    }
    sql += internalSelect;

    params.push(blendId, d.weightOunces, d.combineId, date, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, d.weightOunces);
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, blendsAdditivesResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // also decrement the amount used from the resource table
    const decrementSql = `
    UPDATE additives
      SET remaining = (
        CASE ${decrementCases.join(" ")}
        END
      )
      WHERE hash_id IN (?)
    `;

    decrementParams.push(allHashIds);

    db.query(decrementSql, decrementParams, (err, decrementResult) => {
      if (err) {
        console.error(err, {
          decrementSql,
          decrementParams,
        });
        return cb(err);
      }
      if (!finishedCases.length) {
        return cb(null, blendsAdditivesResult);
      }

      // also update the finished column if appropriate
      const finishedSql = `
      UPDATE additives
        SET finished = (
          CASE ${finishedCases.join(" ")}
          END
        )
        WHERE hash_id IN (?)
      `;

      finishedParams.push(finishedHashIds);

      db.query(finishedSql, finishedParams, (err, finishedResult) => {
        if (err) {
          console.error(err, {
            finishedSql,
            finishedParams,
          });
          return cb(err);
        }
        return cb(null, blendsAdditivesResult);
      });
    });
  });
}

function insertBlendsWaxes(db, data, blendId, date, cb) {
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, ?, ?, w.id, ?
    FROM waxes w
    WHERE w.hash_id = ?`;

  let sql = `
      INSERT INTO blends_waxes
        (blend_id, weight_ounces, combine_id, wax_id, when_added)
    `;
  let params = [];
  let decrementCases = [];
  let finishedCases = [];
  let decrementParams = [];
  let finishedParams = [];
  let allHashIds = [];
  let finishedHashIds = [];

  data.forEach((d, i) => {
    if (i !== 0) {
      sql += ` UNION ALL `;
    }
    sql += internalSelect;
    params.push(blendId, d.weightOunces, d.combineId, date, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, parseFloat(d.weightOunces) / 16);
    if (d.finished) {
      finishedCases.push("WHEN hash_id = ? THEN ?");
      finishedParams.push(d.hashId, true);
      finishedHashIds.push(d.hashId);
    }
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, blendsWaxesResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // also decrement the amount used from the resource table
    const decrementSql = `
    UPDATE waxes
      SET remaining = (
        CASE ${decrementCases.join(" ")}
        END
      )
      WHERE hash_id IN (?)
    `;

    decrementParams.push(allHashIds);

    db.query(decrementSql, decrementParams, (err, decrementResult) => {
      if (err) {
        console.error(err, {
          decrementSql,
          decrementParams,
          decrementResult,
        });
        return cb(err);
      }
      if (!finishedCases.length) {
        return cb(null, blendsWaxesResult);
      }

      // also update the finished column if appropriate
      const finishedSql = `
      UPDATE waxes
        SET finished = (
          CASE ${finishedCases.join(" ")}
          END
        )
        WHERE hash_id IN (?)
      `;

      finishedParams.push(finishedHashIds);

      db.query(finishedSql, finishedParams, (err, finishedResult) => {
        if (err) {
          console.error(err, {
            finishedSql,
            finishedParams,
          });
          return cb(err);
        }
        return cb(null, blendsWaxesResult);
      });
    });
  });
}

function rollback(db, err, cb) {
  db.rollback(() => {
    return cb(err);
  });
}
