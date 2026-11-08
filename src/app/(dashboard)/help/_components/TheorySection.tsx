"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { Paper, SimpleGrid, Flex, Box, Title, Text, Stack } from "@mantine/core";

export function TheorySection() {
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
            <Cpu style={{ width: 20, height: 20, color: "var(--mantine-color-brandPrimary-6)" }} />
            <Title order={3} size="h4" fw={800} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Dasar Teori Regresi Linear Robust & MM-Estimator
            </Title>
          </Flex>
          <Text size="xs" c="brandSecondary.5" mt={4}>
            Penjelasan matematis mengapa metode Ordinary Least Squares (OLS) rentan terhadap pencilan satelit dan bagaimana MM-estimator menyelesaikan kelemahan tersebut.
          </Text>
        </Box>

        {/* Mengapa Regresi Robust Dibutuhkan? */}
        <Stack gap={10} style={{ fontSize: 12, color: "var(--mantine-color-brandSecondary-7)", lineHeight: 1.65 }}>
          <Text size="sm" fw={700} c="brandSecondary.9">
            1. Keterbatasan Regresi Klasik (OLS) Terhadap Data Satelit
          </Text>
          <Text size="xs" inherit>
            Metode kuadrat terkecil klasik (Ordinary Least Squares / OLS) mengasumsikan galat berdistribusi normal tanpa adanya pencilan (outliers). Namun, data penginderaan jauh satelit Sentinel-5P sering mengandung derau (noise) akibat tutupan awan.
          </Text>
          <Text size="xs" inherit>
            Satu titik pencilan ekstrem saja dapat menarik garis regresi OLS menjauh dari tren data populasi sesungguhnya karena fungsi kuadratik OLS memberikan penalti kuadratik yang sangat besar terhadap residual besar.
          </Text>
        </Stack>

        {/* Evolusi M, S, hingga MM-Estimator */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          {/* M-Estimator */}
          <Paper
            p="md"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 12,
            }}
          >
            <Text size="sm" fw={700} c="brandSecondary.9">
              M-Estimator (Huber, 1973)
            </Text>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Meminimumkan fungsi objektif dari residual terstandarisasi sehingga observasi dengan residual besar memperoleh kontribusi lebih kecil dalam penaksiran parameter.
            </Text>
            <Box mt="auto" pt={8} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }}>
              <Text size="xs" fw={600} c="green.8" inherit>
                Kelebihan: Memiliki efisiensi relatif yang tinggi ketika data mendekati distribusi normal.
              </Text>
              <Text size="xs" fw={600} c="red.6" inherit>
                Kelemahan: Nilai breakdown point rendah.
              </Text>
            </Box>
          </Paper>

          {/* S-Estimator */}
          <Paper
            p="md"
            bg="brandSecondary.0"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 12,
            }}
          >
            <Text size="sm" fw={700} c="brandSecondary.9">
              S-Estimator (Rousseeuw & Yohai, 1984)
            </Text>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Meminimumkan suatu estimator skala robust (M-scale) dari residual, bukan meminimumkan fungsi objektif residual secara langsung.
            </Text>
            <Box mt="auto" pt={8} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }}>
              <Text size="xs" fw={600} c="green.8" inherit>
                Kelebihan: Memiliki nilai breakdown point tinggi hingga mencapai batas teoretis maksimum sebesar 50%.
              </Text>
              <Text size="xs" fw={600} c="red.6" inherit>
                Kelemahan: Efisiensi relatif estimatornya masih tergolong rendah.
              </Text>
            </Box>
          </Paper>

          {/* MM-Estimator */}
          <Paper
            p="md"
            radius="xl"
            withBorder
            style={{
              backgroundColor: "var(--mantine-color-brandPrimary-0)",
              borderColor: "var(--mantine-color-brandPrimary-2)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 12,
            }}
          >
            <Text size="sm" fw={700} c="brandPrimary.8">
              MM-Estimator (Yohai, 1987)
            </Text>
            <Text size="xs" c="brandPrimary.9" lh={1.6}>
              Metode regresi robust yang dirancang untuk mengatasi kelemahan M-estimator dan S-estimator secara simultan.
            </Text>
            <Box mt="auto" pt={8} style={{ fontSize: 11 }}>
              <Text size="xs" fw={600} c="brandPrimary.9" inherit>
                Metode optimal: Memiliki nilai breakdown point tinggi (mencapai hingga 50%) sekaligus mempertahankan efisiensi relatif yang tinggi (mencapai 95%).
              </Text>
            </Box>
          </Paper>
        </SimpleGrid>

        {/* Tahapan Algoritma MM-Estimator */}
        <Paper
          p="lg"
          bg="brandSecondary.0"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 12,
            color: "var(--mantine-color-brandSecondary-7)",
            lineHeight: 1.65,
          }}
        >
          <Text size="sm" fw={700} c="brandSecondary.9">
            2. Tiga Tahap Komputasi MM-Estimator (Yohai, 1987)
          </Text>
          <Box component="ol" pl={20} m={0} style={{ display: "flex", flexDirection: "column", gap: 8, color: "var(--mantine-color-brandSecondary-6)" }}>
            <li>
              <strong>Tahap 1 (Inisialisasi S-Estimator):</strong> Menghitung estimasi parameter awal dan skala residual robust <code>s</code> menggunakan algoritma S-estimator dengan konstanta efisiensi tuning yang menjamin ketahanan breakdown point 50%.
            </li>
            <li>
              <strong>Tahap 2 (Skala Robust Terkunci):</strong> Skala residual <code>s</code> yang dihasilkan pada tahap S dikunci dan dijadikan skala tetap untuk standarisasi residual sepanjang iterasi berikutnya.
            </li>
            <li>
              <strong>Tahap 3 (Iterative Reweighted Least Squares / IRLS):</strong> Menggunakan fungsi pembobot Tukey Bisquare untuk menghitung bobot observasi pada setiap iterasi hingga nilai koefisien konvergen.
            </li>
          </Box>
        </Paper>
      </Paper>
    </Stack>
  );
}

export default TheorySection;
