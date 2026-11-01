import { Box } from "@mantine/core";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { HelpContainer } from "./_components/HelpContainer";

export const metadata = {
  title: "Bantuan & Informasi Teori - Aria System",
  description: "Panduan cara penggunaan sistem, dasar teori regresi robust MM-estimator, serta dampak polusi udara dan baku mutu ISPU.",
};

export default function HelpPage() {
  return (
    <Box style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--background)" }}>
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan */}
      <PageContainer>
        <PageHeader
          title="Bantuan & Informasi Teori"
          subtitle="Pusat informasi pendukung mengenai cara penggunaan aplikasi, dasar teori regresi robust MM-estimator, serta dampak polusi udara"
        />
        <HelpContainer />
      </PageContainer>
    </Box>
  );
}
