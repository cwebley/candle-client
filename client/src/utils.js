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
  waxWeightOunces = 0
}) {
  return ((fragranceWeightOunces / waxWeightOunces) * 100).toFixed(2);
}

// this method isn't used by a lot of candle makers for whatever reason
// keeping it around in case I want to revert
export function calculateFragranceLoad({
  fragranceWeightOunces = 0,
  waxWeightOunces = 0,
  additiveWeightOunces = 0
}) {
  return (
    (fragranceWeightOunces /
      (waxWeightOunces + fragranceWeightOunces + additiveWeightOunces)) *
    100
  ).toFixed(2);
}

export function processAllBatchData(batchData) {
  batchData.wax = processBatchItemsByCombineId(batchData.wax, "wax");
  batchData.additives = processBatchItemsByCombineId(batchData.additives, 'additives');
  batchData.fragranceOil = processBatchItemsByCombineId(batchData.fragranceOil, 'fragranceOil');
  batchData.dyeBlocks = processBatchItemsByCombineId(batchData.dyeBlocks, 'dyeBlocks');
  return batchData;
}

export function processBatchItemsByCombineId(batchItemArray, type) {
  let amountKey;
  switch (type) {
    case "dyeBlocks":
      amountKey = "pieces";
      break;
    default:
      amountKey = "weightOunces";
  }

  batchItemArray.sort((a, b) => {
    const diff = a.combineId - b.combineId;
    if (diff === 0) {
      // secondarily sort by weight descending
      return b[amountKey] - a[amountKey];
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

  return groupedItems.map(gi => {
    if (gi.length === 1) {
      // unwrap solo items and return as is
      return gi[0];
    }
    return gi.reduce(
      (acc, val) => {
        if (!acc.name) {
          acc.name = val.name;
        }
        if (!acc.slug) {
          acc.slug = val.slug;
        }
        if (!acc.hashId) {
          acc.hashId = val.hashId;
        }
        if (!acc.source) {
          acc.source = val.source;
        }

        acc[amountKey] += val[amountKey];
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

        acc.subItems.push(val);

        return acc;
      },
      {
        [amountKey]: 0,
        subItems: [],

        // TODO these really shouldn't be strings but that's how they are in the API atm
        calculatedCosts: {
          productCost: "0",
          taxesAndFees: "0",
          shippingCost: "0",
          totalCost: "0"
        }
      }
    );
  });
}

export default function handleApiError(err, enqueueSnackFunction) {
  const data = err.response && err.response.data;
  if (data && data.reasons) {
    data.reasons.forEach(r =>
      enqueueSnackFunction(r.message, { variant: "error" })
    );
    return;
  }
  if (data && data.message) {
    enqueueSnackFunction(data.message, { variant: "error" });
    return;
  }
  enqueueSnackFunction("Failed to communicate with server", {
    variant: "error"
  });
}
