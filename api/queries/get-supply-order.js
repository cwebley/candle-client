const async = require("neo-async");
const slug = require("slug");

module.exports = function getSupplyOrder(db, orderId, cb) {
  const sql = `
    SELECT
      so.id, so.hash_id AS "hashId", so.supplier_id AS "supplierId", sr.name AS "supplierName",
      FORMAT(so.subtotal_cost, 2) AS "subtotalCost",
      FORMAT(so.taxes_and_fees, 2) AS "taxesAndFees", FORMAT(so.shipping_cost, 2) AS "shippingCost",
      FORMAT(so.total_cost, 2) AS "totalCost", so.open_date AS "openDate", so.notes
    FROM supply_orders so
    JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE so.id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, supplyOrderRows) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    if (supplyOrderRows.length !== 1) {
      console.info(`supply order ${orderId} not found`);
      return cb();
    }
    let supplyOrder = supplyOrderRows[0];

    supplyOrder.items = [];

    async.parallel(
      {
        ["fragrance-oil"]: (done) => getFragranceOils(db, orderId, done),
        ["wax"]: (done) => getWaxes(db, orderId, done),
        ["additives"]: (done) => getAdditives(db, orderId, done),
        ["boxes"]: (done) => getBoxes(db, orderId, done),
        ["jars"]: (done) => getJars(db, orderId, done),
        ["dye"]: (done) => getDyes(db, orderId, done),
        ["lids"]: (done) => getLids(db, orderId, done),
        ["misc-equipment"]: (done) => getMiscEquipment(db, orderId, done),
        ["warning-labels"]: (done) => getWarningLabels(db, orderId, done),
        ["wicks"]: (done) => getWicks(db, orderId, done),
        ["wick-stickers"]: (done) => getWickStickers(db, orderId, done),
        ["wick-tabs"]: (done) => getWickTabs(db, orderId, done),
      },
      (err, results) => {
        if (err) {
          return cb(err);
        }
        Object.keys(results).forEach((type) => {
          // add the 'type' field to each item of each type then push onto supplyOrder.items
          results[type].forEach((item) => {
            item.type = type;
            supplyOrder.items.push(item);
          });
        });
        return cb(null, supplyOrder);
      }
    );
  });
};

function getFragranceOils(db, orderId, cb) {
  const sql = `
    SELECT
      fo.hash_id AS "hashId", fo.reference_id AS "referenceId",
      fr.name, fr.slug, fr.category_id as "categoryId",
      fo.weight_ounces AS "weightOunces", fo.remaining, FORMAT(fo.price, 2) AS "price",
      fo.share_of_shipping_percent AS "shareOfShippingPercent", fo.notes,
      foc.name AS "categoryName", foc.color AS "categoryColor"
    FROM fragrance_oils fo
    LEFT JOIN fragrance_reference fr ON fo.reference_id = fr.id
    LEFT JOIN fragrance_oil_categories foc ON foc.id = fr.category_id
    WHERE fo.order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getWaxes(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug, material,
      weight_pounds AS "weightPounds", remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM waxes
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getAdditives(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      weight_ounces AS "weightOunces", remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM additives
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getBoxes(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM boxes
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getDyes(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      color, weight_ounces AS "weightOunces",
      remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM dyes
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getJars(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug, color, wax_to_fill_line_ounces AS "waxToFillLineOunces",
      wax_to_overflow_ounces AS "waxToOverflowOunces",
      overflow_volume_ounces AS "overflowVolumeOunces", diameter_inches AS "diamterInches",
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM jars
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getLids(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      color, diameter_inches AS "diameterInches",
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM lids
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getMiscEquipment(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM misc_equipment
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getWarningLabels(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, color, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM warning_labels
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getWicks(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, length, series, size, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM wicks
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getWickStickers(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM wick_stickers
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}

function getWickTabs(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      count, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM wick_tabs
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }
    return cb(err, result);
  });
}
