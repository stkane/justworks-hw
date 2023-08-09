import {
  validatePercentagesAddUpTo100,
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
});
