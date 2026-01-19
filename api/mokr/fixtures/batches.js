require("dotenv").config();
const batchesData = require("../data/batches");
const request = require("request");
const async = require("neo-async");

const API_PORT = process.env.PORT || 5000;

module.exports.dependsOn = ["candles"];

module.exports.up = function (next) {
  const self = this;
  const seriesFuncs = batchesData.map((fixtureData) => (done) => {
    // this field is only required for these fixtures. blends and batches
    // need to be updated in sync
    if (fixtureData.createBlend) {
      return request(
        {
          method: "POST",
          url: `http://localhost:${API_PORT}/blend`,
          json: true,
          body: fixtureData,
        },
        (err, resp, body) => {
          console.log("RESPONSEE: ", resp);
          if (!err && resp.statusCode >= 300) {
            err = new Error(
              `Non 200 response: ${resp.statusCode}. req.body: ${JSON.stringify(
                fixtureData,
                null,
                4
              )}`
            );
            console.log("BLEND DATA: ", fixtureData);
          }
          console.log("SAVING BODY TO STATE ", this, body);
          return done(err, body);
        }
      );
    }
    if (fixtureData.editBlend) {
      return request(
        {
          method: "PATCH",
          url: `http://localhost:${API_PORT}/blend/${fixtureData.blendId}`,
          json: true,
          body: fixtureData,
        },
        (err, resp, body) => {
          console.log("RESPONSEE: ", resp);
          if (!err && resp.statusCode >= 300) {
            err = new Error(
              `Non 200 response: ${resp.statusCode}. req.body: ${JSON.stringify(
                fixtureData,
                null,
                4
              )}`
            );
            console.log("BLEND DATA: ", fixtureData);
          }
          console.log("SAVING BODY TO STATE ", this, body);
          return done(err, body);
        }
      );
    }
    return request(
      {
        method: "POST",
        url: `http://localhost:${API_PORT}/batches`,
        json: true,
        body: fixtureData,
      },
      (err, resp, body) => {
        console.log("RESPONSE: ", resp);
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. req.body: ${JSON.stringify(
              fixtureData,
              null,
              4
            )}`
          );
          console.log("BATCH DATA: ", fixtureData);
        }
        console.log("SAVING BODY TO STATE ", this, body);
        return done(err, body);
      }
    );
  });

  async.series(seriesFuncs, (err, batches) => {
    console.log("DONE SERIES FUNCS: ", err, batches);
    self.state.batches = batches;
    return next(err);
  });
};

module.exports.down = function (next) {
  next();
};
