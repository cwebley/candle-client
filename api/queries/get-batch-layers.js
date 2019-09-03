module.exports = function getBatchLayers(db, batchId, cb) {
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
        params
      });
    }
    return cb(err, result);
  });
};
