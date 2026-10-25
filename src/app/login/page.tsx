"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { authService } from "@/lib/api/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();

  const { setAuth, user, isHydrated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Jika sudah login sebagai admin, langsung redirect ke /home
  useEffect(() => {
    if (isHydrated && user?.role === "admin") {
      router.replace("/home");
    }
  }, [isHydrated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Harap isi username dan password.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.login(username.trim(), password);
      setAuth(data.access_token, data.user);

      if (data.user.role === "admin") {
        toast.success(`Selamat datang kembali, ${data.user.username}!`);
      } else {
        toast.info("Login berhasil, namun akun ini bukan akun administrator.");
      }
      router.push("/home");
    } catch (err: unknown) {
      let msg = "Gagal masuk. Periksa kembali username dan password Anda.";
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        msg = String(err.response.data.detail);
      }
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-sky-950/5 border border-sky-100 p-8 md:p-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">
            Login Administrator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <Input
              id="username"
              label="USERNAME"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              disabled={isLoading}
              autoFocus
              icon={<User className="w-4 h-4" />}
              iconPosition="left"
            />

            {/* Password */}
            <Input
              id="password"
              label="PASSWORD"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              disabled={isLoading}
              icon={<Lock className="w-4 h-4" />}
              iconPosition="left"
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                loadingText="Memverifikasi..."
              >
                Masuk Administrator
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Aria System • Pemantauan Kualitas Udara Berbasis Satelit Sentinel-5P
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
