"use client";

import { ReactNode } from "react";
import { Box } from "@mantine/core";

// Interface untuk properti pembungkus halaman PageContainer
interface PageContainerProps {
  children: ReactNode; // Seluruh konten halaman yang dirender di dalam container ini
}

/**
 * Komponen PageContainer
 * Berfungsi sebagai kerangka tata letak (layout wrapper) utama untuk konten halaman aplikasi.
 * Terletak di samping Sidebar (desktop) atau di bawah Top Bar (mobile),
 * dengan padding responsif dan scrolling independen.
 */
export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box
      component="main"
      p={{ base: 16, sm: 24, md: "32px 40px" }}
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        backgroundColor: "var(--background)",
      }}
    >
      {children}
    </Box>
  );
}

export default PageContainer;
