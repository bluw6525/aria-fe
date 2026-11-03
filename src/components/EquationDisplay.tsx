"use client";

import React from "react";
import { Paper, Text, Stack } from "@mantine/core";

// Interface definisi properti untuk penampil rumus matematika / persamaan regresi
interface EquationDisplayProps {
  equation: string;          // String teks rumus matematika (misal: "ISPU = 21.45 + 0.34(CO) + 1.12(NO2)")
  label?: string;            // Label judul di atas rumus (opsional, misal: "Persamaan Regresi")
  className?: string;        // Kelas CSS tambahan (opsional)
  size?: "sm" | "md";        // Ukuran tampilan: "sm" (kecil/ringkas) atau "md" (sedang/standar)
}

/**
 * Komponen EquationDisplay
 * Berfungsi menampilkan persamaan model regresi linear dalam wadah bergaya blok kode dengan font monospace,
 * dilengkapi overflow horizontal agar rumus panjang tetap rapi dan bisa digeser (scroll).
 */
export function EquationDisplay({
  equation,
  label,
  size = "md",
}: EquationDisplayProps) {
  // Pengecekan ukuran
  const isSm = size === "sm";

  return (
    // Wadah vertikal yang mengelompokkan label dan kotak rumus dengan jarak 6px
    <Stack gap={6}>
      {/* Label Keterangan Rumus (jika disediakan) */}
      {label && (
        <Text size="xs" fw={700} c="brandSecondary.7" tt="capitalize">
          {label}
        </Text>
      )}

      {/* Kotak Paper Berwarna Biru Lembut untuk Menyorot Rumus Matematika */}
      <Paper
        p={isSm ? "xs" : "sm"}
        radius="lg"
        withBorder
        style={{
          backgroundColor: "var(--mantine-color-brandPrimary-0)",
          borderColor: "var(--mantine-color-brandPrimary-2)",
          color: "var(--mantine-color-brandPrimary-9)",
          overflowX: "auto", // Mengizinkan scroll horizontal jika formula terlalu panjang
        }}
      >
        {/* Teks Rumus dengan tipografi monospace untuk notasi matematis */}
        <Text size={isSm ? "xs" : "sm"} fw={700} ff="monospace" c="brandPrimary.7">
          {equation}
        </Text>
      </Paper>
    </Stack>
  );
}

export default EquationDisplay;
