import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import { notify } from "@/lib/notifications";

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

// Interceptor untuk menangani status 401 Unauthorized (misal token expired / invalid)
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      const hadToken = Boolean(useAuthStore.getState().token);

      useAuthStore.getState().logout();

      // Munculkan notifikasi Mantine jika pengguna sebelumnya memiliki sesi dan tokennya habis
      if (!isLoginRequest && hadToken) {
        notify.warning("Sesi Berakhir", {
          description: "Token kedaluwarsa atau tidak valid. Silakan login kembali.",
        });
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
