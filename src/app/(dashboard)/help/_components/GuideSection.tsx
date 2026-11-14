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
            Panduan langkah pemantauan kualitas udara spasial DKI Jakarta, analisis tren deret waktu historis, serta peramalan ISPU 2 hari kedepan berbasis data satelit Sentinel-5P.
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
                Pemantauan Peta Sebaran ISPU
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Pantau sebaran mutu udara di 5 wilayah administrasi DKI Jakarta secara spasial:
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
                <strong>Pilih Basis Tanggal:</strong> Tentukan tanggal pengamatan pada kalender atau tekan tombol <em>Reset ke Hari Ini</em> untuk melihat data terkini.
              </div>
              <div>
                <strong>Kode Warna Mutu Udara:</strong> Poligon wilayah diwarnai otomatis sesuai kategori ISPU resmi (Hijau = Baik, Biru = Sedang, Kuning = Tidak Sehat, dst).
              </div>
              <div>
                <strong>Ringkasan Wilayah:</strong> Sorot atau klik kartu ringkasan di bawah peta untuk melihat angka ISPU dan tanggal observasi masing-masing wilayah.
              </div>
            </Box>
          </Paper>

          {/* Langkah 2: Peramalan 2 Hari Kedepan */}
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
                Peramalan 2 Hari Kedepan
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Antisipasi kondisi kualitas udara masa depan untuk perencanaan aktivitas:
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
                <strong>Proyeksi Besok & Lusa:</strong> Saat memantau data hari ini, kartu peramalan otomatis memproyeksikan indeks mutu udara untuk H+1 dan H+2.
              </div>
              <div>
                <strong>Indikator Perubahan (&Delta;):</strong> Perhatikan label selisih nilai apakah kualitas udara diproyeksikan membaik atau memburuk.
              </div>
              <div>
                <strong>Visualisasi Garis Hijau:</strong> Ujung grafik tren menampilkan garis putus-putus hijau sebagai panduan visual proyeksi jangka pendek.
              </div>
            </Box>
          </Paper>

          {/* Langkah 3: Eksplorasi Tren Deret Waktu */}
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
                Eksplorasi Tren Deret Waktu
              </Text>
            </Flex>
            <Text size="xs" c="brandSecondary.6" lh={1.6}>
              Pelajari riwayat dan dinamika perubahan kualitas udara pada wilayah tertentu:
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
                <strong>Buka Panel Analisis:</strong> Klik salah satu wilayah di peta untuk memunculkan panel rincian di sisi kanan layar.
              </div>
              <div>
                <strong>Atur Rentang Waktu:</strong> Pilih tanggal awal dan akhir (hingga 31 hari), lalu klik tombol <em>Terapkan Rentang Waktu</em>.
              </div>
              <div>
                <strong>Grafik & Tabel Harian:</strong> Amati grafik fluktuasi garis observasi historis serta tabel rincian konsentrasi polutan harian.
              </div>
            </Box>
          </Paper>
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}

export default GuideSection;
