import React from "react";
import { Flex } from "@mantine/core";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--background)",
      }}
    >
      {/* 1. Sidebar Navigasi di Kiri (Desktop) atau Topbar & Drawer (Mobile) */}
      <Sidebar />

      {/* 2. Konten Halaman Aktif */}
      {children}
    </Flex>
  );
}
