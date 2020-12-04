const createBlendQuery = require("../queries/create-blend");

module.exports = function createBlend(req, res) {
  const blendData = req.body;
  if (!blendData.items) {
    return res
      .status(400)
      .send({ message: "Blend data needs an array of items" });
  }

  createBlendQuery(req.db, blendData, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(201).json(results);
  });
};
