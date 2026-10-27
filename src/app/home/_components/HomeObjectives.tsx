import React from "react";
import { Target, Globe2 } from "lucide-react";

interface ObjectiveItem {
  id: number;
  title: string;
  description: string;
}

const OBJECTIVES: ObjectiveItem[] = [
  {
    id: 1,
    title: "Perluasan Jangkauan Pemantauan",
    description:
      "Menyediakan alternatif pemantauan kualitas udara di wilayah DKI Jakarta, khususnya pada area yang belum terjangkau oleh stasiun pemantau darat fisik (SPKU) dengan memanfaatkan data satelit penginderaan jauh.",
  },
  {
    id: 2,
    title: "Integrasi Data Satelit & Sensor Darat",
    description:
      "Menyelaraskan data pengamatan atmosfer dari satelit Sentinel-5P dengan data pengukuran stasiun SPKU agar saling melengkapi untuk menghasilkan dataset pemantauan yang terintegrasi.",
  },
  {
    id: 3,
    title: "Estimasi Nilai ISPU Ozon Permukaan",
    description:
      "Membangun model estimasi nilai ISPU Ozon (O₃) permukaan berbasis hubungan antar-polutan udara (CO dan NO₂) dengan pendekatan regresi yang andal terhadap keragaman data.",
  },
];

export function ObjectiveCard({ id, title, description }: ObjectiveItem) {
  return (
    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-sky-200 hover:bg-sky-50/20 transition-all flex items-start gap-3.5">
      <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
        {id}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-slate-900 text-xs">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function HomeObjectives() {
  return (
    <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
      {/* Header Bagian Tujuan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Tujuan Aplikasi
            </h2>
            <p className="text-xs text-slate-500">
              Sasaran utama sistem pemantauan dan estimasi kualitas udara berbasis data satelit
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100 self-start sm:self-auto">
          <Globe2 className="w-3.5 h-3.5" />
          DKI Jakarta & Sentinel-5P
        </span>
      </div>

      {/* Grid Kartu Tujuan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OBJECTIVES.map((item) => (
          <ObjectiveCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
