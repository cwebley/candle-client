const updateCandleQuery = require("../queries/update-candle");

module.exports = function updateCandle(req, res) {
  const candleData = req.body;
  if (!candleData) {
    return res
      .status(400)
      .send({ message: "Please submit candle data for updating" });
  }

  updateCandleQuery(req.db, req.params.id, candleData, (err, updateResults) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).json(updateResults);
  });
};
