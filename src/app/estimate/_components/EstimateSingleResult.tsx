import React from "react";
import { RotateCcw, ShieldAlert } from "lucide-react";
import { formatEstimatorType } from "@/app/train-test/_types";
import { EquationDisplay } from "@/components/EquationDisplay";
import { IspuBadge } from "@/components/IspuBadge";
import { getIspuStyle, type SingleEstimateResult } from "../_types";

interface EstimateSingleResultProps {
  result: SingleEstimateResult;
  onReset: () => void;
}

export function EstimateSingleResult({ result, onReset }: EstimateSingleResultProps) {
  const ispuStyle = getIspuStyle(result.ispu_category);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Card */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Hasil Estimasi Indeks Standar Pencemar Udara (Titik Tunggal)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Model: <strong>{result.model_name}</strong> (
            {formatEstimatorType(result.estimator_type)})
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* ISPU Primary Badge & Card */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50 gap-6 shadow-sm">
        {/* Nilai ISPU */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Nilai Indeks Standar Pencemar Udara (ISPU)
          </span>
          <div className="flex items-baseline gap-3 justify-center md:justify-start">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {result.estimated_value}
            </span>
            <IspuBadge category={result.ispu_category} size="md" />
          </div>
        </div>

        {/* Deskripsi Regulasi Permen LHK */}
        <div className="max-w-xs flex flex-col gap-1.5 text-xs bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Dampak Kesehatan (Permen LHK No. 14/2020):</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {ispuStyle.description}
          </p>
          <span className="font-semibold text-sky-950 text-[11px] mt-0.5">
            {ispuStyle.healthImpact}
          </span>
        </div>
      </div>

      {/* Persamaan Model */}
      {result.equation && (
        <EquationDisplay
          label="Persamaan Model Regresi:"
          equation={result.equation}
        />
      )}

      {/* Petunjuk Multi-titik */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span className="leading-relaxed">
          Anda dapat memasukkan nilai CO & NO2 berikutnya pada panel kiri untuk melihat tren grafik ISPU secara multi-titik kumulatif.
        </span>
      </div>
    </div>
  );
}
