"use client";

import React, { ReactNode } from "react";
import { Paper, Text, MantineRadius } from "@mantine/core";

interface StatCardProps {
  label: string;
  value: ReactNode;
  variant?: "sky" | "slate";
  radius?: MantineRadius;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatCard({
  label,
  value,
  variant = "sky",
  radius = "lg",
  className = "",
  valueClassName = "",
  labelClassName = "",
}: StatCardProps) {
  const isSky = variant === "sky";

  return (
    <Paper
      p="sm"
      radius={radius}
      withBorder
      style={{
        backgroundColor: isSky ? "var(--mantine-color-brandPrimary-0)" : "var(--mantine-color-brandSecondary-0)",
        borderColor: isSky ? "var(--mantine-color-brandPrimary-2)" : "var(--mantine-color-brandSecondary-2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 84,
      }}
      className={className}
    >
      <Text
        size="xs"
        fw={700}
        tt="uppercase"
        style={{ letterSpacing: "0.05em", fontSize: "11px" }}
        c={isSky ? "brandSecondary.6" : "brandSecondary.5"}
        className={labelClassName}
      >
        {label}
      </Text>
      <Text
        size="xl"
        fw={800}
        c={isSky ? "brandPrimary.7" : "brandSecondary.9"}
        className={valueClassName}
        style={{ letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: 4 }}
      >
        {value}
      </Text>
    </Paper>
  );
}

export default StatCard;
