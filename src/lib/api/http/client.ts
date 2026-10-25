import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180_000,
});

// Interceptor untuk menyisipkan header Authorization Bearer token secara otomatis
httpClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani status 401 Unauthorized (misal token expired)
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
