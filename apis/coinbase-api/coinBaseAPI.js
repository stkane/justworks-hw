import { coinbaseClient } from "./coinbaseClient.js";

export const coinBaseAPI = {
  getExchangeRatesForCurrency: async (currency) => {
    const response = await coinbaseClient
      .request({
        url: `/exchange-rates?currency=${currency}`,
      })
      .catch((e) => {
        throw new Error(e);
      });
    return response.data;
  },
};
