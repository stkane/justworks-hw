import { coinBaseAPI } from "./apis/coinbase-api/coinBaseAPI.js";

export function validatePercentagesAddUpTo100(purchasePercentages) {
  const percentagesTotal = Object.values(purchasePercentages).reduce(
    (total, percentage) => total + percentage,
    0
  );
  if (percentagesTotal !== 100)
    throw new Error("specified percentages do not add up to 100");
}

// validate coinSyms exist in response, validate they have valid exchange rates

export async function determineCryptoCoinPurchases(
  dollars,
  purchasePercentages,
  currencyType
) {
  validatePercentagesAddUpTo100(purchasePercentages);
  const exchangeRates = await coinBaseAPI.getExchangeRatesForCurrency(
    currencyType
  );

  const coinPurchaseAmounts = {};
  for (const [coin, percent] of Object.entries(purchasePercentages)) {
    const coinPurchaseDollars = dollars * (percent / 100);
    const coinsPerDollarRate = parseFloat(exchangeRates.data.rates[coin]);
    coinPurchaseAmounts[coin] = coinsPerDollarRate * coinPurchaseDollars;
  }
  return coinPurchaseAmounts;
}
