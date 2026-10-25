"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Gauge,
  Cpu,
  Layers,
  HelpCircle,
  History,
} from "lucide-react";
import { SidebarItem } from "./sidebar/SidebarItem";
import Image from "next/image";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const MENU_ITEMS = [
  {
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    label: "Estimasi",
    href: "/estimate",
    icon: Gauge,
  },
  {
    label: "Latih dan Uji",
    href: "/train-test",
    icon: Cpu,
  },
  {
    label: "Benchmark MCCV",
    href: "/benchmark",
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

  // Sembunyikan 'Latih dan Uji' & 'Benchmark MCCV' jika pengguna bukan Admin
  const visibleMenuItems = MENU_ITEMS.filter((item) => {
    if (item.href === "/train-test" || item.href === "/benchmark") {
      return isAdmin;
    }
    return true;
  });

  const handleLogout = () => {
    logout();
    toast.success("Berhasil keluar dari sesi admin.");
    router.push("/home");
  };

  return (
    <aside className="w-68 min-h-screen bg-[#0e8ad6] pt-6 pb-1 flex flex-col text-white shadow-xl border-r border-sky-400/20 select-none shrink-0">
      {/* Brand Header */}
      <SidebarHeader isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Navigation Menu */}
      <nav className="mt-10 flex flex-col gap-3 flex-1 px-6">
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
      </nav>

      {/* System Status Footer */}
      <div className="mt-auto pt-3 border-t border-white/10" />
      <Image
        src="/images/navbar_footer.webp"
        alt="Sentinel-5P Atmosphere Monitoring"
        width={260}
        height={100}
        className="w-full h-auto select-none block"
        priority
      />
    </aside>
  );
}
