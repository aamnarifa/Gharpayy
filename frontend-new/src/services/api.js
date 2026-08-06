import axios from "axios";

// Centralized API Base URL configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://gharpayy-backend-gmk3.onrender.com/api";

// Centralized Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Auth Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("crm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Extract backend error messages cleanly
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Backend returned a response with status code outside 2xx
      errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server error (${error.response.status})`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = `Unable to connect to server. Please check your internet connection or backend at ${API_BASE_URL}`;
    } else {
      errorMessage = error.message;
    }

    const customError = new Error(errorMessage);
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

export default api;
