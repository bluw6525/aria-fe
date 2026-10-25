import React from "react";
import { AlertTriangle, Satellite } from "lucide-react";

export function PollutionSection() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Gas Prekursor Satelit & Dampak Polusi Udara</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Penjelasan mengenai peran gas prekursor Karbon Monoksida (CO) dan Nitrogen Dioksida (NO2) dalam pembentukan ozon troposferik dan polusi udara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Karbon Monoksida */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Karbon Monoksida (CO)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Gas tidak berwarna dan tidak berbau yang dihasilkan dari proses pembakaran tidak sempurna bahan bakar fosil pada kendaraan bermotor dan aktivitas industri.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-200 text-slate-700">
              <strong>Dampak Kesehatan:</strong> Mengikat hemoglobin dalam darah jauh lebih kuat dibanding oksigen, menurunkan kapasitas pengangkutan oksigen ke jaringan tubuh, menyebabkan pusing, kelelahan, dan gangguan kardiovaskular.
            </div>
          </div>

          {/* Nitrogen Dioksida */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Nitrogen Dioksida (NO2)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Gas berwarna cokelat kemerahan yang dihasilkan dari pembakaran bersuhu tinggi (mesin kendaraan dan pembangkit listrik). NO2 adalah prekursor fotokimia utama dalam pembentukan ozon troposferik.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-200 text-slate-700">
              <strong>Dampak Kesehatan:</strong> Mengiritasi saluran pernapasan, memicu gejala asma, batuk, penurunan fungsi paru-paru, dan meningkatkan kerentanan terhadap infeksi pernapasan.
            </div>
          </div>
        </div>

        {/* Ozon Permukaan & Fotokimia */}
        <div className="p-5 rounded-xl bg-sky-50 border border-sky-200 flex flex-col gap-3 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-sky-950 text-sm flex items-center gap-2">
            <Satellite className="w-4 h-4 text-sky-600" />
            <span>Ozon Permukaan (O3) sebagai Polutan Sekunder</span>
          </h4>
          <p>
            Ozon di stratosfer melindungi bumi dari sinar UV, namun ozon di lapisan permukaan (troposfer) merupakan polutan sekunder berbahaya yang terbentuk akibat reaksi fotokimia antara NO2 dan CO di bawah pengaruh radiasi sinar matahari langsung.
          </p>
          <p>
            Paparan konsentrasi ozon permukaan yang tinggi dapat merusak jaringan paru-paru, memperburuk kondisi penderita bronkitis kronis, dan merusak vegetasi serta hasil pertanian.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PollutionSection;
