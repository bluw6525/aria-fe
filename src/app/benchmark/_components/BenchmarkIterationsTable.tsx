"use client";

import React, { useState, useEffect } from "react";
import {
  MCCVIteration,
  PaginatedIterations,
  benchmarkService,
} from "@/lib/api/services/benchmark-service";
import { Button } from "@/components/Button";
import {
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  Trophy,
  Filter,
  ArrowUpDown,
} from "lucide-react";

interface BenchmarkIterationsTableProps {
  sessionId: number;
  availableEstimators: string[];
  onPromoteClick: (iteration: MCCVIteration) => void;
}

// Helper fleksibel untuk mengekstrak nilai koefisien CO dan NO2 dari berbagai variasi nama kolom
function getCoefValue(coefs: Record<string, number> | undefined, target: "CO" | "NO2"): string {
  if (!coefs || typeof coefs !== "object") return "-";
  const targetLower = target.toLowerCase();
  for (const [key, val] of Object.entries(coefs)) {
    const k = key.toLowerCase();
    if (targetLower === "co") {
      if ((k === "co" || k.includes("co")) && !k.includes("no2") && !k.includes("score")) {
        return Number(val).toFixed(4);
      }
    } else if (targetLower === "no2") {
      if (k === "no2" || k.includes("no2")) {
        return Number(val).toFixed(4);
      }
    }
  }
  const values = Object.values(coefs);
  if (target === "CO" && values.length >= 1) return Number(values[0]).toFixed(4);
  if (target === "NO2" && values.length >= 2) return Number(values[1]).toFixed(4);
  return "-";
}

