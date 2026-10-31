"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Loader } from "@mantine/core";
import { useAuthStore } from "@/store/auth-store";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, isHydrated, isValidating, token } = useAuthStore();
  const isAdmin = isHydrated && !isValidating && user?.role === "admin";

  useEffect(() => {
    // Jika store sudah terhidrasi dan tidak sedang memvalidasi token di server
    if (isHydrated && !isValidating && (!token || user?.role !== "admin")) {
      router.replace("/home");
    }
  }, [isHydrated, isValidating, token, user, router]);

  // Tahan konten jika belum terhidrasi, sedang memvalidasi token, atau belum terkonfirmasi sebagai admin
  if (!isHydrated || isValidating || !isAdmin) {
    return (
      <Center style={{ minHeight: "60vh", flex: 1 }}>
        <Loader color="brandPrimary" size="md" />
      </Center>
    );
  }

  // Jika admin terverifikasi
  return <>{children}</>;
}

export default AdminGuard;
