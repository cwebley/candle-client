const editBlendQuery = require("../queries/edit-blend");

module.exports = function editBlend(req, res) {
  const blendData = req.body;
  const blendId = req.params.id;
  editBlendQuery(req.db, blendId, blendData, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
