"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Center, Box, Paper, Title, Text, Stack, ActionIcon } from "@mantine/core";
import axios from "axios";
import { authService } from "@/lib/api/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { notify } from "@/lib/notifications";
import { extractApiErrorMessage } from "@/lib/api/error";
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
      notify.warning("Input Belum Lengkap", {
        description: "Harap isi username dan password terlebih dahulu.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.login(username.trim(), password);
      setAuth(data.access_token, data.user);

      if (data.user.role === "admin") {
        notify.success("Login Berhasil", {
          description: `Selamat datang kembali, ${data.user.username}!`,
        });
      } else {
        notify.info("Login Berhasil", {
          description: "Akun berhasil masuk, namun bukan merupakan akun administrator.",
        });
      }
      router.push("/home");
    } catch (err: unknown) {
      const msg = extractApiErrorMessage(err, "Periksa kembali username dan password Anda.");
      notify.error("Login Gagal", {
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center style={{ minHeight: "100vh", width: "100%", backgroundColor: "var(--background)", padding: 16 }}>
      <Box style={{ width: "100%", maxWidth: 448 }}>
        {/* Back button */}
        <Link
          href="/home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "var(--mantine-color-brandPrimary-6)",
            fontWeight: 600,
            marginBottom: 24,
            textDecoration: "none",
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          <span>Kembali ke Beranda</span>
        </Link>

        <Paper
          p={32}
          shadow="lg"
        >
          <Title order={1} size="h3" fw={700} c="brandSecondary.8" mb={24}>
            Login Administrator
          </Title>

          <form onSubmit={handleSubmit}>
            <Stack gap={16}>
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
                icon={<User style={{ width: 16, height: 16 }} />}
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
                icon={<Lock style={{ width: 16, height: 16 }} />}
                iconPosition="left"
                iconRight={
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff style={{ width: 16, height: 16 }} />
                    ) : (
                      <Eye style={{ width: 16, height: 16 }} />
                    )}
                  </ActionIcon>
                }
              />

              {/* Submit Button */}
              <Box pt={8}>
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
              </Box>
            </Stack>
          </form>

          <Box mt={32} pt={24} style={{ borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <Text size="xs" c="dimmed">
              Aria System • Pemantauan Kualitas Udara Berbasis Satelit Sentinel-5P
            </Text>
          </Box>
        </Paper>
      </Box>
    </Center>
  );
}
