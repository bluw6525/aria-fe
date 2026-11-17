"use client";

import React from "react";
import { Paper, Flex, Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { IspuBadge } from "@/components/IspuBadge";
import { RegionMapItem } from "../_types";
import { getCategoryFromIspu } from "../_hooks/use-estimate-api";

interface JakartaMapTooltipProps {
  data: RegionMapItem | null;
}

export function JakartaMapTooltip({ data }: JakartaMapTooltipProps) {
  if (!data) return null;

  const hasVal = data.estimated_ispu !== null && data.estimated_ispu !== undefined;
  const ispuVal = hasVal ? data.estimated_ispu! : null;
  const cat = hasVal ? (data.category || getCategoryFromIspu(ispuVal)) : "Tidak Ada Data";
  const obsDate = data.observation_date;

  return (
    <Paper
      p={12}
      shadow="md"
      radius="md"
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(8px)",
        border: "1px solid #cbd5e1",
        maxWidth: 270,
        pointerEvents: "none",
      }}
    >
      <Flex justify="space-between" align="center" gap={8} mb={4}>
        <Text size="xs" fw={700} c="brandSecondary.9">
          {data.name}
        </Text>
        <IspuBadge category={cat} size="xs" />
      </Flex>
      <Text size="lg" fw={800} c={hasVal ? "brandPrimary.7" : "brandSecondary.5"}>
        {hasVal && ispuVal !== null ? ispuVal.toFixed(1) : "--"}
        <Text span size="xs" fw={500} c="brandSecondary.5" ml={4}>
          Estimasi ISPU
        </Text>
      </Text>

      {/* Tanggal Observasi Satelit */}
      {obsDate && (
        <Text size="xs" fw={500} c="brandSecondary.6" mt={4}>
          Observasi Satelit: <strong>{obsDate}</strong>
        </Text>
      )}

      <Flex align="center" gap={4} mt={6} c="brandPrimary.6">
        <ChevronRight size={12} />
        <Text size="xs" fw={600}>
          Klik wilayah untuk rincian & peramalan
        </Text>
      </Flex>
    </Paper>
  );
}

export default JakartaMapTooltip;
