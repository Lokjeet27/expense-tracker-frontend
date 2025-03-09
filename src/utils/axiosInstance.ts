import axios from "axios";
import store  from "../redux/store"; // Import store

const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-backend-1e0i.onrender.com/api",
});

// Automatically attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
