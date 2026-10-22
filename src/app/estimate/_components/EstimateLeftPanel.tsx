"use client";

import React, { useEffect } from "react";
import {
  FileUp,
  Sliders,
  Gauge,
  RotateCcw,
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import { formatEstimatorType } from "@/app/train-test/_types";
import { useEstimateApi } from "../_hooks/use-estimate-api";

export function EstimateLeftPanel() {
  const models = useEstimateApi((s) => s.models);
  const isModelsLoading = useEstimateApi((s) => s.isModelsLoading);
  const fetchModels = useEstimateApi((s) => s.fetchModels);

  const inputMode = useEstimateApi((s) => s.inputMode);
  const setInputMode = useEstimateApi((s) => s.setInputMode);

  const selectedModelId = useEstimateApi((s) => s.selectedModelId);
  const setSelectedModelId = useEstimateApi((s) => s.setSelectedModelId);

  const file = useEstimateApi((s) => s.file);
  const setFile = useEstimateApi((s) => s.setFile);

  const coInput = useEstimateApi((s) => s.coInput);
  const setCoInput = useEstimateApi((s) => s.setCoInput);

  const no2Input = useEstimateApi((s) => s.no2Input);
  const setNo2Input = useEstimateApi((s) => s.setNo2Input);

  const isEstimating = useEstimateApi((s) => s.isEstimating);
  const runEstimate = useEstimateApi((s) => s.runEstimate);
  const manualHistory = useEstimateApi((s) => s.manualHistory);
  const resetManualHistory = useEstimateApi((s) => s.resetManualHistory);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const canEstimate =
    Boolean(selectedModelId) &&
    (inputMode === "file" ? Boolean(file) : Boolean(coInput.trim() && no2Input.trim()));

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800">
      {/* =================================================================== */}
      {/* 1. PEMILIHAN JENIS INPUT (Upload Data Satelit vs Input Manual) */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-800 tracking-tight">
          Pilih Jenis Input
        </label>
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setInputMode("file")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              inputMode === "file"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Upload Data Satelit</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode("manual")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              inputMode === "manual"
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Input Manual</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. FORM BERDASARKAN MODE */}
      {/* =================================================================== */}
      {inputMode === "file" ? (
        <FileUploader
          label="Unggah Berkas Satelit Sentinel-5P"
          placeholder="Pilih file satelit (.xlsx, .csv, .xls)"
          file={file}
          onFileSelect={setFile}
          onFileRemove={() => setFile(null)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-800 tracking-tight">
            Input Nilai Gas Prekursor Sentinel-5P
          </label>
          <div className="grid grid-cols-1 gap-3">
            <Input
              label="Konsentrasi CO (mol/m²)"
              type="text"
              value={coInput}
              onChange={(e) => setCoInput(e.target.value)}
              placeholder="Contoh: 0.0332"
            />
            <Input
              label="Konsentrasi NO2 (mol/m²)"
              type="text"
              value={no2Input}
              onChange={(e) => setNo2Input(e.target.value)}
              placeholder="Contoh: 0.000092"
            />
          </div>

          {manualHistory.length > 0 && (
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900">
              <span className="font-semibold">
                Tercatat: <strong>{manualHistory.length} titik</strong> manual
              </span>
              <button
                type="button"
                onClick={resetManualHistory}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-950 underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Titik</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. PEMILIHAN MODEL DARI DATABASE */}
      {/* =================================================================== */}
      <Select
        label="Pilih Model Estimasi"
        labelRight={`${models.length} model tersedia`}
        value={selectedModelId}
        onChange={(e) => setSelectedModelId(e.target.value)}
        disabled={isModelsLoading || models.length === 0}
      >
        <option value="">
          {isModelsLoading
            ? "Memuat daftar model..."
            : models.length === 0
            ? "Belum ada model tersimpan di database"
            : "— Pilih Model Estimasi —"}
        </option>
        {models.map((m) => {
          const r2Display = m.train_r2 != null ? m.train_r2.toFixed(1) : "0.0";
          return (
            <option key={m.id} value={m.id}>
              {m.name} ({formatEstimatorType(m.estimator_type)}) • R² {r2Display}%
            </option>
          );
        })}
      </Select>

      {/* =================================================================== */}
      {/* 4. TOMBOL AKSI ESTIMASI */}
      {/* =================================================================== */}
      <Button
        variant="primary"
        onClick={runEstimate}
        disabled={isEstimating || !canEstimate}
        isLoading={isEstimating}
        loadingText="Memproses Estimasi..."
        icon={<Gauge className="w-4 h-4" />}
        fullWidth
        className="mt-1"
      >
        {inputMode === "manual" && manualHistory.length > 0
          ? `+ Tambah Titik Ke-${manualHistory.length + 1}`
          : "Jalankan Estimasi"}
      </Button>
    </div>
  );
}

export default EstimateLeftPanel;
