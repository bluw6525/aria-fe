"use client";

import React from "react";
import { Box, Flex, Group, Text } from "@mantine/core";
import { Info } from "lucide-react";
import { CATEGORY_COLORS } from "./map-constants";

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Group gap={6}>
      <Box
        style={{
          width: 12,
          height: 12,
          borderRadius: 3,
          backgroundColor: color,
        }}
      />
      <Text size="xs" c="brandSecondary.7" fw={500}>
        {label}
      </Text>
    </Group>
  );
}

export function JakartaMapLegend() {
  return (
    <Box
      p={12}
      style={{
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap="xs"
      >
        <Group gap={6}>
          <Info size={14} color="#64748b" />
          <Text size="xs" fw={600} c="brandSecondary.6">
            Skala Kategori ISPU (Permen LHK No. 14/2020):
          </Text>
        </Group>

        <Group gap={16} wrap="wrap">
          <LegendItem color={CATEGORY_COLORS.Baik.fill} label="Baik (0 - 50)" />
          <LegendItem color={CATEGORY_COLORS.Sedang.fill} label="Sedang (51 - 100)" />
          <LegendItem color={CATEGORY_COLORS["Tidak Sehat"].fill} label="Tidak Sehat (101 - 200)" />
          <LegendItem color={CATEGORY_COLORS["Sangat Tidak Sehat"].fill} label="Sgt Tidak Sehat (201 - 300)" />
          <LegendItem color={CATEGORY_COLORS.Berbahaya.fill} label="Berbahaya (> 300)" />
          <LegendItem color={CATEGORY_COLORS.Default.fill} label="Tidak Ada Data (Awan)" />
        </Group>
      </Flex>
    </Box>
  );
}

export default JakartaMapLegend;
