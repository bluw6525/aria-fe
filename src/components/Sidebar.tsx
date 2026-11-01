"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Layers,
  Gauge,
  HelpCircle,
  History,
  Cpu,
} from "lucide-react";
import { Box, Stack } from "@mantine/core";
import { useAuthStore } from "@/store/auth-store";
import { notify } from "@/lib/notifications";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarItem } from "./sidebar/SidebarItem";

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

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isHydrated, logout } = useAuthStore();

  const isAdmin = isHydrated && user?.role === "admin";

  // Sembunyikan 'Latih dan Uji' & 'Pelatihan Massal' jika pengguna bukan Admin
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
    <Box
      component="aside"
      style={{
        width: 272,
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#0e8ad6",
        paddingTop: 24,
        paddingBottom: 4,
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
      {/* Brand Header */}
      <SidebarHeader isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Navigation Menu */}
      <Stack gap={12} mt={40} px={24} style={{ flex: 1 }}>
        {visibleMenuItems.map((item) => {
          return (
            <SidebarItem
              key={item.label}
              {...item}
              isActive={
                pathname === item.href ||
                (item.href === "/" && (pathname === "/" || pathname === "/home"))
              }
            />
          );
        })}
      </Stack>

      {/* System Status Footer */}
      <Box mt="auto" pt={12} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }} />
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

export default Sidebar;
