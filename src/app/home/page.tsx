import { Box } from "@mantine/core";
import { Sidebar } from "@/components/Sidebar";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { HomeHero } from "./_components/HomeHero";
import { HomeOverview } from "./_components/HomeOverview";

export default function HomePage() {
  return (
    <Box style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--background)" }}>
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan */}
      <PageContainer>
        <PageHeader />
        <HomeHero />
        <HomeOverview />
      </PageContainer>
    </Box>
  );
}
