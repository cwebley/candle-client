const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");
const calculateFragranceLoad = require("../util/calculate-fragrance-load");
const findUniqueInteger = require("../util/find-unique-integer");
const getBlendQuery = require("./get-blend");

module.exports = function postBatch(db, data, cb) {
  console.log("DATA :", data.batchItems);

  // begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }

    updateBlendTables(db, data, (err, blendsResults) => {
      if (err) {
        return rollback(db, err, cb);
      }
      if (!blendsResults) {
        blendsResults = [];
      }

      // total up the wax weights from each of the blend items and use this as the
      // initial value for the reducer of the rest of the wax items
      const waxWeightFromBlends = blendsResults
        .map((blend) => blend.waxUsedThisBatch)
        .reduce((acc, val) => (acc += val), 0);
      // total up the additive weights from each of the blend items and use this as the
      // initial value for the reducer of the rest of the additive items
      const additiveWeightFromBlends = blendsResults
        .map((blend) => blend.additivesUsedThisBatch)
        .reduce((acc, val) => (acc += val), 0);

      const totalWaxWeightOunces = data.batchItems
        .filter((item) => item.type === "wax")
        .reduce(
          (total, waxItem) => (total += parseFloat(waxItem.weightOunces)),
          waxWeightFromBlends
        );
      const totalFragranceWeightOunces = data.batchItems
        .filter((item) => item.type === "fragrance-oil")
        .reduce(
          (total, foItem) => (total += parseFloat(foItem.weightOunces)),
          0
        );
      const totalAdditiveWeightOunces = data.batchItems
        .filter((item) => item.type === "additive")
        .reduce(
          (total, additiveItem) =>
            (total += parseFloat(additiveItem.weightOunces)),
          additiveWeightFromBlends
        );
      const totalDyeWeightOunces = data.batchItems
        .filter((item) => item.type === "dye")
        .reduce(
          (total, dyeItem) => (total += parseFloat(dyeItem.weightOunces)),
          0
        );

      addToBatches(
        db,
        data,
        totalWaxWeightOunces,
        totalFragranceWeightOunces,
        totalAdditiveWeightOunces,
        totalDyeWeightOunces,
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
            (item) => item.type === "additive"
          );
          const waxes = data.batchItems.filter((item) => item.type === "wax");
          const dyes = data.batchItems.filter((item) => item.type === "dye");

          async.parallel(
            {
              fragranceOils: (done) =>
                insertBatchesFragranceOils(
                  db,
                  fragranceOils,
                  totalWaxWeightOunces,
                  totalFragranceWeightOunces,
                  totalAdditiveWeightOunces,
                  totalDyeWeightOunces,
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
                  totalDyeWeightOunces,
                  batchId,
                  done
                ),
              dyes: (done) =>
                insertBatchesDyes(
                  db,
                  dyes,
                  totalWaxWeightOunces,
                  totalFragranceWeightOunces,
                  totalAdditiveWeightOunces,
                  totalDyeWeightOunces,
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
                  case "dyes":
                    expectedRows = dyes.length;
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

              let blendsBatchesWaxItems = [];
              blendsResults.forEach((b) =>
                blendsBatchesWaxItems.push(...b.wax)
              );
              let blendsBatchesAdditivesItems = [];
              blendsResults.forEach((b) =>
                blendsBatchesAdditivesItems.push(...b.additives)
              );

              // add batches_waxes for items contained in blends
              addBlendBatchesWaxes(
                db,
                blendsBatchesWaxItems,
                waxes,
                batchId,
                (err, result) => {
                  if (err) {
                    return rollback(err);
                  }

                  // add batches_additives for items contained in blends
                  addBlendBatchesAdditives(
                    db,
                    blendsBatchesAdditivesItems,
                    additives,
                    batchId,
                    (err, result) => {
                      if (err) {
                        return rollback(err);
                      }
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
            }
          );
        }
      );
    });
  });
};

function updateBlendTables(db, data, cb) {
  const blendItems = data.batchItems.filter((item) => item.type === "blend");

  console.log("UPDATE BLEND TABLES items: ", blendItems);
  if (!blendItems.length) {
    console.log("updateBlendTables no blend items found");
    return cb();
  }

  // create an array of jobs to update blend tables based on the number of blends in the batch
  const blendTableJobs = blendItems.map((blendItem) => {
    // each blendItem has a hashId and a weightOunces
    return (done) => {
      // fetch the blend info
      getBlendQuery(db, { blendHashId: blendItem.hashId }, (err, blendData) => {
        console.log(
          "RESULT FROM GET BELND FOR ",
          blendItem.hashId,
          " results: ",
          blendData
        );
        if (err) {
          return cb(err);
        }
        // return cb(null, blendData);
        let fractionOfBlendUsed =
          parseFloat(blendItem.weightOunces) / blendData.remainingOunces;

        // handle Infinity edgecase
        if (fractionOfBlendUsed > 1) {
          fractionOfBlendUsed = 1;
        }
        console.log("FRACTION USED: ", fractionOfBlendUsed);
        console.log("WEIGHT OUNCES: ", blendItem.weightOunces);
        console.log("REMAINING OZ: ", blendData.remainingOunces);
        const totalWaxUsed =
          fractionOfBlendUsed * blendData.totalWaxWeightOunces;
        const totalAdditiveUsed =
          fractionOfBlendUsed * blendData.totalAdditiveWeightOunces;

        const blendWaxes = blendData.wax || [];
        const blendAdditives = blendData.additives || [];

        let waxUsedThisBatch = 0;
        const processedBlendWaxes = blendWaxes.map((bw) => {
          const amountUsed = fractionOfBlendUsed * bw.weightOunces;
          waxUsedThisBatch += amountUsed;
          return {
            type: "wax",
            id: bw.id,
            hashId: bw.hashId,
            waxId: bw.waxId,
            updatedTotal: bw.weightOunces - amountUsed,
            // the amount used in this branch we'll rename to weightOunces to
            // keep things consistent with the non-blend batchItems
            weightOunces: amountUsed,
            combineId: bw.combineId,
          };
        });
        let additivesUsedThisBatch = 0;
        const processedBlendAdditives = blendAdditives.map((ba) => {
          const amountUsed = fractionOfBlendUsed * ba.weightOunces;
          additivesUsedThisBatch += amountUsed;
          return {
            type: "additive",
            id: ba.id,
            hashId: ba.hashId,
            additiveId: ba.additiveId,
            updatedTotal: ba.weightOunces - amountUsed,
            weightOunces: amountUsed,
            combineId: ba.combineId,
          };
        });

        console.log("PROCESSED WAXES: ", processedBlendWaxes);
        console.log("PROCESSED Additives: ", processedBlendAdditives);
        // now update the blends table to decrement the amount used

        // using an insert into + on duplicate syntax here to handle updating multiple fields in one query
        const blendsTableSql = `
          INSERT INTO blends
            (id, total_wax_weight_ounces, total_additive_weight_ounces, remaining_ounces, last_updated)
          VALUES
            (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            total_wax_weight_ounces = VALUES(total_wax_weight_ounces),
            total_additive_weight_ounces = VALUES(total_additive_weight_ounces),
            remaining_ounces = VALUES(remaining_ounces),
            last_updated = VALUES(last_updated)
       `;
        const blendsTableParams = [
          blendData.id,
          blendData.totalWaxWeightOunces - totalWaxUsed,
          blendData.totalAdditiveWeightOunces - totalAdditiveUsed,
          blendData.remainingOunces - blendItem.weightOunces,
          data.whenCreated,
        ];
        // now update the blends_waxes and blends_additives tables to reflect the amound used

        db.query(
          blendsTableSql,
          blendsTableParams,
          (err, blendsUpdateResult) => {
            if (err) {
              console.error(err, {
                blendsTableSql,
                blendsTableParams,
              });
              return done(err);
            }
            // done(err, result);

            console.log("BLENDS UPDATE RESULT: ", blendsUpdateResult);

            // update sub-tables: blends_waxes and blends_additives
            let subTableJobs = [];
            processedBlendWaxes.forEach((bw) => {
              subTableJobs.push((subTableDone) => {
                const sql = `
                  INSERT INTO blends_waxes
                    (id, blend_id, wax_id, weight_ounces)
                  VALUES
                    (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE
                    weight_ounces = VALUES(weight_ounces)
                `;
                const params = [bw.id, blendData.id, bw.waxId, bw.updatedTotal];
                db.query(sql, params, (err, result) => {
                  if (err) {
                    console.error(err, { sql, params });
                    return subTableDone(err);
                  }
                  return subTableDone(null, result);
                });
              });
            });
            processedBlendAdditives.forEach((ba) => {
              subTableJobs.push((subTableDone) => {
                const sql = `
                  INSERT INTO blends_additives
                    (id, blend_id, additive_id, weight_ounces)
                  VALUES
                    (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE
                    weight_ounces = VALUES(weight_ounces)
                `;
                const params = [
                  ba.id,
                  blendData.id,
                  ba.additiveId,
                  ba.updatedTotal,
                ];
                db.query(sql, params, (err, result) => {
                  if (err) {
                    console.error(err, { sql, params });
                    return subTableDone(err);
                  }
                  return subTableDone(null, result);
                });
              });
            });
            async.parallel(subTableJobs, (err, subTableJobResults) => {
              if (err) {
                console.error(err);
                return done(err);
              }
              // return just the processed waxes and additives
              return done(null, {
                totalWaxWeightOunces: blendData.totalWaxWeightOunces,
                totalAdditiveWeightOunces: blendData.totalAdditiveWeightOunces,
                waxUsedThisBatch,
                additivesUsedThisBatch,
                wax: processedBlendWaxes,
                additives: processedBlendAdditives,
              });
            });
          }
        );
      });
    };
  });
  async.parallel(blendTableJobs, (err, blendResults) => {
    if (err) {
      return cb(err);
    }
    return cb(null, blendResults);
  });
}

function addToBatches(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeWeightOunces,
  cb
) {
  const fragranceLoad =
    calculateFragranceLoad({
      fragranceWeightOunces: parseFloat(totalFragranceWeightOunces),
      additiveWeightOunces: parseFloat(totalAdditiveWeightOunces),
      waxWeightOunces: parseFloat(totalWaxWeightOunces),
    }) || 0;

  const sql = `
    INSERT INTO batches
      (name, slug, total_wax_weight_ounces, total_fragrance_weight_ounces, total_additive_weight_ounces, total_dye_weight_ounces,
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
    totalDyeWeightOunces,
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
  totalDyeWeightOunces,
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
  totalDyeWeightOunces,
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

    // let additiveLoad =
    //   parseFloat(d.weightOunces) /
    //   (parseFloat(totalFragranceWeightOunces) +
    //     parseFloat(totalAdditiveWeightOunces) +
    //     parseFloat(totalWaxWeightOunces));

    // const additiveLoad =
    //   calculateAdditiveLoad({
    //     fragranceWeightOunces: parseFloat(totalFragranceWeightOunces),
    //     waxWeightOunces: parseFloat(totalWaxWeightOunces),
    //   }) || 0;

    // additiveLoad = additiveLoad || 0;

    console.log("ADDITIVE DATA: ", data);

    params.push(batchId, d.weightOunces, d.combineId, d.hashId);

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

function insertBatchesDyes(
  db,
  data,
  totalWaxWeightOunces,
  totalFragranceWeightOunces,
  totalAdditiveWeightOunces,
  totalDyeWeightOunces,
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
    FROM dyes db
    WHERE db.hash_id = ?`;

  let sql = `
      INSERT INTO batches_dyes
        (batch_id, weight_ounces, combine_id, dye_id)
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

  db.query(sql, params, (err, batchesDyesResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    // also decrement the amount used from the resource table
    const decrementSql = `
    UPDATE dyes
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
        return cb(null, batchesDyesResult);
      }

      // also decrement the amount used from the resource table
      const finishedSql = `
      UPDATE dyes
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
        return cb(null, batchesDyesResult);
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

function addBlendBatchesWaxes(
  db,
  blendBatchesWaxItems,
  otherWaxItems,
  batchId,
  cb
) {
  if (!blendBatchesWaxItems.length) {
    return cb();
  }
  // we need to ensure that the combineId field on each blend item does not collide with
  // the combineId field on the other wax items
  const usedCombineIds = otherWaxItems.map((item) => item.combineId);
  console.log("USED COMBINE IDS WAX: ", usedCombineIds);

  let sql = `INSERT INTO batches_waxes
    (batch_id, weight_ounces, combine_id, wax_id)
  `;
  let valuesStatementArray = [`VALUES (?, ?, ?, ?)`];
  let params = [];

  blendBatchesWaxItems.forEach((blendItem, index) => {
    const initialCombineId = blendItem.combineId;

    const newUniqueCombineId = findUniqueInteger(
      initialCombineId,
      usedCombineIds
    );
    blendItem.combineId = newUniqueCombineId;

    // now that a unique combineId has been found, make sure all matching partners in the blend
    // are updated to the same combineId
    blendBatchesWaxItems.forEach((b2) => {
      if (b2.combineId === initialCombineId) {
        b2.combineId = newUniqueCombineId;
      }
    });
    if (index !== 0) {
      valuesStatementArray.push(`(?, ?, ?, ?)`);
    }
    params.push(
      batchId,
      blendItem.weightOunces,
      blendItem.combineId,
      blendItem.waxId
    );
  });

  sql += valuesStatementArray.join(",");
  db.query(sql, params, (err, blendsBatchesWaxesResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    return cb(null, blendsBatchesWaxesResult);
  });
}

function addBlendBatchesAdditives(
  db,
  blendBatchesAdditivesItems,
  otherAdditiveItems,
  batchId,
  cb
) {
  if (!blendBatchesAdditivesItems.length) {
    return cb();
  }
  // we need to ensure that the combineId field on each blend item does not collide with
  // the combineId field on the other additive items
  const usedCombineIds = otherAdditiveItems.map((item) => item.combineId);
  console.log("USED COMBINE IDS Additives: ", usedCombineIds);

  blendBatchesAdditivesItems.forEach((blendItem) => {
    const initialCombineId = blendItem.combineId;

    const newUniqueCombineId = findUniqueInteger(
      initialCombineId,
      usedCombineIds
    );
    blendItem.combineId = newUniqueCombineId;

    // now that a unique combineId has been found, make sure all matching partners in the blend
    // are updated to the same combineId
    blendBatchesAdditivesItems.forEach((b2) => {
      if (b2.combineId === initialCombineId) {
        b2.combineId = newUniqueCombineId;
      }
    });
  });

  let sql = `
      INSERT INTO batches_additives
        (batch_id, weight_ounces, combine_id, additive_id)
      VALUES (?, ?, ?, ?)
    `;
  let params = [];

  blendBatchesAdditivesItems.forEach((blendItem) => {
    params.push(
      batchId,
      blendItem.weightOunces,
      blendItem.combineId,
      blendItem.additiveId
    );
  });

  db.query(sql, params, (err, blendBatchesAdditivesResults) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    return cb(null, blendBatchesAdditivesResults);
  });
}

function rollback(db, err, cb) {
  db.rollback(() => {
    return cb(err);
  });
}
