import {
  validatePercentagesAddUpTo100,
  determineCryptoCoinPurchases,
} from "../index";

import { coinBaseAPI } from "../apis/coinbase-api/coinBaseAPI";

describe("index.js", () => {
  test("validate percentages add up to 100", () => {
    expect(() =>
      validatePercentagesAddUpTo100({ BTC: 70, ETH: 30 })
    ).not.toThrowError();
  });

  test("validate percentages add up to less than 100", () => {
    expect(() =>
      validatePercentagesAddUpTo100({ BTC: 70, ETH: 29 })
    ).toThrowError();
  });

  test("validate percentages add up to more than 100", () => {
    expect(() =>
      validatePercentagesAddUpTo100({ BTC: 70, ETH: 31 })
    ).toThrowError();
  });

  test("exchange rate is equal to 1 dollar", async () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "1", ETH: "1" } },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);
    const coinPurchases = await determineCryptoCoinPurchases(
      100,
      { BTC: 70, ETH: 30 },
      "USD"
    );
    expect(coinPurchases).toStrictEqual({ BTC: 70, ETH: 30 });
  });

  test("different exchange rates", async () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "0.5", ETH: "1" } },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    const result = await determineCryptoCoinPurchases(
      100,
      { BTC: 20, ETH: 80 },
      testExchangeRates
    );
    expect(result).toStrictEqual({ BTC: 10, ETH: 80 });
  });

  test("exchange rates have many decimal places", async () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "0.232983223009095", ETH: "0.3769939999893897" } },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    const result = await determineCryptoCoinPurchases(
      100,
      { BTC: 20, ETH: 80 },
      testExchangeRates
    );
    expect(result).toStrictEqual({ BTC: 4.65966446018, ETH: 30.1595199992 });
  });
});
// test more kinds of coins
