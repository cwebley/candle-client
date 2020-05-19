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
          (done) => insertFragranceOils(db, fragranceOils, orderId, done),
          (done) => insertWaxes(db, waxes, orderId, done),
          (done) => insertAdditives(db, additives, orderId, done),
          (done) => insertBoxes(db, boxes, orderId, done),
          (done) => insertdyes(db, dyes, orderId, done),
          (done) => insertJars(db, jars, orderId, done),
          (done) => insertLids(db, lids, orderId, done),
          (done) => insertMiscEquipment(db, miscEquipment, orderId, done),
          (done) => insertWarningLabels(db, warningLabels, orderId, done),
          (done) => insertWicks(db, wicks, orderId, done),
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

function addToSupplyOrderTable(db, data, cb) {
  const sql = `
    INSERT INTO supply_orders
      (source, item_count, subtotal_cost, taxes_and_fees,
        shipping_cost, total_cost, open_date, notes)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.source,
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
}

function insertFragranceOils(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const valueMarkers = data.map((d) => `(?, ?, ?, ?, ?, ?, ?)`);
  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
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
        (name, slug, weight_ounces, remaining,
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
        const sql = `UPDATE fragrance_oils SET hash_id = ?, category_id = (SELECT id from fragrance_oil_categories WHERE slug = ?) WHERE id = ?`;
        const params = [
          hashConfig.fragranceOils.encode(rowIndex),
          data[i].category,
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

function insertWaxes(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    d.weightPounds,
    d.material,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    orderId,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO waxes
        (name, slug, weight_pounds, material,
          remaining, price, share_of_shipping_percent, order_id, notes)
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

function insertAdditives(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
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
        (name, slug, weight_ounces, remaining, price, share_of_shipping_percent, order_id, notes)
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

function insertdyes(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    d.color,
    orderId,
    d.weightOunces,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO dyes
        (name, slug, color, order_id,
          weight_ounces, remaining, price, share_of_shipping_percent, notes)
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

function insertJars(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    d.color,
    orderId,
    d.waxToFillLineOunces || null,
    d.waxToOverflowOunces || null,
    d.overflowVolumeOunces,
    d.diameterInches,
    d.count,
    d.remaining,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO jars
        (name, slug, color, order_id,
          wax_to_fill_line_ounces, wax_to_overflow_ounces,
          overflow_volume_ounces, diameter_inches, count,
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

function insertWicks(db, data, orderId, cb) {
  if (!data.length) {
    return cb();
  }

  const rowData = data.map((d) => [
    d.name,
    slug(d.name, { lower: true }),
    orderId,
    d.count,
    d.remaining,
    d.length,
    d.series,
    d.size,
    d.price,
    d.shareOfShippingPercent,
    d.notes,
  ]);
  params = [rowData];

  const sql = `
      INSERT INTO wicks
        (name, slug, order_id, count,
          remaining, length, series, size, price, share_of_shipping_percent, notes)
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
