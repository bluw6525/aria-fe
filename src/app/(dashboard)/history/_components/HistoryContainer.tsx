"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import { Paper, Flex, Box, Title, Text, Badge, Stack } from "@mantine/core";

export function HistoryContainer() {
  return (
    <Box maw={896} mx="auto" w="100%" pb={64}>
      {/* Profil Perancang: Christopher Wijaya */}
      <Paper
        p={{ base: 24, md: 40 }}
        shadow="xs"
      >
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          gap={{ base: 32, md: 48 }}
        >
          {/* Kolom Teks Informasi */}
          <Box style={{ flex: 1, textAlign: "left" }}>
            <Box mb={8}>
              <Badge
                color="sky"
                variant="light"
                size="md"
                radius="xl"
                leftSection={<GraduationCap style={{ width: 14, height: 14 }} />}
              >
                Perancang & Pengembang Sistem
              </Badge>
            </Box>

            <Title order={2} size={30} fw={900} c="brandSecondary.9" style={{ letterSpacing: "-0.02em" }} mb={4}>
              Christopher Wijaya
            </Title>

            <Flex align="center" wrap="wrap" gap={12} mb={20} style={{ fontSize: "12px", fontWeight: 600 }}>
              <Box
                px={10}
                py={4}
                style={{
                  borderRadius: 6,
                  backgroundColor: "var(--mantine-color-brandSecondary-1)",
                  border: "1px solid #e2e8f0",
                  fontFamily: "monospace",
                  color: "var(--mantine-color-brandSecondary-7)",
                }}
              >
                NIM: 535230158
              </Box>
              <Flex align="center" gap={4} c="brandSecondary.6">
                <MapPin style={{ width: 14, height: 14, color: "var(--mantine-color-brandSecondary-4)" }} />
                <span>Universitas Tarumanagara</span>
              </Flex>
            </Flex>

            <Stack gap={12} style={{ fontSize: 15, color: "var(--mantine-color-brandSecondary-7)", lineHeight: 1.65 }}>
              <Text inherit>
                Halo! Saya adalah mahasiswa Teknik Informatika di <strong>Universitas Tarumanagara</strong> yang memiliki kepedulian mendalam terhadap kelestarian lingkungan dan isu polusi udara perkotaan.
              </Text>
              <Text inherit>
                Didorong oleh keinginan nyata untuk berkontribusi bagi masyarakat dan lingkungan hidup, saya merancang serta mengembangkan sistem <strong>Aria</strong>. Melalui pemanfaatan data penginderaan jauh satelit Sentinel-5P dan algoritma regresi robust, sistem ini bertujuan menghadirkan estimasi Indeks Standar Pencemar Udara (ISPU) yang akurat, transparan, dan dapat diakses dengan mudah oleh semua orang guna mendukung pengambilan keputusan berbasis lingkungan yang lebih sehat.
              </Text>
            </Stack>

            {/* Mention Dosen Pembimbing */}
            <Box mt={24} pt={16} style={{ borderTop: "1px solid #f1f5f9", fontSize: 12 }}>
              <Text size="xs" fw={700} c="brandSecondary.8" mb={6}>
                Dosen Pembimbing:
              </Text>
              <Stack gap={4} style={{ color: "var(--mantine-color-brandSecondary-7)", fontSize: 12 }}>
                <Text size="xs" inherit>
                  1. <strong>Dyah Erny Herwindiati, Prof. Dr., Ir., M.Si.</strong>
                </Text>
                <Text size="xs" inherit>
                  2. <strong>Lely Hiryanto, ST., M.Sc., Ph.D.</strong>
                </Text>
              </Stack>
            </Box>
          </Box>

          {/* Kolom Foto Profil Perancang */}
          <Box
            style={{
              width: 200,
              height: 256,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "var(--mantine-shadow-md)",
              border: "2px solid var(--mantine-color-brandSecondary-2)",
              flexShrink: 0,
              position: "relative",
              backgroundColor: "var(--mantine-color-brandSecondary-1)",
            }}
          >
            <Image
              src="/images/perancang_1.png"
              alt="Foto Profil Christopher Wijaya"
              fill
              sizes="200px"
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
          </Box>
        </Flex>
      </Paper>
    </Box>
  );
}

export default HistoryContainer;
