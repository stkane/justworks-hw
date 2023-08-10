import { coinBaseAPI } from "./apis/coinbase-api/coinBaseAPI.js";
import Big from "big.js";

export const determineCryptoPurchases = async function (dollars) {
  const purchasePercentages = { BTC: 70, ETH: 30 };
  const exchangeRates = await coinBaseAPI.getExchangeRatesForCurrency("USD");

  const coinPurchaseAmounts = {};
  for (const [coin, percent] of Object.entries(purchasePercentages)) {
    const decimalDollars = Big(dollars);
    const decimalPercent = Big(percent).div(100);

    const coinPurchaseDollars = decimalDollars.times(decimalPercent);

    const coinsPerDollarRate = exchangeRates.data.rates[coin];

    coinPurchaseAmounts[coin] = coinPurchaseDollars
      .times(coinsPerDollarRate)
      .toString();
  }
  return coinPurchaseAmounts;
};
