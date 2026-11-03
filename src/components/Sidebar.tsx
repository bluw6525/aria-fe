"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Layers,
  Gauge,
  HelpCircle,
  History,
  Cpu,
  Activity,
} from "lucide-react";
import { Box, Stack, Flex, Title, Text, Burger, Drawer } from "@mantine/core";
import { useAuthStore } from "@/store/auth-store";
import { notify } from "@/lib/notifications";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarItem } from "./sidebar/SidebarItem";

// Daftar konfigurasi rute menu navigasi utama pada sidebar
const MENU_ITEMS = [
  {
    label: "Beranda",
    href: "/home",
    icon: Layers,
  },
  {
    label: "Estimasi ISPU",
    href: "/estimate",
    icon: Gauge,
  },
  {
    label: "Latih dan Uji",
    href: "/train-test",
    icon: Cpu,
  },
  {
    label: "Pelatihan Massal",
    href: "/batch",
    icon: Layers,
  },
  {
    label: "Bantuan",
    href: "/help",
    icon: HelpCircle,
  },
  {
    label: "Riwayat Perancang",
    href: "/history",
    icon: History,
  },
];

interface SidebarContentProps {
  isAdmin: boolean;
  visibleMenuItems: typeof MENU_ITEMS;
  pathname: string;
  onLogout: () => void;
  onItemClick?: () => void;
}

/**
 * Konten internal Sidebar yang dapat dirender baik di sidebar desktop permanen
 * maupun di dalam Drawer mobile responsif.
 */
function SidebarContent({
  isAdmin,
  visibleMenuItems,
  pathname,
  onLogout,
  onItemClick,
}: SidebarContentProps) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        color: "white",
        userSelect: "none",
        overflowY: "auto",
        scrollbarWidth: "none",
        paddingTop: 24,
        paddingBottom: 4,
      }}
    >
      {/* Bagian Header Sidebar: Logo & Tombol Logout */}
      <SidebarHeader isAdmin={isAdmin} onLogout={onLogout} />

      {/* Daftar Item Navigasi Menu */}
      <Stack gap={12} mt={36} px={24} style={{ flex: 1 }}>
        {visibleMenuItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            isActive={
              pathname === item.href ||
              (item.href === "/" && (pathname === "/" || pathname === "/home"))
            }
            onClick={onItemClick}
          />
        ))}
      </Stack>

      {/* Pembatas Garis Menuju Footer */}
      <Box mt="auto" pt={12} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }} />

      {/* Ilustrasi Satelit Sentinel-5P */}
      <Image
        src="/images/navbar_footer.webp"
        alt="Sentinel-5P Atmosphere Monitoring"
        width={260}
        height={85}
        style={{ width: "100%", height: "auto", paddingLeft: 16, paddingRight: 16, paddingBottom: 8 }}
        priority
      />
    </Box>
  );
}

/**
 * Komponen Sidebar Responsif
 * - Desktop (>= md): Bilah navigasi samping permanen (sticky) 272px
 * - Mobile (< md): Top bar ringkas dengan tombol hamburger dan Drawer slide-in
 */
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isHydrated, logout } = useAuthStore();
  const [mobileOpened, setMobileOpened] = useState(false);

  // Tutup drawer secara otomatis saat rute berpindah
  useEffect(() => {
    setMobileOpened(false);
  }, [pathname]);

  const isAdmin = isHydrated && user?.role === "admin";

  const visibleMenuItems = MENU_ITEMS.filter((item) => {
    if (item.href === "/train-test" || item.href === "/batch") {
      return isAdmin;
    }
    return true;
  });

  const handleLogout = () => {
    logout();
    notify.success("Logout Berhasil", {
      description: "Anda telah keluar dari sesi administrator.",
    });
    router.push("/home");
  };

  return (
    <>
      {/* 1. Header Khusus Mobile (< md) */}
      <Box
        component="header"
        hiddenFrom="md"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          height: 58,
          backgroundColor: "#0e8ad6",
          paddingLeft: 16,
          paddingRight: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <Flex align="center" gap={10}>
          <Box
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Activity style={{ width: 18, height: 18, color: "#bae6fd" }} />
          </Box>
          <Box>
            <Title
              order={1}
              size="h4"
              fw={900}
              c="white"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {isAdmin ? "Admin Aria" : "Aria"}
            </Title>
            <Text
              size="10px"
              fw={500}
              c="brandPrimary.2"
              style={{ lineHeight: 1, marginTop: 2 }}
            >
              Atmospheric ISPU App
            </Text>
          </Box>
        </Flex>

        <Burger
          opened={mobileOpened}
          onClick={() => setMobileOpened((o) => !o)}
          color="white"
          size="sm"
          aria-label="Toggle navigation menu"
        />
      </Box>

      {/* 2. Drawer Navigasi Mobile (< md) */}
      <Drawer
        opened={mobileOpened}
        onClose={() => setMobileOpened(false)}
        size={272}
        padding={0}
        withCloseButton={false}
        zIndex={1500}
        styles={{
          content: {
            backgroundColor: "#0e8ad6",
            color: "white",
          },
          body: {
            padding: 0,
            height: "100%",
          },
        }}
      >
        <SidebarContent
          isAdmin={isAdmin}
          visibleMenuItems={visibleMenuItems}
          pathname={pathname}
          onLogout={handleLogout}
          onItemClick={() => setMobileOpened(false)}
        />
      </Drawer>

      {/* 3. Sidebar Desktop Standar (>= md) */}
      <Box
        component="aside"
        visibleFrom="md"
        style={{
          width: 272,
          height: "100vh",
          position: "sticky",
          top: 0,
          backgroundColor: "#0e8ad6",
          display: "flex",
          flexDirection: "column",
          color: "white",
          boxShadow: "var(--mantine-shadow-xl)",
          borderRight: "1px solid rgba(56, 189, 248, 0.2)",
          userSelect: "none",
          flexShrink: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <SidebarContent
          isAdmin={isAdmin}
          visibleMenuItems={visibleMenuItems}
          pathname={pathname}
          onLogout={handleLogout}
        />
      </Box>
    </>
  );
}

export default Sidebar;
