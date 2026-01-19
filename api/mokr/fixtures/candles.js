require("dotenv").config();
const candlesData = require("../data/candles");
const request = require("request");
const async = require("neo-async");

const API_PORT = process.env.PORT || 5000;

module.exports.dependsOn = ["orders"];

module.exports.up = function (next) {
  const self = this;
  const seriesFuncs = candlesData.map((candleGroup) => (done) =>
    request(
      {
        method: "POST",
        url: `http://localhost:${API_PORT}/candles`,
        json: true,
        body: candleGroup,
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. req.body: ${JSON.stringify(
              candleGroup,
              null,
              4
            )}`
          );
        }
        console.log("SAVING BODY TO STATE ", self, body);
        return done(err, body);
      }
    )
  );

  async.series(seriesFuncs, (err, candles) => {
    self.state.candles = candles;
    return next(err);
  });
};

module.exports.down = function (next) {
  next();
};
