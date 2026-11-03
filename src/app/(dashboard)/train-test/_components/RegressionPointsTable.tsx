import React from "react";
import { Box, Flex, Text, Table, Paper, ScrollArea } from "@mantine/core";
import { TableProperties } from "lucide-react";
import type { RegressionPoint } from "../_types";

interface RegressionPointsTableProps {
  data: RegressionPoint[];
  title?: string;
  subtitle?: string;
}

export function RegressionPointsTable({
  data,
  title = "Daftar Titik Data (Aktual, Estimasi & Residual)",
  subtitle,
}: RegressionPointsTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <Box pt="xs" style={{ borderTop: "1px solid #f1f5f9" }}>
      <Flex justify="space-between" align="center" mb="xs">
        <Flex align="center" gap={6}>
          <TableProperties size={16} color="var(--mantine-color-brandPrimary-6)" />
          <Text size="xs" fw={700} c="brandSecondary.9">
            {title}
          </Text>
        </Flex>
        <Text size="xs" c="brandSecondary.5">
          {subtitle || `Total ${data.length} sampel`}
        </Text>
      </Flex>

      <Paper style={{ overflow: "hidden", border: "1px solid #e2e8f0", borderRadius: 12 }}>
        <ScrollArea h={280}>
          <Table verticalSpacing="xs" horizontalSpacing="sm" striped highlightOnHover>
            <Table.Thead
              style={{
                backgroundColor: "var(--mantine-color-brandSecondary-0)",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <Table.Tr>
                <Table.Th style={{ width: 64, textAlign: "center", color: "var(--mantine-color-brandSecondary-6)" }}>
                  #
                </Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-7)" }}>
                  O3 Aktual (y)
                </Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandPrimary-9)" }}>
                  O3 Estimasi (ŷ)
                </Table.Th>
                <Table.Th style={{ color: "var(--mantine-color-brandSecondary-7)" }}>
                  Residual (e = y - ŷ)
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row) => {
                const residual =
                  row.residual !== undefined && row.residual !== null
                    ? row.residual
                    : Number((row.actual - row.predicted).toFixed(4));
                const residualSign = residual > 0 ? `+${residual.toFixed(2)}` : residual.toFixed(2);

                return (
                  <Table.Tr key={row.index}>
                    <Table.Td
                      style={{
                        textAlign: "center",
                        color: "var(--mantine-color-brandSecondary-4)",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {row.index}
                    </Table.Td>
                    <Table.Td fw={600} c="brandSecondary.9" style={{ fontSize: 13, fontFamily: "monospace" }}>
                      {row.actual.toFixed(2)}
                    </Table.Td>
                    <Table.Td fw={700} c="brandPrimary.6" style={{ fontSize: 13, fontFamily: "monospace" }}>
                      {row.predicted.toFixed(2)}
                    </Table.Td>
                    <Table.Td style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>
                      <Text
                        component="span"
                        size="xs"
                        fw={700}
                        c={Math.abs(residual) < 1e-4 ? "dimmed" : residual > 0 ? "teal.7" : "red.6"}
                      >
                        {residualSign}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}

export default RegressionPointsTable;

