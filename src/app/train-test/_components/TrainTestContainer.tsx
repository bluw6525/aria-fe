import React from "react";
import { Box, Flex, Paper } from "@mantine/core";
import { LeftPanelForm } from "./LeftPanelForm";
import { RightPanelOutput } from "./RightPanelOutput";

/**
 * Container untuk halaman Latih & Uji Regresi.
 */
export function TrainTestContainer() {
  return (
    <Box w="100%">
      {/* 2 Kolom: Kiri Kontrol (380px) & Kanan Output (flex-1) */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap="xl"
        align="flex-start"
        maw={1152}
        mx="auto"
        pb={64}
        w="100%"
      >
        {/* Kolom Kiri: Form Kontrol */}
        <Paper
          w={{ base: "100%", lg: 380 }}
          p="xl"
          shadow="sm"
          style={{ flexShrink: 0 }}
        >
          <LeftPanelForm />
        </Paper>

        {/* Kolom Kanan: Output & Visualisasi Grafik */}
        <Box style={{ flex: 1, minWidth: 0, width: "100%" }}>
          <RightPanelOutput />
        </Box>
      </Flex>
    </Box>
  );
}

export default TrainTestContainer;
