import React from "react";
import { BookOpen } from "lucide-react";

export function GuideSection() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>Alur Kerja & Panduan Penggunaan Sistem Aria</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Panduan ringkas langkah-langkah estimasi Indeks Standar Pencemar Udara (ISPU) berbasis data satelit Sentinel-5P menggunakan model regresi robust.
          </p>
        </div>

        {/* 3 Langkah Alur Kerja */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Langkah 1 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Pilih Model Estimasi
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih salah satu model regresi robust terverifikasi yang tersedia (seperti <strong>MM-Estimator</strong>, <strong>M-Estimator</strong>, atau <strong>S-Estimator</strong>) pada menu dropdown model.
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Masukkan Data Prekursor
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tersedia 2 metode input data prekursor udara (CO & NO₂):
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 pl-3 border-l-2 border-sky-300">
              <li>
                <strong>Unggah Berkas (Batch):</strong> Unggah file <code>.xlsx</code> / <code>.csv</code> untuk estimasi banyak baris data sekaligus.
              </li>
              <li>
                <strong>Input Manual:</strong> Masukkan nilai numerik secara mandiri untuk estimasi titik tunggal secara seketika.
              </li>
            </ul>
          </div>

          {/* Langkah 3 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Analisis Hasil & Kategori
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sistem akan menghitung estimasi nilai ISPU, memetakan kategori kualitas udara (Baik hingga Berbahaya), serta menyajikan grafik tren.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideSection;
