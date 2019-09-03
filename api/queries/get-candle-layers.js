const async = require("neo-async");
const slug = require("slug");
const getBatchQuery = require("./get-batch");

module.exports = function getCandleLayers(db, candleId, cb) {
  let sql = `
    SELECT
      id, hash_id AS "hashId", batch_id AS "batchId",
      prepped_container_weight_ounces AS "preppedContainerWeightOunces",
      container_temperature_fahrenheit AS "containerTemperatureFahrenheit",
      pour_temperature_fahrenheit AS "pourTemperatureFahrenheit",
      when_poured AS "whenPoured",
      cooling_room_temperature_fahrenheit AS "coolingRoomTemperatureFahrenheit",
      cooling_room_humidity_percent AS "coolingRoomHumidityPercent",
      notes
    FROM
      layers l
    WHERE l.candle_id = ?
    ORDER BY when_poured ASC
  `;

  let params = [candleId];
  db.query(sql, params, (err, layerResults) => {
    console.log("DONE WITH TOP LEVEL GET LAYERS");
    if (err) {
      console.error(err, {
        sql,
        params
      });
    }
    if (!layerResults || !layerResults.length) {
      return cb();
    }

    const getBatchFncs = layerResults.map(layer => {
      return done => {
        getBatchQuery(db, { batchId: layer.batchId }, (err, batchData) => {
          if (err) {
            console.error(err);
            return done(err);
          }
          layer.batchData = batchData;
          return done();
        });
      };
    });
    console.log("ABOUT TO || GET BATCHES");
    console.log("LAYER RESULTS: ", layerResults);
    async.parallel(getBatchFncs, err => {
      console.log("DONE GETTING BATCHES");
      if (err) {
        return cb(err);
      }
      cb(err, layerResults);
    });
  });
};
