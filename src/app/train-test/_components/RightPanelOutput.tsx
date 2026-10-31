"use client";

import React from "react";
import { useRegressionApi } from "../_hooks/use-regression-api";
import { TrainTestEmptyState } from "./TrainTestEmptyState";
import { OutlierResultCard } from "./OutlierResultCard";
import { TrainResultCard } from "./TrainResultCard";
import { TestResultCard } from "./TestResultCard";

export function RightPanelOutput() {
  // Ambil state langsung dari Zustand hook
  const outlierResult = useRegressionApi((s) => s.outlierResult);
  const trainResult = useRegressionApi((s) => s.trainResult);
  const testResult = useRegressionApi((s) => s.testResult);

  const hasAnyOutput = Boolean(outlierResult || trainResult || testResult);

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-6 text-slate-900 border border-slate-200 shadow-sm min-h-145">
      {/* 1. Empty State Placeholder */}
      {!hasAnyOutput && <TrainTestEmptyState />}

      {/* 2. Hasil Deteksi Outlier */}
      {outlierResult && <OutlierResultCard result={outlierResult} />}

      {/* 3. Hasil Pelatihan Model Latih */}
      {trainResult && <TrainResultCard result={trainResult} />}

      {/* 4. Hasil Pengujian Model Data Uji */}
      {testResult && <TestResultCard result={testResult} />}
    </div>
  );
}

export default RightPanelOutput;
