const getBlendsQuery = require("../queries/get-blends");

module.exports = function getBlends(req, res) {
  const availableOnly = req.query.availableOnly === "true";

  getBlendsQuery(req.db, { availableOnly }, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }

    if (results.length) {
      results.forEach((blend) => {
        blend.waxFraction = blend.totalWaxWeightOunces / blend.remainingOunces;
        blend.additiveFraction =
          blend.totalAdditiveWeightOunces / blend.remainingOunces;
      });
    }

    res.status(200).json(results);
  });
};
