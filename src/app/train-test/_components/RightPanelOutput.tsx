"use client";

import React from "react";
import { Paper, Stack } from "@mantine/core";
import { useRegressionApi } from "../_hooks/use-regression-api";
import { TrainTestEmptyState } from "./TrainTestEmptyState";
import { OutlierResultCard } from "./OutlierResultCard";
import { TrainResultCard } from "./TrainResultCard";
import { TestResultCard } from "./TestResultCard";

export function RightPanelOutput() {
  const outlierResult = useRegressionApi((s) => s.outlierResult);
  const trainResult = useRegressionApi((s) => s.trainResult);
  const testResult = useRegressionApi((s) => s.testResult);

  const hasAnyOutput = Boolean(outlierResult || trainResult || testResult);

  return (
    <Paper
      w="100%"
      p="xl"
      shadow="sm"
      style={{
        minHeight: 580,
      }}
    >
      <Stack gap="xl">
        {/* 1. Empty State Placeholder */}
        {!hasAnyOutput && <TrainTestEmptyState />}

        {/* 2. Hasil Deteksi Outlier */}
        {outlierResult && <OutlierResultCard result={outlierResult} />}

        {/* 3. Hasil Pelatihan Model Latih */}
        {trainResult && <TrainResultCard result={trainResult} />}

        {/* 4. Hasil Pengujian Model Data Uji */}
        {testResult && <TestResultCard result={testResult} />}
      </Stack>
    </Paper>
  );
}

export default RightPanelOutput;
