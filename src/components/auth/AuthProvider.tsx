"use client";

import React, { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/lib/api/services/auth-service";

/**
 * Komponen penyedia autentikasi yang memverifikasi keabsahan token JWT
 * ke endpoint backend (/auth/me) saat aplikasi pertama kali dimuat atau setelah halaman di-refresh.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, isHydrated, updateUser, logout, setValidating } = useAuthStore();
  const checkedRef = useRef(false);

  useEffect(() => {
    // Jalankan verifikasi hanya ketika store selesai dihidrasi dan token ada
    if (!isHydrated || !token || checkedRef.current) return;
    checkedRef.current = true;

    setValidating(true);
    authService
      .getMe()
      .then((user) => {
        updateUser(user);
      })
      .catch(() => {
        // Jika token tidak valid / kedaluwarsa (HTTP 401),
        // interceptor httpClient otomatis memanggil logout() dan menampilkan notifikasi
        logout();
      })
      .finally(() => {
        setValidating(false);
      });
  }, [isHydrated, token, updateUser, logout, setValidating]);

  return <>{children}</>;
}

export default AuthProvider;

