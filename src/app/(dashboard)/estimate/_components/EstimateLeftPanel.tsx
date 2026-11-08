"use client";

import React, { useEffect } from "react";
import {
  FileUp,
  Sliders,
  Gauge,
  RotateCcw,
} from "lucide-react";
import { Stack, Box, SimpleGrid, Flex, UnstyledButton, Text, Select } from "@mantine/core";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { formatEstimatorType } from "@/app/(dashboard)/train-test/_types";
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
    <Stack gap={24} style={{ color: "var(--mantine-color-brandSecondary-8)", width: "100%" }}>
      {/* 1. PEMILIHAN JENIS INPUT */}
      <Box style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Text size="xs" fw={700} c="brandSecondary.8">
          Pilih Jenis Input
        </Text>
        <SimpleGrid
          cols={2}
          p={4}
          style={{
            backgroundColor: "var(--mantine-color-brandSecondary-1)",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
          }}
        >
          <UnstyledButton
            onClick={() => setInputMode("file")}
            py={8}
            px={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: inputMode === "file" ? "#ffffff" : "transparent",
              color: inputMode === "file"
                ? "var(--mantine-color-brandPrimary-7)"
                : "var(--mantine-color-brandSecondary-6)",
              boxShadow: inputMode === "file" ? "var(--mantine-shadow-xs)" : "none",
              transition: "all 150ms ease",
            }}
          >
            <FileUp style={{ width: 14, height: 14 }} />
            <span>Upload Data Satelit</span>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => setInputMode("manual")}
            py={8}
            px={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: inputMode === "manual" ? "#ffffff" : "transparent",
              color: inputMode === "manual"
                ? "var(--mantine-color-brandPrimary-7)"
                : "var(--mantine-color-brandSecondary-6)",
              boxShadow: inputMode === "manual" ? "var(--mantine-shadow-xs)" : "none",
              transition: "all 150ms ease",
            }}
          >
            <Sliders style={{ width: 14, height: 14 }} />
            <span>Input Manual</span>
          </UnstyledButton>
        </SimpleGrid>
      </Box>

      {/* 2. FORM BERDASARKAN MODE */}
      {inputMode === "file" ? (
        <FileUploader
          label="Unggah Berkas Satelit Sentinel-5P"
          placeholder="Pilih file satelit (.xlsx, .csv, .xls)"
          file={file}
          onFileSelect={setFile}
          onFileRemove={() => setFile(null)}
        />
      ) : (
        <Stack gap={12}>
          <Text size="xs" fw={700} c="brandSecondary.8">
            Input Nilai Gas Prekursor Sentinel-5P
          </Text>
          <Stack gap={12}>
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
          </Stack>

          {manualHistory.length > 0 && (
            <Flex
              align="center"
              justify="space-between"
              px={14}
              py={10}
              style={{
                backgroundColor: "var(--mantine-color-brandPrimary-0)",
                border: "1px solid #bae6fd",
                borderRadius: 12,
                fontSize: 12,
                color: "var(--mantine-color-brandPrimary-9)",
              }}
            >
              <span style={{ fontWeight: 600 }}>
                Tercatat: <strong>{manualHistory.length} titik</strong> manual
              </span>
              <UnstyledButton
                onClick={resetManualHistory}
                px={12}
                py={6}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderRadius: 12,
                  backgroundColor: "var(--mantine-color-brandSecondary-1)",
                  color: "var(--mantine-color-brandSecondary-7)",
                  fontSize: 12,
                  fontWeight: 700,
                  transition: "all 150ms ease",
                }}
              >
                <RotateCcw style={{ width: 14, height: 14 }} />
                <span>Reset</span>
              </UnstyledButton>
            </Flex>
          )}
        </Stack>
      )}

      {/* 3. PEMILIHAN MODEL DARI DATABASE */}
      <Select
        label={
          <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <span>Pilih Model Estimasi</span>
            <Text component="span" size="xs" c="dimmed" fw={400}>
              {models.length} model tersedia
            </Text>
          </Flex>
        }
        placeholder={
          isModelsLoading
            ? "Memuat daftar model..."
            : models.length === 0
            ? "Belum ada model tersimpan di database"
            : "— Pilih Model Estimasi —"
        }
        value={selectedModelId || null}
        onChange={(val) => setSelectedModelId(val || "")}
        disabled={isModelsLoading || models.length === 0}
        data={models.map((m) => ({
          value: String(m.id),
          label: `${m.name} (${formatEstimatorType(m.estimator_type)})`,
        }))}
        searchable
        clearable
        nothingFoundMessage="Tidak ada model ditemukan"
        radius="md"
      />

      {/* 4. TOMBOL AKSI ESTIMASI */}
      <Button
        variant="primary"
        onClick={runEstimate}
        disabled={isEstimating || !canEstimate}
        isLoading={isEstimating}
        loadingText="Memproses Estimasi..."
        icon={<Gauge style={{ width: 16, height: 16 }} />}
        fullWidth
      >
        {inputMode === "manual" && manualHistory.length > 0
          ? `+ Tambah Titik Ke-${manualHistory.length + 1}`
          : "Jalankan Estimasi"}
      </Button>
    </Stack>
  );
}

export default EstimateLeftPanel;
