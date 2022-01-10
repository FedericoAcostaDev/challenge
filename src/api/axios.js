import axios from "axios";

const axiosConn = axios.create({
  baseURL: `https://localhost:8081/api/members`,
});

export default axiosConn;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(
  function (config) {
    console.log("Interceptor Request (Outgoing) ", config);

    config.headers.Authorization =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNzY4OTY0LCJleHAiOjE2NDE3Njk4NjR9.F1QCPARqAqqYf8u7lKiltj0_G8w9ZFHy0mox9LIY9rU";

    if (sessionStorage.getItem("jwt_token")) {
      config.headers.Authorization = `bearer ${sessionStorage.getItem(
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
