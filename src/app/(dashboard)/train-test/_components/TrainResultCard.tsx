import React from "react";
import { Stack, Flex, Box, Text, SimpleGrid, Alert } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import { LineChart } from "@/components/LineChart";
import { StatCard } from "@/components/StatCard";
import { EquationDisplay } from "@/components/EquationDisplay";
import { RegressionPointsTable } from "./RegressionPointsTable";
import { formatEstimatorType, type TrainModelResult } from "../_types";

interface TrainResultCardProps {
  result: TrainModelResult;
}

export function TrainResultCard({ result }: TrainResultCardProps) {
  return (
    <Stack gap="md">
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="center"
        pb="sm"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <Box>
          <Text size="md" fw={700} c="brandSecondary.9">
            Hasil Pelatihan Model
          </Text>
          <Text size="xs" c="brandSecondary.5" fw={500} mt={2}>
            Model: <strong>{formatEstimatorType(result.estimator_type)}</strong>
          </Text>
        </Box>
        <Text size="xs" c="brandSecondary.5" fw={500}>
          Jumlah data latih: {result.total_samples}
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
          Terdapat <strong>{result.interpolated_count}</strong> baris data target O3 yang kosong dan telah dilengkapi secara otomatis menggunakan interpolasi Natural Cubic Spline.
        </Alert>
      ) : null}

      {/* Persamaan Parameter */}
      <EquationDisplay
        label="hasil estimasi parameter"
        equation={result.equation}
      />

      {/* Kotak Metrik Evaluasi Data Latih (RMSE & MAE) */}
      <Stack gap={6}>
        <Text size="xs" fw={700} c="brandSecondary.7">
          hasil evaluasi model terhadap data latih
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <StatCard label="RMSE" value={result.rmse} />
          <StatCard label="MAE" value={result.mae} />
        </SimpleGrid>
      </Stack>

      {/* Grafik Data Latih */}
      <Box mt={4}>
        <LineChart
          data={result.chart_data}
          title={`Grafik Data Latih (${formatEstimatorType(result.estimator_type)})`}
          lines={[
            { key: "actual", name: "O3 Sebenarnya", color: "var(--mantine-color-brandPrimary-6)" },
            { key: "predicted", name: "O3 Estimasi", color: "#f43f5e", dashed: true },
          ]}
          height={240}
        />
      </Box>

      {/* Tabel Evaluasi Titik Data Latih */}
      <RegressionPointsTable
        data={result.chart_data}
        title="Daftar Data Hasil Pelatihan (Aktual, Estimasi & Residual)"
        subtitle={`Total ${result.total_samples} sampel data latih`}
      />
    </Stack>
  );
}
