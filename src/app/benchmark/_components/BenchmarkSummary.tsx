"use client";

import React from "react";
import { BenchmarkSession, BenchmarkSummaryRow } from "@/lib/api/services/benchmark-service";
import { Trophy, BarChart3, Database, Sparkles } from "lucide-react";

interface BenchmarkSummaryProps {
  session: BenchmarkSession;
  summaryRows: BenchmarkSummaryRow[];
}

export function BenchmarkSummary({ session, summaryRows }: BenchmarkSummaryProps) {
  // Cari model dengan mean test_r2 tertinggi
  const bestEstimator = summaryRows.reduce(
    (best, cur) => (cur.test_r2_mean > (best?.test_r2_mean ?? -Infinity) ? cur : best),
    summaryRows[0]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Header Metadata Sesi */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider">
              Sesi #{session.id}
            </span>
            <h2 className="text-lg font-bold text-slate-800">
              {session.session_name || "Sesi Benchmark MCCV"}
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              Dataset: <strong>{session.dataset_name}</strong>
            </span>
            <span>•</span>
            <span>{session.total_samples ? `${session.total_samples} Sampel` : "N/A"}</span>
            <span>•</span>
            <span>{session.total_seeds} Percobaan Seed</span>
            <span>•</span>
            <span>Rasio Uji: {(session.test_size * 100).toFixed(0)}%</span>
          </div>
        </div>

        {bestEstimator && (
          <div className="bg-sky-50/80 border border-sky-200 rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-sky-800">
                Estimator Rata-Rata Terbaik
              </p>
              <p className="text-xs font-bold text-slate-900">
                {bestEstimator.estimator} • R² {bestEstimator.test_r2_mean.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Tabel Ringkasan Komparasi Evaluasi Rata-Rata */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <BarChart3 className="w-4 h-4 text-sky-600" />
            <span>Rangkuman Metrik Evaluasi Rata-Rata ({summaryRows.length} Model)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Format: Nilai Rata-rata ± Standar Deviasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Estimator</th>
                <th className="py-3 px-4">Test R² (Mean ± Std)</th>
                <th className="py-3 px-4">Test RMSE</th>
                <th className="py-3 px-4">Test MAE</th>
                <th className="py-3 px-4">Train R²</th>
                <th className="py-3 px-4">Train RMSE</th>
                <th className="py-3 px-4">Train MAE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {summaryRows.map((row) => {
                const isBest = bestEstimator && bestEstimator.estimator === row.estimator;
                return (
                  <tr
                    key={row.estimator}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isBest ? "bg-sky-50/40 font-semibold" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-bold text-slate-900 flex items-center gap-2">
                      {isBest && <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                      <span>{row.estimator}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={isBest ? "text-sky-900 font-bold" : "text-slate-800"}>
                        {row.test_r2_display}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-800">{row.test_rmse_display}</td>
                    <td className="py-3 px-4 text-slate-800">{row.test_mae_display}</td>
                    <td className="py-3 px-4 text-slate-500">{row.train_r2_display}</td>
                    <td className="py-3 px-4 text-slate-500">{row.train_rmse_display}</td>
                    <td className="py-3 px-4 text-slate-500">{row.train_mae_display}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
