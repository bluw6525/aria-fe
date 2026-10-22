"use client";

import { TrendingUp } from "lucide-react";
import { LineChart } from "@/components/LineChart";
import { formatEstimatorType } from "../_types";
import { useRegressionApi } from "../_hooks/use-regression-api";

export function formatR2(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0.0";
  const num = Math.abs(val) <= 1.0 ? val * 100 : val;
  return num.toFixed(1);
}

export function RightPanelOutput() {
  // Ambil data langsung dari hook Zustand
  const outlierResult = useRegressionApi((s) => s.outlierResult);
  const trainResult = useRegressionApi((s) => s.trainResult);
  const testResult = useRegressionApi((s) => s.testResult);

  const hasAnyOutput = Boolean(outlierResult || trainResult || testResult);

  const leverageOutliers = outlierResult?.leverage?.outlier_indices || [];
  const dffitsOutliers = outlierResult?.dffits?.outlier_indices || [];
  const bothOutliers = outlierResult?.both?.outlier_indices || [];

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-6 text-slate-900 border border-slate-200 shadow-sm min-h-145">

      {/* Tampilan Placeholder jika belum ada proses yang dijalankan */}
      {!hasAnyOutput && (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-24">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 shadow-sm">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">
            Panel Hasil dan Evaluasi
          </h4>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Unggah berkas data latih di sisi kiri dan klik tombol <b>Latih</b> atau <b>Deteksi Outlier</b> untuk menampilkan hasil pemodelan dan grafik evaluasi.
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. HASIL DETEKSI OUTLIER */}
      {/* =================================================================== */}
      {outlierResult && (
        <div className="flex flex-col gap-2.5 pb-2">
          <h3 className="text-base font-bold text-slate-900">
            Outlier pada data latih
          </h3>

          <div className="flex flex-col divide-y divide-slate-200/70 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
              <span className="font-bold text-slate-900 w-36 shrink-0">
                Leverage Value
              </span>
              <span className="leading-relaxed text-slate-800">
                {leverageOutliers.length > 0 ? (
                  <>data ke <span className="font-semibold text-slate-950">{leverageOutliers.join(", ")}</span></>
                ) : (
                  <span className="text-slate-400 italic">Tidak terdeteksi pencilan leverage</span>
                )}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
              <span className="font-bold text-slate-900 w-36 shrink-0">
                DFFITS
              </span>
              <span className="leading-relaxed text-slate-800">
                {dffitsOutliers.length > 0 ? (
                  <>data ke <span className="font-semibold text-slate-950">{dffitsOutliers.join(", ")}</span></>
                ) : (
                  <span className="text-slate-400 italic">Tidak terdeteksi pencilan DFFITS</span>
                )}
              </span>
            </div>

            {bothOutliers.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
                <span className="font-bold text-slate-900 w-36 shrink-0">
                  Both (Irisan)
                </span>
                <span className="leading-relaxed text-slate-800">
                  data ke <span className="font-semibold text-slate-950">{bothOutliers.join(", ")}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. HASIL PELATIHAN MODEL */}
      {/* =================================================================== */}
      {trainResult && (
        <div className="flex flex-col gap-4">
          {/* Header Section Sederhana */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 className="text-base font-bold text-slate-900">
              Hasil Pelatihan Model ({formatEstimatorType(trainResult.estimator_type)})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Jumlah data latih: {trainResult.total_samples}
            </span>
          </div>

          {/* Persamaan Parameter */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">
              hasil estimasi parameter
            </span>
            <div className="bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-xl text-sky-950 font-bold text-sm">
              {trainResult.equation}
            </div>
          </div>

          {/* Kotak Metrik Evaluasi Data Latih */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">
              hasil evaluasi model terhadap data latih
            </span>
            <div className="grid grid-cols-3 gap-3">
              {/* RMSE */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  RMSE
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {trainResult.rmse}
                </span>
              </div>

              {/* MAE */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  MAE
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {trainResult.mae}
                </span>
              </div>

              {/* R2 Score */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  R² Score
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {formatR2(trainResult.r2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Grafik Interaktif Data Latih */}
          <div className="mt-1">
            <LineChart
              data={trainResult.chart_data}
              title={`Grafik Data Latih (${formatEstimatorType(trainResult.estimator_type)})`}
              lines={[
                { key: "actual", name: "O3 Sebenarnya", color: "#0284c7" },
                { key: "predicted", name: "O3 Estimasi", color: "#f43f5e", dashed: true },
              ]}
              height={240}
            />
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. HASIL PENGUJIAN MODEL */}
      {/* =================================================================== */}
      {testResult && (
        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 mt-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 className="text-base font-bold text-slate-900">
              Hasil Evaluasi Model terhadap Data Uji ({testResult.model_name})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Jumlah data uji: {testResult.total_samples}
            </span>
          </div>

          {/* Kotak Metrik Evaluasi Data Uji */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">
              hasil evaluasi model terhadap data uji
            </span>
            <div className="grid grid-cols-3 gap-3">
              {/* RMSE Uji */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  RMSE Uji
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {testResult.rmse}
                </span>
              </div>

              {/* MAE Uji */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  MAE Uji
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {testResult.mae}
                </span>
              </div>

              {/* R2 Score Uji */}
              <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-sky-900 uppercase">
                  R² Uji
                </span>
                <span className="text-xl font-extrabold text-sky-700">
                  {formatR2(testResult.r2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Grafik Interaktif Data Uji */}
          <div className="mt-1">
            <LineChart
              data={testResult.chart_data}
              title={`Grafik Evaluasi Data Uji (${testResult.model_name})`}
              lines={[
                { key: "actual", name: "O3 Sebenarnya", color: "#0284c7" },
                { key: "predicted", name: "O3 Estimasi", color: "#f43f5e", dashed: true },
              ]}
              height={240}
            />
          </div>
        </div>
      )}
    </div>
  );
}
