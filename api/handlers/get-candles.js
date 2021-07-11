const getCandlesQuery = require("../queries/get-candles");
const getCandleBurns = require("../queries/get-candle-burns");
const async = require("neo-async");

module.exports = function getCandles(req, res) {
  const incomplete = req.query.incomplete === "true";
  const detailed = req.query.detailed === "true";
  const candles = req.query.candles && req.query.candles.split(",");

  getCandlesQuery(req.db, { incomplete, candles, detailed }, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }

    if (!detailed) {
      res.status(200).json(results);
    }

    // TODO fetch each candle burn
    /*
        decrementFuncs.push((done) =>
           decrementResource(db, "jars", 1, d.jarHashId, d.jarFinished, done)
    );
    */

    // const getBurnsFns = results.map(detailedCandle => (done) => {
    //   getCandleBurns(req.db, { candleId: detailedCandle.id }, (err, burns) => {
    //     if (err) {
    //       return res.status(500).send({ message: "Internal service error" });
    //     }
    //   });
    // })

    // (done) => (detailedCandle) => {
    //   getCandleBurns(req.db, { candleId: detailedCandle.id }, (err, burns) => {
    //     if (err) {
    //       return res.status(500).send({ message: "Internal service error" });
    //     }
    // });
    // };

    async.parallel((results) => {
      getCandleBurns(req.db, { candleId: candleResult.id }, (err, burns) => {
        if (err) {
          return res.status(500).send({ message: "Internal service error" });
        }
        console.log("CANDLE BURNS: ", burns);

        candleResult.burnHistory = burns;
      });
    });

    // results.forEach((detailedCandle) => {
    //   console.log("RESULT: ", detailedCandle);
    // });
  });
};
