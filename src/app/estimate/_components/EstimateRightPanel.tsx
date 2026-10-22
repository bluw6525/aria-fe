"use client";

import React, { useMemo } from "react";
import {
  RotateCcw,
  TrendingUp,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { LineChart, LineSeries } from "@/components/LineChart";
import { formatEstimatorType } from "@/app/train-test/_types";
import { getIspuStyle, BatchEstimateResult } from "../_types";
import { useEstimateApi, getManualBatchResult } from "../_hooks/use-estimate-api";

export function EstimateRightPanel() {
  const inputMode = useEstimateApi((s) => s.inputMode);
  const selectedModelId = useEstimateApi((s) => s.selectedModelId);
  const singleResult = useEstimateApi((s) => s.singleResult);
  const batchResult = useEstimateApi((s) => s.batchResult);
  const manualHistory = useEstimateApi((s) => s.manualHistory);
  const resetEstimate = useEstimateApi((s) => s.resetEstimate);

  // Jika input mode manual memiliki >= 2 titik, ubah menjadi BatchEstimateResult otomatis
  const manualBatchResult = useMemo(() => {
    return getManualBatchResult(manualHistory, singleResult, selectedModelId);
  }, [manualHistory, singleResult, selectedModelId]);

  const isFileUploadActive = inputMode === "file";
  const showBatch = isFileUploadActive && Boolean(batchResult);
  const showManualSingle = !isFileUploadActive && manualHistory.length === 1 && Boolean(singleResult);
  const showManualBatch = !isFileUploadActive && manualHistory.length >= 2 && Boolean(manualBatchResult);
  const showEmpty = !showBatch && !showManualSingle && !showManualBatch;

  // Active batch object to render
  const activeBatch: BatchEstimateResult | null = showBatch
    ? batchResult
    : showManualBatch
    ? manualBatchResult
    : null;

  // Garis chart untuk LineChart (fokus pada nilai estimasi ISPU)
  const chartLines: LineSeries[] = useMemo(() => {
    if (!activeBatch) return [];
    const hasActual = activeBatch.chart_data.some((p) => p.actual_value !== null && p.actual_value !== undefined);
    const lines: LineSeries[] = [
      { key: "estimated_value", name: "Estimasi ISPU", color: "#0284c7" },
    ];
    if (hasActual) {
      lines.unshift({ key: "actual_value", name: "ISPU Aktual", color: "#10b981", dashed: true });
    }
    return lines;
  }, [activeBatch]);

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-6 text-slate-900 border border-slate-200 shadow-sm min-h-145">
      {/* =================================================================== */}
      {/* 1. EMPTY STATE (Placeholder Belum Ada Estimasi) */}
      {/* =================================================================== */}
      {showEmpty && (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-24">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 shadow-sm">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">
            Panel Hasil Estimasi & Klasifikasi ISPU
          </h4>
          <p className="text-xs text-slate-500 max-w-md leading-relaxed">
            {isFileUploadActive
              ? "Pilih model regresi dari database dan unggah berkas data satelit Sentinel-5P (.xlsx, .csv, atau .xls), lalu klik tombol Jalankan Estimasi."
              : "Pilih model regresi dan masukkan nilai gas prekursor CO serta NO2 pada panel sebelah kiri, lalu klik tombol Jalankan Estimasi."}
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. HASIL ESTIMASI TUNGGAL (Manual Mode: 1 Titik) */}
      {/* =================================================================== */}
      {showManualSingle && singleResult && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Header Card */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hasil Estimasi Indeks Standar Pencemar Udara (Titik Tunggal)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Model: <strong>{singleResult.model_name}</strong> ({formatEstimatorType(singleResult.estimator_type)})
              </p>
            </div>
            <button
              type="button"
              onClick={resetEstimate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* ISPU Primary Badge & Card */}
          {(() => {
            const ispuStyle = getIspuStyle(singleResult.ispu_category);
            return (
              <div
                className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border ${ispuStyle.badgeBorder} bg-linear-to-br ${ispuStyle.cardBg} gap-6 shadow-sm`}
              >
                {/* Nilai ISPU */}
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Nilai Indeks Standar Pencemar Udara (ISPU)
                  </span>
                  <div className="flex items-baseline gap-3 justify-center md:justify-start">
                    <span className="text-5xl font-black text-slate-900 tracking-tight">
                      {singleResult.estimated_value}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${ispuStyle.badgeBorder} ${ispuStyle.badgeBg} ${ispuStyle.badgeText}`}
                    >
                      {singleResult.ispu_category}
                    </span>
                  </div>
                </div>

                {/* Deskripsi Regulasi Permen LHK */}
                <div className="max-w-xs flex flex-col gap-1.5 text-xs bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80">
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
            );
          })()}

          {/* Persamaan Model */}
          {singleResult.equation && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700">
                Persamaan Model Regresi:
              </span>
              <div className="bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-xl text-sky-950 font-bold text-xs font-mono">
                {singleResult.equation}
              </div>
            </div>
          )}

          {/* Petunjuk Multi-titik */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="leading-relaxed">
              Anda dapat memasukkan nilai CO & NO2 berikutnya pada panel kiri untuk melihat tren grafik ISPU secara multi-titik kumulatif.
            </span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. HASIL BATCH (Upload File Satelit atau Multi-titik Manual >= 2) */}
      {/* =================================================================== */}
      {activeBatch && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hasil Estimasi ISPU {showManualBatch ? "(Multi-titik Manual)" : "(Batch File)"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Model: <strong>{activeBatch.model_name}</strong> ({formatEstimatorType(activeBatch.estimator_type)})
              </p>
            </div>
            <button
              type="button"
              onClick={resetEstimate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{showManualBatch ? "Reset Riwayat" : "Estimasi Ulang"}</span>
            </button>
          </div>

          {/* 4 Kartu Metrik Ringkasan ISPU */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Total Sampel */}
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
              <span className="block text-[11px] font-bold text-sky-900 uppercase">
                Total Sampel
              </span>
              <span className="text-xl font-extrabold text-sky-700">
                {activeBatch.summary.total_samples}
              </span>
            </div>

            {/* Rata-rata ISPU */}
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
              <span className="block text-[11px] font-bold text-sky-900 uppercase">
                Rata-rata ISPU
              </span>
              <span className="text-xl font-extrabold text-sky-700">
                {activeBatch.summary.avg_estimated}
              </span>
            </div>

            {/* Min - Max ISPU */}
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
              <span className="block text-[11px] font-bold text-sky-900 uppercase">
                Rentang ISPU
              </span>
              <span className="text-sm font-extrabold text-sky-700 leading-snug">
                {activeBatch.summary.min_estimated} – {activeBatch.summary.max_estimated}
              </span>
            </div>

            {/* Kategori Dominan */}
            {(() => {
              const domStyle = getIspuStyle(activeBatch.summary.dominant_ispu_category);
              return (
                <div className={`border p-3.5 rounded-xl text-center ${domStyle.badgeBorder} ${domStyle.badgeBg}`}>
                  <span className={`block text-[11px] font-bold uppercase ${domStyle.badgeText}`}>
                    Kategori Dominan
                  </span>
                  <span className={`text-sm font-extrabold ${domStyle.badgeText}`}>
                    {activeBatch.summary.dominant_ispu_category}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Persamaan Model */}
          {activeBatch.equation && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700">
                Persamaan Estimasi ISPU:
              </span>
              <div className="bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-xl text-sky-950 font-bold text-xs font-mono">
                {activeBatch.equation}
              </div>
            </div>
          )}

          {/* Grafik Garis Tren Estimasi ISPU Recharts */}
          <div className="mt-1">
            <LineChart
              data={activeBatch.chart_data}
              title={`Grafik Tren Nilai ISPU (${activeBatch.chart_data.length} Observasi)`}
              lines={chartLines}
              xAxisKey="label"
              height={260}
            />
          </div>

          {/* Tabel Sampel Data Hasil Estimasi ISPU */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Daftar Data Hasil Estimasi ISPU</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                {showManualBatch
                  ? `Total ${activeBatch.chart_data.length} titik manual tercatat`
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
                  {activeBatch.chart_data.map((row) => {
                    const rowStyle = getIspuStyle(row.ispu_category);
                    return (
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
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${rowStyle.badgeBorder} ${rowStyle.badgeBg} ${rowStyle.badgeText}`}
                          >
                            {row.ispu_category}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EstimateRightPanel;

