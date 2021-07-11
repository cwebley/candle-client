const async = require("neo-async");
const getCandle = require("./get-candle");

module.exports = function getCandles(
  db,
  { incomplete = false, candles = [], detailed = false },
  cb
) {
  if (detailed && candles.length) {
    // fetch the detailed candle data for each candle if requested
    const getCandleDetailsFns = candles.map((hashId) => (done) =>
      getCandle(db, { hashId }, done)
    );
    return async.parallel(getCandleDetailsFns, (err, results) => {
      if (err) {
        return cb(err);
      }
      return cb(null, results);
    });
  }
  // otherwise just fetch the top level candle info for all candles needed in one query
  let params = [];
  let sql = `
          SELECT c.hash_id AS "hashId", c.name, c.slug,
          c.completed_candle_weight_ounces AS "completedCandleWeightOunces",
          c.volume_overflow_percent AS "volumeOverflowPercent",
          c.color_description AS "colorDescription",
          c.jar_id AS "jarId", c.lid_id AS "lidId", c.box_id AS "boxId",
          c.wick_sticker_id AS "wickStickerId", c.wick_id AS "wickId", c.wick_tab_id AS "wickTabId",
          c.wick_count AS "wickCount", c.wick_layout AS "wickLayout",
          c.warning_label_id AS "warningLabelId",
          c.finished, c.owner_id AS "ownerId",
          c.notes
          FROM candles c
        `;

  if (candles.length) {
    console.log("DEF ADDING IT");
    sql += ` WHERE c.hash_id IN (?)`;
    params.push(candles);
  }
  if (!candles.length && incomplete) {
    sql += ` WHERE c.finished != true`;
  }

  sql += ` ORDER BY id DESC`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }

    if (!result) {
      return cb();
    }

    return cb(null, result);
  });
};
