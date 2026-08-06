import axios from "axios";

// Centralized Axios Instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
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
      errorMessage = "Unable to connect to server. Please check if the backend is running at http://localhost:5000";
    } else {
      errorMessage = error.message;
    }

    const customError = new Error(errorMessage);
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

export default api;
