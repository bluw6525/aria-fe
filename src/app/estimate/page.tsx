import { Box } from "@mantine/core";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { EstimateContainer } from "./_components/EstimateContainer";

export const metadata = {
  title: "Estimasi Kualitas Udara (ISPU) - Aria System",
  description: "Estimasi Indeks Standar Pencemar Udara (ISPU) berbasis gas prekursor satelit Sentinel-5P.",
};

export default function EstimatePage() {
  return (
    <Box style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--background)" }}>
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan */}
      <PageContainer>
        <PageHeader
          title="Estimasi Kualitas Udara (ISPU)"
          subtitle="Inferensi estimasi Indeks Standar Pencemar Udara (ISPU) berbasis gas prekursor satelit Sentinel-5P"
        />
        <EstimateContainer />
      </PageContainer>
    </Box>
  );
}
