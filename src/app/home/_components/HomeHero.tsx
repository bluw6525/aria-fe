"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Box, Flex, Title, Text, Group, Button as MantineBtn } from "@mantine/core";

export function HomeHero() {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={48}
      maw={1024}
      mx="auto"
      w="100%"
      pt={8}
      pb={40}
    >
      {/* Kolom Kiri: Judul, Deskripsi, CTA */}
      <Box style={{ flexShrink: 0, maxWidth: 512 }}>
        <Title
          order={1}
          size={48}
          fw={900}
          c="brandSecondary.9"
          style={{ lineHeight: 1.15, letterSpacing: "-0.03em" }}
        >
          Estimasi Konsentrasi <br />
          Ozon Permukaan <br />
          <Text component="span" c="brandPrimary.6" inherit>
            DKI JAKARTA
          </Text>
        </Title>

        {/* Garis Aksen Solid */}
        <Box
          mt={16}
          mb={16}
          style={{
            width: 80,
            height: 4,
            backgroundColor: "var(--mantine-color-brandPrimary-5)",
            borderRadius: 9999,
          }}
        />

        {/* Deskripsi */}
        <Text size="md" c="brandSecondary.6" lh={1.6} fw={400}>
          Pemantauan dan estimasi presisi konsentrasi Ozon (O3) permukaan secara
          berkala menggunakan analisis citra satelit pengorbit Bumi Sentinel-5P TROPOMI.
        </Text>

        {/* Tombol Aksi (CTA) */}
        <Group gap={14} mt={24}>
          <Link href="/estimate" style={{ textDecoration: "none" }}>
            <MantineBtn
              color="brandPrimary"
              variant="filled"
              size="md"
              radius="xl"
              rightSection={<ArrowRight style={{ width: 16, height: 16 }} />}
              style={{ boxShadow: "var(--mantine-shadow-md)" }}
            >
              Mulai Estimasi
            </MantineBtn>
          </Link>
          <Link href="/help" style={{ textDecoration: "none" }}>
            <MantineBtn
              variant="default"
              size="md"
              radius="xl"
              bg="white"
              style={{
                borderColor: "var(--mantine-color-brandSecondary-3)",
                color: "var(--mantine-color-brandSecondary-7)",
              }}
            >
              Panduan Sistem
            </MantineBtn>
          </Link>
        </Group>
      </Box>

      {/* Kolom Kanan: Gambar Satelit Sentinel 5P */}
      <Box style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
        <Image
          src="/images/home.webp"
          alt="Sentinel 5P Satellite Illustration"
          width={400}
          height={400}
          priority
          style={{
            width: 368,
            height: "auto",
            filter: "drop-shadow(0 10px 8px var(--mantine-color-brandSecondary-2))",
            objectFit: "contain",
            userSelect: "none",
          }}
        />
      </Box>
    </Flex>
  );
}

export default HomeHero;
