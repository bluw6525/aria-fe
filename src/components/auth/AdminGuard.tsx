"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, isHydrated } = useAuthStore();
  const isAdmin = isHydrated && user?.role === "admin";

  useEffect(() => {
    if (isHydrated && !isAdmin) {
      router.replace("/home");
    }
  }, [isHydrated, isAdmin, router]);

  // Tahan konten jika belum terkonfirmasi sebagai admin
  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
      </div>
    );
  }

  // Jika admin terverifikasi
  return <>{children}</>;
}
