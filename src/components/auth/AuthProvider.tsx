"use client";

import React, { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/lib/api/services/auth-service";

/**
 * Komponen AuthProvider
 * Berfungsi sebagai penyedia konteks autentikasi global di root layout.
 * Tugas utamanya adalah memvalidasi ulang keabsahan token JWT yang tersimpan di localStorage
 * ke endpoint backend `/auth/me` setiap kali aplikasi pertama kali dimuat atau di-refresh oleh pengguna.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mengambil state dan method autentikasi dari Zustand store
  const { token, isHydrated, updateUser, logout, setValidating } = useAuthStore();
  
  // Ref untuk memastikan verifikasi token hanya berjalan 1 kali per sesi load aplikasi
  const checkedRef = useRef(false);

  useEffect(() => {
    // 1. Tunggu sampai Zustand selesai membaca localStorage (isHydrated === true)
    // 2. Jika tidak ada token yang tersimpan atau sudah pernah dicek, hentikan eksekusi
    if (!isHydrated || !token || checkedRef.current) return;
    checkedRef.current = true;

    // Menandai state aplikasi sedang memvalidasi token sesi
    setValidating(true);

    // Memanggil API backend `/auth/me` menggunakan token yang ada di header Authorization
    authService
      .getMe()
      .then((user) => {
        // Jika token valid, perbarui profil user (username, role) dengan data terbaru dari database
        updateUser(user);
      })
      .catch(() => {
        // Jika token kedaluwarsa atau tidak valid (HTTP 401),
        // hapus sesi token dan kembalikan status pengguna menjadi belum login
        logout();
      })
      .finally(() => {
        // Selesai memvalidasi
        setValidating(false);
      });
  }, [isHydrated, token, updateUser, logout, setValidating]);

  // Merender seluruh komponen anak tanpa menambahkan elemen DOM pembungkus ekstra (<React.Fragment>)
  return <>{children}</>;
}

export default AuthProvider;
