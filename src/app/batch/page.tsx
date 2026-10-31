import { Box } from "@mantine/core";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { BatchContainer } from "./_components/BatchContainer";

export const metadata = {
  title: "Pelatihan & Pengujian Massal - Aria",
  description:
    "Pelatihan dan pengujian model regresi secara massal berbasis data satelit Sentinel-5P.",
};

export default function BatchPage() {
  return (
    <Box style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--background)" }}>
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan Dilindungi AdminGuard */}
      <PageContainer>
        <AdminGuard>
          <PageHeader
            title="Pelatihan & Pengujian Massal (Batch)"
            subtitle="Pengujian dan evaluasi model regresi multi-algoritma secara massal untuk seleksi model terbaik"
          />
          <BatchContainer />
        </AdminGuard>
      </PageContainer>
    </Box>
  );
}

