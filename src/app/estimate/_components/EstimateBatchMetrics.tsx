import React from "react";
import { SimpleGrid } from "@mantine/core";
import { StatCard } from "@/components/StatCard";
import type { BatchEstimateSummary } from "../_types";

interface EstimateBatchMetricsProps {
  summary: BatchEstimateSummary;
}

export function EstimateBatchMetrics({ summary }: EstimateBatchMetricsProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      {/* Total Sampel */}
      <StatCard label="Total Sampel" value={summary.total_samples} />

      {/* Rata-rata ISPU */}
      <StatCard label="Rata-rata ISPU" value={summary.avg_estimated} />

      {/* Rentang ISPU */}
      <StatCard
        label="Rentang ISPU"
        value={`${summary.min_estimated} – ${summary.max_estimated}`}
      />
    </SimpleGrid>
  );
}
