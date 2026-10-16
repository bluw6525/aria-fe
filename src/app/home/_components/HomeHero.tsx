
import Image from "next/image";

export function HomeHero() {
  return (
    <div className="flex-1 min-h-screen bg-[#f3f4f6] flex flex-col px-12 py-10">
      {/* 1. Header Atas */}
      <div className="w-full mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center tracking-tight">
          Sistem Estimasi Kualitas Udara O3 dengan Sentinel-5P
        </h2>
        {/* Garis Pembatas Header */}
        <div className="w-full border-b-2 border-black mt-3" />
      </div>

      {/* 2. Area Hero: Dibuat Flex Terpusat (Konsisten di Semua Resolusi Layar) */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-5xl mx-auto w-full pb-20">
        
        {/* Kolom Kiri: Judul & Deskripsi */}
        <div className="flex flex-col shrink-0">
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
            Estimasi konsentrasi <br />
            Ozon Permukaan <br />
            <span className="text-[#0e8ad6]">DKI JAKARTA</span>
          </h1>

          {/* Garis Pembatas Bawah Judul */}
          <div className="w-80 border-b-2 border-black mt-6 mb-4" />

          {/* Deskripsi Singkat */}
          <p className="text-base font-semibold text-gray-800">
            Deskripsi Singkat
          </p>
        </div>

        {/* Kolom Kanan: Gambar Satelit Sentinel 5P */}
        <div className="flex justify-center shrink-0">
          <Image
            src="/images/home.webp"
            alt="Sentinel 5P Satellite Illustration"
            width={400}
            height={400}
            priority
            className="w-72 md:w-84 lg:w-96 h-auto drop-shadow-md object-contain"
          />
        </div>

      </div>
    </div>
  );
}
