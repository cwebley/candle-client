const postBatchQuery = require("../queries/post-batch");

module.exports = function createBatch(req, res) {
  const batchData = req.body;
  if (!batchData.batchItems) {
    return res
      .status(400)
      .send({ message: "Please submit an array of batchItems" });
  }
  if (!batchData.layers) {
    return res
      .status(400)
      .send({ message: "Please submit an array of layers" });
  }

  postBatchQuery(req.db, batchData, (err, results) => {
    if (err) {
      if (err.reasons) {
        return res.status(400).send({ reasons: err.reasons });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(201).json(results);
  });
};
