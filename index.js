export function validatePercentagesAddUpTo100(purchasePercentages) {
  const percentagesTotal = Object.values(purchasePercentages).reduce(
    (total, percentage) => total + percentage,
    0
  );
  if (percentagesTotal !== 100)
    throw new Error("specified percentages do not add up to 100");
}

export function determineCryptoCoinPurchases(
  dollars,
  purchasePercentages,
  exchangeRates
) {
  validatePercentagesAddUpTo100(purchasePercentages);

  const coinPurchaseAmounts = {};
  return coinPurchaseAmounts;
}