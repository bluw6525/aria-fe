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
            Sistem Aria dirancang untuk memfasilitasi pemodelan regresi robust dan inferensi kualitas udara Indeks Standar Pencemar Udara (ISPU) berbasis citra satelit Sentinel-5P.
          </p>
        </div>

        {/* Langkah 1: Pelatihan & Pengujian */}
        <div className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              Modul Latih dan Uji (Pembuatan Model Regresi)
            </h4>
          </div>
          <ul className="list-disc pl-9 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>
              <strong>Unggah Data Latih:</strong> Unggah berkas Excel (<code>.xlsx</code> / <code>.xls</code>) atau CSV yang berisi data prekursor satelit (kolom CO dan NO2) serta kolom target ground-truth (ISPU / O3).
            </li>
            <li>
              <strong>Deteksi Outlier:</strong> Klik tombol <em>Deteksi Outlier</em> untuk mengidentifikasi titik pencilan pada data latih menggunakan metode leverage tinggi (hat-matrix) dan DFFITS sebelum model dilatih.
            </li>
            <li>
              <strong>Pilih Algoritma Regresi Robust:</strong> Pilih estimator regresi robust yang diinginkan (<strong>MM-Estimator</strong>, <strong>M-Estimator</strong>, atau <strong>S-Estimator</strong>) dengan opsi penyertaan <em>Intercept</em>.
            </li>
            <li>
              <strong>Latih Model:</strong> Klik tombol <em>Latih Model</em>. Sistem akan mengiterasi bobot residual hingga konvergen dan menyajikan metrik evaluasi (RMSE, MAE, R²) serta visualisasi grafik.
            </li>
            <li>
              <strong>Simpan Parameter Model:</strong> Beri nama model pada kolom simpan, lalu klik <em>Simpan</em> agar koefisien model tersimpan ke basis data untuk digunakan pada modul estimasi.
            </li>
            <li>
              <strong>Pengujian Model Baru:</strong> Pada sub-bagian Uji Model, pilih model tersimpan dan unggah berkas data uji independen untuk mengevaluasi generalisasi akurasi model.
            </li>
          </ul>
        </div>

        {/* Langkah 2: Estimasi Kualitas Udara */}
        <div className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              Modul Estimasi Kualitas Udara (ISPU)
            </h4>
          </div>
          <ul className="list-disc pl-9 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>
              <strong>Pilih Model Regresi:</strong> Pilih salah satu model regresi robust yang telah dilatih dan disimpan di database melalui dropdown pilihan model.
            </li>
            <li>
              <strong>Mode Upload Data Satelit (Batch):</strong> Unggah berkas observasi satelit Sentinel-5P (.xlsx / .csv). Sistem akan mengestimasi nilai ISPU untuk seluruh baris data, menyajikan ringkasan metrik (Rata-rata, Rentang Min-Max, Kategori Dominan), grafik garis tren, serta tabel data interaktif.
            </li>
            <li>
              <strong>Mode Input Manual (Titik Tunggal / Multi-titik):</strong> Masukkan nilai numerik konsentrasi CO dan NO2 (mol/m²) secara mandiri untuk melihat nilai estimasi ISPU langsung, kategori udara, serta dampak kesehatan Permen LHK No. 14/2020.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GuideSection;
