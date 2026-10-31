"use client";

import React from "react";
import { Target, Globe2 } from "lucide-react";
import { Paper, SimpleGrid, Flex, Box, Title, Text, Badge, ThemeIcon } from "@mantine/core";

interface ObjectiveItem {
  id: number;
  title: string;
  description: string;
}

const OBJECTIVES: ObjectiveItem[] = [
  {
    id: 1,
    title: "Perluasan Jangkauan Pemantauan",
    description:
      "Menyediakan alternatif pemantauan kualitas udara di wilayah DKI Jakarta, khususnya pada area yang belum terjangkau oleh stasiun pemantau darat fisik (SPKU) dengan memanfaatkan data satelit penginderaan jauh.",
  },
  {
    id: 2,
    title: "Integrasi Data Satelit & Sensor Darat",
    description:
      "Menyelaraskan data pengamatan atmosfer dari satelit Sentinel-5P dengan data pengukuran stasiun SPKU agar saling melengkapi untuk menghasilkan dataset pemantauan yang terintegrasi.",
  },
  {
    id: 3,
    title: "Estimasi Nilai ISPU Ozon Permukaan",
    description:
      "Membangun model estimasi nilai ISPU Ozon (O₃) permukaan berbasis hubungan antar-polutan udara (CO dan NO₂) dengan pendekatan regresi yang andal terhadap keragaman data.",
  },
];

export function ObjectiveCard({ id, title, description }: ObjectiveItem) {
  return (
    <Paper
      p="md"
      radius="md"
      bg="brandSecondary.0"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        transition: "all 150ms ease",
      }}
    >
      <ThemeIcon
        size={28}
        radius="md"
        color="brandPrimary"
        variant="filled"
        style={{ flexShrink: 0, marginTop: 2 }}
      >
        <Text size="xs" fw={700} c="white">
          {id}
        </Text>
      </ThemeIcon>
      <Box style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Text size="xs" fw={700} c="brandSecondary.9">
          {title}
        </Text>
        <Text size="xs" c="brandSecondary.6" lh={1.6}>
          {description}
        </Text>
      </Box>
    </Paper>
  );
}

export function HomeObjectives() {
  return (
    <Paper
      p={28}
      radius="lg"
      shadow="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Header Bagian Tujuan */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        gap={12}
        pb={16}
        style={{ borderBottom: "1px solid var(--mantine-color-brandSecondary-1)" }}
      >
        <Flex align="center" gap={12}>
          <Box
            p={10}
            style={{
              borderRadius: 12,
              backgroundColor: "var(--mantine-color-brandPrimary-0)",
              color: "var(--mantine-color-brandPrimary-6)",
              border: "1px solid var(--mantine-color-brandPrimary-1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Target style={{ width: 20, height: 20 }} />
          </Box>
          <Box>
            <Title order={2} size="h4" fw={700} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Tujuan Aplikasi
            </Title>
            <Text size="xs" c="brandSecondary.5">
              Sasaran utama sistem pemantauan dan estimasi kualitas udara berbasis data satelit
            </Text>
          </Box>
        </Flex>

        <Badge
          color="brandPrimary"
          variant="light"
          size="lg"
          radius="xl"
          leftSection={<Globe2 style={{ width: 14, height: 14 }} />}
        >
          DKI Jakarta & Sentinel-5P
        </Badge>
      </Flex>

      {/* Grid Kartu Tujuan */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        {OBJECTIVES.map((item) => (
          <ObjectiveCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </SimpleGrid>
    </Paper>
  );
}

export default HomeObjectives;
