const getDyesQuery = require("../queries/get-dyes");

module.exports = function getDyes(req, res) {
  const availableOnly = req.query.availableOnly === "true";

  getDyesQuery(req.db, { availableOnly }, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
