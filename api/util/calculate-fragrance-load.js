// this seems to be the popular method by candle makers for fragrance load
// the alternative is fragranceWeightOunces / (fragranceWeightOunces + additiveWeightOunces + waxWeightOunces)
module.exports = function calculateFragranceLoad({
  fragranceWeightOunces = 0,
  waxWeightOunces = 0
}) {
  return fragranceWeightOunces / waxWeightOunces;
};
