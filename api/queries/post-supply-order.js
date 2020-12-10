const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");

module.exports = function postSupplyOrder(db, data, cb) {
  // begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    addToSupplyOrderTable(db, data, (err, result) => {
      if (err) {
        return rollback(db, err, cb);
      }

      const orderId = result.insertId;

      // filter item array and add each type to its corresponding table
      const fragranceOils = data.items.filter(
        (item) => item.type === "fragrance-oil"
      );
      const waxes = data.items.filter((item) => item.type === "wax");
      const additives = data.items.filter((item) => item.type === "additives");
      const boxes = data.items.filter((item) => item.type === "boxes");
      const dyes = data.items.filter((item) => item.type === "dye");
      const jars = data.items.filter((item) => item.type === "jars");
      const lids = data.items.filter((item) => item.type === "lids");
      const miscEquipment = data.items.filter(
        (item) => item.type === "misc-equipment"
      );
      const warningLabels = data.items.filter(
        (item) => item.type === "warning-labels"
      );
      const wicks = data.items.filter((item) => item.type === "wicks");
      const wickTabs = data.items.filter((item) => item.type === "wick-tabs");
      const wickStickers = data.items.filter(
        (item) => item.type === "wick-stickers"
      );

      async.parallel(
        [
          (done) =>
            insertFragranceOils(
              db,
              {
                fragranceData: fragranceOils,
                orderId,
                supplierId: data.supplierId,
              },
              done
            ),
          (done) =>
            insertWaxes(
              db,
              {
                waxes,
                orderId,
                supplierId: data.supplierId,
              },
              done
            ),
          (done) =>
            insertAdditives(
              db,
              {
                additives,
                orderId,
                supplierId: data.supplierId,
              },
              done
            ),
          (done) =>
            insertDyes(
              db,
              {
                dyes,
                orderId,
                supplierId: data.supplierId,
              },
              done
            ),
          (done) => insertBoxes(db, boxes, orderId, done),
          (done) =>
            insertJars(
              db,
              { jars, orderId, supplierId: data.supplierId },
              done
            ),
          (done) => insertLids(db, lids, orderId, done),
          (done) => insertMiscEquipment(db, miscEquipment, orderId, done),
          (done) => insertWarningLabels(db, warningLabels, orderId, done),
          (done) =>
            insertWicks(
              db,
              { wicks, orderId, supplierId: data.supplierId },
              done
            ),
          (done) => insertWickTabs(db, wickTabs, orderId, done),
          (done) => insertWickStickers(db, wickStickers, orderId, done),
        ],
        (err, results) => {
          if (err) {
            console.error(err);
            return rollback(db, err, cb);
          }

          // end transaction
          db.commit((err) => {
            if (err) {
              return rollback(db, err, cb);
            }

            return cb(null, {
              orderId,
            });
          });
        }
      );
    });
  });
};

function insertSupplierReference(db, data, cb) {
  if (data.supplierId) {
    console.log("SUPPLIER ID ALREADY FOUND: ", data.supplierId);
    // do nothing if we already have a supplierId
    return cb();
  }

  const sql = `
    INSERT INTO supplier_reference
      (name)
    VALUES
      (?)
  `;
  const params = [data.supplierName];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    return cb(err, result);
  });
}

