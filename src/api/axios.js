import axios from "axios";

const axiosConn = axios.create({
  baseURL: `https://localhost:8081`,
});

export default axiosConn;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(
  function (config) {
    console.log("Interceptor Request (Outgoing) ", config);

    config.headers.API_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNzI3NzE5LCJleHAiOjE2NDE3Mjg2MTl9.Ouade6TiSzLQRy4GVI65z62TtE-OlxErXWe_283zQ0M";

    if (sessionStorage.getItem("jwt_token")) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "jwt_token"
      )}`;
    }
    return config;
  },
  function (error) {
    // Request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosConn.interceptors.response.use(
  function (response) {
    // Response data
    console.log("Interceptor Response (Incoming) ", response);

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
