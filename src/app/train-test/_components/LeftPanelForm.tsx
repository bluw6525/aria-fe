"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Cpu,
  Save,
  FileCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
  FileSpreadsheet,
  X,
  ChevronDown,
  Layers,
  FlaskConical,
} from "lucide-react";
import { TrainedModel } from "../types";

interface LeftPanelFormProps {
  models: TrainedModel[];
  isModelsLoading: boolean;
  onDetectOutliers: (file: File) => Promise<unknown>;
  isDetectingOutliers: boolean;
  onTrain: (file: File, estimator: string) => Promise<unknown>;
  isTraining: boolean;
  onSaveModel: (name: string) => Promise<unknown>;
  isSaving: boolean;
  saveSuccessMessage: string | null;
  onTestModel: (modelId: number, file: File) => Promise<unknown>;
  isTesting: boolean;
}

export function formatR2Display(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0.0";
  const num = Math.abs(val) <= 1.0 ? val * 100 : val;
  return num.toFixed(1);
}

export function LeftPanelForm({
  models,
  isModelsLoading,
  onDetectOutliers,
  isDetectingOutliers,
  onTrain,
  isTraining,
  onSaveModel,
  isSaving,
  saveSuccessMessage,
  onTestModel,
  isTesting,
}: LeftPanelFormProps) {
  // State Data Latih
  const [trainFile, setTrainFile] = useState<File | null>(null);
  const [estimator, setEstimator] = useState<string>("MM");
  const [modelNameInput, setModelNameInput] = useState<string>("");
  const trainFileInputRef = useRef<HTMLInputElement>(null);

  // State Data Uji
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [testFile, setTestFile] = useState<File | null>(null);
  const testFileInputRef = useRef<HTMLInputElement>(null);

  // Handler Latih
  const handleTrainClick = async () => {
    if (!trainFile) {
      alert("Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).");
      return;
    }
    await onTrain(trainFile, estimator);
  };

  // Handler Deteksi Outlier
  const handleDetectOutliersClick = async () => {
    if (!trainFile) {
      alert("Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).");
      return;
    }
    await onDetectOutliers(trainFile);
  };

  // Handler Simpan Model
  const handleSaveClick = async () => {
    if (!modelNameInput.trim()) {
      alert("Harap masukkan Nama Model sebelum menyimpan.");
      return;
    }
    await onSaveModel(modelNameInput.trim());
    setModelNameInput("");
  };

  // Handler Uji Model
  const handleTestClick = async () => {
    if (!selectedModelId) {
      alert("Harap pilih model yang ingin diuji dari dropdown.");
      return;
    }
    if (!testFile) {
      alert("Harap pilih berkas data uji terlebih dahulu (.xlsx, .csv, atau .xls).");
      return;
    }
    await onTestModel(Number(selectedModelId), testFile);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800">
      {/* =================================================================== */}
      {/* SECTION 1: PELATIHAN MODEL */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. Konfigurasi Data Latih
          </span>
        </div>

        {/* Upload Data Latih */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-800">
            Unggah Berkas Data Latih
          </label>
          <input
            ref={trainFileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setTrainFile(e.target.files[0]);
              }
            }}
          />

          {trainFile ? (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-sky-300 bg-sky-50/70 text-slate-800 transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileSpreadsheet className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-bold truncate text-sky-950">
                  {trainFile.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTrainFile(null)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                title="Hapus berkas"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => trainFileInputRef.current?.click()}
              className="group w-full h-11 px-4 border border-dashed border-slate-300 hover:border-sky-500 rounded-xl bg-slate-50/50 hover:bg-sky-50/40 flex items-center justify-between text-xs font-medium text-slate-600 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                <span>Pilih file (.xlsx, .csv, .xls)</span>
              </div>
              <Upload className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </button>
          )}
        </div>

        {/* Pilih Estimator */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-800">
            Metode Regresi Robust
          </label>
          <div className="relative">
            <select
              value={estimator}
              onChange={(e) => setEstimator(e.target.value)}
              className="w-full h-11 pl-3.5 pr-9 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-2xs transition-all appearance-none cursor-pointer"
            >
              <option value="MM">MM-Estimator (Tukey Bisquare - Rekomendasi)</option>
              <option value="M">M-Estimator (Tukey Bisquare)</option>
              <option value="S">S-Estimator (High Breakdown Point)</option>
              <option value="OLS">OLS (Ordinary Least Squares)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Action Row: Deteksi Outlier & Latih */}
        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {/* Tombol Deteksi Outlier (optional) */}
          <button
            type="button"
            onClick={handleDetectOutliersClick}
            disabled={isDetectingOutliers || !trainFile}
            className="w-full h-10 rounded-xl bg-amber-50 hover:bg-amber-100/80 disabled:bg-slate-100 disabled:text-slate-400 text-amber-900 border border-amber-200/90 font-semibold text-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            {isDetectingOutliers ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                <span>Mendeteksi Outlier (Leverage & DFFITS)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Deteksi Outlier (optional)</span>
              </>
            )}
          </button>

          {/* Tombol Latih */}
          <button
            type="button"
            onClick={handleTrainClick}
            disabled={isTraining || !trainFile}
            className="w-full h-11 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs tracking-wide shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isTraining ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Memproses Estimasi Model...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Latih Model</span>
              </>
            )}
          </button>
        </div>

        {/* Input & Simpan Model */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800">
            Simpan Parameter Model ke Database
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={modelNameInput}
              onChange={(e) => setModelNameInput(e.target.value)}
              placeholder="Ketik nama model..."
              className="flex-1 h-10 px-3.5 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-2xs transition-all"
            />
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving || !modelNameInput.trim()}
              className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan</span>
                </>
              )}
            </button>
          </div>

          {saveSuccessMessage && (
            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* SECTION 2: PENGUJIAN MODEL */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-4 pt-3 border-t border-slate-200">
        {/* Section Header */}
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <FlaskConical className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. Pengujian Terhadap Data Uji
          </span>
        </div>

        {/* Pilih Model dari Database */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Pilih Model Tersimpan</span>
            <span className="text-[10px] font-normal text-slate-500">
              {models.length} model di database
            </span>
          </label>
          <div className="relative">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              disabled={isModelsLoading}
              className="w-full h-11 pl-3.5 pr-9 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-2xs transition-all appearance-none cursor-pointer"
            >
              <option value="">
                {isModelsLoading ? "Memuat model..." : "— Pilih Model dari Database —"}
              </option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.estimator_type}) • R² {formatR2Display(m.train_r2)}%
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Unggah Berkas Data Uji */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-800">
            Unggah Berkas Data Uji
          </label>
          <input
            ref={testFileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setTestFile(e.target.files[0]);
              }
            }}
          />

          {testFile ? (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/70 text-slate-800 transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold truncate text-emerald-950">
                  {testFile.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTestFile(null)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                title="Hapus berkas"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => testFileInputRef.current?.click()}
              className="group w-full h-11 px-4 border border-dashed border-slate-300 hover:border-emerald-500 rounded-xl bg-slate-50/50 hover:bg-emerald-50/30 flex items-center justify-between text-xs font-medium text-slate-600 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                <span>Pilih file data uji (.xlsx, .csv, .xls)</span>
              </div>
              <Upload className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </button>
          )}
        </div>

        {/* Tombol Uji Model */}
        <button
          type="button"
          onClick={handleTestClick}
          disabled={isTesting || !selectedModelId || !testFile}
          className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          {isTesting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Memvalidasi Data Uji...</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4" />
              <span>Uji Model Terhadap Data Baru</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
