import { Sidebar } from "@/components/Sidebar";
import { TrainTestContainer } from "./_components/TrainTestContainer";

export const metadata = {
  title: "Latih Dan Uji - Aria System",
  description: "Modul pelatihan dan pengujian model regresi robust untuk estimasi kualitas udara O3.",
};

export default function TrainTestPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan */}
      <main className="flex-1 overflow-y-auto">
        <TrainTestContainer />
      </main>
    </div>
  );
}
