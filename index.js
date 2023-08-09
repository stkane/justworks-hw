import { exchangeRates } from "./response.js";

export function validatePercentagesAddUpTo100(purchasePercentages) {
  const percentagesTotal = Object.values(purchasePercentages).reduce(
    (total, percentage) => total + percentage,
    0
  );
  if (percentagesTotal !== 100)
    throw new Error("specified percentages do not add up to 100");
}

// validate coinSyms exist in response, validate they have valid exchange rates

export function determineCryptoCoinPurchases(
  dollars,
  purchasePercentages,
  exchangeRates
) {
  validatePercentagesAddUpTo100(purchasePercentages);

  const coinPurchaseAmounts = {};
  for (const [coinSym, purchasePercentage] of Object.entries(
    purchasePercentages
  )) {
    const coinPurchaseDollars = dollars * (purchasePercentage / 100);
    const coinsPerDollarRate = parseFloat(exchangeRates.data.rates[coinSym]);
    coinPurchaseAmounts[coinSym] = coinsPerDollarRate * coinPurchaseDollars;
  }
  return coinPurchaseAmounts;
}

// console.log(determineCryptoCoinPurchases(100, {BTC: 70, ETH: 30}, exchangeRates))
