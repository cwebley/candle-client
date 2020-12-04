const async = require("neo-async");
const slug = require("slug");
const calculateCosts = require("../util/calculate-costs");

module.exports = function getBlend(db, { blendId, blendHashId }, cb) {
  console.log("GB: ", { blendId, blendHashId }, cb);
  let sql = `
    SELECT
      b.id, b.hash_id AS "hashId", b.name, b.slug,
      b.total_wax_weight_ounces AS "totalWaxWeightOunces",
      b.total_additive_weight_ounces AS "totalAdditiveWeightOunces",
      b.remaining_ounces AS "remainingOunces",
      b.when_created AS "whenCreated", b.notes
    FROM blends b
  `;

  let whereClause = "WHERE b.hash_id = ?";

  if (blendId) {
    whereClause = "WHERE b.id = ?";
  }

  sql += whereClause;

  const params = [blendId || blendHashId];

  db.query(sql, params, (err, blendRows) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    console.log("BLEND ROWS: ", blendRows);
    if (blendRows.length !== 1) {
      console.info(`blend ${blendId || blendHashId} not found`);
      return cb();
    }
    let blend = blendRows[0];

    async.parallel(
      {
        ["additives"]: (done) => getBlendsAdditives(db, blend.id, done),
        ["wax"]: (done) => getBlendsWaxes(db, blend.id, done),
      },
      (err, results) => {
        if (err) {
          return cb(err);
        }

        // total the cost for the entire blend
        const blendCosts = {};

        blendCosts.productCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.productCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);
        blendCosts.shippingCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.shippingCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);
        blendCosts.totalCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.totalCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);

        // round the values
        Object.keys(blendCosts).forEach(
          (k) => (blendCosts[k] = Math.round(100 * blendCosts[k]) / 100)
        );

        blend.calculatedCosts = blendCosts;

        blend.additives = results.additives;
        blend.wax = results.wax;

        return cb(null, blend);
      }
    );
  });
};

function getBlendsAdditives(db, blendId, cb) {
  const sql = `
    SELECT
      ba.id, ba.weight_ounces AS "weightOunces",
      ba.combine_id AS "combineId",
      ba.when_added AS "whenAdded",
      a.id AS "additiveId",
      a.hash_id AS "hashId", ar.name, ar.slug,
      ar.supplier_id AS "supplierId", ar.product_url AS "productUrl",
      ar.msds_url AS "msdsUrl", ar.info_url AS "infoUrl",
      ar.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenheit",
      ar.melting_temperature_fahrenheit AS "meltingTemperatureFahrenheit",
      a.order_id, a.weight_ounces AS "itemWeightOunces",
      a.price AS "itemCost", a.share_of_shipping_percent AS "shareOfShippingPercent",
      a.notes, so.supplier_id AS "supplierId", sr.name AS "supplierName", so.item_count AS "orderItemCount",
      so.subtotal_cost AS "orderSubtotalCost", so.taxes_and_fees AS "orderTaxesAndFees",
      so.shipping_cost AS "orderShippingCost", so.total_cost AS "orderTotalCost"
    FROM blends_additives ba
    LEFT JOIN additives a ON a.id = ba.additive_id
    LEFT JOIN additive_reference ar ON ar.id = a.reference_id
    LEFT JOIN supply_orders so ON so.id = a.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE ba.blend_id = ?
  `;

  const params = [blendId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }

    result.forEach((item) => {
      item.calculatedCosts = calculateCosts({
        amountUsed: item.weightOunces,
        packageAmount: item.itemWeightOunces,
        resourceCost: item.itemCost,
        shareOfShippingPercent: item.shareOfShippingPercent,
        orderSubtotal: item.orderSubtotalCost,
        orderTaxesAndFees: item.orderTaxesAndFees,
        orderShippingCost: item.orderShippingCost,
      });

      item.type = "additive";
    });
    return cb(err, result);
  });
}

function getBlendsWaxes(db, blendId, cb) {
  const sql = `
    SELECT
      bw.id, bw.weight_ounces AS "weightOunces", w.hash_id AS "hashId", wr.name, wr.slug,
      bw.combine_id AS "combineId",
      bw.when_added AS "whenAdded",
      w.id AS "waxId",
      w.order_id, w.weight_pounds AS "shipmentWeightPounds",
      wr.material, wr.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenheit",
      wr.melting_temperature_fahrenheit AS "meltingTemperatureFahrenheit",
      wr.supplier_id AS "supplierId",
      wr.product_url AS "productUrl", wr.msds_url AS "msdsUrl",
      wr.info_url AS "infoUrl",
      w.price AS "itemCost", w.share_of_shipping_percent AS "shareOfShippingPercent",
      w.notes, so.supplier_id AS "supplierId", sr.name AS "supplierName", so.item_count AS "orderItemCount",
      so.subtotal_cost AS "orderSubtotalCost", so.taxes_and_fees AS "orderTaxesAndFees",
      so.shipping_cost AS "orderShippingCost", so.total_cost AS "orderTotalCost"
    FROM blends_waxes bw
    LEFT JOIN waxes w ON w.id = bw.wax_id
    LEFT JOIN wax_reference wr ON wr.id = w.reference_id
    LEFT JOIN supply_orders so ON so.id = w.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE bw.blend_id = ?
  `;

  const params = [blendId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }

    result.forEach((item) => {
      item.calculatedCosts = calculateCosts({
        amountUsed: item.weightOunces,
        packageAmount: item.shipmentWeightPounds * 16, // covert pounds to ounces before this calculation
        resourceCost: item.itemCost,
        shareOfShippingPercent: item.shareOfShippingPercent,
        orderSubtotal: item.orderSubtotalCost,
        orderTaxesAndFees: item.orderTaxesAndFees,
        orderShippingCost: item.orderShippingCost,
      });

      item.type = "wax";
    });
    return cb(err, result);
  });
}
