"use client";

import React from "react";
import { RotateCcw, ShieldAlert } from "lucide-react";
import { Box, Flex, Paper, Title, Text, UnstyledButton, Stack } from "@mantine/core";
import { formatEstimatorType } from "@/app/(dashboard)/train-test/_types";
import { EquationDisplay } from "@/components/EquationDisplay";
import { IspuBadge } from "@/components/IspuBadge";
import { getIspuStyle, type SingleEstimateResult } from "../_types";

interface EstimateSingleResultProps {
  result: SingleEstimateResult;
  onReset: () => void;
  isManual?: boolean;
}

export function EstimateSingleResult({
  result,
  onReset,
  isManual = true,
}: EstimateSingleResultProps) {
  const ispuStyle = getIspuStyle(result.ispu_category);

  return (
    <Stack gap={24}>
      {/* Header Card */}
      <Flex
        align="center"
        justify="space-between"
        pb={12}
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <Box>
          <Title order={3} size="h4" fw={700} c="brandSecondary.9">
            Hasil Estimasi ISPU
          </Title>
          <Text size="xs" c="brandSecondary.5" fw={500} mt={2}>
            Model: <strong>{result.model_name}</strong>
            {!result.model_name.includes(formatEstimatorType(result.estimator_type)) && (
              <span> ({formatEstimatorType(result.estimator_type)})</span>
            )}
          </Text>
        </Box>
        <UnstyledButton
          onClick={onReset}
          px={12}
          py={6}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 12,
            backgroundColor: "var(--mantine-color-brandSecondary-1)",
            color: "var(--mantine-color-brandSecondary-7)",
            fontSize: 12,
            fontWeight: 700,
            transition: "all 150ms ease",
          }}
        >
          <RotateCcw style={{ width: 14, height: 14 }} />
          <span>Reset</span>
        </UnstyledButton>
      </Flex>

      {/* ISPU Primary Badge & Card */}
      <Paper
        p={{ base: "lg", md: 24 }}
        bg="brandSecondary.0"
        radius="lg"
        withBorder
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          gap={24}
        >
          {/* Nilai ISPU (Kiri) */}
          <Box style={{ flex: "1 1 auto", minWidth: 220, display: "flex", flexDirection: "column", gap: 10 }}>
            <Text size="xs" fw={700} c="brandSecondary.5" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
              Nilai Indeks Standar Pencemar Udara (ISPU)
            </Text>
            <Flex align="center" gap={16} wrap="wrap">
              <Text size="46px" fw={900} c="brandSecondary.9" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>
                {result.estimated_value}
              </Text>
              <IspuBadge category={result.ispu_category} size="md" />
            </Flex>
          </Box>

          {/* Deskripsi Regulasi Permen LHK / Dampak Kesehatan (Kanan) */}
          <Paper
            p="md"
            radius="md"
            withBorder
            shadow="none"
            style={{
              flex: "1 1 380px",
              maxWidth: 440,
              backgroundColor: "#ffffff",
              borderColor: "var(--mantine-color-brandSecondary-2)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Flex align="center" gap={8} fw={700} c="brandSecondary.9" style={{ fontSize: 12 }}>
              <ShieldAlert style={{ width: 16, height: 16, color: "var(--mantine-color-brandPrimary-6)", flexShrink: 0 }} />
              <span>Dampak Kesehatan (Permen LHK No. 14/2020):</span>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.55} style={{ fontSize: 11.5 }}>
              {ispuStyle.description}
            </Text>
            <Text size="xs" fw={700} c="brandPrimary.8" style={{ fontSize: 11.5 }}>
              {ispuStyle.healthImpact}
            </Text>
          </Paper>
        </Flex>
      </Paper>

      {/* Persamaan Model */}
      {result.equation && (
        <EquationDisplay
          label="Persamaan Model Regresi:"
          equation={result.equation}
        />
      )}

      {/* Petunjuk Multi-titik */}
      {isManual && (
        <Paper
          p="md"
          bg="brandSecondary.0"
        >
          <Text size="xs" lh={1.6}>
            Anda dapat memasukkan nilai CO & NO2 berikutnya pada panel kiri untuk melihat tren grafik ISPU secara multi-titik kumulatif.
          </Text>
        </Paper>
      )}
    </Stack>
  );
}

export default EstimateSingleResult;
