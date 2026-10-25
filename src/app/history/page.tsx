import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { HistoryContainer } from "./_components/HistoryContainer";

export const metadata = {
  title: "Riwayat Perancang - Aria System",
  description: "Profil dan riwayat pengembang serta perancang sistem estimasi kualitas udara Aria.",
};

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan */}
      <PageContainer>
        <PageHeader
          title="Riwayat Perancang"
          subtitle="Profil pengembang dan latar belakang pengembangan sistem estimasi kualitas udara Aria"
        />
        <HistoryContainer />
      </PageContainer>
    </div>
  );
}
