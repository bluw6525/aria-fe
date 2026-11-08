import React from "react";
import { Stack, Flex, Box, Text, Button } from "@mantine/core";
import { RotateCcw } from "lucide-react";
import { LineChart, LineSeries } from "@/components/LineChart";
import { EquationDisplay } from "@/components/EquationDisplay";
import { formatEstimatorType } from "@/app/(dashboard)/train-test/_types";
import type { BatchEstimateResult } from "../_types";
import { EstimateBatchMetrics } from "./EstimateBatchMetrics";
import { EstimateBatchTable } from "./EstimateBatchTable";

interface EstimateBatchResultProps {
  batch: BatchEstimateResult;
  showManualBatch: boolean;
  chartLines: LineSeries[];
  onReset: () => void;
}

export function EstimateBatchResult({
  batch,
  showManualBatch,
  chartLines,
  onReset,
}: EstimateBatchResultProps) {
  return (
    <Stack gap="lg">
      {/* Header Bar */}
      <Flex
        justify="space-between"
        align="center"
        pb="sm"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <Box>
          <Text size="md" fw={700} c="brandSecondary.9">
            Hasil Estimasi ISPU
          </Text>
          <Text size="xs" c="brandSecondary.5" fw={500} mt={2}>
            Model: <strong>{batch.model_name}</strong>
            {!batch.model_name.includes(formatEstimatorType(batch.estimator_type)) && (
              <span> ({formatEstimatorType(batch.estimator_type)})</span>
            )}
          </Text>
        </Box>
        <Button
          variant="light"
          color="gray"
          size="xs"
          radius="md"
          leftSection={<RotateCcw size={14} />}
          onClick={onReset}
          style={{ backgroundColor: "var(--mantine-color-brandSecondary-1)", color: "var(--mantine-color-brandSecondary-7)" }}
        >
          Reset
        </Button>
      </Flex>

      {/* 3 Kartu Metrik Ringkasan ISPU */}
      <EstimateBatchMetrics summary={batch.summary} />

      {/* Persamaan Model */}
      {batch.equation && (
        <EquationDisplay
          label="Persamaan Estimasi ISPU:"
          equation={batch.equation}
        />
      )}

      {/* Grafik Garis Tren Estimasi ISPU */}
      <Box mt={4}>
        <LineChart
          data={batch.chart_data}
          title={`Grafik Tren Nilai ISPU (${batch.chart_data.length} Observasi)`}
          lines={chartLines}
          xAxisKey="label"
          height={260}
        />
      </Box>

      {/* Tabel Sampel Data Hasil Estimasi ISPU */}
      <EstimateBatchTable
        data={batch.chart_data}
        showManualBatch={showManualBatch}
      />
    </Stack>
  );
}
