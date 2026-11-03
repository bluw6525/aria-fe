"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { Paper, Table, Flex, Box, Title, Text, Stack } from "@mantine/core";

export function IspuStandardSection() {
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
            <ShieldAlert style={{ width: 20, height: 20, color: "var(--mantine-color-brandPrimary-6)" }} />
            <Title order={3} size="h4" fw={800} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Klasifikasi Indeks Standar Pencemar Udara (ISPU)
            </Title>
          </Flex>
          <Text size="xs" c="brandSecondary.5" mt={4}>
            Baku mutu dan kategori kualitas udara berdasarkan Peraturan Menteri Lingkungan Hidup dan Kehutanan (Permen LHK) No. 14 Tahun 2020.
          </Text>
        </Box>

        <Paper style={{ overflow: "hidden" }}>
          <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md" fz="xs">
            <Table.Thead style={{ backgroundColor: "var(--mantine-color-brandSecondary-0)" }}>
              <Table.Tr>
                <Table.Th style={{ width: 140, fontWeight: 700, color: "var(--mantine-color-brandSecondary-7)" }}>Kategori</Table.Th>
                <Table.Th style={{ width: 120, fontWeight: 700, color: "var(--mantine-color-brandSecondary-7)" }}>Rentang ISPU</Table.Th>
                <Table.Th style={{ fontWeight: 700, color: "var(--mantine-color-brandSecondary-7)" }}>Deskripsi Mutu Udara</Table.Th>
                <Table.Th style={{ fontWeight: 700, color: "var(--mantine-color-brandSecondary-7)" }}>Dampak Kesehatan & Saran</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td fw={700} c="brandSecondary.9">Baik</Table.Td>
                <Table.Td fw={700} ff="monospace">0 – 50</Table.Td>
                <Table.Td c="brandSecondary.6">Tingkat mutu udara sangat baik, tidak memberikan efek negatif bagi manusia maupun hewan dan tumbuhan.</Table.Td>
                <Table.Td c="brandSecondary.5">Sangat aman untuk seluruh aktivitas di luar ruangan.</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} c="brandSecondary.9">Sedang</Table.Td>
                <Table.Td fw={700} ff="monospace">51 – 100</Table.Td>
                <Table.Td c="brandSecondary.6">Kualitas udara masih dapat diterima bagi kesehatan manusia dan tidak berpengaruh pada tumbuhan.</Table.Td>
                <Table.Td c="brandSecondary.5">Aman untuk masyarakat umum, kelompok sangat sensitif disarankan membatasi paparan lama.</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} c="brandSecondary.9">Tidak Sehat</Table.Td>
                <Table.Td fw={700} ff="monospace">101 – 200</Table.Td>
                <Table.Td c="brandSecondary.6">Tingkat mutu udara yang bersifat merugikan pada manusia atau kelompok hewan yang sensitif.</Table.Td>
                <Table.Td c="brandSecondary.5">Kurangi aktivitas fisik berat di luar ruangan, terutama anak-anak dan lansia.</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} c="brandSecondary.9">Sangat Tidak Sehat</Table.Td>
                <Table.Td fw={700} ff="monospace">201 – 300</Table.Td>
                <Table.Td c="brandSecondary.6">Tingkat mutu udara yang dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi terpapar.</Table.Td>
                <Table.Td c="brandSecondary.5">Hindari aktivitas di luar ruangan yang berkepanjangan; gunakan masker pelindung.</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} c="brandSecondary.9">Berbahaya</Table.Td>
                <Table.Td fw={700} ff="monospace">&gt; 300</Table.Td>
                <Table.Td c="brandSecondary.6">Tingkat mutu udara berbahaya yang secara umum dapat merugikan kesehatan serius pada seluruh populasi.</Table.Td>
                <Table.Td c="brandSecondary.5">Tetap berada di dalam ruangan, tutup ventilasi udara luar, dan gunakan alat pemurni udara.</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>
      </Paper>
    </Stack>
  );
}

export default IspuStandardSection;
