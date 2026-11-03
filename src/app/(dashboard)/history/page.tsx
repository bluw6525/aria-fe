import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { HistoryContainer } from "./_components/HistoryContainer";

export const metadata = {
  title: "Riwayat Perancang - Aria System",
  description: "Profil dan riwayat pengembang serta perancang sistem estimasi kualitas udara Aria.",
};

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Riwayat Perancang"
        subtitle="Profil pengembang dan latar belakang pengembangan sistem estimasi kualitas udara Aria"
      />
      <HistoryContainer />
    </PageContainer>
  );
}
