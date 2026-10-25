import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Sidebar } from "@/components/Sidebar";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { BenchmarkContainer } from "./_components/BenchmarkContainer";

export const metadata = {
  title: "Benchmark Model MCCV - Aria",
  description: "Pengujian simulasi Monte Carlo Cross-Validation multi-algoritma dan seleksi model regresi terbaik.",
};

export default function BenchmarkPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan Dilindungi AdminGuard */}
      <PageContainer>
        <AdminGuard>
          <PageHeader
            title="Benchmark Evaluasi & Seleksi Model (MCCV)"
            subtitle="Simulasi validasi silang berulang Monte Carlo untuk komparasi performa multi-algoritma dan penentuan model terbaik"
          />
          <BenchmarkContainer />
        </AdminGuard>
      </PageContainer>
    </div>
  );
}
