import { coinbaseClient } from "./apis/coinbase/coinBaseClient.js";
import Big from "big.js";

export const determineCryptoPurchases = async (dollars) => {
  // purchasePercentages are hardcoded because my interpretation of the prompt
  // was that this function should _only_ take dollars as a param. It would be
  // easy to move purchasePercentages to a param and make this function more flexible
  const purchasePercentages = { BTC: 70, ETH: 30 };
  const exchangeRates = await coinbaseClient.getExchangeRates("USD");

  const coinPurchaseAmounts = {};
  for (const [coin, percent] of Object.entries(purchasePercentages)) {
    const decimalDollars = Big(dollars);
    const decimalPercent = Big(percent).div(100);

    const coinPurchaseDollars = decimalDollars.times(decimalPercent);

    const coinExchangeRate = exchangeRates.data.rates[coin];

    coinPurchaseAmounts[coin] = coinPurchaseDollars
      .times(coinExchangeRate)
      .toString();
  }
  return coinPurchaseAmounts;
};
