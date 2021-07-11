// this seems to be the popular method by candle makers for fragrance load
// the alternative is fragranceWeightOunces / (fragranceWeightOunces + additiveWeightOunces + waxWeightOunces)
module.exports = function calculateFragranceLoad({
  fragranceWeightOunces = 0,
  additiveWeightOunces = 0,
  waxWeightOunces = 0,
}) {
  let fl = fragranceWeightOunces / (waxWeightOunces + additiveWeightOunces);
  if (fl > 1) {
    fl = 1;
  }
  if (fl < 0) {
    fl = 0;
  }
  return fl;
};
