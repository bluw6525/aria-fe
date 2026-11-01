"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Flex,
  Box,
  Text,
  Table,
  Badge,
  Button,
  Select,
  Pagination,
  Loader,
  Center,
  ThemeIcon,
} from "@mantine/core";
import {
  BatchIteration,
  PaginatedBatchIterations,
  batchService,
} from "@/lib/api/services/batch-service";
import {
  BookmarkPlus,
  Trophy,
  Filter,
  ArrowUpDown,
} from "lucide-react";

interface BatchIterationsTableProps {
  sessionId: number;
  availableEstimators: string[];
  onPromoteClick: (iteration: BatchIteration) => void;
}

function getCoefValue(coefs: Record<string, number> | undefined, target: "CO" | "NO2"): string {
  if (!coefs || typeof coefs !== "object") return "-";
  const targetLower = target.toLowerCase();
  for (const [key, val] of Object.entries(coefs)) {
    const k = key.toLowerCase();
    if (targetLower === "co") {
      if ((k === "co" || k.includes("co")) && !k.includes("no2") && !k.includes("score")) {
        return Number(val).toFixed(4);
      }
    } else if (targetLower === "no2") {
      if (k === "no2" || k.includes("no2")) {
        return Number(val).toFixed(4);
      }
    }
  }
  const values = Object.values(coefs);
  if (target === "CO" && values.length >= 1) return Number(values[0]).toFixed(4);
  if (target === "NO2" && values.length >= 2) return Number(values[1]).toFixed(4);
  return "-";
}

