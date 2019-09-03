const getBatchQuery = require("../queries/get-batch");
const getBatchLayers = require("../queries/get-batch-layers");

module.exports = function getBatch(req, res) {
  // fetch the batch data
  getBatchQuery(
    req.db,
    {
      batchId: req.params.id
    },
    (err, batchData) => {
      if (err) {
        return res.status(500).send({ message: "Internal service error" });
      }
      if (!batchData) {
        return res.status(404).send({ message: "Batch not found" });
      }

      // fetch the basic layer data for each pour of the batch
      getBatchLayers(req.db, req.params.id, (err, batchLayers) => {
        if (err) {
          return res.status(500).send({ message: "Internal service error" });
        }
        batchLayers = batchLayers || [];
        batchData.layers = batchLayers;
        return res.status(200).send(batchData);
      });
    }
  );
};
