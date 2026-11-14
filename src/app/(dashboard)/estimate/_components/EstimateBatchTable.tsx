import React from "react";
import { Box, Flex, Text, Table, Paper, ScrollArea, Badge } from "@mantine/core";
import { Activity } from "lucide-react";
import { IspuBadge } from "@/components/IspuBadge";
import type { BatchEstimatePoint } from "../_types";

interface EstimateBatchTableProps {
  data: BatchEstimatePoint[];
}

export function EstimateBatchTable({ data }: EstimateBatchTableProps) {
  const hasActual = data.some(
    (row) => row.actual_value !== null && row.actual_value !== undefined
  );
  const hasForecast = data.some((row) => row.is_forecast);

  return (
    <Box pt="xs" style={{ borderTop: "1px solid #f1f5f9" }}>
      <Flex justify="space-between" align="center" mb="xs">
        <Flex align="center" gap={6}>
          <Activity size={16} color="var(--mantine-color-brandPrimary-6)" />
          <Text size="xs" fw={700} c="brandSecondary.9">
            {hasForecast ? "Daftar Data Observasi Satelit & Proyeksi" : "Daftar Data Observasi Satelit"}
          </Text>
        </Flex>
        <Text size="xs" c="brandSecondary.5">
          {hasForecast
            ? `Menampilkan ${data.length} data observasi & peramalan`
            : `Menampilkan ${data.length} data observasi`}
        </Text>
      </Flex>

      <Paper style={{ overflow: "hidden" }}>
        <ScrollArea h={320} type="auto">
          <Table verticalSpacing="xs" horizontalSpacing="sm" striped highlightOnHover>
            <Table.Thead style={{ backgroundColor: "var(--mantine-color-brandSecondary-0)", position: "sticky", top: 0, zIndex: 10 }}>
              <Table.Tr>
                <Table.Th style={{ width: 48, textAlign: "center", color: "var(--mantine-color-brandSecondary-6)" }}>#</Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)" }}>Waktu / Tanggal</Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)" }}>CO (mol/m²)</Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)" }}>NO2 (mol/m²)</Table.Th>
                {hasActual && (
                  <Table.Th style={{ color: "#dc2626", fontWeight: 700 }}>O3 Aktual (ISPU)</Table.Th>
                )}
                <Table.Th style={{ color: "var(--mantine-color-brandPrimary-9)" }}>Estimasi ISPU</Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-6)" }}>Kategori ISPU</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row) => (
                <Table.Tr
                  key={row.index}
                  style={{
                    backgroundColor: row.is_forecast ? "#f8fafc" : undefined,
                  }}
                >
                  <Table.Td style={{ textAlign: "center", color: "var(--mantine-color-brandSecondary-4)", fontWeight: 500 }}>
                    {row.index}
                  </Table.Td>
                  <Table.Td fw={600} c="brandSecondary.9">
                    <Flex align="center" gap={6}>
                      <span>{row.label}</span>
                      {row.is_forecast && (
                        <Badge size="xs" color="green" variant="light">
                          Proyeksi
                        </Badge>
                      )}
                    </Flex>
                  </Table.Td>
                  <Table.Td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--mantine-color-brandSecondary-6)" }}>
                    {row.co}
                  </Table.Td>
                  <Table.Td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--mantine-color-brandSecondary-6)" }}>
                    {row.no2}
                  </Table.Td>
                  {hasActual && (
                    <Table.Td
                      fw={800}
                      style={{
                        fontFamily: "monospace",
                        fontSize: 14,
                        color: "#dc2626",
                      }}
                    >
                      {row.actual_value !== null && row.actual_value !== undefined ? row.actual_value : "-"}
                    </Table.Td>
                  )}
                  <Table.Td
                    fw={800}
                    c={row.is_forecast ? "indigo.7" : "brandPrimary.6"}
                    style={{ fontSize: 14, fontFamily: "monospace" }}
                  >
                    {row.estimated_value}
                  </Table.Td>
                  <Table.Td>
                    <IspuBadge category={row.ispu_category} size="xs" />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}

export default EstimateBatchTable;
