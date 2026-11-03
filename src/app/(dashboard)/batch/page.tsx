import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { BatchContainer } from "./_components/BatchContainer";

export const metadata = {
  title: "Pelatihan & Pengujian Massal - Aria",
  description:
    "Pelatihan dan pengujian model regresi secara massal berbasis data satelit Sentinel-5P.",
};

export default function BatchPage() {
  return (
    <PageContainer>
      <AdminGuard>
        <PageHeader
          title="Pelatihan & Pengujian Massal (Batch)"
          subtitle="Pengujian dan evaluasi model regresi multi-algoritma secara massal untuk seleksi model terbaik"
        />
        <BatchContainer />
      </AdminGuard>
    </PageContainer>
  );
}
