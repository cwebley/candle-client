module.exports = function getCandles(db, { incomplete = false }, cb) {
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

  if (incomplete) {
    sql += ` WHERE completed_candle_weight_ounces IS NULL`;
  }

  sql += ` ORDER BY id DESC`;

  db.query(sql, [], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
      });
      return cb(err);
    }

    if (!result) {
      return cb();
    }

    return cb(null, result);
  });
};
