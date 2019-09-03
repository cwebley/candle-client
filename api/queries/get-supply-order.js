const async = require("neo-async");
const slug = require("slug");

module.exports = function getSupplyOrder(db, orderId, cb) {
  const sql = `
    SELECT
      so.id, so.hash_id AS "hashId", so.source, FORMAT(so.subtotal_cost, 2) AS "subtotalCost",
      FORMAT(so.taxes_and_fees, 2) AS "taxesAndFees", FORMAT(so.shipping_cost, 2) AS "shippingCost",
      FORMAT(so.total_cost, 2) AS "totalCost", so.open_date AS "openDate", so.notes
    FROM supply_orders so
    WHERE id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, supplyOrderRows) => {
    if (err) {
      console.error(err, {
        sql,
        params
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
        ["fragrance-oil"]: done => getFragranceOils(db, orderId, done),
        ["wax"]: done => getWaxes(db, orderId, done),
        ["boxes"]: done => getBoxes(db, orderId, done),
        ["jars"]: done => getJars(db, orderId, done),
        ["dye-blocks"]: done => getDyeBlocks(db, orderId, done),
        ["lids"]: done => getLids(db, orderId, done),
        ["misc-equipment"]: done => getMiscEquipment(db, orderId, done),
        ["warning-labels"]: done => getWarningLabels(db, orderId, done),
        ["wicks"]: done => getWicks(db, orderId, done),
        ["wick-stickers"]: done => getWickStickers(db, orderId, done)
      },
      (err, results) => {
        if (err) {
          return cb(err);
        }
        Object.keys(results).forEach(type => {
          // add the 'type' field to each item of each type then push onto supplyOrder.items
          results[type].forEach(item => {
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
      fo.hash_id AS "hashId", fo.name, fo.slug, fo.category_id as "categoryId",
      fo.weight_ounces AS "weightOunces", fo.remaining, FORMAT(fo.price, 2) AS "price",
      fo.share_of_shipping_percent AS "shareOfShippingPercent", fo.notes,
      foc.name AS "categoryName", foc.color AS "categoryColor"
    FROM fragrance_oils fo
    LEFT JOIN fragrance_oil_categories foc ON foc.id = fo.category_id
    WHERE fo.order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params
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
        params
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
        params
      });
    }
    return cb(err, result);
  });
}

function getDyeBlocks(db, orderId, cb) {
  const sql = `
    SELECT
      hash_id AS "hashId", name, slug,
      color, pieces, remaining, FORMAT(price, 2) AS "price",
      share_of_shipping_percent AS "shareOfShippingPercent", notes
    FROM dye_blocks
    WHERE order_id = ?
  `;

  const params = [orderId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params
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
        params
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
        params
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
        params
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
        params
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
        params
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
        params
      });
    }
    return cb(err, result);
  });
}
