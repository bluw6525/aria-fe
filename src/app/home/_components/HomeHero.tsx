
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Satellite, ShieldCheck } from "lucide-react";

export function HomeHero() {
  return (
    <div className="flex-1 min-h-screen bg-[#f3f4f6] flex flex-col px-10 py-8">
      <div className="w-full mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Sistem Estimasi Kualitas Udara O3 dengan Sentinel-5P
        </h2>
        {/* Garis Pembatas Header Solid */}
        <div className="w-full max-w-4xl mx-auto h-[1.5px] bg-slate-300 mt-4" />
      </div>

      {/* 2. Area Hero: Flex Terpusat & Rapi */}
      <div className="flex-1 flex items-center justify-center gap-16 max-w-5xl mx-auto w-full pb-14">
        {/* Kolom Kiri: Judul, Deskripsi, CTA, dan Metrics */}
        <div className="flex flex-col shrink-0 max-w-lg">
          <h1 className="text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
            Estimasi Konsentrasi <br />
            Ozon Permukaan <br />
            <span className="text-sky-600">
              DKI JAKARTA
            </span>
          </h1>

          {/* Garis Aksen Solid */}
          <div className="w-20 h-1 bg-sky-600 rounded-full mt-4 mb-4" />

          {/* Deskripsi Nyata */}
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Pemantauan dan estimasi presisi konsentrasi Ozon (O3) permukaan secara
            berkala menggunakan analisis citra satelit pengorbit Bumi Sentinel-5P TROPOMI.
          </p>

          {/* Tombol Aksi (CTA) Solid */}
          <div className="flex items-center gap-3.5 mt-6">
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Mulai Estimasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-sm transition-all hover:scale-[1.01]"
            >
              <span>Panduan Sistem</span>
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Gambar Satelit Sentinel 5P */}
        <div className="flex justify-center shrink-0">
          <Image
            src="/images/home.webp"
            alt="Sentinel 5P Satellite Illustration"
            width={400}
            height={400}
            priority
            className="w-92 h-auto drop-shadow-lg object-contain hover:scale-[1.02] transition-transform duration-300 select-none"
          />
        </div>
      </div>
    </div>
  );
}


