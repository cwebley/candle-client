const getCandleQuery = require("../queries/get-candle");
const getCandleBurns = require("../queries/get-candle-burns");
const getCandleLayersQuery = require("../queries/get-candle-layers");

module.exports = function getCandle(req, res) {
  getCandleQuery(
    req.db,
    {
      hashId: req.params.id,
    },
    (err, candles) => {
      if (err) {
        return res.status(500).send({ message: "Internal service error" });
      }
      if (!candles || !candles.length) {
        return res
          .status(404)
          .send({ message: `Candle ${req.params.id} not found` });
      }
      const candleResult = candles[0];

      getCandleBurns(req.db, { candleId: candleResult.id }, (err, burns) => {
        if (err) {
          return res.status(500).send({ message: "Internal service error" });
        }
        console.log("CANDLE BURNS: ", burns);

        candleResult.burnHistory = burns;

        console.log("BEFORE GET LAYERS");
        // fetch all the layers for the candle
        getCandleLayersQuery(req.db, candleResult.id, (err, layerData) => {
          console.log("DONE WITH GET LAYERS");

          if (err) {
            return res.status(500).send({ message: "Internal service error" });
          }
          if (!layerData) {
            layerData = [];
          }

          layerData.forEach((l, i) => {
            console.log("TOP OF LAYER MATH");
            // find the weight of the next layer, or if this is the last layer,
            // find the weight of the finished candle if available
            const nextWeightOunces =
              (layerData[i + 1] &&
                layerData[i + 1].preppedContainerWeightOunces) ||
              candleResult.completedCandleWeightOunces ||
              l.preppedContainerWeightOunces;

            pourWeightOuncesDecimal =
              nextWeightOunces - l.preppedContainerWeightOunces;
            l.pourWeightOunces = pourWeightOuncesDecimal.toFixed(2);

            // add this layer's weight to the candle's total pour weight
            candleResult.pourWeightOunces
              ? (candleResult.pourWeightOunces += pourWeightOuncesDecimal)
              : (candleResult.pourWeightOunces = pourWeightOuncesDecimal);

            // now that we have the pour weight, calculate the resource costs
            // NOTE: this percentage assumes the dye weighs nothing
            const layerToBatchPercentage =
              pourWeightOuncesDecimal /
              (l.batchData.totalWaxWeightOunces +
                l.batchData.totalAdditiveWeightOunces +
                l.batchData.totalFragranceWeightOunces);

            console.log("pourWeightOuncesDecimal: ", pourWeightOuncesDecimal);
            console.log(
              "totalWaxWeightOunces: ",
              l.batchData.totalWaxWeightOunces
            );
            console.log(
              "totalFragranceWeightOunces: ",
              l.batchData.totalFragranceWeightOunces
            );
            console.log(
              "totalAdditiveWeightOunces: ",
              l.batchData.totalAdditiveWeightOunces
            );
            console.log(
              "totoalDyeWeightOunces: ",
              l.batchData.totalDyeWeightOunces
            );

            l.batchData.wax.forEach((w) => {
              updateLayerCostsFromResource(
                candleResult,
                l,
                w,
                layerToBatchPercentage
              );
              w.layerWeightOunces =
                Math.round(100 * w.weightOunces * layerToBatchPercentage) / 100;
            });
            l.batchData.fragranceOil.forEach((fo) => {
              updateLayerCostsFromResource(
                candleResult,
                l,
                fo,
                layerToBatchPercentage
              );
              fo.layerWeightOunces =
                Math.round(100 * fo.weightOunces * layerToBatchPercentage) /
                100;
            });
            l.batchData.additives.forEach((a) => {
              updateLayerCostsFromResource(
                candleResult,
                l,
                a,
                layerToBatchPercentage
              );
              a.layerWeightOunces =
                Math.round(100 * a.weightOunces * layerToBatchPercentage) / 100;
            });
            l.batchData.dyes.forEach((db) => {
              updateLayerCostsFromResource(
                candleResult,
                l,
                db,
                layerToBatchPercentage
              );
              db.layerWeightOunces =
                Math.round(100 * db.weightOunces * layerToBatchPercentage) / 100;
            });

            l.calculatedCosts = {
              productCost: l.calculatedFloatCosts.productCost.toFixed(2),
              shippingCost: l.calculatedFloatCosts.shippingCost.toFixed(2),
              taxesAndFees: l.calculatedFloatCosts.taxesAndFees.toFixed(2),
              totalCost: l.calculatedFloatCosts.totalCost.toFixed(2),
            };

            // add the batchItems to the candle's calculated cost and mutate the original value
            candleResult.calculatedCosts.productCost = (
              parseFloat(candleResult.calculatedCosts.productCost) +
              l.calculatedFloatCosts.productCost
            ).toFixed(2);
            candleResult.calculatedCosts.shippingCost = (
              parseFloat(candleResult.calculatedCosts.shippingCost) +
              l.calculatedFloatCosts.shippingCost
            ).toFixed(2);
            candleResult.calculatedCosts.taxesAndFees = (
              parseFloat(candleResult.calculatedCosts.taxesAndFees) +
              l.calculatedFloatCosts.taxesAndFees
            ).toFixed(2);
            candleResult.calculatedCosts.totalCost = (
              parseFloat(candleResult.calculatedCosts.totalCost) +
              l.calculatedFloatCosts.totalCost
            ).toFixed(2);

            // now delete the unneeded key
            delete l.calculatedFloatCosts;
          });

          console.log("DONE AND RETURNING");
          candleResult.layers = layerData;
          // convert the calculated pour weight (sum of all layers) to a cleaner 2 decimal string
          if (candleResult.pourWeightOunces) {
            candleResult.pourWeightOunces = candleResult.pourWeightOunces.toFixed(
              2
            );
          }
          return res.status(200).send(candleResult);
        });
      });
    }
  );
};

