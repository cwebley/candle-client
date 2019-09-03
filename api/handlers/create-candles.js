const createCandlesQuery = require("../queries/create-candles");

module.exports = function createCandles(req, res) {
  const candleData = req.body;
  if (!candleData || !Array.isArray(candleData) || !candleData.length) {
    return res
      .status(400)
      .send({ message: "Please submit an array of candles" });
  }

  createCandlesQuery(req.db, candleData, (err, candles) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    if (!candles || !candles.length) {
      return res
        .status(404)
        .send({ message: `Candle ${req.params.id} not found` });
    }
    res.status(201).json(candles);
  });
};
