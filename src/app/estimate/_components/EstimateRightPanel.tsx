"use client";

import React, { useMemo } from "react";
import { LineSeries } from "@/components/LineChart";
import { BatchEstimateResult } from "../_types";
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
  const showBatch = isFileUploadActive && Boolean(batchResult);
  const showManualSingle = !isFileUploadActive && manualHistory.length === 1 && Boolean(singleResult);
  const showManualBatch = !isFileUploadActive && manualHistory.length >= 2 && Boolean(manualBatchResult);
  const showEmpty = !showBatch && !showManualSingle && !showManualBatch;

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
      { key: "estimated_value", name: "Estimasi ISPU", color: "#0284c7" },
    ];
    if (hasActual) {
      lines.unshift({ key: "actual_value", name: "ISPU Aktual", color: "#10b981", dashed: true });
    }
    return lines;
  }, [activeBatch]);

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-6 text-slate-900 border border-slate-200 shadow-sm min-h-145">
      {/* 1. Empty State (Placeholder) */}
      {showEmpty && (
        <EstimateEmptyState isFileUploadActive={isFileUploadActive} />
      )}

      {/* 2. Hasil Estimasi Titik Tunggal (Manual Mode 1 Titik) */}
      {showManualSingle && singleResult && (
        <EstimateSingleResult
          result={singleResult}
          onReset={resetEstimate}
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
    </div>
  );
}

export default EstimateRightPanel;
