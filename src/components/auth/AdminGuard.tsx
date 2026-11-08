"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Loader } from "@mantine/core";
import { useAuthStore } from "@/store/auth-store";

// Interface untuk properti pembungkus proteksi rute admin
interface AdminGuardProps {
  children: React.ReactNode; // Halaman/komponen yang hanya boleh dilihat oleh admin
}

/**
 * Komponen AdminGuard
 * Berfungsi sebagai gerbang pengaman otorisasi (Route Guard / RBAC) di sisi klien.
 * Mencegah pengguna umum / pengunjung non-admin mengakses halaman sensitif
 * (seperti `/train-test` dan `/batch`), serta otomatis mengarahkannya (redirect) kembali ke `/home`.
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();                                       // Router Next.js untuk proses redirect
  const { user, isHydrated, isValidating, token } = useAuthStore(); // Membaca status auth dari Zustand

  // Menentukan status admin yang sudah tervalidasi secara utuh
  const isAdmin = isHydrated && !isValidating && user?.role === "admin";

  useEffect(() => {
    // Jalankan pemeriksaan rute hanya jika store selesai dihidrasi dan tidak sedang proses validasi token
    if (isHydrated && !isValidating && (!token || user?.role !== "admin")) {
      // Jika pengguna bukan admin atau tidak memiliki token, lempar ke halaman beranda
      router.replace("/home");
    }
  }, [isHydrated, isValidating, token, user, router]);

  // Skenario Loading / Blokir Sementara:
  // Selama store belum terhidrasi, atau token masih diverifikasi di backend, atau user belum lolos verifikasi admin,
  // tampilkan indikator putar (Loader) di tengah layar agar isi halaman admin tidak bocor (flash of unauthenticated content).
  if (!isHydrated || isValidating || !isAdmin) {
    return (
      <Center style={{ minHeight: "60vh", flex: 1 }}>
        <Loader color="brandPrimary" size="md" />
      </Center>
    );
  }

  // Jika otorisasi admin sudah terverifikasi valid, render konten halaman
  return <>{children}</>;
}

export default AdminGuard;
