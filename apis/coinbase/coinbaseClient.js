import { coinbaseConfig } from "./coinbaseConfig.js";

export const coinbaseClient = {
  getExchangeRates: async (currency) => {
    const response = await coinbaseConfig
      .request({
        url: `/exchange-rates?currency=${currency}`,
      })
      .catch((e) => {
        throw new Error(e);
      });
    return response.data;
  },
};