export function BenchmarkIterationsTable({
  sessionId,
  availableEstimators,
  onPromoteClick,
}: BenchmarkIterationsTableProps) {
  const [data, setData] = useState<PaginatedIterations | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedEstimator, setSelectedEstimator] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    benchmarkService
      .getIterations(sessionId, {
        page,
        limit,
        estimator_type: selectedEstimator || undefined,
        sort_by: "test_r2",
        sort_order: "desc",
      })
      .then((res) => {
        if (!ignore) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [sessionId, page, limit, selectedEstimator]);

  // Reset page ke 1 jika filter estimator berubah
  const handleEstimatorChange = (est: string) => {
    setIsLoading(true);
    setSelectedEstimator(est);
    setPage(1);
  };

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.total_pages || 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
      {/* Header Tabel dengan Kontrol Filter & Paginasi */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs font-bold text-slate-800">
            Detail Seluruh Iterasi Model (Diurutkan Test R² Tertinggi)
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {total} baris
          </span>
        </div>

        {/* Filter Estimator & Limit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter:</span>
            <select
              value={selectedEstimator}
              onChange={(e) => handleEstimatorChange(e.target.value)}
              className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="">Semua Model ({availableEstimators.length})</option>
              {availableEstimators.map((est) => (
                <option key={est} value={est}>
                  {est}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Baris:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 px-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel Data Iterasi */}
      <div className="overflow-x-auto relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center z-10 text-xs font-semibold text-sky-700">
            Memuat data iterasi...
          </div>
        )}
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 text-center w-14">Rank</th>
              <th className="py-3 px-4">Estimator</th>
              <th className="py-3 px-3 text-center">Seed</th>
              <th className="py-3 px-4 font-bold text-sky-950">Test R² (%)</th>
              <th className="py-3 px-4">Test RMSE</th>
              <th className="py-3 px-4">Test MAE</th>
              <th className="py-3 px-4">Train R² (%)</th>
              <th className="py-3 px-4">Train RMSE</th>
              <th className="py-3 px-4">Train MAE</th>
              <th className="py-3 px-4">Koefisien (β₀ / CO / NO₂)</th>
              <th className="py-3 px-4 text-center w-36">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {items.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-8 text-center text-slate-400 font-sans text-xs">
                  Tidak ada iterasi yang cocok dengan filter yang dipilih.
                </td>
              </tr>
            ) : (
              items.map((item, idx) => {
                const rank = (page - 1) * limit + idx + 1;
                const isRankOne = rank === 1;

                const coefCo = getCoefValue(item.coefficients, "CO");
                const coefNo2 = getCoefValue(item.coefficients, "NO2");
                const intercept = item.intercept !== null ? Number(item.intercept).toFixed(4) : "-";

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-sky-50/50 transition-colors ${
                      isRankOne ? "bg-sky-50/50" : ""
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3 px-3 text-center">
                      {isRankOne ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-[10px] shadow-2xs">
                          <Trophy className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-slate-400 font-bold text-[11px]">#{rank}</span>
                      )}
                    </td>

                    {/* Estimator */}
                    <td className="py-3 px-4 font-sans font-semibold text-slate-900">
                      {item.estimator_type}
                    </td>

                    {/* Seed */}
                    <td className="py-3 px-3 text-center">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {item.random_state ?? "N/A"}
                      </span>
                    </td>

                    {/* Test R2 */}
                    <td className="py-3 px-4 font-bold">
                      <span
                        className={
                          item.test_r2 >= 0.7
                            ? "text-emerald-600"
                            : item.test_r2 >= 0.4
                            ? "text-sky-600"
                            : "text-rose-600"
                        }
                      >
                        {(item.test_r2 * 100).toFixed(2)}%
                      </span>
                    </td>

                    {/* Test RMSE */}
                    <td className="py-3 px-4 text-slate-800">{item.test_rmse.toFixed(4)}</td>

                    {/* Test MAE */}
                    <td className="py-3 px-4 text-slate-800">{item.test_mae.toFixed(4)}</td>

                    {/* Train R2 */}
                    <td className="py-3 px-4 text-slate-700">
                      {item.train_r2 !== null && item.train_r2 !== undefined
                        ? `${(item.train_r2 * 100).toFixed(2)}%`
                        : "-"}
                    </td>

                    {/* Train RMSE */}
                    <td className="py-3 px-4 text-slate-700">
                      {item.train_rmse !== null && item.train_rmse !== undefined
                        ? item.train_rmse.toFixed(4)
                        : "-"}
                    </td>

                    {/* Train MAE */}
                    <td className="py-3 px-4 text-slate-700">
                      {item.train_mae !== null && item.train_mae !== undefined
                        ? item.train_mae.toFixed(4)
                        : "-"}
                    </td>

                    {/* Koefisien (3 Baris Terpisah Rapi) */}
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 leading-snug">
                        <div>
                          <span className="text-slate-400 font-sans">β₀:</span> {intercept}
                        </div>
                        <div>
                          <span className="text-slate-400 font-sans">CO:</span> {coefCo}
                        </div>
                        <div>
                          <span className="text-slate-400 font-sans">NO₂:</span> {coefNo2}
                        </div>
                      </div>
                    </td>

                    {/* Tombol Simpan Model */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onPromoteClick(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                          isRankOne
                            ? "bg-sky-600 hover:bg-sky-700 text-white shadow-2xs"
                            : "bg-sky-50 hover:bg-sky-100 text-sky-800"
                        }`}
                        title="Simpan iterasi ini ke daftar model produksi"
                      >
                        <BookmarkPlus className="w-3.5 h-3.5" />
                        <span>Simpan</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Paginasi */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
        <div>
          Menampilkan baris <strong>{items.length > 0 ? (page - 1) * limit + 1 : 0}</strong> hingga{" "}
          <strong>{Math.min(page * limit, total)}</strong> dari <strong>{total}</strong> iterasi
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isLoading}
            className="w-8 h-8 p-0 flex items-center justify-center rounded-lg"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="px-2 font-mono font-bold text-slate-700">
            Halaman {page} / {totalPages}
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isLoading}
            className="w-8 h-8 p-0 flex items-center justify-center rounded-lg"
            title="Halaman Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
