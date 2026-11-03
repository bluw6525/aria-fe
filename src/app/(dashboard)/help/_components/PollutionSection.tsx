"use client";

import React from "react";
import { AlertTriangle, Satellite } from "lucide-react";
import { Paper, SimpleGrid, Flex, Box, Title, Text, Stack } from "@mantine/core";

export function PollutionSection() {
  return (
    <Stack gap={24}>
      <Paper
        p={28}
        shadow="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <Box>
          <Flex align="center" gap={10}>
            <AlertTriangle style={{ width: 20, height: 20, color: "var(--mantine-color-yellow-7)" }} />
            <Title order={3} size="h4" fw={800} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Gas Prekursor Satelit & Dampak Polusi Udara
            </Title>
          </Flex>
          <Text size="xs" c="brandSecondary.5" mt={4}>
            Penjelasan mengenai peran gas prekursor Karbon Monoksida (CO) dan Nitrogen Dioksida (NO2) dalam pembentukan ozon troposferik dan polusi udara.
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {/* Karbon Monoksida */}
          <Paper
            p="lg"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 12,
            }}
          >
            <Flex align="center" gap={8} fw={700} c="brandSecondary.9" style={{ fontSize: 14 }}>
              <Box style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#f59e0b" }} />
              <span>Karbon Monoksida (CO)</span>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Gas tidak berwarna dan tidak berbau yang dihasilkan dari proses pembakaran tidak sempurna bahan bakar fosil pada kendaraan bermotor dan aktivitas industri.
            </Text>
            <Box mt="auto" pt={8} style={{ borderTop: "1px solid #e2e8f0", color: "var(--mantine-color-brandSecondary-7)" }}>
              <strong>Dampak Kesehatan:</strong> Mengikat hemoglobin dalam darah jauh lebih kuat dibanding oksigen, menurunkan kapasitas pengangkutan oksigen ke jaringan tubuh, menyebabkan pusing, kelelahan, dan gangguan kardiovaskular.
            </Box>
          </Paper>

          {/* Nitrogen Dioksida */}
          <Paper
            p="lg"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 12,
            }}
          >
            <Flex align="center" gap={8} fw={700} c="brandSecondary.9" style={{ fontSize: 14 }}>
              <Box style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#f43f5e" }} />
              <span>Nitrogen Dioksida (NO2)</span>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Gas berwarna cokelat kemerahan yang dihasilkan dari pembakaran bersuhu tinggi (mesin kendaraan dan pembangkit listrik). NO2 adalah prekursor fotokimia utama dalam pembentukan ozon troposferik.
            </Text>
            <Box mt="auto" pt={8} style={{ borderTop: "1px solid #e2e8f0", color: "var(--mantine-color-brandSecondary-7)" }}>
              <strong>Dampak Kesehatan:</strong> Mengiritasi saluran pernapasan, memicu gejala asma, batuk, penurunan fungsi paru-paru, dan meningkatkan kerentanan terhadap infeksi pernapasan.
            </Box>
          </Paper>
        </SimpleGrid>

        {/* Ozon Permukaan & Fotokimia */}
        <Paper
          p="lg"
          radius="xl"
          withBorder
          style={{
            backgroundColor: "var(--mantine-color-brandPrimary-0)",
            borderColor: "var(--mantine-color-brandPrimary-2)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 12,
            color: "var(--mantine-color-brandPrimary-9)",
            lineHeight: 1.65,
          }}
        >
          <Flex align="center" gap={8} fw={700} c="brandPrimary.8" style={{ fontSize: 14 }}>
            <Satellite style={{ width: 16, height: 16, color: "var(--mantine-color-brandPrimary-6)" }} />
            <span>Ozon Permukaan (O3) sebagai Polutan Sekunder</span>
          </Flex>
          <Text size="xs" inherit>
            Ozon di stratosfer melindungi bumi dari sinar UV, namun ozon di lapisan permukaan (troposfer) merupakan polutan sekunder berbahaya yang terbentuk akibat reaksi fotokimia antara NO2 dan CO di bawah pengaruh radiasi sinar matahari langsung.
          </Text>
          <Text size="xs" inherit>
            Paparan konsentrasi ozon permukaan yang tinggi dapat merusak jaringan paru-paru, memperburuk kondisi penderita bronkitis kronis, dan merusak vegetasi serta hasil pertanian.
          </Text>
        </Paper>
      </Paper>
    </Stack>
  );
}

export default PollutionSection;
