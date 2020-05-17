const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");
const calculateFragranceLoad = require("../util/calculate-fragrance-load");

module.exports = function postBatch(db, data, cb) {
  const totalWaxWeightOunces = data.batchItems
    .filter((item) => item.type === "wax")
    .reduce((total, waxItem) => (total += parseFloat(waxItem.weightOunces)), 0);
  const totalFragranceWeightOunces = data.batchItems
    .filter((item) => item.type === "fragrance-oil")
    .reduce((total, foItem) => (total += parseFloat(foItem.weightOunces)), 0);
  const totalAdditiveWeightOunces = data.batchItems
    .filter((item) => item.type === "additive")
    .reduce(
      (total, additiveItem) => (total += parseFloat(additiveItem.weightOunces)),
      0
    );
  console.log("DATA :", data.batchItems);
  const totalDyeBlockWeightOunces = data.batchItems
    .filter((item) => item.type === "dye-blocks")
    .reduce(
      (total, dyeBlockItem) => (total += parseFloat(dyeBlockItem.weightOunces)),
      0
    );

  if (data.batchItems.filter((i) => i.type === "dye-blocks").length) {
    console.log("data.batchItems: ", data.batchItems);
  }
  console.log("TOTAL DYE BLOCK: ", totalDyeBlockWeightOunces);

  // begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    addToBatches(
      db,
      data,
      totalWaxWeightOunces,
      totalFragranceWeightOunces,
      totalAdditiveWeightOunces,
      totalDyeBlockWeightOunces,
      (err, result) => {
        if (err) {
          return rollback(db, err, cb);
        }

        const batchId = result.insertId;

        // filter item array and add each type to its corresponding table
        const fragranceOils = data.batchItems.filter(
          (item) => item.type === "fragrance-oil"
        );
        const additives = data.batchItems.filter(
          (item) => item.type === "additives"
        );
        const waxes = data.batchItems.filter((item) => item.type === "wax");
        const dyeBlocks = data.batchItems.filter(
          (item) => item.type === "dye-blocks"
        );

        async.parallel(
          {
            fragranceOils: (done) =>
              insertBatchesFragranceOils(
                db,
                fragranceOils,
                totalWaxWeightOunces,
                totalFragranceWeightOunces,
                totalAdditiveWeightOunces,
                totalDyeBlockWeightOunces,
                batchId,
                done
              ),
            waxes: (done) => insertBatchesWaxes(db, waxes, batchId, done),
            additives: (done) =>
              insertBatchesAdditives(
                db,
                additives,
                totalWaxWeightOunces,
                totalFragranceWeightOunces,
                totalAdditiveWeightOunces,
                totalDyeBlockWeightOunces,
                batchId,
                done
              ),
            dyeBlocks: (done) =>
              insertBatchesDyeBlocks(
                db,
                dyeBlocks,
                totalWaxWeightOunces,
                totalFragranceWeightOunces,
                totalAdditiveWeightOunces,
                totalDyeBlockWeightOunces,
                batchId,
                done
              ),
            layers: (done) => insertLayers(db, data.layers, batchId, done),
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
                case "fragranceOils":
                  expectedRows = fragranceOils.length;
                  break;
                case "waxes":
                  expectedRows = waxes.length;
                  break;
                case "additives":
                  expectedRows = additives.length;
                  break;
                case "dyeBlocks":
                  expectedRows = dyeBlocks.length;
                  break;
                case "layers":
                  expectedRows = data.layers.length;
                  break;
              }
              if (results[k] && results[k].affectedRows !== expectedRows) {
                errorReasons.push({
                  message: `failed to post. check the hashId for ${k}.`,
                });
              }
            });
            if (errorReasons.length) {
              err = new Error("Failed to add batch to database");
              err.reasons = errorReasons;
              return rollback(db, err, cb);
            }

            // end transaction
            db.commit((err) => {
              if (err) {
                return rollback(db, err, cb);
              }

              return cb(null, {
                batchId,
              });
            });
          }
        );
      }
    );
  });
};

function addToBatches(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeBlockWeightOunces,
  cb
) {
  const fragranceLoad =
    calculateFragranceLoad({
      fragranceWeightOunces: parseFloat(totalFragranceWeightOunces),
      waxWeightOunces: parseFloat(totalWaxWeightOunces),
    }) || 0;

  const sql = `
    INSERT INTO batches
      (name, slug, total_wax_weight_ounces, total_fragrance_weight_ounces, total_additive_weight_ounces, total_dye_block_weight_ounces,
        fragrance_load, fragrance_add_temperature_fahrenheit, dye_add_temperature_fahrenheit, when_created, notes)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.name,
    slug(data.name || "", { lower: true }),
    totalWaxWeightOunces,
    totalFragranceWeightOunces,
    totalAdditiveWeightOunces,
    totalDyeBlockWeightOunces,
    fragranceLoad,
    data.fragranceAddTemperatureFahrenheit || null,
    data.dyeAddTemperatureFahrenheit || null,
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
    const hashSql = `UPDATE batches SET hash_id = ? WHERE id = ?`;
    const hashParams = [
      hashConfig.batches.encode(result.insertId),
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

function insertBatchesFragranceOils(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeBlockWeightOunces,
  batchId,
  cb
) {
  if (!data.length) {
    return cb();
  }

  // seems like there must be a simpler way to do perform this...
  // maybe involving a WHERE IN (fo-id-1, fo-id-2, ...), but the need
  // for distinct weight_ounces values for each fo-id makes that complex
  const internalSelect = `
    SELECT ?, ?, ?, ?, fo.id
    FROM fragrance_oils fo
    WHERE fo.hash_id = ?`;

  let sql = `
      INSERT INTO batches_fragrances
        (batch_id, weight_ounces, combine_id, fragrance_load, fragrance_id)
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

    let fragranceLoad =
      parseFloat(d.weightOunces) /
      (parseFloat(totalFragranceWeightOunces) +
        parseFloat(totalAdditiveWeightOunces) +
        parseFloat(totalWaxWeightOunces));

    fragranceLoad = fragranceLoad || 0;

    params.push(batchId, d.weightOunces, d.combineId, fragranceLoad, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, d.weightOunces);

    if (d.finished) {
      finishedCases.push("WHEN hash_id = ? THEN ?");
      finishedParams.push(d.hashId, true);
      finishedHashIds.push(d.hashId);
    }
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, batchesFoResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // also decrement the amount used from the resource table
    const decrementSql = `
    UPDATE fragrance_oils
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
        return cb(null, batchesFoResult);
      }

      // also decrement the amount used from the resource table
      const finishedSql = `
      UPDATE fragrance_oils
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
        return cb(null, batchesFoResult);
      });
    });
  });
}

