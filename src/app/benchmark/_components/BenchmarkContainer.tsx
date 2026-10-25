"use client";

import React, { useState } from "react";
import {
  BenchmarkSession,
  BenchmarkSummaryRow,
  MCCVIteration,
  benchmarkService,
} from "@/lib/api/services/benchmark-service";
import { BenchmarkForm } from "./BenchmarkForm";
import { BenchmarkSummary } from "./BenchmarkSummary";
import { BenchmarkIterationsTable } from "./BenchmarkIterationsTable";
import { PromoteModelModal } from "./PromoteModelModal";
import { Layers } from "lucide-react";
import { toast } from "sonner";

export function BenchmarkContainer() {
  const [currentSession, setCurrentSession] = useState<BenchmarkSession | null>(null);
  const [summaryRows, setSummaryRows] = useState<BenchmarkSummaryRow[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // State Modal Simpan Model (Promote)
  const [promoteIteration, setPromoteIteration] = useState<MCCVIteration | null>(null);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);

  // 1. Eksekusi Benchmark Run Baru
  const handleRunBenchmark = async (params: {
    file: File;
    sessionName: string;
    nSplits: number;
    seeds: string;
    testSize: number;
    fitIntercept: boolean;
    estimatorTypes: string[];
  }) => {
    setIsRunning(true);
    try {
      const res = await benchmarkService.runBenchmark(params);
      setCurrentSession(res.session);
      setSummaryRows(res.summary_rows || []);
      toast.success(
        `Benchmark selesai! Sesi "${res.session.session_name || res.session.id}" berhasil dijalankan & disimpan.`
      );
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (err as any).response?.data?.detail || "Gagal menjalankan benchmark MCCV."
          : "Gagal menjalankan benchmark MCCV.";
      toast.error(String(message));
    } finally {
      setIsRunning(false);
    }
  };

  // 2. Muat Sesi Sebelumnya dari Database
  const handleSelectExistingSession = async (sessionId: number) => {
    setIsRunning(true);
    try {
      const session = await benchmarkService.getSessionDetail(sessionId);
      setCurrentSession(session);
      setSummaryRows(session.summary_metrics || []);
      toast.success(`Berhasil memuat data sesi "${session.session_name || session.id}"!`);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (err as any).response?.data?.detail || "Gagal memuat sesi benchmark."
          : "Gagal memuat sesi benchmark.";
      toast.error(String(message));
    } finally {
      setIsRunning(false);
    }
  };

  // 3. Handler Buka Modal Promosi Model
  const handleOpenPromoteModal = (iteration: MCCVIteration) => {
    setPromoteIteration(iteration);
    setIsPromoteModalOpen(true);
  };

  const availableEstimatorTypes = summaryRows.map((r) => r.estimator);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Bagian Atas: Form Konfigurasi / Muat Sesi */}
      <div className="w-full">
        <BenchmarkForm
          onRunBenchmark={handleRunBenchmark}
          onSelectExistingSession={handleSelectExistingSession}
          isRunning={isRunning}
        />
      </div>

      {/* Bagian Bawah: Hasil Ringkasan & Tabel Iterasi */}
      <div className="w-full flex flex-col gap-6">
        {currentSession ? (
          <>
            {/* Ringkasan Evaluasi Metrik Rata-rata */}
            <BenchmarkSummary session={currentSession} summaryRows={summaryRows} />

            {/* Tabel Detail Iterasi Diurutkan dari Test R2 Tertinggi */}
            <BenchmarkIterationsTable
              sessionId={currentSession.id}
              availableEstimators={availableEstimatorTypes}
              onPromoteClick={handleOpenPromoteModal}
            />
          </>
        ) : (
          /* Placeholder Sebelum Run atau Pilih Sesi */
          <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs flex flex-col items-center justify-center gap-4 min-h-[300px]">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-xs">
              <Layers className="w-8 h-8" />
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-slate-800">
                Belum Ada Sesi Benchmark yang Aktif
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Silakan unggah dataset dan jalankan pengujian Monte Carlo Cross-Validation (MCCV)
                baru pada form di atas, atau muat sesi pengujian sebelumnya dari basis data.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Promosi / Simpan Model ke TrainedModel */}
      <PromoteModelModal
        iteration={promoteIteration}
        isOpen={isPromoteModalOpen}
        onClose={() => setIsPromoteModalOpen(false)}
        onSuccess={() => {
          // Callback setelah model berhasil dipromosikan
        }}
      />
    </div>
  );
}
