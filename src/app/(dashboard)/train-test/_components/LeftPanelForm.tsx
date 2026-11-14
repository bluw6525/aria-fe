"use client";

import React, { useState, useEffect } from "react";
import { Stack, Box, Text, Flex, Select } from "@mantine/core";
import { Cpu, FileCheck, Save } from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { notify } from "@/lib/notifications";
import { formatEstimatorType } from "../_types";
import { useRegressionApi } from "../_hooks/use-regression-api";

export function LeftPanelForm() {
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

  useEffect(() => {
    if (!selectedModelId && models.length > 0) {
      const active = models.find((m) => m.is_active);
      if (active) {
        setSelectedModelId(String(active.id));
      }
    }
  }, [models, selectedModelId]);

  // Handler Latih
  const handleTrainClick = async () => {
    if (!trainFile) {
      notify.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    try {
      const res = await trainModel(trainFile, estimator);
      if (res) {
        setSelectedModelId("current");
      }
    } catch {
      // Ditangani oleh interceptor/hook
    }
  };

  // Handler Deteksi Outlier
  const handleDetectOutliersClick = async () => {
    if (!trainFile) {
      notify.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data latih terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    await detectOutliers(trainFile);
  };

  // Handler Simpan Model
  const handleSaveClick = async () => {
    if (!modelNameInput.trim()) {
      notify.warning("Nama Model Kosong", {
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
      notify.warning("Model Belum Dipilih", {
        description: "Harap pilih model yang ingin diuji dari dropdown.",
      });
      return;
    }
    if (!testFile) {
      notify.warning("Berkas Diperlukan", {
        description: "Harap pilih berkas data uji terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    const targetModelId = selectedModelId === "current" ? "current" : Number(selectedModelId);
    await testModel(targetModelId, testFile);
  };

  return (
    <Stack gap="xl">
      {/* =================================================================== */}
      {/* SECTION 1: PELATIHAN MODEL */}
      {/* =================================================================== */}
      <Stack gap="md">
        <Box pb={4} style={{ borderBottom: "1px solid #f1f5f9" }}>
          <Text size="xs" fw={700} c="brandSecondary.9">
            1. Konfigurasi Data Latih
          </Text>
        </Box>

        {/* Upload Data Latih */}
        <FileUploader
          label="Unggah Berkas Data Latih"
          hint="Hanya variabel CO satelit, NO2 satelit, dan O3 SPKU yang diproses. Missing value O3 otomatis diinterpolasi Natural Cubic Spline."
          file={trainFile}
          onFileSelect={setTrainFile}
          onFileRemove={() => setTrainFile(null)}
        />

        {/* Pilih Estimator */}
        <Select
          label="Metode Regresi Robust"
          value={estimator}
          onChange={(val) => setEstimator(val || "MM")}
          data={[
            { value: "MM", label: "MM-Estimator" },
            { value: "M", label: "M-Estimator" },
            { value: "S", label: "S-Estimator" },
            { value: "OLS", label: "Ordinary Least Squares (OLS)" },
          ]}
          allowDeselect={false}
          radius="md"
        />

        {/* Action Row: Deteksi Outlier & Latih */}
        <Stack gap="xs" pt={4}>
          <Button
            variant="secondary"
            onClick={handleDetectOutliersClick}
            disabled={isDetectingOutliers || !trainFile}
            isLoading={isDetectingOutliers}
            loadingText="Mendeteksi Outlier (Leverage & DFFITS)..."
            fullWidth
          >
            Deteksi Outlier (optional)
          </Button>

          <Button
            variant="primary"
            onClick={handleTrainClick}
            disabled={isTraining || !trainFile}
            isLoading={isTraining}
            loadingText="Memproses Estimasi Model..."
            icon={<Cpu size={16} />}
            fullWidth
          >
            Latih Model
          </Button>
        </Stack>

        {/* Input & Simpan Model */}
        <Stack gap="xs" pt={8} style={{ borderTop: "1px solid #f1f5f9" }}>
          <Text size="xs" fw={700} c="brandSecondary.8">
            Simpan Parameter Model ke Database
          </Text>
          <Flex gap="xs" align="center">
            <Box style={{ flex: 1 }}>
              <Input
                type="text"
                value={modelNameInput}
                onChange={(e) => setModelNameInput(e.target.value)}
                placeholder="Ketik nama model..."
              />
            </Box>
            <Button
              variant="primary"
              onClick={handleSaveClick}
              disabled={isSaving || !modelNameInput.trim()}
              isLoading={isSaving}
              icon={<Save size={14} />}
            >
              Simpan
            </Button>
          </Flex>
        </Stack>
      </Stack>

      {/* =================================================================== */}
      {/* SECTION 2: PENGUJIAN MODEL */}
      {/* =================================================================== */}
      <Stack gap="md" pt="md" style={{ borderTop: "1px solid #e2e8f0" }}>
        <Box pb={4} style={{ borderBottom: "1px solid #f1f5f9" }}>
          <Text size="xs" fw={700} c="brandSecondary.9">
            2. Pengujian Terhadap Data Uji
          </Text>
        </Box>

        {/* Pilih Model Pengujian */}
        <Select
          label={
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <span>Pilih Model Pengujian</span>
              <Text component="span" size="xs" c="dimmed" fw={400}>
                {models.length} model di database
              </Text>
            </Flex>
          }
          placeholder={isModelsLoading ? "Memuat model..." : "— Pilih Model Pengujian —"}
          value={selectedModelId || null}
          onChange={(val) => setSelectedModelId(val || "")}
          disabled={isModelsLoading || (models.length === 0 && !trainResult)}
          data={[
            ...(trainResult ? [{ value: "current", label: "★ Model Baru Dilatih • Belum Disimpan" }] : []),
            ...models.map((m) => ({
              value: String(m.id),
              label: `${m.is_active ? "● [Aktif] " : ""}${m.name} (${formatEstimatorType(m.estimator_type)})`,
            })),
          ]}
          searchable
          clearable
          nothingFoundMessage="Tidak ada model ditemukan"
          radius="md"
        />

        {/* Unggah Berkas Data Uji */}
        <FileUploader
          label="Unggah Berkas Data Uji"
          placeholder="Pilih file data uji (.xlsx, .csv, .xls)"
          hint="Hanya data dengan CO satelit, NO2 satelit, dan O3 SPKU lengkap yang diproses untuk evaluasi."
          file={testFile}
          onFileSelect={setTestFile}
          onFileRemove={() => setTestFile(null)}
        />

        {/* Tombol Uji Model */}
        <Button
          variant="primary"
          onClick={handleTestClick}
          disabled={isTesting || !selectedModelId || !testFile}
          isLoading={isTesting}
          loadingText="Memvalidasi Data Uji..."
          icon={<FileCheck size={16} />}
          fullWidth
        >
          Uji Model Terhadap Data Baru
        </Button>
      </Stack>
    </Stack>
  );
}
