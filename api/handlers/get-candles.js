const getCandlesQuery = require("../queries/get-candles");

module.exports = function getCandles(req, res) {
  const incomplete = req.query.incomplete === "true";

  getCandlesQuery(req.db, { incomplete }, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
