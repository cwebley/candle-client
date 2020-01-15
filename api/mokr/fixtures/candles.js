const candlesData = require("../data/candles");
const request = require("request");
const async = require("neo-async");

module.exports.dependsOn = ["orders"];

module.exports.up = function(state, dependencies, next) {
  const seriesFuncs = candlesData.map(candleGroup => done =>
    request(
      {
        method: "POST",
        url: "http://localhost:5000/candles",
        json: true,
        body: candleGroup
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. req.body: ${JSON.stringify(candleGroup, null, 4)}`
          );
        }
        console.log("SAVING BODY TO STATE ", this, body);
        return done(err, body);
      }
    )
  );

  async.series(seriesFuncs, (err, candles) => {
    state.candles = candles;
    return next(err);
  });
};

module.exports.down = function(state, dependencies, next) {
  next();
};
