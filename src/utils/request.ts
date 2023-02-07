import { API_URL } from "@/constants";
import axios from "axios";
import { getCookie } from "./cookie";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// axiosInstance.interceptors.response.use()

export default axiosInstance;
