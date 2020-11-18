const async = require("neo-async");
const slug = require("slug");
const calculateCosts = require("../util/calculate-costs");

module.exports = function getBatch(db, { batchId }, cb) {
  const sql = `
    SELECT
      b.id, b.hash_id AS "hashId", name, slug,
      b.total_wax_weight_ounces AS "totalWaxWeightOunces",
      b.total_fragrance_weight_ounces AS "totalFragranceWeightOunces",
      b.total_additive_weight_ounces AS "totalAdditiveWeightOunces",
      b.total_dye_weight_ounces AS "totalDyeWeightOunces",
      b.fragrance_load AS "fragranceLoad",
      b.fragrance_add_temperature_fahrenheit AS "fragranceAddTemperatureFahrenheit",
      b.dye_add_temperature_fahrenheit AS "dyeAddTemperatureFahrenheit",
      b.when_created AS "whenCreated", b.notes
    FROM batches b
    WHERE id = ?
  `;

  const params = [batchId];

  db.query(sql, params, (err, batchRows) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    if (batchRows.length !== 1) {
      console.info(`batch ${batchId} not found`);
      return cb();
    }
    let batch = batchRows[0];

    async.parallel(
      {
        ["fragranceOil"]: (done) => getBatchesFragranceOils(db, batchId, done),
        ["additives"]: (done) => getBatchesAdditives(db, batchId, done),
        ["wax"]: (done) => getBatchesWaxes(db, batchId, done),
        ["dyes"]: (done) => getBatchesdyes(db, batchId, done),
      },
      (err, results) => {
        if (err) {
          return cb(err);
        }

        // total the cost for the entire batch
        const batchCosts = {};

        batchCosts.productCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.productCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);
        batchCosts.shippingCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.shippingCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);
        batchCosts.totalCost = Object.keys(results)
          .map((key) =>
            results[key].map(
              (singleItem) => singleItem.calculatedCosts.totalCost
            )
          )
          .flat()
          .reduce((acc, v) => acc + Number(v), 0);

        // round the values
        Object.keys(batchCosts).forEach(
          (k) => (batchCosts[k] = Math.round(100 * batchCosts[k]) / 100)
        );

        batch.calculatedCosts = batchCosts;

        batch.fragranceOil = results.fragranceOil;
        batch.additives = results.additives;
        batch.wax = results.wax;
        batch.dyes = results.dyes;

        return cb(null, batch);
      }
    );
  });
};

function getBatchesFragranceOils(db, batchId, cb) {
  const sql = `
    SELECT
      bf.weight_ounces AS "weightOunces", bf.fragrance_load AS "fragranceLoad",
      bf.combine_id AS "combineId", f.hash_id AS "hashId", 
      fr.name, fr.slug, fr.category_id AS "categoryId",
      fr.supplier_id AS "supplierId", fr.product_url AS "productUrl",
      fr.msds_url AS "msdsUrl", fr.ifra_url AS "ifraUrl", fr.allergin_url AS "allerginUrl",
      fr.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenheit",
      fr.specific_gravity AS "specificGravity", fr.vanillin_percentage AS "vanillinPercentage",
      fr.ethyl_vanillin_percentage AS "ethylVanillinPercentage",
      f.order_id, f.weight_ounces AS "bottleWeightOunces",
      f.price AS "itemCost", f.share_of_shipping_percent AS "shareOfShippingPercent",
      f.notes, so.supplier_id AS "supplierId", sr.name AS "supplierName", so.item_count AS "orderItemCount",
      so.subtotal_cost AS "orderSubtotalCost", so.taxes_and_fees AS "orderTaxesAndFees",
      so.shipping_cost AS "orderShippingCost", so.total_cost AS "orderTotalCost",
      foc.name AS "categoryName", foc.slug AS "categorySlug"
    FROM batches_fragrances bf
    LEFT JOIN fragrance_oils f ON f.id = bf.fragrance_id
    LEFT JOIN fragrance_reference fr ON fr.id = f.reference_id
    LEFT JOIN supply_orders so ON so.id = f.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    LEFT JOIN fragrance_oil_categories foc ON foc.id = fr.category_id
    WHERE bf.batch_id = ?
  `;

  const params = [batchId];

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
        packageAmount: item.bottleWeightOunces,
        resourceCost: item.itemCost,
        shareOfShippingPercent: item.shareOfShippingPercent,
        orderSubtotal: item.orderSubtotalCost,
        orderTaxesAndFees: item.orderTaxesAndFees,
        orderShippingCost: item.orderShippingCost,
      });

      item.type = "fragrance-oil";
    });
    return cb(err, result);
  });
}

