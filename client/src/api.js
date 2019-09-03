const api = {
  newCandlesUrl: "http://localhost:5000/candles",
  resourceTypesUrl: "http://localhost:5000/resource-types",
  waxToFillUrl: "http://localhost:5000/candles/wax-to-fill",
  newBatchUrl: "http://localhost:5000/batches",
  getCandleUrl: candleHashId => `http://localhost:5000/candles/${candleHashId}`,
  getUpdateCandleUrl: candleHashId =>
    `http://localhost:5000/candles/${candleHashId}`
};
export default api;
