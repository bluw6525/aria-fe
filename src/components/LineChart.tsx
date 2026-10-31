"use client";

import React from "react";
import { LineChart as MantineLineChart } from "@mantine/charts";
import { Paper, Text, Box } from "@mantine/core";

export interface LineSeries {
  key: string;
  name: string;
  color?: string;
  dashed?: boolean;
}

export interface LineChartProps<T extends object = Record<string, unknown>> {
  data: T[];
  lines: LineSeries[];
  xAxisKey?: string;
  title?: string;
  subtitle?: string;
  height?: number;
}

export function LineChart<T extends object = Record<string, unknown>>({
  data,
  lines,
  xAxisKey = "index",
  title,
  subtitle,
  height = 250,
}: LineChartProps<T>) {
  if (!data || data.length === 0) {
    return (
      <Paper
        p="xl"
        bg="brandSecondary.0"
        style={{
          width: "100%",
          height: 160,
          borderStyle: "dashed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="xs" c="dimmed">
          Belum ada data grafik untuk ditampilkan
        </Text>
      </Paper>
    );
  }

  const series = lines.map((l) => ({
    name: l.key,
    label: l.name,
    color: l.color || "var(--mantine-color-brandPrimary-6)",
    strokeDasharray: l.dashed ? "4 4" : undefined,
  }));

  return (
    <Paper
      p="md"
      shadow="xs"
      style={{ width: "100%", userSelect: "none" }}
    >
      {/* Header & Judul Grafik */}
      {(title || subtitle) && (
        <Box mb="xs" pb="xs" style={{ borderBottom: "1px solid #f1f5f9" }}>
          {title && (
            <Text size="xs" fw={700} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text size="xs" c="brandSecondary.5" mt={2} style={{ fontSize: "11px" }}>
              {subtitle}
            </Text>
          )}
        </Box>
      )}

      {/* Area Grafik Mantine LineChart */}
      <MantineLineChart
        h={height}
        data={data}
        dataKey={xAxisKey}
        series={series}
        curveType="monotone"
        strokeWidth={2}
        withDots
        dotProps={{ r: 2 }}
        activeDotProps={{ r: 4.5, stroke: "#fff", strokeWidth: 1.5 }}
        withLegend
        legendProps={{ verticalAlign: "top", height: 35 }}
        gridAxis="xy"
        tickLine="none"
      />
    </Paper>
  );
}

export default LineChart;
