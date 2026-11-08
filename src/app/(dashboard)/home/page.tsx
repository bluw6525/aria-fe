import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { HomeHero } from "./_components/HomeHero";
import { HomeOverview } from "./_components/HomeOverview";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeader />
      <HomeHero />
      <HomeOverview />
    </PageContainer>
  );
}