const updateLayerCostsFromResource = (
  candleData,
  layerData,
  resourceData,
  layerToBatchPercentage
) => {
  console.log("LAYER TO BATCH %: ", layerToBatchPercentage);
  const resourceCalculatedFloatCosts = {
    productCost:
      layerToBatchPercentage *
      parseFloat(resourceData.calculatedCosts.productCost),
    taxesAndFees:
      layerToBatchPercentage *
      parseFloat(resourceData.calculatedCosts.taxesAndFees),
    shippingCost:
      layerToBatchPercentage *
      parseFloat(resourceData.calculatedCosts.shippingCost),
    totalCost:
      layerToBatchPercentage *
      parseFloat(resourceData.calculatedCosts.totalCost),
  };

  const layerCosts = {};

  Object.keys(resourceCalculatedFloatCosts).forEach((k) => {
    layerCosts[k] = resourceCalculatedFloatCosts[k].toFixed(2);
  });

  resourceData.layerCosts = layerCosts;

  if (!layerData.calculatedFloatCosts) {
    layerData.calculatedFloatCosts = resourceCalculatedFloatCosts;
  } else {
    layerData.calculatedFloatCosts = {
      productCost:
        layerData.calculatedFloatCosts.productCost +
        resourceCalculatedFloatCosts.productCost,
      shippingCost:
        layerData.calculatedFloatCosts.shippingCost +
        resourceCalculatedFloatCosts.shippingCost,
      taxesAndFees:
        layerData.calculatedFloatCosts.taxesAndFees +
        resourceCalculatedFloatCosts.taxesAndFees,
      totalCost:
        layerData.calculatedFloatCosts.totalCost +
        resourceCalculatedFloatCosts.totalCost,
    };
  }

  layerData.layerToBatchPercentage =
    Math.round(10000 * layerToBatchPercentage) / 100; // 2 decimal places on the percentage

  console.log(
    "CALCULATED FLOAT COSTS: ",
    layerToBatchPercentage,
    resourceData.calculatedCosts,
    resourceCalculatedFloatCosts
  );
};
