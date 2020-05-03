module.exports = function getCandleBurns(db, { candleId }, cb) {
  console.log("GET BURNS: ", candleId);
  const sql = `
      SELECT id AS burnId, when_started AS whenStarted,
      when_stopped AS whenStopped, stopped_weight_ounces AS stoppedWeightOunces,
      notes 
        FROM
      candles_burns
      WHERE
      candle_id = ?
    `;

  db.query(sql, [candleId], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        candleId,
      });
      return cb(err);
    }

    return cb(null, result);
  });
};
