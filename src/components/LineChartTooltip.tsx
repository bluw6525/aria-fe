"use client";

import React from "react";
import { Paper, Box, Flex, Text, alpha } from "@mantine/core";
import { brandSecondary } from "@/theme/theme";

export interface LineChartTooltipItem {
  name?: string;
  value?: number | string;
  dataKey?: string | number;
  color?: string;
}

export interface LineChartTooltipProps {
  active?: boolean;
  payload?: LineChartTooltipItem[];
  label?: string | number;
}

/**
 * Tooltip khusus untuk komponen LineChart dengan gaya dark glassmorphism berbasis token Mantine.
 */
export function LineChartTooltip({
  active,
  payload,
  label,
}: LineChartTooltipProps) {
  if (active && payload && payload.length) {
    const tooltipBg = alpha(brandSecondary[9], 0.95);
    const tooltipBorder = alpha(brandSecondary[7], 0.8);

    return (
      <Paper
        p="xs"
        radius="lg"
        withBorder
        shadow="xl"
        style={{
          backgroundColor: tooltipBg,
          borderColor: tooltipBorder,
          backdropFilter: "blur(8px)",
          minWidth: 170,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <Box pb={4} mb={6} style={{ borderBottom: `1px solid ${tooltipBorder}` }}>
          <Text size="xs" fw={700} c="brandPrimary.4" style={{ fontSize: 11 }}>
            Observasi #{label}
          </Text>
        </Box>
        <Flex direction="column" gap={4}>
          {payload.map((item) => (
            <Flex
              key={String(item.dataKey || item.name)}
              justify="space-between"
              align="center"
              gap="sm"
              style={{ fontSize: 11 }}
            >
              <Flex align="center" gap={6}>
                <Box
                  w={8}
                  h={8}
                  style={{ borderRadius: "50%", backgroundColor: item.color, flexShrink: 0 }}
                />
                <Text size="xs" c="brandSecondary.3" style={{ fontSize: 11 }}>
                  {item.name}:
                </Text>
              </Flex>
              <Text size="xs" fw={700} c="white" style={{ fontSize: 11 }}>
                {typeof item.value === "number" ? item.value.toFixed(2) : item.value}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Paper>
    );
  }
  return null;
}

export default LineChartTooltip;
