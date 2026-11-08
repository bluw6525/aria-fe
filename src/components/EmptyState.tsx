"use client";

import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Title, Text, Box, Center, Stack } from "@mantine/core";

// Interface definisi tipe props yang diterima oleh komponen EmptyState
interface EmptyStateProps {
  icon: LucideIcon;          // Komponen ikon dari lucide-react untuk ilustrasi visual
  title: string;             // Judul pesan status kosong (misal: "Belum Ada Hasil")
  description: ReactNode;    // Teks panduan atau instruksi untuk pengguna
  className?: string;        // Kelas CSS tambahan (opsional)
  action?: ReactNode;        // Elemen aksi tambahan seperti tombol (opsional)
}

/**
 * Komponen EmptyState
 * Berfungsi menampilkan placeholder visual ketika suatu halaman atau panel belum memiliki data/hasil.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    // Wadah terluar diposisikan di tengah secara vertikal & horizontal
    <Center py={64} style={{ flex: 1, width: "100%", textAlign: "center" }}>
      {/* Tumpukan vertikal untuk ikon, judul, deskripsi, dan tombol aksi */}
      <Stack align="center" gap="xs">
        
        {/* Lingkaran / badge pembungkus ikon dengan latar belakang brand */}
        <Center
          w={56}
          h={56}
          mb="xs"
          style={{
            borderRadius: 16,
            backgroundColor: "var(--mantine-color-brandPrimary-0)",
            border: "1px solid var(--mantine-color-brandPrimary-1)",
            color: "var(--mantine-color-brandPrimary-6)",
          }}
        >
          {/* Render ikon dinamis berukuran 28px */}
          <Icon size={28} />
        </Center>

        {/* Judul status kosong */}
        <Title order={4} size="h5" fw={700} c="brandSecondary.9">
          {title}
        </Title>

        {/* Deskripsi petunjuk langkah selanjutnya bagi pengguna */}
        <Text size="xs" c="brandSecondary.5" maw={420} lh={1.6}>
          {description}
        </Text>

        {/* Tombol aksi opsional (jika prop 'action' dikirimkan) */}
        {action && <Box mt="md">{action}</Box>}
      </Stack>
    </Center>
  );
}

export default EmptyState;
