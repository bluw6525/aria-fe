import React from "react";
import { Cpu } from "lucide-react";

export function TheorySection() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-sky-600" />
            <span>Dasar Teori Regresi Linear Robust & MM-Estimator</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Penjelasan matematis mengapa metode Ordinary Least Squares (OLS) rentan terhadap pencilan satelit dan bagaimana MM-estimator menyelesaikan kelemahan tersebut.
          </p>
        </div>

        {/* Mengapa Regresi Robust Dibutuhkan? */}
        <div className="flex flex-col gap-2.5 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">
            1. Keterbatasan Regresi Klasik (OLS) Terhadap Data Satelit
          </h4>
          <p>
            Metode kuadrat terkecil klasik (Ordinary Least Squares / OLS) mengasumsikan galat berdistribusi normal tanpa adanya pencilan (outliers). Namun, data penginderaan jauh satelit Sentinel-5P sering mengandung derau (noise) akibat tutupan awan.
          </p>
          <p>
            Satu titik pencilan ekstrem saja dapat menarik garis regresi OLS menjauh dari tren data populasi sesungguhnya karena fungsi kuadratik OLS memberikan penalti kuadratik yang sangat besar terhadap residual besar.
          </p>
        </div>

        {/* Evolusi M, S, hingga MM-Estimator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* M-Estimator */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-slate-900 text-sm">M-Estimator (Huber, 1973)</strong>
            <p className="text-slate-600 leading-relaxed">
              Meminimumkan fungsi objektif dari residual terstandarisasi sehingga observasi dengan residual besar memperoleh kontribusi lebih kecil dalam penaksiran parameter.
            </p>
            <div className="mt-auto pt-2 flex flex-col gap-1 text-[11px]">
              <span className="font-semibold text-emerald-700">
                Kelebihan: Memiliki efisiensi relatif yang tinggi ketika data mendekati distribusi normal.
              </span>
              <span className="font-semibold text-rose-600">
                Kelemahan: Nilai breakdown point rendah.
              </span>
            </div>
          </div>

          {/* S-Estimator */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-slate-900 text-sm">S-Estimator (Rousseeuw & Yohai, 1984)</strong>
            <p className="text-slate-600 leading-relaxed">
              Meminimumkan suatu estimator skala robust (M-scale) dari residual, bukan meminimumkan fungsi objektif residual secara langsung.
            </p>
            <div className="mt-auto pt-2 flex flex-col gap-1 text-[11px]">
              <span className="font-semibold text-emerald-700">
                Kelebihan: Memiliki nilai breakdown point tinggi hingga mencapai batas teoretis maksimum sebesar 50%.
              </span>
              <span className="font-semibold text-rose-600">
                Kelemahan: Efisiensi relatif estimatornya masih tergolong rendah.
              </span>
            </div>
          </div>


          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-col gap-2">
            <strong className="text-sky-950 text-sm">MM-Estimator (Yohai, 1987)</strong>
            <p className="text-sky-900 leading-relaxed">
              Metode regresi robust yang dirancang untuk mengatasi kelemahan M-estimator dan S-estimator secara simultan.
            </p>
            <div className="mt-auto pt-2 flex flex-col gap-1 text-[11px]">
              <span className="font-semibold text-sky-900">
                Metode optimal: Memiliki nilai breakdown point tinggi (mencapai hingga 50%) sekaligus mempertahankan efisiensi relatif yang tinggi (mencapai 95%).
              </span>
            </div>
          </div>
        </div>

        {/* Tahapan Algoritma MM-Estimator */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-3 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">
            2. Tiga Tahap Komputasi MM-Estimator (Yohai, 1987)
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Tahap 1 (Inisialisasi S-Estimator):</strong> Menghitung estimasi parameter awal dan skala residual robust <code>s</code> menggunakan algoritma S-estimator dengan konstanta efisiensi tuning yang menjamin ketahanan breakdown point 50%.
            </li>
            <li>
              <strong>Tahap 2 (Skala Robust Terkunci):</strong> Skala residual <code>s</code> yang dihasilkan pada tahap S dikunci dan dijadikan skala tetap untuk standarisasi residual sepanjang iterasi berikutnya.
            </li>
            <li>
              <strong>Tahap 3 (Iterative Reweighted Least Squares / IRLS):</strong> Menggunakan fungsi pembobot Tukey Bisquare untuk menghitung bobot observasi pada setiap iterasi hingga nilai koefisien konvergen.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TheorySection;
