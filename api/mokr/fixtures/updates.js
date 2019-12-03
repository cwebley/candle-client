const updatesData = require("../data/updates");
const request = require("request");
const async = require("neo-async");

module.exports.dependsOn = ["candles", "batches"];

module.exports.up = function(state, dependencies, next) {
  console.log("STATE: ", state)
  console.log("DEPS: ", dependencies.candles.state.candles);

  const seriesFuncs = updatesData.map((update, i) => done =>
    request(
      {
        method: "PUT",
        url: `http://localhost:5000/candles/${
          dependencies.candles.state.candles.flat()[i].hashId
        }`,
        json: true,
        body: update
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. body: ${body}`
          );
        }
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
