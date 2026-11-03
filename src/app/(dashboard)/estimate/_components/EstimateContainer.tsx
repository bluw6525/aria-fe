import React from "react";
import { Box, Flex, Paper } from "@mantine/core";
import { EstimateLeftPanel } from "./EstimateLeftPanel";
import { EstimateRightPanel } from "./EstimateRightPanel";

/**
 * Container untuk halaman Estimasi Indeks Standar Pencemar Udara (ISPU) berbasis Mantine.
 */
export function EstimateContainer() {
  return (
    <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* 2 Kolom: Kiri Kontrol & Kanan Output */}
      <Flex
        maw={1152}
        mx="auto"
        w="100%"
        gap={{ base: 20, md: 32 }}
        pb={{ base: 32, md: 64 }}
        align="flex-start"
        direction={{ base: "column", lg: "row" }}
      >
        {/* Kolom Kiri: Form Kontrol */}
        <Paper
          p={{ base: 16, sm: 20, md: 24 }}
          shadow="xs"
          w={{ base: "100%", lg: 380 }}
          style={{
            flexShrink: 0,
          }}
        >
          <EstimateLeftPanel />
        </Paper>

        {/* Kolom Kanan: Output & Visualisasi Grafik */}
        <Box style={{ flex: 1, minWidth: 0, width: "100%" }}>
          <EstimateRightPanel />
        </Box>
      </Flex>
    </Box>
  );
}

export default EstimateContainer;
