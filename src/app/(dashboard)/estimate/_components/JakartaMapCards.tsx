"use client";

import React from "react";
import { SimpleGrid, Paper, Flex, Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import mapData from "@/data/jakarta-map-data.json";
import { IspuBadge } from "@/components/IspuBadge";
import { RegionMapItem } from "../_types";
import { getCategoryFromIspu } from "../_hooks/use-estimate-api";
import { CATEGORY_COLORS } from "./map-constants";

interface JakartaMapCardsProps {
  regionMap: Record<string, RegionMapItem>;
  selectedRegion: string | null;
  isDrawerOpen: boolean;
  onSelectRegion: (regionId: string) => void;
}

export function JakartaMapCards({
  regionMap,
  selectedRegion,
  isDrawerOpen,
  onSelectRegion,
}: JakartaMapCardsProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="sm">
      {mapData.regions.map((reg) => {
        const item = regionMap[reg.id];
        const isSelected = isDrawerOpen && selectedRegion === reg.id;
        const hasVal = item?.estimated_ispu !== null && item?.estimated_ispu !== undefined;
        const ispuVal = hasVal ? item!.estimated_ispu! : null;
        const category = hasVal ? (item!.category || getCategoryFromIspu(ispuVal)) : "Default";
        const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;

        return (
          <Paper
            key={reg.id}
            p={12}
            radius="md"
            shadow="xs"
            onClick={() => onSelectRegion(reg.id)}
            style={{
              cursor: "pointer",
              border: isSelected ? "2px solid var(--mantine-color-brandPrimary-6)" : "1px solid #e2e8f0",
              backgroundColor: isSelected ? "#f0fdf4" : "#ffffff",
              transition: "all 150ms ease",
            }}
          >
            <Flex justify="space-between" align="flex-start" mb={4}>
              <Text size="xs" fw={700} c="brandSecondary.8" lineClamp={1}>
                {reg.name}
              </Text>
              <ChevronRight size={14} color="#94a3b8" />
            </Flex>

            <Flex justify="space-between" align="baseline" mt={6}>
              <Text size="md" fw={800} c={hasVal ? color.stroke : "#64748b"}>
                {hasVal && ispuVal !== null ? ispuVal.toFixed(1) : "--"}
              </Text>
              <IspuBadge category={category} size="xs" />
            </Flex>

            <Text size="xs" c="brandSecondary.4" mt={4}>
              {hasVal ? "Observasi Satelit" : "Tidak Ada Data (Awan)"}
            </Text>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}

export default JakartaMapCards;
