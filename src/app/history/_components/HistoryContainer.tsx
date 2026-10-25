import React from "react";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";


export function HistoryContainer() {
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16">
      {/* Profil Perancang: Christopher Wijaya */}
      <section className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-12 transition-all">
        {/* Kolom Teks Informasi */}
        <div className="flex-1 flex flex-col text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
              <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
              Perancang & Pengembang Sistem
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
            Christopher Wijaya
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-5">
            <span className="font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              NIM: 535230158
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Universitas Tarumanagara
            </span>
          </div>

          <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed font-normal">
            <p>
              Halo! Saya adalah mahasiswa Teknik Informatika di <strong>Universitas Tarumanagara</strong> yang memiliki kepedulian mendalam terhadap kelestarian lingkungan dan isu polusi udara perkotaan.
            </p>
            <p>
              Didorong oleh keinginan nyata untuk berkontribusi bagi masyarakat dan lingkungan hidup, saya merancang serta mengembangkan sistem <strong>Aria</strong>. Melalui pemanfaatan data penginderaan jauh satelit Sentinel-5P dan algoritma regresi robust, sistem ini bertujuan menghadirkan estimasi Indeks Standar Pencemar Udara (ISPU) yang akurat, transparan, dan dapat diakses dengan mudah oleh semua orang guna mendukung pengambilan keputusan berbasis lingkungan yang lebih sehat.
            </p>
          </div>
        </div>

        {/* Kolom Foto Profil Perancang */}
        <div className="w-44 h-56 md:w-52 md:h-64 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 shrink-0 relative bg-slate-100">
          <Image
            src="/images/perancang_1.png"
            alt="Foto Profil Christopher Wijaya"
            fill
            sizes="(max-width: 768px) 176px, 208px"
            className="object-cover object-top"
            priority
          />
        </div>
      </section>
    </div>
  );
}

export default HistoryContainer;