export function BatchIterationsTable({
  sessionId,
  availableEstimators,
  onPromoteClick,
}: BatchIterationsTableProps) {
  const [data, setData] = useState<PaginatedBatchIterations | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedEstimator, setSelectedEstimator] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (!ignore) setIsLoading(true);
    });
    batchService
      .getIterations(sessionId, {
        page,
        limit,
        estimator_type: selectedEstimator || undefined,
        sort_by: "test_rmse",
        sort_order: "asc",
      })
      .then((res) => {
        if (!ignore) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [sessionId, page, limit, selectedEstimator]);

  const handleEstimatorChange = (val: string | null) => {
    setSelectedEstimator(val || "");
    setPage(1);
  };

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.total_pages || 1;

  const estimatorOptions = [
    { value: "", label: `Semua Model (${availableEstimators.length})` },
    ...availableEstimators.map((est) => ({ value: est, label: est })),
  ];

  return (
    <Paper shadow="xs" style={{ overflow: "hidden" }}>
      {/* Header Tabel dengan Kontrol Filter & Paginasi */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        px="lg"
        py="sm"
        gap="sm"
        style={{ borderBottom: "1px solid var(--mantine-color-brandSecondary-1)" }}
      >
        <Flex align="center" gap={8}>
          <ArrowUpDown size={16} color="var(--mantine-color-brandPrimary-6)" />
          <Text size="xs" fw={700} c="brandSecondary.9">
            Detail Seluruh Iterasi Model (Diurutkan Test RMSE Terendah)
          </Text>
          <Badge variant="light" color="gray" size="sm">
            {total} baris
          </Badge>
        </Flex>

        {/* Filter Estimator & Limit */}
        <Flex align="center" gap="sm" wrap="wrap">
          <Flex align="center" gap={6}>
            <Filter size={14} color="var(--mantine-color-brandSecondary-4)" />
            <Text size="xs" c="brandSecondary.5">Filter:</Text>
            <Select
              size="xs"
              data={estimatorOptions}
              value={selectedEstimator}
              onChange={handleEstimatorChange}
              radius="md"
              style={{ width: 160 }}
            />
          </Flex>

          <Flex align="center" gap={6}>
            <Text size="xs" c="brandSecondary.5">Baris:</Text>
            <Select
              size="xs"
              data={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
              ]}
              value={String(limit)}
              onChange={(val) => {
                setLimit(Number(val));
                setPage(1);
              }}
              radius="md"
              style={{ width: 80 }}
            />
          </Flex>
        </Flex>
      </Flex>

      {/* Tabel Data Iterasi */}
      <Box style={{ position: "relative" }}>
        {isLoading && (
          <Center
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(2px)",
              zIndex: 10,
            }}
          >
            <Flex align="center" gap="xs">
              <Loader size="sm" color="brandPrimary" />
              <Text size="xs" fw={600} c="brandPrimary">
                Memuat data iterasi...
              </Text>
            </Flex>
          </Center>
        )}

        <Table verticalSpacing="xs" horizontalSpacing="md" striped highlightOnHover>
          <Table.Thead style={{ backgroundColor: "var(--mantine-color-brandSecondary-0)" }}>
            <Table.Tr>
              <Table.Th style={{ width: 56, textAlign: "center", color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>
                Rank
              </Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Estimator</Table.Th>
              <Table.Th style={{ textAlign: "center", color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Seed</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandPrimary-9)", fontSize: 11, fontWeight: 700 }}>
                Test RMSE
              </Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Test MAE</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Train RMSE</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>Train MAE</Table.Th>
              <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>
                Koefisien (β₀ / CO / NO₂)
              </Table.Th>
              <Table.Th style={{ textAlign: "center", width: 140, color: "var(--mantine-color-brandSecondary-6)", fontSize: 11 }}>
                Aksi
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ fontFamily: "monospace", fontSize: 12 }}>
            {items.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={9} style={{ textAlign: "center", padding: 32, color: "var(--mantine-color-brandSecondary-4)" }}>
                  Tidak ada iterasi yang cocok dengan filter yang dipilih.
                </Table.Td>
              </Table.Tr>
            ) : (
              items.map((item, idx) => {
                const rank = (page - 1) * limit + idx + 1;
                const isRankOne = rank === 1;

                const coefCo = getCoefValue(item.coefficients, "CO");
                const coefNo2 = getCoefValue(item.coefficients, "NO2");
                const intercept = item.intercept !== null ? Number(item.intercept).toFixed(4) : "-";

                return (
                  <Table.Tr
                    key={item.id}
                    style={{
                      backgroundColor: isRankOne ? "var(--mantine-color-brandPrimary-0)" : undefined,
                    }}
                  >
                    {/* Rank Badge */}
                    <Table.Td style={{ textAlign: "center" }}>
                      {isRankOne ? (
                        <ThemeIcon
                          size={24}
                          radius="xl"
                          color="brandPrimary"
                          variant="filled"
                          mx="auto"
                        >
                          <Trophy size={13} />
                        </ThemeIcon>
                      ) : (
                        <Text size="xs" fw={700} c="brandSecondary.4">
                          #{rank}
                        </Text>
                      )}
                    </Table.Td>

                    {/* Estimator */}
                    <Table.Td fw={600} c="brandSecondary.9" style={{ fontFamily: "inherit" }}>
                      {item.estimator_type}
                    </Table.Td>

                    {/* Seed */}
                    <Table.Td style={{ textAlign: "center" }}>
                      <Badge variant="light" color="gray" size="sm">
                        {item.random_state ?? "N/A"}
                      </Badge>
                    </Table.Td>

                    {/* Test RMSE */}
                    <Table.Td fw={isRankOne ? 800 : 600} c={isRankOne ? "brandPrimary.6" : "brandSecondary.9"}>
                      {item.test_rmse?.toFixed(4) ?? "-"}
                    </Table.Td>

                    {/* Test MAE */}
                    <Table.Td c="brandSecondary.7">{item.test_mae?.toFixed(4) ?? "-"}</Table.Td>

                    {/* Train RMSE */}
                    <Table.Td c="brandSecondary.5">{item.train_rmse?.toFixed(4) ?? "-"}</Table.Td>

                    {/* Train MAE */}
                    <Table.Td c="brandSecondary.5">{item.train_mae?.toFixed(4) ?? "-"}</Table.Td>

                    {/* Coefficients */}
                    <Table.Td style={{ fontSize: 11, color: "var(--mantine-color-brandSecondary-6)" }}>
                      β₀: {intercept} | CO: {coefCo} | NO₂: {coefNo2}
                    </Table.Td>

                    {/* Action */}
                    <Table.Td style={{ textAlign: "center" }}>
                      <Button
                        variant="light"
                        color="brandPrimary"
                        size="compact-xs"
                        radius="md"
                        leftSection={<BookmarkPlus size={12} />}
                        onClick={() => onPromoteClick(item)}
                      >
                        Simpan Model
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </Box>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <Flex justify="center" p="md" style={{ borderTop: "1px solid var(--mantine-color-brandSecondary-1)" }}>
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            size="sm"
            radius="md"
            color="brandPrimary"
          />
        </Flex>
      )}
    </Paper>
  );
}

