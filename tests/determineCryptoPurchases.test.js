import { determineCryptoCoinPurchases } from "../determineCryptoPurchases";

import { coinBaseAPI } from "../apis/coinbase-api/coinBaseAPI";

describe("index.js", () => {
  test("exchange rate is equal to 1 dollar", async () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "1", ETH: "1" } },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);
    const coinPurchases = await determineCryptoCoinPurchases(100);
    expect(coinPurchases).toStrictEqual({ BTC: "70", ETH: "30" });
  });

  test("different exchange rates", async () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "0.5", ETH: "1" } },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    const result = await determineCryptoCoinPurchases(100);
    expect(result).toStrictEqual({ BTC: "35", ETH: "30" });
  });

  test("exchange rates have really long decimals", async () => {
    const testExchangeRates = {
      data: {
        currency: "USD",
        rates: { BTC: "0.232983223009095", ETH: "0.3769939999893897" },
      },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    const result = await determineCryptoCoinPurchases(100);
    expect(result).toStrictEqual({
      BTC: "16.30882561063665",
      ETH: "11.309819999681691",
    });
  });

  test("dollar amount has decimal", async () => {
    const testExchangeRates = {
      data: {
        currency: "USD",
        rates: { BTC: "0.232983223009095", ETH: "0.3769939999893897" },
      },
    };
    coinBaseAPI.getExchangeRatesForCurrency = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    const result = await determineCryptoCoinPurchases(304.31);
    expect(result).toStrictEqual({
      BTC: "49.629387215728389615",
      ETH: "34.4169132410313538821",
    });
  });
});
