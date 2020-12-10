const api = {
  newCandlesUrl: "http://localhost:5000/candles",
  resourceTypesUrl: "http://localhost:5000/resource-types",
  waxToFillUrl: "http://localhost:5000/candles/wax-to-fill",
  newBatchUrl: "http://localhost:5000/batches",
  newBlendUrl: "http://localhost:5000/blend",
  getCandleUrl: (candleHashId) =>
    `http://localhost:5000/candles/${candleHashId}`,
  getBlendUrl: (blendId) => `http://localhost:5000/blend/${blendId}`,
  getUpdateCandleUrl: (candleHashId) =>
    `http://localhost:5000/candles/${candleHashId}`,
  waxesUrl: "http://localhost:5000/waxes?availableOnly=true",
  additivesUrl: "http://localhost:5000/additives?availableOnly=true",
  fragranceOilsUrl: "http://localhost:5000/fragrance-oils",
  dyesUrl: "http://localhost:5000/dyes",
  blendsUrl: "http://localhost:5000/blends",
  candlesUrl: "http://localhost:5000/candles?incomplete=true",
};
export default api;
