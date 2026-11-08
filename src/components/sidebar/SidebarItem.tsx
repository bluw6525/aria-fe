"use client";

import { useState } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Box, Text } from "@mantine/core";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
}

/**
 * Item tombol navigasi pada Sidebar dengan icon dan penanda rute aktif.
 * Mengembalikan styling frosted-glass asli (#0e8ad6 sidebar, bg-white/10 inactive, bg-white active).
 */
export function SidebarItem({ label, href, icon: Icon, isActive, onClick }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      component={Link}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 12,
        textDecoration: "none",
        fontSize: 14,
        fontWeight: isActive ? 700 : 600,
        backgroundColor: isActive
          ? "#ffffff"
          : isHovered
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 255, 255, 0.1)",
        color: isActive
          ? "#0c4a6e"
          : isHovered
          ? "#ffffff"
          : "#e0f2fe",
        boxShadow: isActive ? "0 10px 15px -3px rgba(8, 47, 73, 0.2)" : "none",
        backdropFilter: "blur(4px)",
        transform: isActive
          ? "scale(1.02)"
          : isHovered
          ? "scale(1.01)"
          : "scale(1)",
        transition: "all 200ms ease",
      }}
    >
      <Icon
        size={16}
        color={
          isActive
            ? "#0284c7"
            : isHovered
            ? "#ffffff"
            : "#bae6fd"
        }
        style={{
          flexShrink: 0,
          transition: "transform 200ms ease, color 200ms ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />
      <Text
        size="sm"
        fw={isActive ? 700 : 600}
        inherit
      >
        {label}
      </Text>
    </Box>
  );
}

export default SidebarItem;
