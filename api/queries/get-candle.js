const slug = require("slug");
const calculateCosts = require("../util/calculate-costs");

module.exports = function getCandle(db, { batchId, hashId }, cb) {
  let sql = `
    SELECT
      c.id, c.hash_id AS "hashId", c.name, c.slug,
      c.color_description AS "colorDescription",
      c.completed_candle_weight_ounces AS "completedCandleWeightOunces",
      c.volume_overflow_percent AS "volumeOverflowPercent",

      c.jar_id AS "jarId", c.lid_id AS "lidId", c.box_id AS "boxId",
      c.wick_sticker_id AS "wickStickerId", c.wick_id AS "wickId",
      c.wick_tab_id AS "wickTabId",
      c.wick_count AS "wickCount", c.wick_layout AS "wickLayout",
      c.finished, c.owner_id, c.notes,

      j.hash_id AS "jarHashId", j.name AS "jarName", j.slug AS "jarSlug",
      j.color AS "jarColor", j.overflow_volume_ounces AS "jarOverflowVolumeOunces",
      j.wax_to_fill_line_ounces AS "jarWaxToFillLineOunces",
      j.wax_to_overflow_ounces AS "jarWaxToOverflowOunces",
      j.diameter_inches AS "jarDiameterInches",
      j.count AS "jarCollectionCount", j.price AS "jarPrice",
      j.share_of_shipping_percent AS "jarShareOfShippingPercent",
      jso.subtotal_cost AS "jarSubtotalCost",
      jso.taxes_and_fees AS "jarTaxesAndFees",
      jso.shipping_cost AS "jarShippingCost",
      jso.total_cost AS "jarTotalCost",

      l.hash_id AS "lidHashId", l.name AS "lidName", l.slug AS "lidSlug",
      l.color AS "lidColor", l.diameter_inches AS "lidDiameterInches",
      l.count AS "lidCollectionCount", l.price AS "lidPrice",
      l.share_of_shipping_percent AS "lidShareOfShippingPercent",
      lso.subtotal_cost AS "lidSubtotalCost",
      lso.taxes_and_fees AS "lidTaxesAndFees",
      lso.shipping_cost AS "lidShippingCost",
      lso.total_cost AS "lidTotalCost",

      wl.hash_id AS "warningLabelHashId", wl.name AS "warningLabelName",
      wl.slug AS "warningLabelSlug",
      wl.color AS "warningLabelColor", wl.count AS "warningLabelCollectionCount",
      wl.price AS "warningLabelPrice",
      wl.share_of_shipping_percent AS "warningLabelShareOfShippingPercent",
      wlso.subtotal_cost AS "warningLabelSubtotalCost",
      wlso.taxes_and_fees AS "warningLabelTaxesAndFees",
      wlso.shipping_cost AS "warningLabelShippingCost",
      wlso.total_cost AS "warningLabelTotalCost",

      w.hash_id AS "wickHashId", w.name AS "wickName",
      w.slug AS "wickSlug", w.count AS "wickCollectionCount",
      w.price AS "wickPrice", w.length AS "wickLength",
      w.series AS "wickSeries", w.size AS "wickSize",
      w.share_of_shipping_percent AS "wickShareOfShippingPercent",
      wso.subtotal_cost AS "wickSubtotalCost",
      wso.taxes_and_fees AS "wickTaxesAndFees",
      wso.shipping_cost AS "wickShippingCost",
      wso.total_cost AS "wickTotalCost",

      bx.hash_id AS "boxHashId", bx.name AS "boxName",
      bx.slug AS "boxSlug", bx.count AS "boxCollectionCount",
      bx.price AS "boxPrice",
      bx.share_of_shipping_percent AS "boxShareOfShippingPercent",
      bso.subtotal_cost AS "boxSubtotalCost",
      bso.taxes_and_fees AS "boxTaxesAndFees",
      bso.shipping_cost AS "boxShippingCost",
      bso.total_cost AS "boxTotalCost",

      ws.hash_id AS "wickStickerHashId", ws.name AS "wickStickerName",
      ws.slug AS "wickStickerSlug", ws.count AS "wickStickerCollectionCount",
      ws.price AS "wickStickerPrice",
      ws.share_of_shipping_percent AS "wickStickerShareOfShippingPercent",
      wsso.subtotal_cost AS "wickStickerSubtotalCost",
      wsso.taxes_and_fees AS "wickStickerTaxesAndFees",
      wsso.shipping_cost AS "wickStickerShippingCost",
      wsso.total_cost AS "wickStickerTotalCost",

      wt.hash_id AS "wickTabHashId", wt.name AS "wickTabName",
      wt.slug AS "wickTabSlug", wt.count AS "wickTabCollectionCount",
      wt.price AS "wickTabPrice",
      wt.share_of_shipping_percent AS "wickTabShareOfShippingPercent",
      wtso.subtotal_cost AS "wickTabSubtotalCost",
      wtso.taxes_and_fees AS "wickTabTaxesAndFees",
      wtso.shipping_cost AS "wickTabShippingCost",
      wtso.total_cost AS "wickTabTotalCost",

      o.name AS "ownerName", o.slug AS "ownerSlug",
      o.notes AS "ownerNotes",

      FORMAT(
        SUM(UNIX_TIMESTAMP(cbs.when_stopped) - UNIX_TIMESTAMP(cbs.when_started)) / (60*60)
      , 2) AS "burnTimeToDateHours"

    FROM candles c
    LEFT JOIN jars j ON j.id = c.jar_id
    LEFT JOIN supply_orders jso ON j.order_id = jso.id
    LEFT JOIN lids l ON l.id = c.lid_id
    LEFT JOIN supply_orders lso ON l.order_id = lso.id
    LEFT JOIN warning_labels wl ON c.warning_label_id = wl.id
    LEFT JOIN supply_orders wlso ON wl.order_id = wlso.id
    LEFT JOIN wicks w ON c.wick_id = w.id
    LEFT JOIN supply_orders wso ON w.order_id = wso.id
    LEFT JOIN boxes bx ON c.box_id = bx.id
    LEFT JOIN supply_orders bso ON bx.order_id = bso.id
    LEFT JOIN wick_stickers ws ON c.wick_sticker_id = ws.id
    LEFT JOIN supply_orders wsso ON ws.order_id = wsso.id
    LEFT JOIN wick_tabs wt ON c.wick_tab_id = wt.id
    LEFT JOIN supply_orders wtso ON wt.order_id = wtso.id
    LEFT JOIN owners o ON c.owner_id = o.id
    LEFT JOIN candles_burns cbs ON cbs.candle_id = c.id
  `;

  let params = [];
  if (batchId) {
    sql += "WHERE c.batch_id = ?";
    params.push(batchId);
  }
  if (hashId) {
    sql += "WHERE c.hash_id = ?";
    params.push(hashId);
  }

  sql += "GROUP BY c.id";

  db.query(sql, params, (err, results) => {
    console.log("GET CANDLE QUERY DONE");
    if (err) {
      console.error(err, {
        sql,
        params
      });
    }
    if (!results || !results.length) {
      return cb();
    }

    results.forEach(candle => {
      console.log("TOP OF A BUNCH OF MATH");
      candle.calculatedVolumePouredOunces = (
        (candle.volumeOverflowPercent * candle.jarOverflowVolumeOunces) /
        100
      ).toFixed(2);

      candle.jarCalculatedCosts = calculateCosts({
        amountUsed: candle.jarHashId ? 1 : 0,
        packageAmount: candle.jarCollectionCount,
        resourceCost: candle.jarPrice,
        shareOfShippingPercent: candle.jarShareOfShippingPercent,
        orderSubtotal: candle.jarSubtotalCost,
        orderTaxesAndFees: candle.jarTaxesAndFees,
        orderShippingCost: candle.jarShippingCost
      });
      candle.lidCalculatedCosts = calculateCosts({
        amountUsed: candle.lidHashId ? 1 : 0,
        packageAmount: candle.lidCollectionCount,
        resourceCost: candle.lidPrice,
        shareOfShippingPercent: candle.lidShareOfShippingPercent,
        orderSubtotal: candle.lidSubtotalCost,
        orderTaxesAndFees: candle.lidTaxesAndFees,
        orderShippingCost: candle.lidShippingCost
      });
      candle.warningLabelCalculatedCosts = calculateCosts({
        amountUsed: candle.warningLabelHashId ? 1 : 0,
        packageAmount: candle.warningLabelCollectionCount,
        resourceCost: candle.warningLabelPrice,
        shareOfShippingPercent: candle.warningLabelShareOfShippingPercent,
        orderSubtotal: candle.warningLabelSubtotalCost,
        orderTaxesAndFees: candle.warningLabelTaxesAndFees,
        orderShippingCost: candle.warningLabelTotalCost
      });
      candle.wickCalculatedCosts = calculateCosts({
        amountUsed: candle.wickCount,
        packageAmount: candle.wickCollectionCount,
        resourceCost: candle.wickPrice,
        shareOfShippingPercent: candle.wickShareOfShippingPercent,
        orderSubtotal: candle.wickSubtotalCost,
        orderTaxesAndFees: candle.wickTaxesAndFees,
        orderShippingCost: candle.wickShippingCost
      });
      candle.boxCalculatedCosts = calculateCosts({
        amountUsed: candle.boxHashId ? 1 : 0,
        packageAmount: candle.boxCollectionCount,
        resourceCost: candle.boxPrice,
        shareOfShippingPercent: candle.boxShareOfShippingPercent,
        orderSubtotal: candle.boxSubtotalCost,
        orderTaxesAndFees: candle.boxTaxesAndFees,
        orderShippingCost: candle.boxShippingCost
      });
      candle.wickStickerCalculatedCosts = calculateCosts({
        amountUsed:
          candle.wickStickerHashId && candle.wickCount ? candle.wickCount : 0,
        packageAmount: candle.wickStickerCollectionCount,
        resourceCost: candle.wickStickerPrice,
        shareOfShippingPercent: candle.wickStickerShareOfShippingPercent,
        orderSubtotal: candle.wickStickerSubtotalCost,
        orderTaxesAndFees: candle.wickStickerTaxesAndFees,
        orderShippingCost: candle.wickStickerShippingCost
      });
      candle.wickTabCalculatedCosts = calculateCosts({
        amountUsed:
          candle.wickTabHashId && candle.wickCount ? candle.wickCount : 0,
        packageAmount: candle.wickTabCollectionCount,
        resourceCost: candle.wickTabPrice,
        shareOfShippingPercent: candle.wickTabShareOfShippingPercent,
        orderSubtotal: candle.wickTabSubtotalCost,
        orderTaxesAndFees: candle.wickTabTaxesAndFees,
        orderShippingCost: candle.wickTabShippingCost
      });
      candle.calculatedCosts = {
        productCost: (
          parseFloat(candle.jarCalculatedCosts.productCost) +
          parseFloat(candle.lidCalculatedCosts.productCost) +
          parseFloat(candle.warningLabelCalculatedCosts.productCost) +
          parseFloat(candle.wickCalculatedCosts.productCost) +
          parseFloat(candle.wickStickerCalculatedCosts.productCost) +
          parseFloat(candle.wickTabCalculatedCosts.productCost) +
          parseFloat(candle.boxCalculatedCosts.productCost)
        ).toFixed(2),
        taxesAndFees: (
          parseFloat(candle.jarCalculatedCosts.taxesAndFees) +
          parseFloat(candle.lidCalculatedCosts.taxesAndFees) +
          parseFloat(candle.warningLabelCalculatedCosts.taxesAndFees) +
          parseFloat(candle.wickCalculatedCosts.taxesAndFees) +
          parseFloat(candle.wickStickerCalculatedCosts.taxesAndFees) +
          parseFloat(candle.wickTabCalculatedCosts.taxesAndFees) +
          parseFloat(candle.boxCalculatedCosts.taxesAndFees)
        ).toFixed(2),
        shippingCost: (
          parseFloat(candle.jarCalculatedCosts.shippingCost) +
          parseFloat(candle.lidCalculatedCosts.shippingCost) +
          parseFloat(candle.warningLabelCalculatedCosts.shippingCost) +
          parseFloat(candle.wickCalculatedCosts.shippingCost) +
          parseFloat(candle.wickStickerCalculatedCosts.shippingCost) +
          parseFloat(candle.wickTabCalculatedCosts.shippingCost) +
          parseFloat(candle.boxCalculatedCosts.shippingCost)
        ).toFixed(2),
        totalCost: (
          parseFloat(candle.jarCalculatedCosts.totalCost) +
          parseFloat(candle.lidCalculatedCosts.totalCost) +
          parseFloat(candle.warningLabelCalculatedCosts.totalCost) +
          parseFloat(candle.wickCalculatedCosts.totalCost) +
          parseFloat(candle.wickStickerCalculatedCosts.totalCost) +
          parseFloat(candle.wickTabCalculatedCosts.totalCost) +
          parseFloat(candle.boxCalculatedCosts.totalCost)
        ).toFixed(2)
      };
    });

    console.log("RETURNING AFTER THE MATH");
    return cb(err, results);
  });
};
