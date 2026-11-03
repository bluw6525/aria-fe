"use client";

import { Title, Text, Box } from "@mantine/core";

// Interface properti untuk judul dan sub-judul pada header halaman
interface PageHeaderProps {
  title?: string;    // Judul utama halaman (memiliki nilai default judul sistem Aria)
  subtitle?: string; // Sub-judul atau deskripsi singkat halaman (opsional)
}

/**
 * Komponen PageHeader
 * Menampilkan bagian atas halaman yang konsisten, berisi judul besar, subjudul, 
 * dan garis horizontal aksen pembatas yang responsif di berbagai resolusi layar.
 */
export function PageHeader({
  title = "Aria - Sentinel-5P Ozone Monitoring",
  subtitle,
}: PageHeaderProps) {
  return (
    // Box dirender sebagai elemen semantik HTML5 <header> dengan margin bawah dinamis
    <Box component="header" w="100%" mb={{ base: 20, md: 32 }} style={{ textAlign: "center" }}>
      {/* Judul Utama Halaman */}
      <Title
        order={2}
        fw={800}
        c="brandSecondary.9"
        style={{
          fontSize: "clamp(18px, 4.5vw, 26px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}
      >
        {title}
      </Title>

      {/* Subjudul penjelas halaman (dirender jika prop 'subtitle' tersedia) */}
      {subtitle && (
        <Text size="sm" c="brandSecondary.5" fw={500} mt={6}>
          {subtitle}
        </Text>
      )}

      {/* Garis Pembatas Header Horizontal Solid dengan lebar maksimal 896px */}
      <Box
        mx="auto"
        mt="md"
        style={{
          width: "100%",
          maxWidth: 896,
          height: 1.5,
          backgroundColor: "var(--mantine-color-brandSecondary-3)",
        }}
      />
    </Box>
  );
}

export default PageHeader;
