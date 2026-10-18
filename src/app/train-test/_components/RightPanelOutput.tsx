"use client";

import React from "react";
import {
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
} from "../types";
import { InteractiveChart } from "./InteractiveChart";
import {
  AlertCircle,
  Activity,
  CheckCircle2,
  Binary,
  Target,
  Gauge,
  Percent,
  SearchAlert,
} from "lucide-react";


interface RightPanelOutputProps {
  outlierResult: OutlierDetectionResponse | null;
  trainResult: TrainModelResult | null;
  testResult: TestModelResult | null;
  errorMessage: string | null;
}

export function formatR2(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0.0";
  const num = Math.abs(val) <= 1.0 ? val * 100 : val;
  return num.toFixed(1);
}

export function RightPanelOutput({
  outlierResult,
  trainResult,
  testResult,
  errorMessage,
}: RightPanelOutputProps) {
  const hasAnyOutput = outlierResult || trainResult || testResult || errorMessage;

  return (
    <div className="w-full bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-slate-900 border border-slate-200/90 shadow-sm min-h-[640px]">
      {/* Pesan Kesalahan Global (jika ada) */}
      {errorMessage && (
        <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs font-semibold shadow-xs animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-rose-950">Terjadi Kesalahan Komputasi:</span>
            <span className="text-rose-800 mt-0.5">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Tampilan Placeholder jika belum ada proses yang dijalankan */}
      {!hasAnyOutput && (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-24">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200/70 flex items-center justify-center mb-4 shadow-xs">
            <Activity className="w-8 h-8 text-sky-600 animate-pulse" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1.5 tracking-tight">
            Workstation Hasil & Evaluasi Model
          </h4>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Silakan unggah berkas data latih di sisi kiri lalu klik tombol <b>Latih Model</b> atau <b>Deteksi Outlier</b> untuk melihat visualisasi dan metrik evaluasi.
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. HASIL DETEKSI OUTLIER */}
      {/* =================================================================== */}
      {outlierResult && (
        <div className="flex flex-col gap-3 bg-amber-50/50 border border-amber-200/80 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SearchAlert className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs md:text-sm font-bold text-amber-950 uppercase tracking-wider">
                Diagnostik Outlier & Influential Points
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300/60">
              {outlierResult.summary.total_unique_outliers} Pencilan Terdeteksi
            </span>
          </div>

          <div className="flex flex-col gap-2 text-xs text-slate-700">
            {/* Leverage Outlier */}
            <div className="flex flex-col gap-1 bg-white/80 p-2.5 rounded-lg border border-amber-200/50">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span>Leverage Points (h_ii &gt; 2p/n)</span>
                <span className="text-amber-800">
                  {outlierResult.leverage_outliers.length} observasi
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono leading-relaxed truncate">
                {outlierResult.leverage_outliers && outlierResult.leverage_outliers.length > 0
                  ? `data ke: ${outlierResult.leverage_outliers.join(", ")}`
                  : "Tidak ada pencilan leverage"}
              </p>
            </div>

            {/* DFFITS Outlier */}
            <div className="flex flex-col gap-1 bg-white/80 p-2.5 rounded-lg border border-amber-200/50">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span>DFFITS Points (|DFFITS| &gt; 2√(p/n))</span>
                <span className="text-amber-800">
                  {outlierResult.dffits_outliers.length} observasi
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono leading-relaxed truncate">
                {outlierResult.dffits_outliers && outlierResult.dffits_outliers.length > 0
                  ? `data ke: ${outlierResult.dffits_outliers.join(", ")}`
                  : "Tidak ada pencilan DFFITS"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. HASIL PELATIHAN MODEL */}
      {/* =================================================================== */}
      {trainResult && (
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold tracking-wide">
              <Binary className="w-4 h-4 text-sky-600" />
              <span>Model Berhasil Dilatih ({trainResult.estimator_type}-Estimator)</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Sampel Latih: <b>{trainResult.total_samples}</b> data
            </span>
          </div>

          {/* Persamaan Model Matematika */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700 tracking-tight">
              Persamaan Regresi Terbentuk (Estimasi Parameter)
            </span>
            <div className="flex items-center justify-between bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-800 shadow-xs overflow-x-auto">
              <span className="font-mono text-sm md:text-base font-bold text-sky-300">
                {"O₃ = " + trainResult.equation}
              </span>
            </div>
          </div>

          {/* Kartu Metrik Evaluasi Data Latih */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700 tracking-tight">
              Metrik Evaluasi Performa Data Latih
            </span>
            <div className="grid grid-cols-3 gap-3">
              {/* RMSE */}
              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">RMSE</span>
                  <Target className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 font-mono">
                  {trainResult.rmse}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">μg/m³ (Error rata-rata)</span>
              </div>

              {/* MAE */}
              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">MAE</span>
                  <Gauge className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 font-mono">
                  {trainResult.mae}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">μg/m³ (Deviasi absolut)</span>
              </div>

              {/* R2 Score */}
              <div className="bg-sky-50/80 border border-sky-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-sky-800 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">R² Score</span>
                  <Percent className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-sky-700 font-mono">
                  {formatR2(trainResult.r2)}%
                </span>
                <span className="text-[10px] text-sky-800 font-semibold mt-0.5">
                  Koefisien Determinasi
                </span>
              </div>
            </div>
          </div>

          {/* Grafik Interaktif Data Latih */}
          <div className="mt-1">
            <InteractiveChart
              data={trainResult.chart_data}
              title={`Grafik Evaluasi Pelatihan • ${trainResult.estimator_type}-Estimator`}
              subtitle="Perbandingan konsentrasi O3 Aktual SPKU vs Hasil Prediksi Model"
              actualLabel="O3 Aktual (SPKU)"
              predictedLabel="O3 Estimasi (Model)"
              height={250}
            />
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. HASIL PENGUJIAN MODEL */}
      {/* =================================================================== */}
      {testResult && (
        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 mt-2">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pengujian Berhasil • Model: {testResult.model_name}</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Sampel Uji: <b>{testResult.total_samples}</b> data
            </span>
          </div>

          {/* Kartu Metrik Evaluasi Data Uji */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700 tracking-tight">
              Metrik Evaluasi Performa Data Uji (Validasi Silang)
            </span>
            <div className="grid grid-cols-3 gap-3">
              {/* RMSE Uji */}
              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">RMSE Uji</span>
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 font-mono">
                  {testResult.rmse}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">μg/m³</span>
              </div>

              {/* MAE Uji */}
              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">MAE Uji</span>
                  <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 font-mono">
                  {testResult.mae}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">μg/m³</span>
              </div>

              {/* R2 Score Uji */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-800 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">R² Uji</span>
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-lg md:text-xl font-black text-emerald-700 font-mono">
                  {formatR2(testResult.r2)}%
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                  Generalisasi Data Baru
                </span>
              </div>
            </div>
          </div>

          {/* Grafik Interaktif Data Uji */}
          <div className="mt-1">
            <InteractiveChart
              data={testResult.chart_data}
              title={`Grafik Evaluasi Pengujian • ${testResult.model_name}`}
              subtitle="Validasi prediksi model terhadap data pengujian baru"
              actualLabel="O3 Aktual (Uji)"
              predictedLabel="O3 Estimasi (Uji)"
              height={250}
            />
          </div>
        </div>
      )}
    </div>
  );
}
