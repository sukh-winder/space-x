import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

//can be used as a middleware to add [Authorization] header or logging and error handling
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("id_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     config.headers["Access-Key"] = process.env.API_ACCESS_KEY;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
    } else if (error.request) {
      console.error("Network error check your connection.");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
