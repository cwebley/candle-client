const getJarsQuery = require("../queries/get-jars");

module.exports = function getJars(req, res) {
  const availableOnly = req.query.availableOnly === "true";

  getJarsQuery(req.db, { availableOnly }, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
