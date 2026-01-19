require("dotenv").config();
const ordersData = require("../data/orders");
const request = require("request");
const async = require("neo-async");

const API_PORT = process.env.PORT || 5000;

module.exports.up = function(next) {
  const self = this;
  const seriesFuncs = ordersData.map(o => done =>
    request(
      {
        method: "POST",
        url: `http://localhost:${API_PORT}/supply-orders`,
        json: true,
        body: o
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. body: ${body}`
          );
        }
        console.log("SAVING BODY TO STATE ", self, body);
        return done(err, body);
      }
    )
  );

  async.series(seriesFuncs, (err, orders) => {
    console.log("DONE SERIES FUNCS: ", err, orders);
    self.state.orders = orders;
    return next(err);
  });
};

module.exports.down = function(next) {
  next();
};
