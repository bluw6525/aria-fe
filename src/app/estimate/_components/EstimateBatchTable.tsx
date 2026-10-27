import React from "react";
import { Activity } from "lucide-react";
import { IspuBadge } from "@/components/IspuBadge";
import type { BatchEstimatePoint } from "../_types";

interface EstimateBatchTableProps {
  data: BatchEstimatePoint[];
  showManualBatch: boolean;
}

export function EstimateBatchTable({ data, showManualBatch }: EstimateBatchTableProps) {
  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-sky-600" />
          <span>Daftar Data Hasil Estimasi ISPU</span>
        </h4>
        <span className="text-[11px] text-slate-500">
          {showManualBatch
            ? `Total ${data.length} titik manual tercatat`
            : `Menampilkan sampel data estimasi satelit`}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-72 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 sticky top-0 border-b border-slate-200 select-none z-10">
            <tr>
              <th className="py-2.5 px-3 font-bold w-12 text-center">#</th>
              <th className="py-2.5 px-3 font-bold">Waktu / Label</th>
              <th className="py-2.5 px-3 font-bold">CO (mol/m²)</th>
              <th className="py-2.5 px-3 font-bold">NO2 (mol/m²)</th>
              <th className="py-2.5 px-3 font-bold text-sky-900">Estimasi ISPU</th>
              <th className="py-2.5 px-3 font-bold">Kategori ISPU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {data.map((row) => (
              <tr key={row.index} className="hover:bg-sky-50/40 transition-colors">
                <td className="py-2 px-3 text-center text-slate-400 font-medium">
                  {row.index}
                </td>
                <td className="py-2 px-3 font-semibold text-slate-900">
                  {row.label}
                </td>
                <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                  {row.co}
                </td>
                <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                  {row.no2}
                </td>
                <td className="py-2 px-3 font-black text-sky-700 text-sm">
                  {row.estimated_value}
                </td>
                <td className="py-2 px-3">
                  <IspuBadge category={row.ispu_category} size="xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
