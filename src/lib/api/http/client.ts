import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import { notify } from "@/lib/notifications";

/**
 * URL dasar (Base URL) backend FastAPI.
 * Mengambil dari file konfigurasi environment (.env / NEXT_PUBLIC_API_BASE_URL).
 * Jika tidak didefinisikan, default mengarah ke server lokal 'http://localhost:8000/api/v1'.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Instance Axios global (Singleton HTTP Client) untuk seluruh komunikasi API aplikasi.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  // Timeout 180.000 ms (3 menit) agar request komputasi berat (seperti benchmark batch) tidak terputus di tengah jalan
  timeout: 180_000,
});

/**
 * 1. REQUEST INTERCEPTOR:
 * Dijalankan secara otomatis tepat SEBELUM setiap request HTTP dikirimkan ke backend.
 * Berfungsi untuk membaca token JWT dari Zustand Auth Store dan menempelkannya ke Header HTTP.
 */
httpClient.interceptors.request.use(
  (config) => {
    // Membaca state token secara langsung tanpa hook React (getState() di luar siklus render komponen)
    const token = useAuthStore.getState().token;

    // Jika pengguna sedang login (token ada), sisipkan header Authorization Bearer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // Jika terjadi kesalahan saat persiapan request, teruskan error sebagai rejected Promise
  (error) => Promise.reject(error)
);

/**
 * 2. RESPONSE INTERCEPTOR:
 * Dijalankan secara otomatis tepat SETELAH backend memberikan respons HTTP kembali ke frontend.
 * Berfungsi sebagai penanganan global untuk respon sukses dan penanganan error 401 (Unauthorized / Token Kedaluwarsa).
 */
httpClient.interceptors.response.use(
  // Jika respons berhasil (status kode 2xx), langsung kembalikan data respons apa adanya
  (response) => response,

  // Jika respons menghasilkan error (status kode 4xx atau 5xx)
  (error) => {
    // Periksa apakah server menolak akses dengan status 401 Unauthorized (token habis / tidak valid)
    if (error.response?.status === 401) {
      // Cek apakah error 401 ini berasal dari percobaan login gagal biasa
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      // Cek apakah sebelumnya pengguna memang memiliki token yang aktif
      const hadToken = Boolean(useAuthStore.getState().token);

      // Bersihkan sesi dan kembalikan state autentikasi ke kondisi guest (logout)
      useAuthStore.getState().logout();

      // Jika bukan saat mencoba login dan sebelumnya user punya token (artinya token kedaluwarsa di tengah jalan):
      // Munculkan notifikasi pop-up peringatan kepada pengguna
      if (!isLoginRequest && hadToken) {
        notify.warning("Sesi Berakhir", {
          description: "Token kedaluwarsa atau tidak valid. Silakan login kembali.",
        });
      }
    }

    // Teruskan error ke pemanggil fungsi (catch block pada use case / service) agar UI tahu request gagal
    return Promise.reject(error);
  }
);

export default httpClient;
