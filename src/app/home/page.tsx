import { Sidebar } from "@/components/Sidebar";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { HomeHero } from "./_components/HomeHero";
import { HomeOverview } from "./_components/HomeOverview";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan (flex-1 agar mengisi seluruh sisa layar) */}
      <PageContainer>
        <PageHeader />
        <HomeHero />
        <HomeOverview />
      </PageContainer>
    </div>
  );
}

