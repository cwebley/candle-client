const getWaxToFillQuery = require("../queries/get-wax-to-fill-query");

module.exports = function getCandleWaxToFillSuggestion(req, res) {
  if (!req.query.candles) {
    return res.status(400).send({ message: "Candles query param not found" });
  }

  const candles = req.query.candles.split(",");
  if (!candles.length) {
    return res
      .status(400)
      .send({ message: "Please provide a comma separated candle list query" });
  }

  getWaxToFillQuery(req.db, candles, (err, waxToFillLineSum) => {
    if (err) {
      return res.status(500).send({ message: "Internal service error" });
    }
    if (!waxToFillLineSum) {
      return res.status(404).send({ message: "Candles not found" });
    }
    return res.status(200).send(waxToFillLineSum);
  });
};
