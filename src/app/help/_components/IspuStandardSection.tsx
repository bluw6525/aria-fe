import React from "react";
import { ShieldAlert } from "lucide-react";

export function IspuStandardSection() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-sky-600" />
            <span>Klasifikasi Indeks Standar Pencemar Udara (ISPU)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Baku mutu dan kategori kualitas udara berdasarkan Peraturan Menteri Lingkungan Hidup dan Kehutanan (Permen LHK) No. 14 Tahun 2020.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3 px-4 w-36">Kategori</th>
                <th className="py-3 px-4 w-28">Rentang ISPU</th>
                <th className="py-3 px-4">Deskripsi Mutu Udara</th>
                <th className="py-3 px-4">Dampak Kesehatan & Saran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">
                  Baik
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">0 – 50</td>
                <td className="py-3 px-4">Tingkat mutu udara sangat baik, tidak memberikan efek negatif bagi manusia maupun hewan dan tumbuhan.</td>
                <td className="py-3 px-4 text-slate-600">Sangat aman untuk seluruh aktivitas di luar ruangan.</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">
                  Sedang
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">51 – 100</td>
                <td className="py-3 px-4">Kualitas udara masih dapat diterima bagi kesehatan manusia dan tidak berpengaruh pada tumbuhan.</td>
                <td className="py-3 px-4 text-slate-600">Aman untuk masyarakat umum, kelompok sangat sensitif disarankan membatasi paparan lama.</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">
                  Tidak Sehat
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">101 – 200</td>
                <td className="py-3 px-4">Tingkat mutu udara yang bersifat merugikan pada manusia atau kelompok hewan yang sensitif.</td>
                <td className="py-3 px-4 text-slate-600">Kurangi aktivitas fisik berat di luar ruangan, terutama anak-anak dan lansia.</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">
                  Sangat Tidak Sehat
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">201 – 300</td>
                <td className="py-3 px-4">Tingkat mutu udara yang dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi terpapar.</td>
                <td className="py-3 px-4 text-slate-600">Hindari aktivitas di luar ruangan yang berkepanjangan; gunakan masker pelindung.</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">
                  Berbahaya
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">&gt; 300</td>
                <td className="py-3 px-4">Tingkat mutu udara berbahaya yang secara umum dapat merugikan kesehatan serius pada seluruh populasi.</td>
                <td className="py-3 px-4 text-slate-600">Tetap berada di dalam ruangan, tutup ventilasi udara luar, dan gunakan alat pemurni udara.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IspuStandardSection;
