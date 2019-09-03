const batchesData = require("../data/batches");
const request = require("request");
const async = require("neo-async");

module.exports.dependsOn = ["candles"];

module.exports.up = function(state, dependencies, next) {
  const seriesFuncs = batchesData.map(batchData => done =>
    request(
      {
        method: "POST",
        url: "http://localhost:5000/batches",
        json: true,
        body: batchData
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. body: ${body}`
          );
          console.log("BATCH DATA: ", batchData);
        }
        console.log("SAVING BODY TO STATE ", this, body);
        return done(err, body);
      }
    )
  );

  async.series(seriesFuncs, (err, batches) => {
    console.log("DONE SERIES FUNCS: ", err, batches);
    state.batches = batches;
    return next(err);
  });
};

module.exports.down = function(state, dependencies, next) {
  next();
};
