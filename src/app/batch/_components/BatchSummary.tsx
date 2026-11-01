"use client";

import React, { useState } from "react";
import {
  Paper,
  Stack,
  Flex,
  Box,
  Text,
  Table,
  Badge,
  Button,
  Collapse,
  Tooltip,
  ThemeIcon,
} from "@mantine/core";
import {
  BatchSession,
  BatchSummaryRow,
  BatchIteration,
} from "@/lib/api/services/batch-service";
import {
  Trophy,
  BarChart3,
  Database,
  Hash,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";

interface BatchSummaryProps {
  session: BatchSession;
  summaryRows: BatchSummaryRow[];
  seeds?: number[];
  bestIteration?: BatchIteration | null;
  onPromoteClick?: (iteration: BatchIteration) => void;
}

export function BatchSummary({
  session,
  summaryRows,
  seeds = [],
  bestIteration,
  onPromoteClick,
}: BatchSummaryProps) {
  const displaySeeds = seeds.length > 0 ? seeds : (session.seeds || []);
  const [showSeeds, setShowSeeds] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ambil model iterasi terbaik dari 'Detail Seluruh Iterasi Model' jika tersedia
  const bestIter = bestIteration || session.best_iteration;

  // Fallback ke estimator rata-rata terbaik jika belum ada iterasi
  const bestEstimator = summaryRows.reduce(
    (best, cur) => (cur.test_rmse_mean < (best?.test_rmse_mean ?? Infinity) ? cur : best),
    summaryRows[0]
  );

  const displayBest = bestIter
    ? {
        label: "Model Terbaik (Detail Seluruh Iterasi)",
        title: `${bestIter.estimator_type}${bestIter.random_state != null ? ` (Seed ${bestIter.random_state})` : ""}`,
        rmse: bestIter.test_rmse != null ? Number(bestIter.test_rmse).toFixed(4) : "-",
      }
    : bestEstimator
    ? {
        label: "Estimator Terbaik (Rata-rata RMSE)",
        title: bestEstimator.estimator,
        rmse: bestEstimator.test_rmse_mean.toFixed(4),
      }
    : null;

  const handleCopySeeds = () => {
    if (!displaySeeds.length) return;
    navigator.clipboard.writeText(displaySeeds.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack gap="md">
      {/* 1. Header Metadata Sesi */}
      <Paper p="lg" shadow="xs">
        <Stack gap="md">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap="md"
          >
            <Box>
              <Flex align="center" gap="xs">
                <Badge color="brandPrimary" variant="light" size="sm" radius="sm">
                  Sesi #{session.id}
                </Badge>
                <Text size="md" fw={700} c="brandSecondary.9">
                  {session.session_name || "Sesi Pelatihan Massal"}
                </Text>
              </Flex>
              <Flex
                wrap="wrap"
                align="center"
                gap="xs"
                mt={6}
                style={{ fontSize: 12, color: "var(--mantine-color-brandSecondary-5)", fontWeight: 500 }}
              >
                <Flex align="center" gap={4}>
                  <Database size={14} color="var(--mantine-color-brandSecondary-4)" />
                  <span>
                    Dataset: <strong>{session.dataset_name}</strong>
                  </span>
                </Flex>
                <span>•</span>
                <span>{session.total_samples ? `${session.total_samples} Sampel` : "N/A"}</span>
                <span>•</span>
                <span>{session.total_seeds} Percobaan Seed</span>
                <span>•</span>
                <span>Rasio Uji: {(session.test_size * 100).toFixed(0)}%</span>
              </Flex>
            </Box>

            {displayBest && (
              <Tooltip
                label={bestIter && onPromoteClick ? "Klik untuk menyimpan model terbaik ini ke database" : undefined}
                disabled={!bestIter || !onPromoteClick}
                withArrow
              >
                <Paper
                  p="xs"
                  px="md"
                  radius="lg"
                  withBorder
                  onClick={() => {
                    if (bestIter && onPromoteClick) {
                      onPromoteClick(bestIter);
                    }
                  }}
                  style={{
                    backgroundColor: "var(--mantine-color-brandPrimary-0)",
                    borderColor: "var(--mantine-color-brandPrimary-2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexShrink: 0,
                    cursor: bestIter && onPromoteClick ? "pointer" : "default",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  <ThemeIcon
                    size={36}
                    radius="md"
                    color="brandPrimary"
                    variant="filled"
                  >
                    <Trophy size={18} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" fw={700} c="brandPrimary.7">
                      {displayBest.label}
                    </Text>
                    <Text size="xs" fw={700} c="brandSecondary.9">
                      {displayBest.title} • RMSE: {displayBest.rmse}
                    </Text>
                  </Box>
                </Paper>
              </Tooltip>
            )}
          </Flex>

          {/* Tampilan Daftar Seed yang Dipakai */}
          {displaySeeds && displaySeeds.length > 0 && (
            <Box pt="xs" style={{ borderTop: "1px solid var(--mantine-color-brandSecondary-1)" }}>
              <Flex justify="space-between" align="center">
                <Button
                  variant="subtle"
                  color="gray"
                  size="xs"
                  leftSection={<Hash size={14} color="var(--mantine-color-brandPrimary-6)" />}
                  rightSection={showSeeds ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  onClick={() => setShowSeeds((prev) => !prev)}
                  style={{ color: "var(--mantine-color-brandSecondary-7)", fontWeight: 600 }}
                >
                  Lihat {displaySeeds.length} Seed yang Digunakan
                </Button>

                <Tooltip label="Salin semua seed" position="left" withArrow>
                  <Button
                    variant="default"
                    size="compact-xs"
                    radius="md"
                    leftSection={copied ? <Check size={12} color="var(--mantine-color-green-6)" /> : <Copy size={12} color="var(--mantine-color-brandSecondary-5)" />}
                    onClick={handleCopySeeds}
                    style={{ fontSize: 11 }}
                  >
                    {copied ? "Tersalin!" : "Salin Seed"}
                  </Button>
                </Tooltip>
              </Flex>

              <Collapse expanded={showSeeds}>
                <Paper
                  p="xs"
                  mt="xs"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "var(--mantine-color-brandSecondary-0)",
                    borderColor: "var(--mantine-color-brandSecondary-2)",
                    maxHeight: 140,
                    overflowY: "auto",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                >
                  <Flex wrap="wrap" gap={6}>
                    {displaySeeds.map((s, idx) => (
                      <Badge
                        key={`${s}-${idx}`}
                        variant="outline"
                        color="gray"
                        size="sm"
                        bg="white"
                      >
                        {s}
                      </Badge>
                    ))}
                  </Flex>
                </Paper>
              </Collapse>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* 2. Tabel Ringkasan Komparasi Evaluasi Rata-Rata */}
      <Paper shadow="xs" style={{ overflow: "hidden" }}>
        <Flex
          justify="space-between"
          align="center"
          px="lg"
          py="sm"
          style={{ borderBottom: "1px solid var(--mantine-color-brandSecondary-1)" }}
        >
          <Flex align="center" gap={8}>
            <BarChart3 size={16} color="var(--mantine-color-brandPrimary-6)" />
            <Text size="xs" fw={700} c="brandSecondary.9">
              Rangkuman Metrik Evaluasi Rata-Rata ({summaryRows.length} Model)
            </Text>
          </Flex>
          <Text size="xs" c="brandSecondary.4" fw={500}>
            Format: Nilai Rata-rata ± Standar Deviasi
          </Text>
        </Flex>

        <Table verticalSpacing="xs" horizontalSpacing="md" striped highlightOnHover>
          <Table.Thead style={{ backgroundColor: "var(--mantine-color-brandSecondary-0)" }}>
            <Table.Tr>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Estimator</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandPrimary-9)", fontSize: 11, fontWeight: 700 }}>
                Test RMSE (Mean ± Std)
              </Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Test MAE</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Train RMSE</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Train MAE</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ fontFamily: "monospace", fontSize: 12 }}>
            {summaryRows.map((row) => (
              <Table.Tr key={row.estimator}>
                <Table.Td style={{ fontFamily: "inherit" }}>
                  <Text fw={700} size="xs" c="brandSecondary.9">
                    {row.estimator}
                  </Text>
                </Table.Td>
                <Table.Td fw={600} c="brandSecondary.9">
                  {row.test_rmse_display}
                </Table.Td>
                <Table.Td c="brandSecondary.7">{row.test_mae_display}</Table.Td>
                <Table.Td c="brandSecondary.5">{row.train_rmse_display}</Table.Td>
                <Table.Td c="brandSecondary.5">{row.train_mae_display}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

