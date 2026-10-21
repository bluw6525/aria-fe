"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Gauge,
  Cpu,
  HelpCircle,
  History,
  Activity,
  Radio,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { SidebarItem } from "./sidebar/SidebarItem";
import Image from "next/image";
import { SidebarHeader } from "./sidebar/SidebarHeader";

const MENU_ITEMS = [
  {
    label: "Home",
    href: "/",
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

  return (
    <aside className="w-68 min-h-screen bg-[#0e8ad6] pt-6 pb-1 flex flex-col text-white shadow-xl border-r border-sky-400/20 select-none shrink-0">
      {/* Brand Header */}
      <SidebarHeader />

      {/* Navigation Menu */}
      <nav className="mt-10 flex flex-col gap-3 flex-1 px-6">
        {
          MENU_ITEMS.map((item) => {
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
          })
        }
      </nav>

      {/* System Status Footer */}
      <div className="mt-auto pt-6 border-t border-white/10" />
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
