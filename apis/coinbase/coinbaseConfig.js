import axios from "axios";

export const coinbaseConfig = axios.create({
  baseURL: `https://api.coinbase.com/v2/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

coinbaseConfig.interceptors.response.use(undefined, (error) => {
  return coinbaseClientError(error);
});

const coinbaseClientError = (error) => {
  const jsonError = error.toJSON();
  return Promise.reject(
    JSON.stringify({
      statusCode: jsonError.status,
      message: jsonError.message,
      details: error.response.data,
    })
  );
};
