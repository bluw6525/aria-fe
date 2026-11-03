import React from "react";
import { Stack, Flex, Box, Text, SimpleGrid, Alert } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import { LineChart } from "@/components/LineChart";
import { StatCard } from "@/components/StatCard";
import { RegressionPointsTable } from "./RegressionPointsTable";
import type { TestModelResult } from "../_types";

interface TestResultCardProps {
  result: TestModelResult;
}

export function TestResultCard({ result }: TestResultCardProps) {
  return (
    <Stack gap="md">
      <Flex
        justify="space-between"
        align="center"
        pb="sm"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <Box>
          <Text size="md" fw={700} c="brandSecondary.9">
            Hasil Evaluasi Model terhadap Data Uji
          </Text>
          <Text size="xs" c="brandSecondary.5" fw={500} mt={2}>
            Model: <strong>{result.model_name}</strong>
          </Text>
        </Box>
        <Text size="xs" c="brandSecondary.5" fw={500}>
          Jumlah data uji: {result.total_samples}
        </Text>
      </Flex>

      {/* Peringatan jika terdapat baris data hasil interpolasi Natural Cubic Spline */}
      {result.interpolated_count && result.interpolated_count > 0 ? (
        <Alert
          color="yellow"
          variant="light"
          radius="md"
          title="Pemberitahuan Data Interpolasi"
          icon={<AlertTriangle size={18} />}
        >
          Terdapat <strong>{result.interpolated_count}</strong> baris data target O3 yang kosong dan telah dilengkapi secara otomatis menggunakan interpolasi.
        </Alert>
      ) : null}

      {/* Kotak Metrik Evaluasi Data Uji (RMSE & MAE) */}
      <Stack gap={6}>
        <Text size="xs" fw={700} c="brandSecondary.7">
          hasil evaluasi model terhadap data uji
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <StatCard label="RMSE Uji" value={result.rmse} />
          <StatCard label="MAE Uji" value={result.mae} />
        </SimpleGrid>
      </Stack>

      {/* Grafik Data Uji */}
      <Box mt={4}>
        <LineChart
          data={result.chart_data}
          title={`Grafik Evaluasi Data Uji (${result.model_name})`}
          lines={[
            { key: "actual", name: "O3 Sebenarnya", color: "var(--mantine-color-brandPrimary-6)" },
            { key: "predicted", name: "O3 Estimasi", color: "#f43f5e", dashed: true },
          ]}
          height={240}
        />
      </Box>

      {/* Tabel Evaluasi Titik Data Uji */}
      <RegressionPointsTable
        data={result.chart_data}
        title="Daftar Data Hasil Pengujian (Aktual, Estimasi & Residual)"
        subtitle={`Total ${result.total_samples} sampel data uji`}
      />
    </Stack>
  );
}
