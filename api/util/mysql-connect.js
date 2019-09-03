const mysqlConnect = function(options) {
  const calculatedCosts = {};
  const fractionUsed = amountUsed / packageAmount;
  const productCost = fractionUsed * resourceCost;

  const taxesAndFees = (productCost / orderSubtotal) * orderTaxesAndFees;
  const shippingCost =
    fractionUsed * (shareOfShippingPercent / 100) * orderShippingCost;
  const totalCost = productCost + taxesAndFees + shippingCost;

  return {
    productCost: productCost.toFixed(2),
    taxesAndFees: taxesAndFees.toFixed(2),
    shippingCost: shippingCost.toFixed(2),
    totalCost: totalCost.toFixed(2)
  };
};
