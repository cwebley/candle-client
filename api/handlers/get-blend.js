const getBlendQuery = require("../queries/get-blend");

module.exports = function getBlend(req, res) {
  getBlendQuery(
    req.db,
    {
      blendId: req.params.id,
    },
    (err, results) => {
      if (err) {
        if (err.reasons) {
          return res.status(400).send({ reasons: err.reasons });
        }
        return res.status(500).send({ message: "Internal server error" });
      }
      res.status(200).json(results);
    }
  );
};
