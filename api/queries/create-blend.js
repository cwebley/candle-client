const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");

module.exports = function createBlend(db, data, cb) {
  const totalWaxWeightOunces = data.items
    .filter((item) => item.type === "wax")
    .reduce((total, waxItem) => (total += parseFloat(waxItem.weightOunces)), 0);
  const totalAdditiveWeightOunces = data.items
    .filter((item) => item.type === "additive")
    .reduce(
      (total, additiveItem) => (total += parseFloat(additiveItem.weightOunces)),
      0
    );
  const totalWeightOunces = data.items.reduce(
    (total, waxItem) => (total += parseFloat(waxItem.weightOunces)),
    0
  );
  console.log("DATA :", data.items);

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    addToBlends(
      db,
      data,
      totalWaxWeightOunces,
      totalAdditiveWeightOunces,
      totalWeightOunces,
      (err, result) => {
        if (err) {
          return rollback(db, err, cb);
        }

        const blendId = result.insertId;

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

function addToBlends(
  db,
  data,
  totalWaxWeightOunces,
  totalAdditiveWeightOunces,
  totalWeightOunces,
  cb
) {
  const sql = `
    INSERT INTO blends
      (name, slug, total_wax_weight_ounces, total_additive_weight_ounces, remaining_ounces,
        when_created, notes)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.name || "",
    slug(data.name || "", { lower: true }),
    totalWaxWeightOunces,
    totalAdditiveWeightOunces,
    totalWeightOunces,
    data.whenCreated,
    data.notes,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // now insert the hashId
    const hashSql = `UPDATE blends SET hash_id = ? WHERE id = ?`;
    const hashParams = [
      hashConfig.blends.encode(result.insertId),
      result.insertId,
    ];

    db.query(hashSql, hashParams, (err, result) => {
      if (err) {
        console.error(err, {
          sql: hashSql,
          params: hashParams,
        });
        return cb(err);
      }
    });
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
