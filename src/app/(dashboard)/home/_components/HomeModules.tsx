"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Gauge,
  HelpCircle,
  History,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Paper, SimpleGrid, Flex, Box, Title, Text, Badge, ThemeIcon } from "@mantine/core";

interface ModuleItem {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  icon: LucideIcon;
}

const MODULES: ModuleItem[] = [
  {
    title: "Modul Estimasi Kualitas Udara",
    description:
      "Melakukan estimasi nilai konsentrasi O₃ dan kategori ISPU SPKU berdasarkan data polutan CO dan NO₂ Sentinel-5P melalui input nilai manual maupun unggah berkas data.",
    href: "/estimate",
    actionLabel: "Buka Estimasi",
    icon: Gauge,
  },
  {
    title: "Modul Bantuan & Teori",
    description:
      "Penyedia informasi pendukung mencakup panduan penggunaan aplikasi, dasar teori metode estimasi regresi, serta tabel klasifikasi ISPU (Permen LHK No. 14 Tahun 2020).",
    href: "/help",
    actionLabel: "Buka Panduan",
    icon: HelpCircle,
  },
  {
    title: "Modul Riwayat Perancang",
    description:
      "Menyajikan profil pengembang, latar belakang penelitian, serta dedikasi dalam perancangan sistem Aria.",
    href: "/history",
    actionLabel: "Buka Riwayat",
    icon: History,
  },
];

function ModuleCard({
  title,
  description,
  href,
  actionLabel,
  icon: Icon,
}: ModuleItem) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Paper
        p="lg"
        radius="md"
        bg="brandSecondary.0"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          transition: "all 150ms ease",
        }}
      >
        <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ThemeIcon size={34} radius="md" color="brandPrimary" variant="filled">
            <Icon size={18} />
          </ThemeIcon>
          <Title order={3} size="sm" fw={700} c="brandSecondary.9">
            {title}
          </Title>
          <Text size="xs" c="brandSecondary.6" lh={1.6}>
            {description}
          </Text>
        </Box>
        <Flex
          align="center"
          gap={6}
          mt={16}
          pt={12}
          style={{
            borderTop: "1px solid var(--mantine-color-brandSecondary-2)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--mantine-color-brandPrimary-6)",
          }}
        >
          <span>{actionLabel}</span>
          <ArrowRight style={{ width: 14, height: 14 }} />
        </Flex>
      </Paper>
    </Link>
  );
}

export function HomeModules() {
  return (
    <Paper
      p={{ base: 16, sm: 20, md: 28 }}
      radius="lg"
      shadow="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Header Bagian Modul */}
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
            <Layers style={{ width: 20, height: 20 }} />
          </Box>
          <Box>
            <Title order={2} size="h4" fw={700} c="brandSecondary.9" style={{ letterSpacing: "-0.01em" }}>
              Fitur & Modul Aplikasi
            </Title>
            <Text size="xs" c="brandSecondary.5">
              Panduan ringkas fitur dan modul yang dapat diakses pengguna di dalam sistem
            </Text>
          </Box>
        </Flex>

        <Badge color="gray" variant="light" size="md" radius="xl">
          Navigasi Antarmuka
        </Badge>
      </Flex>

      {/* Grid Kartu Modul */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        {MODULES.map((mod) => (
          <ModuleCard
            key={mod.title}
            title={mod.title}
            description={mod.description}
            href={mod.href}
            actionLabel={mod.actionLabel}
            icon={mod.icon}
          />
        ))}
      </SimpleGrid>
    </Paper>
  );
}

export default HomeModules;
