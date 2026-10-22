"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  FileCheck,
  Save,
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { toast } from "sonner";
import { formatEstimatorType } from "../_types";
import { useRegressionApi } from "../_hooks/use-regression-api";

export function LeftPanelForm() {
  // Ambil data dan aksi dari hook Zustand
  const models = useRegressionApi((s) => s.models);
  const isModelsLoading = useRegressionApi((s) => s.isModelsLoading);
  const fetchModels = useRegressionApi((s) => s.fetchModels);
  const detectOutliers = useRegressionApi((s) => s.detectOutliers);
  const isDetectingOutliers = useRegressionApi((s) => s.isDetectingOutliers);
  const trainModel = useRegressionApi((s) => s.trainModel);
  const isTraining = useRegressionApi((s) => s.isTraining);
  const saveCurrentModel = useRegressionApi((s) => s.saveCurrentModel);
  const isSaving = useRegressionApi((s) => s.isSaving);
  const testModel = useRegressionApi((s) => s.testModel);
  const isTesting = useRegressionApi((s) => s.isTesting);
  const trainResult = useRegressionApi((s) => s.trainResult);

  // Ambil daftar model tersimpan saat pertama kali dimuat
  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  // State Data Latih
  const [trainFile, setTrainFile] = useState<File | null>(null);
  const [estimator, setEstimator] = useState<string>("MM");
  const [modelNameInput, setModelNameInput] = useState<string>("");

  // State Data Uji
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [testFile, setTestFile] = useState<File | null>(null);

  // Otomatis pilih opsi 'Model Baru Dilatih' saat pelatihan selesai
  useEffect(() => {
    if (trainResult) {
      setSelectedModelId("current");
    }
  }, [trainResult]);

  // Handler Latih
  const handleTrainClick = async () => {
    if (!trainFile) {
      toast.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    await trainModel(trainFile, estimator);
  };

  // Handler Deteksi Outlier
  const handleDetectOutliersClick = async () => {
    if (!trainFile) {
      toast.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    await detectOutliers(trainFile);
  };

  // Handler Simpan Model
  const handleSaveClick = async () => {
    if (!modelNameInput.trim()) {
      toast.warning("Nama Model Kosong", {
        description: "Harap masukkan nama model sebelum menyimpan ke database.",
      });
      return;
    }
    await saveCurrentModel(modelNameInput.trim());
    setModelNameInput("");
  };

  // Handler Uji Model
  const handleTestClick = async () => {
    if (!selectedModelId) {
      toast.warning("Model Belum Dipilih", {
        description: "Harap pilih model yang ingin diuji dari dropdown.",
      });
      return;
    }
    if (!testFile) {
      toast.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data uji terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    const targetModelId = selectedModelId === "current" ? "current" : Number(selectedModelId);
    await testModel(targetModelId, testFile);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800">
      {/* =================================================================== */}
      {/* SECTION 1: PELATIHAN MODEL */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-4">
        {/* Section Header */}
        <div className="pb-1 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            1. Konfigurasi Data Latih
          </span>
        </div>

        {/* Upload Data Latih (Reusable Component) */}
        <FileUploader
          label="Unggah Berkas Data Latih"
          file={trainFile}
          onFileSelect={setTrainFile}
          onFileRemove={() => setTrainFile(null)}
        />

        {/* Pilih Estimator (Reusable Component) */}
        <Select
          label="Metode Regresi Robust"
          value={estimator}
          onChange={(e) => setEstimator(e.target.value)}
        >
          <option value="MM">MM-Estimator (k=4.685)</option>
          <option value="MM-1.547">MM-Estimator (k=1.547)</option>
          <option value="M">M-Estimator</option>
          <option value="S">S-Estimator</option>
          <option value="OLS">Ordinary Least Squares (OLS)</option>
        </Select>

        {/* Action Row: Deteksi Outlier & Latih (Reusable Buttons) */}
        <div className="grid grid-cols-1 gap-2.5 pt-1 relative isolate">
          <Button
            variant="secondary"
            onClick={handleDetectOutliersClick}
            disabled={isDetectingOutliers || !trainFile}
            isLoading={isDetectingOutliers}
            loadingText="Mendeteksi Outlier (Leverage & DFFITS)..."
            fullWidth
            className="h-10"
          >
            Deteksi Outlier (optional)
          </Button>

          <Button
            variant="primary"
            onClick={handleTrainClick}
            disabled={isTraining || !trainFile}
            isLoading={isTraining}
            loadingText="Memproses Estimasi Model..."
            icon={<Cpu className="w-4 h-4" />}
            fullWidth
          >
            Latih Model
          </Button>
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
              className="flex-1 h-10 px-3.5 border border-slate-300 hover:border-slate-400 rounded-xl bg-white text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-sm transition-all"
            />
            <Button
              variant="primary"
              onClick={handleSaveClick}
              disabled={isSaving || !modelNameInput.trim()}
              isLoading={isSaving}
              icon={<Save className="w-3.5 h-3.5" />}
              className="h-10 px-4 shrink-0"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SECTION 2: PENGUJIAN MODEL */}
      {/* =================================================================== */}
      <div className="flex flex-col gap-4 pt-3 border-t border-slate-200">
        {/* Section Header */}
        <div className="pb-1 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            2. Pengujian Terhadap Data Uji
          </span>
        </div>

        {/* Pilih Model Pengujian (Reusable Component) */}
        <Select
          label="Pilih Model Pengujian"
          labelRight={`${models.length} model di database`}
          value={selectedModelId}
          onChange={(e) => setSelectedModelId(e.target.value)}
          disabled={isModelsLoading}
        >
          <option value="">
            {isModelsLoading ? "Memuat model..." : "— Pilih Model Pengujian —"}
          </option>
          {trainResult && (
            <option value="current" className="font-bold text-sky-800 bg-sky-50">
              ★ Model Baru Dilatih • Belum Disimpan
            </option>
          )}
          {models.map((m) => {
            const r2Display = m.train_r2 != null ? m.train_r2.toFixed(1) : "0.0";
            return (
              <option key={m.id} value={m.id}>
                {m.name} ({formatEstimatorType(m.estimator_type)}) • R² {r2Display}%
              </option>
            );
          })}
        </Select>

        {/* Unggah Berkas Data Uji (Reusable Component) */}
        <FileUploader
          label="Unggah Berkas Data Uji"
          placeholder="Pilih file data uji (.xlsx, .csv, .xls)"
          file={testFile}
          onFileSelect={setTestFile}
          onFileRemove={() => setTestFile(null)}
        />

        {/* Tombol Uji Model (Reusable Button) */}
        <Button
          variant="primary"
          onClick={handleTestClick}
          disabled={isTesting || !selectedModelId || !testFile}
          isLoading={isTesting}
          loadingText="Memvalidasi Data Uji..."
          icon={<FileCheck className="w-4 h-4" />}
          fullWidth
          className="mt-1"
        >
          Uji Model Terhadap Data Baru
        </Button>
      </div>
    </div>
  );
}
