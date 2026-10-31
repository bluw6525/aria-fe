"use client";

import React, { useMemo } from "react";
import { Paper } from "@mantine/core";
import { LineSeries } from "@/components/LineChart";
import { BatchEstimateResult, SingleEstimateResult } from "../_types";
import { useEstimateApi, getManualBatchResult } from "../_hooks/use-estimate-api";
import { EstimateEmptyState } from "./EstimateEmptyState";
import { EstimateSingleResult } from "./EstimateSingleResult";
import { EstimateBatchResult as EstimateBatchResultComponent } from "./EstimateBatchResult";

export function EstimateRightPanel() {
  const inputMode = useEstimateApi((s) => s.inputMode);
  const selectedModelId = useEstimateApi((s) => s.selectedModelId);
  const singleResult = useEstimateApi((s) => s.singleResult);
  const batchResult = useEstimateApi((s) => s.batchResult);
  const manualHistory = useEstimateApi((s) => s.manualHistory);
  const resetEstimate = useEstimateApi((s) => s.resetEstimate);

  // Jika input mode manual memiliki >= 2 titik, ubah menjadi BatchEstimateResult otomatis
  const manualBatchResult = useMemo(() => {
    return getManualBatchResult(manualHistory, singleResult, selectedModelId);
  }, [manualHistory, singleResult, selectedModelId]);

  const isFileUploadActive = inputMode === "file";

  // Jika file upload hanya memiliki 1 baris data, konversi menjadi SingleEstimateResult
  const fileSingleResult: SingleEstimateResult | null = useMemo(() => {
    if (!isFileUploadActive || !batchResult || batchResult.chart_data.length !== 1) {
      return null;
    }
    const point = batchResult.chart_data[0];
    return {
      model_id: batchResult.model_id,
      model_name: batchResult.model_name,
      estimator_type: batchResult.estimator_type,
      equation: batchResult.equation,
      estimated_value: point.estimated_value,
      ispu_category: point.ispu_category,
    };
  }, [isFileUploadActive, batchResult]);

  const showFileSingle = isFileUploadActive && Boolean(fileSingleResult);
  const showBatch = isFileUploadActive && Boolean(batchResult) && batchResult!.chart_data.length >= 2;
  const showManualSingle = !isFileUploadActive && manualHistory.length === 1 && Boolean(singleResult);
  const showManualBatch = !isFileUploadActive && manualHistory.length >= 2 && Boolean(manualBatchResult);
  const showEmpty = !showFileSingle && !showBatch && !showManualSingle && !showManualBatch;

  const activeSingleResult: SingleEstimateResult | null = showFileSingle
    ? fileSingleResult
    : showManualSingle
    ? singleResult
    : null;

  // Active batch object to render
  const activeBatch: BatchEstimateResult | null = showBatch
    ? batchResult
    : showManualBatch
    ? manualBatchResult
    : null;

  // Garis chart untuk LineChart (fokus pada nilai estimasi ISPU)
  const chartLines: LineSeries[] = useMemo(() => {
    if (!activeBatch) return [];
    const hasActual = activeBatch.chart_data.some(
      (p) => p.actual_value !== null && p.actual_value !== undefined
    );
    const lines: LineSeries[] = [
      { key: "estimated_value", name: "Estimasi ISPU", color: "var(--mantine-color-brandPrimary-6)" },
    ];
    if (hasActual) {
      lines.unshift({ key: "actual_value", name: "ISPU Aktual", color: "#ef4444", dashed: true });
    }
    return lines;
  }, [activeBatch]);

  return (
    <Paper
      p={24}
      shadow="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        minHeight: 580,
      }}
    >
      {/* 1. Empty State (Placeholder) */}
      {showEmpty && (
        <EstimateEmptyState isFileUploadActive={isFileUploadActive} />
      )}

      {/* 2. Hasil Estimasi Titik Tunggal (Manual 1 Titik atau File 1 Baris) */}
      {activeSingleResult && (
        <EstimateSingleResult
          result={activeSingleResult}
          onReset={resetEstimate}
          isManual={showManualSingle}
        />
      )}

      {/* 3. Hasil Estimasi Batch / Multi-titik Kumulatif */}
      {activeBatch && (
        <EstimateBatchResultComponent
          batch={activeBatch}
          showManualBatch={showManualBatch}
          chartLines={chartLines}
          onReset={resetEstimate}
        />
      )}
    </Paper>
  );
}

export default EstimateRightPanel;
