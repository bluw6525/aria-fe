import { Sidebar } from "@/components/Sidebar";
import { HomeHero } from "./_components/HomeHero";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {/* 1. Sidebar Navigasi di Kiri */}
      <Sidebar />

      {/* 2. Konten Utama di Kanan (flex-1 agar mengisi seluruh sisa layar) */}
      <main className="flex-1 overflow-y-auto">
        <HomeHero />
      </main>
    </div>
  );
}
