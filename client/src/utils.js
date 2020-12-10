export function currentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function currentDateTime() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const MM = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const yyyy = today.getFullYear();
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");
  const ss = String(today.getSeconds()).padStart(2, "0");

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}

export function formatMoment(m) {
  return m.format("yyyy-MM-ddThh:mm:ss");
}

export function calculateFragranceLoadByPopularMethod({
  fragranceWeightOunces = 0,
  additiveWeightOunces = 0,
  waxWeightOunces = 0,
}) {
  return (
    (fragranceWeightOunces / (waxWeightOunces + additiveWeightOunces)) *
    100
  ).toFixed(2);
}

// this method isn't used by a lot of candle makers for whatever reason
// keeping it around in case I want to revert
export function calculateFragranceLoad({
  fragranceWeightOunces = 0,
  waxWeightOunces = 0,
  additiveWeightOunces = 0,
}) {
  return (
    (fragranceWeightOunces /
      (waxWeightOunces + fragranceWeightOunces + additiveWeightOunces)) *
    100
  ).toFixed(2);
}

// looks at combineId for each batchItem, and combines the data so that returned item
// amounts are cumulative and appear like one item
export function processAllBatchData(batchData) {
  batchData.wax = processBatchItemsByCombineId(batchData.wax, "wax");
  batchData.additives = processBatchItemsByCombineId(
    batchData.additives,
    "additives"
  );
  batchData.fragranceOil = processBatchItemsByCombineId(
    batchData.fragranceOil,
    "fragranceOil"
  );
  batchData.dyes = processBatchItemsByCombineId(batchData.dyes, "dye");
  return batchData;
}

export function processBatchItemsByCombineId(batchItemArray, type) {
  let batchAmountKey = "weightOunces";
  let layerAmountKey = "layerWeightOunces";

  batchItemArray.sort((a, b) => {
    const diff = a.combineId - b.combineId;
    if (diff === 0) {
      // secondarily sort by weight descending
      return b[batchAmountKey] - a[batchAmountKey];
    }
    // primarily sort by combineId
    return diff;
  });

  const groupedItems = batchItemArray.reduce((acc, val, i, arr) => {
    if (i === 0 || !val.combineId || val.combineId !== arr[i - 1].combineId) {
      acc.push([val]);
      return acc;
    }
    // pair up items with the same combineId in the accumulator array
    acc[acc.length - 1].push(val);
    return acc;
  }, []);

  return groupedItems.map((gi) => {
    if (gi.length === 1) {
      // unwrap solo items and return as is
      return gi[0];
    }
    return gi.reduce(
      (acc, val, i) => {
        // add all the values on first grouped item to the returned combined item
        Object.keys(val).forEach((k) => {
          if (!acc[k]) {
            acc[k] = val[k];
          }
        });

        if (i === 0) {
          // reset the amount value if this is the first item
          // we'll add up the amounts of subitems as we loop
          acc[batchAmountKey] = 0;

          acc.calculatedCosts = {
            productCost: "0",
            taxesAndFees: "0",
            shippingCost: "0",
            totalCost: "0",
          };
        }

        acc[batchAmountKey] += val[batchAmountKey];
        acc.calculatedCosts.productCost = (
          parseFloat(acc.calculatedCosts.productCost) +
          parseFloat(val.calculatedCosts.productCost)
        ).toFixed(2);
        acc.calculatedCosts.taxesAndFees = (
          parseFloat(acc.calculatedCosts.taxesAndFees) +
          parseFloat(val.calculatedCosts.taxesAndFees)
        ).toFixed(2);
        acc.calculatedCosts.shippingCost = (
          parseFloat(acc.calculatedCosts.shippingCost) +
          parseFloat(val.calculatedCosts.shippingCost)
        ).toFixed(2);
        acc.calculatedCosts.totalCost = (
          parseFloat(acc.calculatedCosts.totalCost) +
          parseFloat(val.calculatedCosts.totalCost)
        ).toFixed(2);

        // the data may or may not contain layerCosts
        // depends on if its a candle-endpoint or a batch-endpoint
        if (!val.layerCosts) {
          // add the unprocessed sub-item to the subItems array
          acc.subItems.push(val);

          return acc;
        }

        if (i === 0) {
          // reset the layer amount if this is the first item
          // we'll add up the layerAmounts of subitems as we loop
          acc[layerAmountKey] = 0;

          acc.layerCosts = {
            productCost: "0",
            taxesAndFees: "0",
            shippingCost: "0",
            totalCost: "0",
          };
        }

        acc[layerAmountKey] += val[layerAmountKey];

        acc.layerCosts.productCost = (
          parseFloat(acc.layerCosts.productCost) +
          parseFloat(val.layerCosts.productCost)
        ).toFixed(2);
        acc.layerCosts.taxesAndFees = (
          parseFloat(acc.layerCosts.taxesAndFees) +
          parseFloat(val.layerCosts.taxesAndFees)
        ).toFixed(2);
        acc.layerCosts.shippingCost = (
          parseFloat(acc.layerCosts.shippingCost) +
          parseFloat(val.layerCosts.shippingCost)
        ).toFixed(2);
        acc.layerCosts.totalCost = (
          parseFloat(acc.layerCosts.totalCost) +
          parseFloat(val.layerCosts.totalCost)
        ).toFixed(2);

        // also add the unprocessed sub-item to the subItems array
        acc.subItems.push(val);

        return acc;
      },
      {
        subItems: [],
      }
    );
  });
}

// used to find a unique combineId given imported data
export function findUniqueInteger(testInt, collisionSet = []) {
  if (collisionSet.find((cId) => cId === testInt)) {
    testInt += 1;
    return findUniqueInteger(testInt, collisionSet);
  }
  return testInt;
}

export default function handleApiError(err, enqueueSnackFunction) {
  const data = err.response && err.response.data;
  if (data && data.reasons) {
    data.reasons.forEach((r) =>
      enqueueSnackFunction(r.message, { variant: "error" })
    );
    return;
  }
  if (data && data.message) {
    enqueueSnackFunction(data.message, { variant: "error" });
    return;
  }
  enqueueSnackFunction("Failed to communicate with server", {
    variant: "error",
  });
}
