"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

/**
 * Item tombol navigasi pada Sidebar dengan icon dan penanda rute aktif.
 */
export function SidebarItem({ label, href, icon: Icon, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        // Base style tombol
        "group flex items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200",
        // Tampilan status aktif vs tidak aktif
        isActive
          ? "bg-white text-sky-900 shadow-lg shadow-sky-950/20 font-bold scale-[1.02]"
          : "bg-white/10 text-sky-100 hover:bg-white/20 hover:text-white backdrop-blur-sm hover:scale-[1.01]"
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-transform group-hover:scale-110",
          isActive ? "text-sky-600" : "text-sky-200 group-hover:text-white"
        )}
      />
      <span>{label}</span>
    </Link>
  );
}
