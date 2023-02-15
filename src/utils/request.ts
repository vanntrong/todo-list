import { API_URL } from "@/constants";
import axios from "axios";
import { getCookie } from "./cookie";

const request = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default request;