function getBatchesAdditives(db, batchId, cb) {
  const sql = `
    SELECT
      ba.weight_ounces AS "weightOunces", ba.additive_load AS "additiveLoad",
      ba.combine_id AS "combineId",
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
    FROM batches_additives ba
    LEFT JOIN additives a ON a.id = ba.additive_id
    LEFT JOIN additive_reference ar ON ar.id = a.reference_id
    LEFT JOIN supply_orders so ON so.id = a.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE ba.batch_id = ?
  `;

  const params = [batchId];

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

function getBatchesWaxes(db, batchId, cb) {
  const sql = `
    SELECT
      bw.weight_ounces AS "weightOunces", w.hash_id AS "hashId", wr.name, wr.slug,
      bw.combine_id AS "combineId",
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
    FROM batches_waxes bw
    LEFT JOIN waxes w ON w.id = bw.wax_id
    LEFT JOIN wax_reference wr ON wr.id = w.reference_id
    LEFT JOIN supply_orders so ON so.id = w.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE bw.batch_id = ?
  `;

  const params = [batchId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
    }

    result.forEach((item) => {
      item.calculatedCosts = calculateCosts({
        amountUsed: item.weightOunces / 16, // convert this to pounds so calculateCosts doesn't have to deal with units
        packageAmount: item.shipmentWeightPounds,
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

function getBatchesdyes(db, batchId, cb) {
  const sql = `
    SELECT
      bdb.weight_ounces AS "weightOunces",
      d.hash_id AS "hashId",
      bdb.combine_id AS "combineId",
      d.name, d.slug,
      d.order_id, d.weight_ounces AS "shipmentWeightOunces",
      d.price AS "itemCost", d.share_of_shipping_percent AS "shareOfShippingPercent",
      d.notes, so.supplier_id AS "supplierId", sr.name AS "supplierName", so.item_count AS "orderItemCount",
      so.subtotal_cost AS "orderSubtotalCost", so.taxes_and_fees AS "orderTaxesAndFees",
      so.shipping_cost AS "orderShippingCost", so.total_cost AS "orderTotalCost"
    FROM batches_dyes bdb
    LEFT JOIN dyes d ON d.id = bdb.dye_id
    LEFT JOIN supply_orders so ON so.id = d.order_id
    LEFT JOIN supplier_reference sr ON so.supplier_id = sr.id
    WHERE bdb.batch_id = ?
  `;

  const params = [batchId];

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
        packageAmount: item.shipmentWeightOunces,
        resourceCost: item.itemCost,
        shareOfShippingPercent: item.shareOfShippingPercent,
        orderSubtotal: item.orderSubtotalCost,
        orderTaxesAndFees: item.orderTaxesAndFees,
        orderShippingCost: item.orderShippingCost,
      });

      item.type = "dye";
    });
    return cb(err, result);
  });
}

function getLayers(db, batchId, cb) {
  const sql = `
    SELECT
      l.hash_id AS "hashId", c.hash_id AS "candleHashId",
      l.prepped_container_weight_ounces AS "preppedContainerWeightOunces",
      l.container_temperature_fahrenheit AS "containerTemperatureFahrenheit",
      l.pour_temperature_fahrenheit AS "pourTemperatureFahrenheit",
      l.when_poured AS "whenPoured",
      l.cooling_room_temperature_fahrenheit AS "coolingRoomTemperatureFahrenheit",
      l.cooling_room_humidity_percent AS "coolingRoomHumidityPercent",
      l.notes

    FROM layers l
    JOIN candles c ON c.id = l.candle_id
    WHERE l.batch_id = ?
  `;

  const params = [batchId];

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
