module.exports = function findUniqueInteger(testInt, collisionSet = []) {
  if (collisionSet.find((cId) => cId === testInt)) {
    console.log("COLLISION FOUND");
    testInt += 1;
    findUniqueInteger(testInt, collisionSet);
  }
  return testInt;
};
