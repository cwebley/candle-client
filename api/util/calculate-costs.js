module.exports = function calculateCosts({
  amountUsed,
  packageAmount,
  resourceCost,
  shareOfShippingPercent,
  orderSubtotal,
  orderTaxesAndFees,
  orderShippingCost
}) {
  if (!amountUsed) {
    return {
      productCost: 0,
      taxesAndFees: 0,
      shippingCost: 0,
      totalCost: 0
    };
  }
  const fractionUsed = amountUsed / packageAmount;
  const productCost = fractionUsed * resourceCost;
  const costPercentOfSubtotal = productCost / orderSubtotal || 0;

  const taxesAndFees = costPercentOfSubtotal * orderTaxesAndFees;
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
