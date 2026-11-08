"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { Paper, SimpleGrid, Flex, Box, Title, Text, Stack, ThemeIcon } from "@mantine/core";

export function GuideSection() {
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
            <BookOpen style={{ width: 20, height: 20, color: "var(--mantine-color-brandPrimary-6)" }} />
            <Title order={3} size="h4" fw={800} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Alur Kerja & Panduan Penggunaan Sistem Aria
            </Title>
          </Flex>
          <Text size="xs" c="brandSecondary.5" mt={4}>
            Panduan ringkas langkah-langkah estimasi Indeks Standar Pencemar Udara (ISPU) berbasis data satelit Sentinel-5P menggunakan model regresi robust.
          </Text>
        </Box>

        {/* 3 Langkah Alur Kerja */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          {/* Langkah 1 */}
          <Paper
            p="md"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Flex align="center" gap={10}>
              <ThemeIcon
                size={28}
                radius="md"
                color="brandPrimary"
                variant="filled"
                style={{ flexShrink: 0 }}
              >
                <Text size="xs" fw={800} c="white">
                  1
                </Text>
              </ThemeIcon>
              <Text size="sm" fw={700} c="brandSecondary.9">
                Pilih Model Estimasi
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Pilih salah satu model regresi robust terverifikasi yang tersedia (seperti <strong>MM-Estimator</strong>, <strong>M-Estimator</strong>, atau <strong>S-Estimator</strong>) pada menu dropdown model.
            </Text>
          </Paper>

          {/* Langkah 2 */}
          <Paper
            p="md"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Flex align="center" gap={10}>
              <ThemeIcon
                size={28}
                radius="md"
                color="brandPrimary"
                variant="filled"
                style={{ flexShrink: 0 }}
              >
                <Text size="xs" fw={800} c="white">
                  2
                </Text>
              </ThemeIcon>
              <Text size="sm" fw={700} c="brandSecondary.9">
                Masukkan Data Prekursor
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Tersedia 2 metode input data prekursor udara (CO & NO₂):
            </Text>
            <Box
              pl={12}
              style={{
                borderLeft: "2px solid #7dd3fc",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 12,
                color: "var(--mantine-color-brandSecondary-6)",
              }}
            >
              <div>
                <strong>Unggah Berkas (Batch):</strong> Unggah file <code>.xlsx</code> / <code>.csv</code> untuk estimasi banyak baris data sekaligus.
              </div>
              <div>
                <strong>Input Manual:</strong> Masukkan nilai numerik secara mandiri untuk estimasi titik tunggal secara seketika.
              </div>
            </Box>
          </Paper>

          {/* Langkah 3 */}
          <Paper
            p="md"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Flex align="center" gap={10}>
              <ThemeIcon
                size={28}
                radius="md"
                color="brandPrimary"
                variant="filled"
                style={{ flexShrink: 0 }}
              >
                <Text size="xs" fw={800} c="white">
                  3
                </Text>
              </ThemeIcon>
              <Text size="sm" fw={700} c="brandSecondary.9">
                Analisis Hasil & Kategori
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Sistem akan menghitung estimasi nilai ISPU, memetakan kategori kualitas udara (Baik hingga Berbahaya), serta menyajikan grafik tren.
            </Text>
          </Paper>
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}

export default GuideSection;
