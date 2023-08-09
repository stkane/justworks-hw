import {
  validatePercentagesAddUpTo100,
  determineCryptoCoinPurchases,
} from "../index";

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

  test("determines dollar amounts", () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "1", ETH: "1" } },
    };
    expect(
      determineCryptoCoinPurchases(100, { BTC: 70, ETH: 30 }, testExchangeRates)
    ).toStrictEqual({ BTC: 70, ETH: 30 });
  });

  test("determines dollar amounts with different exchange rates", () => {
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "0.5", ETH: "1" } },
    };
    expect(
      determineCryptoCoinPurchases(100, { BTC: 20, ETH: 80 }, testExchangeRates)
    ).toStrictEqual({ BTC: 10, ETH: 80 });
  });
});
