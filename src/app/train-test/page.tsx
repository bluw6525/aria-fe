import { Box } from "@mantine/core";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { TrainTestContainer } from "./_components/TrainTestContainer";

export const metadata = {
  title: "Latih Dan Uji - Aria",
  description:
    "Pelatihan model regresi robust (MM, M, S) dan pengujian performa estimasi O3 berbasis data satelit Sentinel-5P.",
};

export default function TrainTestPage() {
  return (
    <Box style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--background)" }}>
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan Dilindungi AdminGuard */}
      <PageContainer>
        <AdminGuard>
          <PageHeader
            title="Latih Dan Uji Model Regresi"
            subtitle="Pelatihan model Robust (MM, M, S) dan pengujian performa estimasi O3 berbasis data Sentinel-5P"
          />
          <TrainTestContainer />
        </AdminGuard>
      </PageContainer>
    </Box>
  );
}
