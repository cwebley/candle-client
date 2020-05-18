const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database");
const postSupplyOrder = require("./queries/post-supply-order");
const getSupplyOrder = require("./queries/get-supply-order");
const createBatch = require("./handlers/create-batch");
const createCandles = require("./handlers/create-candles");
const updateCandle = require("./handlers/update-candle");
const getBatch = require("./handlers/get-batch");
const getCandle = require("./handlers/get-candle");
const getCandleWaxToFillSuggestion = require("./handlers/get-candle-wax-to-fill-suggestion");

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  req.db = connection;
  return next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.route("/fragrance-oil-categories").get(function(req, res, next) {
  connection.query("SELECT * FROM `fragrance_oil_categories`", function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error(error);
    }
    res.json(results);
  });
});

app.route("/resource-types").get(function(req, res, next) {
  connection.query(
    "SELECT name, slug, scope FROM `resource_types`",
    req.params.id,
    function(error, results, fields) {
      if (error) {
        console.error(error);
      }
      res.json(results);
    }
  );
});

app.route("/supply-orders").post(function(req, res, next) {
  const orderData = req.body;
  if (!orderData.items) {
    return res.status(400).send({ message: "no items array" });
  }
  if (!orderData.subtotalCost) orderData.subtotalCost = 0;
  if (!orderData.shippingCost) orderData.shippingCost = 0;
  if (!orderData.taxesAndFees) orderData.taxesAndFees = 0;
  if (!orderData.totalCost) orderData.totalCost = 0;
  for (let i = 0; i < orderData.items.length; i++) {
    if (!orderData.items[i].name) {
      return res.status(400).send({ message: "item name is required" });
    }
    if (orderData.items[i].type === "dye" && !orderData.items[i].color) {
      return res.status(400).send({ message: "dyes require a color" });
    }
  }

  postSupplyOrder(connection, orderData, (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(201).json(results);
  });
});

app.route("/supply-orders/:id").get(function(req, res, next) {
  getSupplyOrder(connection, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Internal server error" });
    }
    if (!results) {
      res.status(404).send({ message: "supply order not found" });
    }
    res.status(200).json(results);
  });
});

app.route("/candles").post(createCandles);

app.route("/batches").post(createBatch);

app.route("/batches/:id").get(getBatch);

app.route("/candles/wax-to-fill").get(getCandleWaxToFillSuggestion);

app.route("/candles/:id").get(getCandle);
app.route("/candles/:id").put(updateCandle);

app.get("/status", (req, res) => res.send("Working!"));

app.set("port", process.env.PORT || 5000);
app.listen(5000);
