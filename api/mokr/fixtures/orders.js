const ordersData = require("../data/orders");
const request = require("request");
const async = require("neo-async");

module.exports.up = function(state, dependencies, next) {
  console.log("TCL: module.exports.up -> state, dependencies, next", state, dependencies, next)
  const seriesFuncs = ordersData.map(o => done =>
    request(
      {
        method: "POST",
        url: "http://localhost:5000/supply-orders",
        json: true,
        body: o
      },
      (err, resp, body) => {
        if (!err && resp.statusCode >= 300) {
          err = new Error(
            `Non 200 response: ${resp.statusCode}. body: ${body}`
          );
        }
        console.log("SAVING BODY TO STATE ", this, body);
        return done(err, body);
      }
    )
  );

  async.series(seriesFuncs, (err, orders) => {
    console.log("DONE SERIES FUNCS: ", err, orders);
    state.orders = orders;
    return next(err);
  });
};

module.exports.down = function(state, dependencies, next) {
  next();
};
