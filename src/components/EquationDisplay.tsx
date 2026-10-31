"use client";

import React from "react";
import { Paper, Text, Stack } from "@mantine/core";

interface EquationDisplayProps {
  equation: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function EquationDisplay({
  equation,
  label,
  size = "md",
}: EquationDisplayProps) {
  const isSm = size === "sm";

  return (
    <Stack gap={6}>
      {label && (
        <Text size="xs" fw={700} c="brandSecondary.7" tt="capitalize">
          {label}
        </Text>
      )}
      <Paper
        p={isSm ? "xs" : "sm"}
        radius="lg"
        withBorder
        style={{
          backgroundColor: "var(--mantine-color-brandPrimary-0)",
          borderColor: "var(--mantine-color-brandPrimary-2)",
          color: "var(--mantine-color-brandPrimary-9)",
          overflowX: "auto",
        }}
      >
        <Text size={isSm ? "xs" : "sm"} fw={700} ff="monospace" c="brandPrimary.7">
          {equation}
        </Text>
      </Paper>
    </Stack>
  );
}

export default EquationDisplay;
