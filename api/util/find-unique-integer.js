module.exports = function findUniqueInteger(testInt, collisionSet = []) {
  if (collisionSet.find((cId) => cId === testInt)) {
    testInt += 1;
    return findUniqueInteger(testInt, collisionSet);
  }
  return testInt;
};
