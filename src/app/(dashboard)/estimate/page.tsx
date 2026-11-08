import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { EstimateContainer } from "./_components/EstimateContainer";

export const metadata = {
  title: "Estimasi Kualitas Udara (ISPU) - Aria System",
  description: "Estimasi Indeks Standar Pencemar Udara (ISPU) berbasis gas prekursor satelit Sentinel-5P.",
};

export default function EstimatePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Estimasi Kualitas Udara (ISPU)"
        subtitle="Inferensi estimasi Indeks Standar Pencemar Udara (ISPU) berbasis gas prekursor satelit Sentinel-5P"
      />
      <EstimateContainer />
    </PageContainer>
  );
}
