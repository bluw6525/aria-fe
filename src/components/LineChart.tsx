"use client";

import React from "react";
import { LineChart as MantineLineChart, ChartTooltip } from "@mantine/charts";
import { Paper, Text, Box } from "@mantine/core";

// Interface untuk mendefinisikan setiap garis (series) yang digambar pada grafik
export interface LineSeries {
  key: string;       // Kunci properti data dalam objek (misal: "actual", "predicted")
  name: string;      // Label legenda yang dibaca manusia (misal: "Nilai Aktual", "Hasil Estimasi")
  color?: string;    // Warna garis grafik (opsional)
  dashed?: boolean;  // Apakah garis berupa garis putus-putus (opsional)
}

// Interface props komponen LineChart dengan dukungan Generic Type T
export interface LineChartProps<T extends object = Record<string, unknown>> {
  data: T[];             // Kumpulan baris data yang akan diplot
  lines: LineSeries[];   // Konfigurasi daftar garis yang ingin digambar
  xAxisKey?: string;     // Kunci properti untuk sumbu X horizontal (default: "index")
  title?: string;        // Judul grafik (opsional)
  subtitle?: string;     // Keterangan atau sub-judul grafik (opsional)
  height?: number;       // Tinggi area grafik dalam satuan pixel (default: 250)
}

/**
 * Komponen LineChart Reusable
 * Membungkus `@mantine/charts LineChart` untuk menampilkan visualisasi data deret waktu atau perbandingan regresi.
 */
export function LineChart<T extends object = Record<string, unknown>>({
  data,
  lines,
  xAxisKey = "index",
  title,
  subtitle,
  height = 250,
}: LineChartProps<T>) {
  // Jika array data kosong atau undefined, tampilkan placeholder kosong
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

  // Memetakan konfigurasi LineSeries ke format series yang diharapkan oleh Mantine LineChart
  const series = lines.map((l) => ({
    name: l.key,
    label: l.name,
    color: l.color || "var(--mantine-color-brandPrimary-6)",
    strokeDasharray: l.dashed ? "4 4" : undefined, // Efek putus-putus jika dashed: true
  }));

  return (
    // Wadah kartu Paper dengan bayangan halus
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
        h={height}                                      // Tinggi container grafik
        data={data}                                     // Sumber data
        dataKey={xAxisKey}                              // Properti sumbu X
        series={series}                                 // Daftar garis
        curveType="monotone"                            // Kelengkungan garis halus
        strokeWidth={2}                                 // Ketebalan garis
        withDots                                        // Menampilkan titik data
        dotProps={{ r: 2 }}                             // Radius titik normal (2px)
        activeDotProps={{ r: 4.5, stroke: "#fff", strokeWidth: 1.5 }} // Titik saat di-hover kursor
        withLegend                                      // Menampilkan legenda keterangan garis
        legendProps={{ verticalAlign: "top", height: 35 }} // Posisi legenda di atas grafik
        gridAxis="xy"                                   // Garis bantu grid horizontal dan vertikal
        tickLine="none"                                 // Menyembunyikan garis centang pada sumbu
        tooltipProps={{
          content: ({ label, payload }: any) => {
            if (!payload || payload.length === 0) return null;

            // Jika ada lebih dari 1 item di tooltip pada titik data ini (misal titik sambungan historis & proyeksi),
            // sembunyikan entri 'forecast_value' agar tidak menampilkan 2 nilai kembar di tanggal yang sama.
            const hasEstimated = payload.some(
              (p: any) => p.dataKey === "estimated_value" && p.value !== null && p.value !== undefined
            );
            const filteredPayload = hasEstimated && payload.length > 1
              ? payload.filter((p: any) => p.dataKey !== "forecast_value")
              : payload;

            return (
              <ChartTooltip
                label={label}
                payload={filteredPayload}
                series={series}
              />
            );
          },
        }}
      />
    </Paper>
  );
}

export default LineChart;