function insertBatchesAdditives(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeBlockWeightOunces,
  batchId,
  cb
) {
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, ?, ?, a.id
    FROM additives a
    WHERE a.hash_id = ?`;

  let sql = `
      INSERT INTO batches_additives
        (batch_id, weight_ounces, combine_id, additive_id)
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

    let additiveLoad =
      parseFloat(d.weightOunces) /
      (parseFloat(totalFragranceWeightOunces) +
        parseFloat(totalAdditiveWeightOunces) +
        parseFloat(totalWaxWeightOunces));

    additiveLoad = additiveLoad || 0;

    params.push(batchId, d.weightOunces, d.combineId, additiveLoad, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, d.weightOunces);
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, batchesAdditivesResult) => {
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
        return cb(null, batchesAdditivesResult);
      }

      // also decrement the amount used from the resource table
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
        return cb(null, batchesAdditivesResult);
      });
    });
  });
}

function insertBatchesWaxes(db, data, batchId, cb) {
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, ?, ?, w.id
    FROM waxes w
    WHERE w.hash_id = ?`;

  let sql = `
      INSERT INTO batches_waxes
        (batch_id, weight_ounces, combine_id, wax_id)
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
    params.push(batchId, d.weightOunces, d.combineId, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, parseFloat(d.weightOunces) / 16);
    if (d.finished) {
      finishedCases.push("WHEN hash_id = ? THEN ?");
      finishedParams.push(d.hashId, true);
      finishedHashIds.push(d.hashId);
    }
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, batchesWaxesResult) => {
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
        return cb(null, batchesWaxesResult);
      }

      // also decrement the amount used from the resource table
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
        return cb(null, batchesWaxesResult);
      });
    });
  });
}

function insertBatchesDyeBlocks(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeBlockWeightOunces,
  batchId,
  cb
) {
  if (!data.length) {
    return cb();
  }

  // seems like there must be a simpler way to do perform this...
  // maybe involving a WHERE IN (fo-id-1, fo-id-2, ...) but the need
  // for distinct weight_ounces values for each fo-id makes that complex
  const internalSelect = `
    SELECT ?, ?, ?, db.id
    FROM dye_blocks db
    WHERE db.hash_id = ?`;

  let sql = `
      INSERT INTO batches_dye_blocks
        (batch_id, weight_ounces, combine_id, dye_block_id)
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
    params.push(batchId, d.weightOunces, d.combineId, d.hashId);

    decrementCases.push("WHEN hash_id = ? THEN (remaining - ?)");
    decrementParams.push(d.hashId, d.weightOunces);
    if (d.finished) {
      finishedCases.push("WHEN hash_id = ? THEN ?");
      finishedParams.push(d.hashId, true);
      finishedHashIds.push(d.hashId);
    }
    allHashIds.push(d.hashId);
  });

  db.query(sql, params, (err, batchesDyeBlocksResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // also decrement the amount used from the resource table
    const decrementSql = `
    UPDATE dye_blocks
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
        return cb(null, batchesDyeBlocksResult);
      }

      // also decrement the amount used from the resource table
      const finishedSql = `
      UPDATE dye_blocks
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
        return cb(null, batchesDyeBlocksResult);
      });
    });
  });
}

function insertLayers(db, data, batchId, cb) {
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, c.id, ?, ?, ?, ?, ?, ?, ?
    FROM candles c
    WHERE c.hash_id = ?`;

  let sql = `
      INSERT INTO layers
        (batch_id, candle_id, prepped_container_weight_ounces,
          container_temperature_fahrenheit, pour_temperature_fahrenheit,
          when_poured, cooling_room_temperature_fahrenheit,
          cooling_room_humidity_percent, notes)
    `;

  let params = [];
  data.forEach((d, i) => {
    if (i !== 0) {
      sql += ` UNION ALL `;
    }
    sql += internalSelect;
    params.push(
      batchId,
      d.preppedContainerWeightOunces,
      d.containerTemperatureFahrenheit,
      d.pourTemperatureFahrenheit,
      d.whenPoured,
      d.coolingRoomTemperatureFahrenheit,
      d.coolingRoomHumidityPercent,
      d.notes,
      d.candleHashId
    );
  });

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE layers SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.layers.encode(rowIndex), rowIndex];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err, {
              sql,
              params,
            });
          }
          done(err, result);
        });
      };
    });
    async.parallel(updateFuncs, (err, hashUpdateResults) => {
      if (err) {
        return cb(err);
      }
      cb(err, result);
    });
  });
}

function rollback(db, err, cb) {
  db.rollback(() => {
    return cb(err);
  });
}
