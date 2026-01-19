require("dotenv").config();
const fetchUpdatesData = require("../data/updates");
const request = require("request");
const async = require("neo-async");

const API_PORT = process.env.PORT || 5000;

module.exports.dependsOn = ["candles", "batches"];

module.exports.up = function(next) {
  const self = this;
  // console.log("STATE: ", self.state);
  // console.log("DEPS: ", self.dependencies.candles.state.candles);
  console.log("FLATTENED: ", self.dependencies.candles.state.candles.flat());
  // console.log("UPDATES DATA: ", updatesData);
  fetchUpdatesData((err, updatesData) => {
    if (err) {
      console.error(`fetchUpdatesData error: ${err}`);
    }

    const seriesFuncs = updatesData.map((update, i) => done => {
      console.log("I: ", i, " UPDATE: ", update);
      return request(
        {
          method: "PUT",
          url: `http://localhost:${API_PORT}/candles/${self.dependencies.candles.state.candles.flat()[i].hashId
            }`,
          json: true,
          body: update
        },
        (err, resp, body) => {
          console.log("DONE WITH I: ", i);
          if (!err && resp.statusCode >= 300) {
            err = new Error(
              `Non 200 response: ${resp.statusCode}. body: ${body}`
            );
          }
          return done(err, body);
        }
      );
    });

    async.series(seriesFuncs, (err, batches) => {
      console.log("DONE SERIES FUNCS: ", err, batches);
      self.state.batches = batches;
      return next(err);
    });
  });
};

module.exports.down = function(next) {
  next();
};