function addToSupplyOrderTable(db, data, cb) {
  insertSupplierReference(db, data, (err, supplierRefResult) => {
    console.log("supplier ref result: ", supplierRefResult);
    if (err) {
      return cb(err);
    }

    if (supplierRefResult && supplierRefResult.insertId) {
      data.supplierId = supplierRefResult.insertId;
    }

    const sql = `
    INSERT INTO supply_orders
      (supplier_id, item_count, subtotal_cost, taxes_and_fees,
        shipping_cost, total_cost, open_date, notes)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
      data.supplierId,
      data.items.length,
      data.subtotalCost,
      data.taxesAndFees,
      data.shippingCost,
      data.totalCost,
      data.openDate,
      data.notes,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err, {
          sql,
          params,
        });
        return rollback(db, err, cb);
      }

      // now insert the hashId
      const hashSql = `UPDATE supply_orders SET hash_id = ? WHERE id = ?`;
      const hashParams = [
        hashConfig.supplyOrders.encode(result.insertId),
        result.insertId,
      ];

      db.query(hashSql, hashParams, (err, result) => {
        if (err) {
          console.error(err, {
            sql: hashSql,
            params: hashParams,
          });
          return rollback(db, err, cb);
        }
      });
      return cb(err, result);
    });
  });
}

function insertFragranceOils(
  db,
  { fragranceData: data, orderId, supplierId },
  cb
) {
  if (!data.length) {
    return cb();
  }

  const newFragrances = data
    // add the index to the object so we can update the referenceId of new-fragrances idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the fragrances without a referenceId are new
    .filter((d) => !d.referenceId);

  // fragrances with a referenceId already have their basic details indexed
  const existingFragrances = data.filter((d) => !!d.referenceId);

  insertFragranceReferences(
    db,
    { data: newFragrances, supplierId },
    (err, fragranceRefResult) => {
      if (err) {
        return cb(err);
      }

      // console.log("Existing frags: ", existingFragrances);
      // console.log("NEW frags: ", newFragrances);

      if (fragranceRefResult) {
        // the insertId for each of the new fragranceReferences is
        // also the `referenceId` for the fragrances
        for (let i = 0; i < fragranceRefResult.affectedRows; i++) {
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newFragrances` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newFragrances[i].index].referenceId =
            fragranceRefResult.insertId + i;
        }
      }

      console.log("DDDDDD: ", data);
      const rowData = data.map((d) => [
        d.referenceId,
        d.weightOunces,
        d.remaining,
        d.price,
        d.shareOfShippingPercent,
        orderId,
        d.notes,
      ]);

      params = [rowData];

      const sql = `
      INSERT INTO fragrance_oils
        (reference_id, weight_ounces, remaining,
          price, share_of_shipping_percent, order_id, notes)
      VALUES ?
    `;

      db.query(sql, [rowData], (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex, i) => {
          return (done) => {
            const sql = `UPDATE fragrance_oils SET hash_id = ? WHERE id = ?`;
            const params = [
              hashConfig.fragranceOils.encode(rowIndex),
              rowIndex,
            ];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertFragranceReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    console.log("NO NEW FRAGS");
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      d.categoryId,
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.ifraUrl,
      d.allerginUrl,
      d.flashpointTemperatureFahrenheit,
      d.specificGravity || null,
      d.vanillinPercentage || null,
      d.ethylVanillinPercentage || null,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO fragrance_reference
        (name, slug, category_id, supplier_id, product_url,
          msds_url, ifra_url, allergin_url, 
          flashpoint_temperature_fahrenheit, specific_gravity,
          vanillin_percentage, ethyl_vanillin_percentage, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertWaxes(db, { waxes: data, orderId, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const newWaxes = data
    // add the index to the object so we can update the referenceId of new-waxes idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the waxes without a referenceId are new
    .filter((d) => !d.referenceId);

  // waxes with a referenceId already have their basic details indexed
  const existingWaxes = data.filter((d) => !!d.referenceId);

  insertWaxReferences(
    db,
    { data: newWaxes, supplierId },
    (err, waxRefResult) => {
      if (err) {
        return cb(err);
      }

      console.log("Existing waxes: ", existingWaxes);
      console.log("NEW waxes: ", newWaxes);

      if (waxRefResult) {
        // the insertId for each of the new waxRef is
        // also the `referenceId` for the waxes
        for (let i = 0; i < waxRefResult.affectedRows; i++) {
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newWaxes` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newWaxes[i].index].referenceId = waxRefResult.insertId + i;
        }
      }

      const rowData = data.map((d) => [
        d.referenceId,
        d.weightPounds,
        d.remaining,
        d.price,
        d.shareOfShippingPercent,
        orderId,
        d.notes,
      ]);
      params = [rowData];

      const sql = `
      INSERT INTO waxes
        (reference_id, weight_pounds, remaining,
          price, share_of_shipping_percent, order_id, notes)
      VALUES ?
    `;

      db.query(sql, [rowData], (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex) => {
          return (done) => {
            const sql = `UPDATE waxes SET hash_id = ? WHERE id = ?`;
            const params = [hashConfig.waxes.encode(rowIndex), rowIndex];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertWaxReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    console.log("NO NEW WAXES");
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.infoUrl,
      d.flashpointTemperatureFahrenheit,
      d.meltingTemperatureFahrenheit,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO wax_reference
        (name, slug, supplier_id, product_url,
          msds_url, info_url,
          flashpoint_temperature_fahrenheit, melting_temperature_fahrenheit,
          notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertAdditives(db, { additives: data, orderId, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const newAdditives = data
    // add the index to the object so we can update the referenceId of new-additives idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the additives without a referenceId are new
    .filter((d) => !d.referenceId);

  // additives with a referenceId already have their basic details indexed
  const existingAdditives = data.filter((d) => !!d.referenceId);

  insertAdditiveReferences(
    db,
    { data: newAdditives, supplierId },
    (err, additiveRefResult) => {
      if (err) {
        return cb(err);
      }

      console.log("Existing additives: ", existingAdditives);
      console.log("NEW additives: ", newAdditives);

      if (additiveRefResult) {
        // the insertId for each of the new additiveRef is
        // also the `referenceId` for the additives
        for (let i = 0; i < additiveRefResult.affectedRows; i++) {
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newAdditives` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newAdditives[i].index].referenceId =
            additiveRefResult.insertId + i;
        }
      }
      const rowData = data.map((d) => [
        d.referenceId,
        d.weightOunces,
        d.remaining,
        d.price,
        d.shareOfShippingPercent,
        orderId,
        d.notes,
      ]);
      params = [rowData];

      const sql = `
      INSERT INTO additives
        (reference_id, weight_ounces, remaining, price, share_of_shipping_percent, order_id, notes)
      VALUES ?
    `;

      db.query(sql, [rowData], (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex) => {
          return (done) => {
            const sql = `UPDATE additives SET hash_id = ? WHERE id = ?`;
            const params = [hashConfig.additives.encode(rowIndex), rowIndex];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertAdditiveReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    console.log("NO NEW ADDITIVES");
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.infoUrl,
      d.flashpointTemperatureFahrenheit,
      d.meltingTemperatureFahrenheit,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO additive_reference
        (name, slug, supplier_id, product_url,
          msds_url, info_url,
          flashpoint_temperature_fahrenheit, melting_temperature_fahrenheit,
          notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertBoxes(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO boxes
        (name, slug, order_id, count, remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE boxes SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.boxes.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function insertDyes(db, { dyes: data, orderId, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const newDyes = data
    // add the index to the object so we can update the referenceId of new-additives idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the dyes without a referenceId are new
    .filter((d) => !d.referenceId);

  // additives with a referenceId already have their basic details indexed
  const existingDyes = data.filter((d) => !!d.referenceId);

  insertDyeReferences(
    db,
    { data: newDyes, supplierId },
    (err, dyeRefResult) => {
      if (err) {
        return cb(err);
      }

      console.log("Existing dyes: ", existingDyes);
      console.log("NEW dyes: ", newDyes);

      if (dyeRefResult) {
        // the insertId for each of the new dyeRef is
        // also the `referenceId` for the dyes
        for (let i = 0; i < dyeRefResult.affectedRows; i++) {
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newDyes` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newDyes[i].index].referenceId = dyeRefResult.insertId + i;
        }
      }

      const rowData = data.map((d) => [
        d.referenceId,
        d.weightOunces,
        d.remaining,
        d.price,
        d.shareOfShippingPercent,
        orderId,
        d.notes,
      ]);
      params = [rowData];

      const sql = `
      INSERT INTO dyes
        (reference_id, weight_ounces, remaining, price, share_of_shipping_percent, order_id, notes)
      VALUES ?
    `;

      db.query(sql, [rowData], (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex) => {
          return (done) => {
            const sql = `UPDATE dyes SET hash_id = ? WHERE id = ?`;
            const params = [hashConfig.dyes.encode(rowIndex), rowIndex];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertDyeReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      d.color,
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.infoUrl,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO dye_reference
        (name, slug, color, supplier_id, product_url,
          msds_url, info_url,
          notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertJars(db, { jars: data, supplierId, orderId }, cb) {
  if (!data.length) {
    return cb();
  }

  const newJars = data
    // add the index to the object so we can update the referenceId of new-jars idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the jars without a referenceId are new
    .filter((d) => !d.referenceId);

  // jars with a referenceId already have their basic details indexed
  const existingJars = data.filter((d) => !!d.referenceId);

  insertJarReferences(
    db,
    { data: newJars, supplierId },
    (err, jarRefResult) => {
      if (err) {
        return cb(err);
      }

      console.log("Existing jars: ", existingJars);
      console.log("NEW jars: ", newJars);

      if (jarRefResult) {
        // the insertId for each of the new jarRef is
        // also the `referenceId` for the jars
        for (let i = 0; i < jarRefResult.affectedRows; i++) {
          console.log(
            "AFFECTED ROW: ",
            jarRefResult,
            " i: ",
            i,
            "should be ref: ",
            jarRefResult.insertId + i
          );
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newJars` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newJars[i].index].referenceId = jarRefResult.insertId + i;
        }
      }

      console.log("DATA: ", data);

      const rowData = data.map((d) => [
        d.referenceId,
        d.color,
        orderId,
        d.count,
        d.remaining,
        d.price,
        d.shareOfShippingPercent,
        d.notes,
      ]);
      params = [rowData];

      const sql = `
      INSERT INTO jars
        (reference_id, color, order_id,
          count,
          remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex) => {
          return (done) => {
            const sql = `UPDATE jars SET hash_id = ? WHERE id = ?`;
            const params = [hashConfig.jars.encode(rowIndex), rowIndex];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertJarReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      d.overflowVolumeOunces || null,
      d.waxToFillLineOunces || null,
      d.waxToOverflowOunces || null,
      d.diameterInches,
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.infoUrl,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO jar_reference
        (name, slug, overflow_volume_ounces, wax_to_fill_line_ounces,
          wax_to_overflow_ounces, diameter_inches, supplier_id, product_url,
          msds_url, info_url,
          notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertLids(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    d.color,
    orderId,
    d.diameter_inches,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO lids
        (name, slug, color, order_id,
          diameter_inches, count,
          remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE lids SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.lids.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function insertMiscEquipment(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO misc_equipment
        (name, slug, order_id, count,
          remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE misc_equipment SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.miscEquipment.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function insertWarningLabels(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.color,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO warning_labels
        (name, slug, order_id, count,
          remaining, color, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE warning_labels SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.warningLabels.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function insertWicks(db, { wicks: data, supplierId, orderId }, cb) {
  if (!data.length) {
    return cb();
  }

  const newWicks = data
    // add the index to the object so we can update the referenceId of new-wicks idea without looping again later
    .map((d, index) => ({ ...d, index }))
    // all the wicks without a referenceId are new
    .filter((d) => !d.referenceId);

  // wicks with a referenceId already have their basic details indexed
  const existingWicks = data.filter((d) => !!d.referenceId);

  insertWickReferences(
    db,
    { data: newWicks, supplierId },
    (err, wickRefResult) => {
      if (err) {
        return cb(err);
      }

      console.log("Existing wicks: ", existingWicks);
      console.log("NEW wicks: ", newWicks);

      if (wickRefResult) {
        // the insertId for each of the new jarRef is
        // also the `referenceId` for the wicks
        for (let i = 0; i < wickRefResult.affectedRows; i++) {
          // this is a little ugly, but we want to preserve the input order of the original form submission
          // to keep hash_ids consistent on re-runs. we've saved the original input index on the `data`,
          // which the `newWicks` array is a subset of. so we can now update the original data
          // with the new referenceId.
          data[newWicks[i].index].referenceId = wickRefResult.insertId + i;
        }
      }

      console.log("DATA: ", data);

      const rowData = data.map((d) => [
        d.referenceId,
        d.hash_id,
        orderId,
        d.count,
        d.remaining,
        d.length,
        d.price,
        d.shareOfShippingPercent,
        d.notes,
      ]);
      params = [rowData];

      const sql = `
      INSERT INTO wicks
        (reference_id, hash_id, order_id, count,
          remaining, length, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

      db.query(sql, [rowData], (err, result) => {
        if (err) {
          console.error(err, {
            sql,
            params,
          });
          return rollback(db, err, cb);
        }

        // now insert the hashIds
        let rowIndices = [];
        for (let i = 0; i < result.affectedRows; i++) {
          rowIndices.push(result.insertId + i);
        }

        const updateFuncs = rowIndices.map((rowIndex) => {
          return (done) => {
            const sql = `UPDATE wicks SET hash_id = ? WHERE id = ?`;
            const params = [hashConfig.wicks.encode(rowIndex), rowIndex];
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
        async.parallel(updateFuncs, (err, results) => {
          if (err) {
            return rollback(db, err, cb);
          }
          cb(err, results);
        });
      });
    }
  );
}

function insertWickReferences(db, { data, supplierId }, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => {
    return [
      d.name,
      slug(d.name, { lower: true }),
      d.series,
      d.size,
      supplierId,
      d.productUrl,
      d.msdsUrl,
      d.infoUrl,
      d.notes,
    ];
  });

  params = [rowData];

  const sql = `
      INSERT INTO wick_reference
        (name, slug, series,
          size, supplier_id, product_url,
          msds_url, info_url,
          notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }
    return cb(err, result);
  });
}

function insertWickTabs(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO wick_tabs
        (name, slug, order_id, count,
          remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE wick_tabs SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.wickStickers.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function insertWickStickers(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO wick_stickers
        (name, slug, order_id, count,
          remaining, price, share_of_shipping_percent, notes)
      VALUES ?
    `;

  db.query(sql, [rowData], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return rollback(db, err, cb);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const updateFuncs = rowIndices.map((rowIndex) => {
      return (done) => {
        const sql = `UPDATE wick_stickers SET hash_id = ? WHERE id = ?`;
        const params = [hashConfig.wickStickers.encode(rowIndex), rowIndex];
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
    async.parallel(updateFuncs, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }
      cb(err, results);
    });
  });
}

function rollback(db, err, cb) {
  db.rollback(() => {
    return cb(err);
  });
}
