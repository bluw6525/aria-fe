"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Tipe data profil pengguna yang login.
 */
export interface UserProfile {
  id: number;
  username: string;
  role: "admin" | "user" | string;
  is_active: boolean;
  created_at?: string;
}

/**
 * Kontrak struktur state dan fungsi aksi (actions) pada Auth Store.
 */
interface AuthState {
  // Data inti autentikasi
  token: string | null;
  user: UserProfile | null;

  // Status sinkronisasi (SSR Next.js vs Client localStorage)
  isHydrated: boolean;
  isValidating: boolean;

  // Aksi-aksi untuk memanipulasi state
  setAuth: (token: string, user: UserProfile) => void;
  updateUser: (user: UserProfile) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
  setValidating: (isValidating: boolean) => void;
}

/**
 * Global Auth Store menggunakan Zustand dengan persistensi localStorage.
 * Berfungsi sebagai sumber kebenaran tunggal (Single Source of Truth) untuk status login pengguna.
 */
export const useAuthStore = create<AuthState>()(
  // persist middleware untuk menyimpan state ke localStorage agar tetap ada saat refresh halaman
  persist(
    (set) => ({
      // State awal (default kosong / belum login)
      token: null,
      user: null,
      isHydrated: false,
      isValidating: false,

      // Aksi saat login berhasil: simpan token dan data user
      setAuth: (token, user) => set({ token, user, isValidating: false }),

      // Aksi untuk memperbarui info profil user tanpa mengubah token
      updateUser: (user) => set({ user }),

      // Aksi logout: bersihkan token dan data user dari state & localStorage
      logout: () => set({ token: null, user: null, isValidating: false }),

      // Aksi penanda bahwa data dari localStorage telah berhasil dimuat ke memory React
      setHydrated: (isHydrated) => set({ isHydrated }),

      // Aksi penanda status pengecekan keabsahan token ke backend
      setValidating: (isValidating) => set({ isValidating }),
    }),
    {
      // Nama kunci (key) penyimpanan di browser localStorage
      name: "aria_auth_session",

      // Konfigurasi penyimpanan yang aman untuk Next.js (SSR-safe).
      // Mencegah error 'localStorage is not defined' saat kode dieksekusi di server Node.js.
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),

      // Whitelist data yang disimpan permanen ke localStorage (hanya token dan user).
      // isHydrated & isValidating tidak disimpan permanen agar selalu reset saat halaman baru dibuka.
      partialize: (state) => ({ token: state.token, user: state.user }),

      // Callback otomatis saat Zustand selesai membaca data dari localStorage ke aplikasi
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
