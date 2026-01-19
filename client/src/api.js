const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = {
  newCandlesUrl: `${API_URL}/candles`,
  resourceTypesUrl: `${API_URL}/resource-types`,
  waxToFillUrl: `${API_URL}/candles/wax-to-fill`,
  newBatchUrl: `${API_URL}/batches`,
  newBlendUrl: `${API_URL}/blend`,
  getCandleUrl: (candleHashId) =>
    `${API_URL}/candles/${candleHashId}`,
  getBlendUrl: (blendId) => `${API_URL}/blend/${blendId}`,
  getUpdateCandleUrl: (candleHashId) =>
    `${API_URL}/candles/${candleHashId}`,
  waxesUrl: `${API_URL}/waxes?availableOnly=true`,
  additivesUrl: `${API_URL}/additives?availableOnly=true`,
  fragranceOilsUrl: `${API_URL}/fragrance-oils`,
  dyesUrl: `${API_URL}/dyes`,
  blendsUrl: `${API_URL}/blends?availableOnly=true`,
  candlesUrl: `${API_URL}/candles`,
  // getCandleListUrl: (hashIds) =>
  // `${API_URL}/candle-list?candle=${hashIds.split(",")}`,
  // candleListUrl: `${API_URL}/candles`,
};
export default api;
