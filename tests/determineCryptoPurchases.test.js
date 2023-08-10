import { coinbaseClient } from "../apis/coinbase/coinBaseClient";
import { determineCryptoPurchases } from "../determineCryptoPurchases";



describe("index.js", () => {
  test("exchange rate is equal to 1 dollar", async () => {
    // Arrange
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "1", ETH: "1" } },
    };
    coinbaseClient.getExchangeRates = jest
      .fn()
      .mockReturnValue(testExchangeRates);
    
    // Act
    const coinPurchases = await determineCryptoPurchases(100);
    
    // Assert
    expect(coinPurchases).toStrictEqual({ BTC: "70", ETH: "30" });
  });

  test("different exchange rates", async () => {
    // Arrange
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "0.5", ETH: "1" } },
    };
    coinbaseClient.getExchangeRates = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    // Act
    const result = await determineCryptoPurchases(100);

    // Assert
    expect(result).toStrictEqual({ BTC: "35", ETH: "30" });
  });

  test("coin exchange rate is low relative to USD", async () => {
    // Arrange
    const testExchangeRates = {
      data: { currency: "USD", rates: { BTC: "200", ETH: "50" } },
    };
    coinbaseClient.getExchangeRates = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    // Act
    const result = await determineCryptoPurchases(100);

    // Assert
    expect(result).toStrictEqual({ BTC: "14000", ETH: "1500" });
  });

  test("exchange rates have really long decimals", async () => {
    // Arrange
    const testExchangeRates = {
      data: {
        currency: "USD",
        rates: { BTC: "0.232983223009095", ETH: "0.3769939999893897" },
      },
    };
    coinbaseClient.getExchangeRates = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    // Act
    const result = await determineCryptoPurchases(100);

    // Assert
    expect(result).toStrictEqual({
      BTC: "16.30882561063665",
      ETH: "11.309819999681691",
    });
  });

  test("dollar amount has decimal", async () => {
    // Arrange
    const testExchangeRates = {
      data: {
        currency: "USD",
        rates: { BTC: "0.232983223009095", ETH: "0.3769939999893897" },
      },
    };
    coinbaseClient.getExchangeRates = jest
      .fn()
      .mockReturnValue(testExchangeRates);

    // Act
    const result = await determineCryptoPurchases(304.31);

    // Assert
    expect(result).toStrictEqual({
      BTC: "49.629387215728389615",
      ETH: "34.4169132410313538821",
    });
  });
});
