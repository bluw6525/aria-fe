import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { HelpContainer } from "./_components/HelpContainer";

export const metadata = {
  title: "Bantuan & Informasi Teori - Aria System",
  description: "Panduan alur kerja sistem, dasar teori regresi linear robust, algoritma peramalan moving average, serta standar baku mutu ISPU.",
};

export default function HelpPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Bantuan & Informasi Teori"
        subtitle="Pusat informasi pendukung mengenai cara penggunaan aplikasi, dasar teori regresi linear robust, algoritma peramalan moving average, serta dampak polusi udara"
      />
      <HelpContainer />
    </PageContainer>
  );
}
