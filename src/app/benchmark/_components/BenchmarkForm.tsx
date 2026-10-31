"use client";

import React, { useState } from "react";
import { BenchmarkSession, benchmarkService } from "@/lib/api/services/benchmark-service";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { FileUploader } from "@/components/FileUploader";
import {
  History,
  Layers,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_ALGORITHMS = [
  { id: "OLS", label: "OLS (Least Squares)", desc: "Metode kuadrat terkecil standar" },
  { id: "M", label: "M-Estimator", desc: "Robust terhadap outlier vertikal (y)" },
  { id: "S", label: "S-Estimator", desc: "Breakdown point tinggi 50%" },
  { id: "MM", label: "MM-Estimator", desc: "Breakdown point 50% & resisten leverage" },
];

interface BenchmarkFormProps {
  onRunBenchmark: (formData: {
    file: File;
    sessionName: string;
    nSplits: number;
    seeds: string;
    testSize: number;
    fitIntercept: boolean;
    estimatorTypes: string[];
  }) => Promise<void>;
  onSelectExistingSession: (sessionId: number) => Promise<void>;
  isRunning: boolean;
}

export function BenchmarkForm({
  onRunBenchmark,
  onSelectExistingSession,
  isRunning,
}: BenchmarkFormProps) {
  // Mode: "new" atau "history"
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");

  // State Riwayat Sesi
  const [sessions, setSessions] = useState<BenchmarkSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | "">("");
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);

  // Form State untuk Run Baru
  const [file, setFile] = useState<File | null>(null);
  const [sessionName, setSessionName] = useState("");
  const [nSplits, setNSplits] = useState(200);
  const [seedsInput, setSeedsInput] = useState("");
  const [testSize, setTestSize] = useState(0.2);
  const fitIntercept = true; // Selalu bernilai True sama seperti Latih dan Uji
  const [selectedEstimators, setSelectedEstimators] = useState<string[]>([
    "OLS",
    "M",
    "S",
    "MM",
  ]);

  // Load daftar sesi saat tab history dibuka
  const loadSessions = async () => {
    setIsLoadingSessions(true);
    try {
      const data = await benchmarkService.getSessions(1, 100);
      setSessions(data);
    } catch {
      toast.error("Gagal Memuat Riwayat", {
        description: "Tidak dapat mengambil daftar riwayat sesi benchmark.",
      });
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const handleToggleEstimator = (id: string) => {
    if (selectedEstimators.includes(id)) {
      setSelectedEstimators(selectedEstimators.filter((e) => e !== id));
    } else {
      setSelectedEstimators([...selectedEstimators, id]);
    }
  };

  const handleSelectAllEstimators = () => {
    if (selectedEstimators.length === AVAILABLE_ALGORITHMS.length) {
      // Batal Semua
      setSelectedEstimators([]);
    } else {
      // Pilih Semua
      setSelectedEstimators(AVAILABLE_ALGORITHMS.map((a) => a.id));
    }
  };

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Berkas Diperlukan", {
        description: "Silakan pilih berkas dataset terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    if (selectedEstimators.length === 0) {
      toast.warning("Algoritma Belum Dipilih", {
        description: "Pilih minimal satu algoritma regresi untuk dijalankan.",
      });
      return;
    }
    if (nSplits <= 0) {
      toast.warning("Input Tidak Valid", {
        description: "Jumlah iterasi split harus lebih dari 0.",
      });
      return;
    }

    await onRunBenchmark({
      file,
      sessionName: sessionName.trim(),
      nSplits,
      seeds: seedsInput.trim(),
      testSize,
      fitIntercept,
      estimatorTypes: selectedEstimators,
    });
  };

  const handleLoadSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionId) {
      toast.warning("Sesi Belum Dipilih", {
        description: "Pilih sesi benchmark terlebih dahulu dari daftar riwayat.",
      });
      return;
    }
    await onSelectExistingSession(Number(selectedSessionId));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col p-6 gap-6">
      {/* Tab Switcher: Buat Run Baru vs Muat Sesi Sebelumnya */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "new"
              ? "bg-white text-sky-700 shadow-xs"
              : "hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Jalankan Baru</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("history");
            loadSessions();
          }}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "history"
              ? "bg-white text-sky-700 shadow-xs"
              : "hover:text-slate-900"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Muat Sesi Lalu</span>
        </button>
      </div>

      {/* Konten Tab 1: Jalankan Benchmark Baru */}
      {activeTab === "new" && (
        <form onSubmit={handleSubmitNew} className="flex flex-col gap-5">
          {/* 1. Unggah File Dataset (Menggunakan komponen FileUploader standar) */}
          <FileUploader
            label="Unggah Berkas Dataset Latih & Uji"
            placeholder="Pilih berkas dataset (.xlsx, .csv, .xls)"
            hint="Hanya variabel CO satelit, NO2 satelit, dan O3 SPKU yang diproses. Data missing O3 diinterpolasi Natural Cubic Spline."
            file={file}
            onFileSelect={setFile}
            onFileRemove={() => setFile(null)}
            disabled={isRunning}
          />

          {/* 2. Nama Sesi (Opsional) */}
          <Input
            id="sessionName"
            label="Nama Sesi Benchmark (Opsional)"
            placeholder="Contoh: Evaluasi 4 Model - Lahan Gambut"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            disabled={isRunning}
          />

          {/* 3. Pilihan Algoritma Regresi (Checkbox HTML Standar) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Pilih Algoritma Model ({selectedEstimators.length}/{AVAILABLE_ALGORITHMS.length})
              </label>
              <button
                type="button"
                onClick={handleSelectAllEstimators}
                className="text-[11px] text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
              >
                {selectedEstimators.length === AVAILABLE_ALGORITHMS.length ? "Batal Semua" : "Pilih Semua"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {AVAILABLE_ALGORITHMS.map((algo) => (
                <label
                  key={algo.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 transition-all cursor-pointer select-none text-xs text-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={selectedEstimators.includes(algo.id)}
                    onChange={() => handleToggleEstimator(algo.id)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{algo.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{algo.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Konfigurasi Iterasi & Split Latih:Uji (80:20, 70:30, 60:40) */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="nSplits"
              type="number"
              label="Jumlah Iterasi"
              min={1}
              max={1000}
              value={nSplits}
              onChange={(e) => setNSplits(Math.max(1, Number(e.target.value)))}
              disabled={isRunning}
            />
            <Select
              label="Rasio Data Latih & Uji"
              value={testSize}
              onChange={(e) => setTestSize(Number(e.target.value))}
              disabled={isRunning}
            >
              <option value={0.2}>80:20 (80% Latih : 20% Uji)</option>
              <option value={0.3}>70:30 (70% Latih : 30% Uji)</option>
              <option value={0.4}>60:40 (60% Latih : 40% Uji)</option>
            </Select>
          </div>

          {/* 5. Input Seed Kustom (Opsional) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <label htmlFor="seedsInput">Seed Acak Kustom (Opsional)</label>
              <span className="text-[10px] text-slate-400 font-normal">Pisahkan koma / spasi</span>
            </div>
            <textarea
              id="seedsInput"
              rows={2}
              value={seedsInput}
              onChange={(e) => setSeedsInput(e.target.value)}
              disabled={isRunning}
              placeholder="Contoh: 42, 100, 2024. Jika kurang akan digenerate otomatis, jika lebih akan dipotong sesuai jumlah iterasi."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-sm transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isRunning}
            loadingText="Menjalankan Simulasi MCCV..."
            icon={<Layers className="w-4 h-4" />}
            disabled={!file || selectedEstimators.length === 0}
          >
            Mulai Benchmark Model
          </Button>
        </form>
      )}

      {/* Konten Tab 2: Muat Sesi Sebelumnya dari Database */}
      {activeTab === "history" && (
        <form onSubmit={handleLoadSessionSubmit} className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              Pilih Sesi Benchmark Sebelumnya
            </label>
            <button
              type="button"
              onClick={loadSessions}
              className="p-1 text-slate-400 hover:text-sky-600 transition-colors"
              title="Refresh Riwayat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {isLoadingSessions ? (
            <div className="p-8 text-center text-xs text-slate-400">Memuat daftar sesi...</div>
          ) : sessions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              Belum ada riwayat sesi benchmark di basis data. Silakan jalankan simulasi baru terlebih dahulu.
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {sessions.map((sess) => {
                const isSelected = selectedSessionId === sess.id;
                return (
                  <div
                    key={sess.id}
                    onClick={() => setSelectedSessionId(sess.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 text-xs select-none ${
                      isSelected
                        ? "bg-sky-50 border-sky-400 text-sky-950 font-semibold shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <span className="font-bold truncate max-w-[200px] sm:max-w-none sm:overflow-visible sm:whitespace-normal break-words">
                        {sess.session_name || `Sesi #${sess.id}`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 whitespace-nowrap pt-0.5">
                        {sess.created_at ? new Date(sess.created_at).toLocaleDateString("id-ID") : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-normal">
                      <span>File: {sess.dataset_name}</span>
                      <span>•</span>
                      <span>{sess.total_seeds} Seeds</span>
                      <span>•</span>
                      <span>Test {(sess.test_size * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isRunning}
            loadingText="Memuat Sesi..."
            disabled={!selectedSessionId || isLoadingSessions}
            icon={<History className="w-4 h-4" />}
          >
            Tampilkan Data Sesi Terpilih
          </Button>
        </form>
      )}
    </div>
  );
}
