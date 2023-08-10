import axios from "axios";

// change to client
export const coinbaseClient = axios.create({
  baseURL: `https://api.coinbase.com/v2/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

coinbaseClient.interceptors.response.use(undefined, (error) => {
  return coinbaseClientError(error);
});

// defining a custom error handler for all APIs
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
