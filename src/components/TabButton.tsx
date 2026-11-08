"use client";

import React, { ReactNode } from "react";
import { UnstyledButton, Text } from "@mantine/core";

// Interface definisi properti untuk tombol tab switch navigasi
export interface TabButtonProps {
  label: string;       // Teks label pada tombol tab
  icon?: ReactNode;    // Elemen ikon di samping label (opsional)
  isActive: boolean;   // Status boolean penanda apakah tab ini sedang aktif terpilih
  onClick: () => void; // Fungsi callback ketika tombol tab diklik
  className?: string;  // Kelas CSS tambahan (opsional)
}

/**
 * Komponen TabButton
 * Tombol tab navigasi berbentuk segmented/pill (digunakan misalnya di halaman Bantuan / HelpContainer).
 * Memberikan efek visual kontras ketika tab dalam keadaan aktif (`isActive: true`).
 */
export function TabButton({
  label,
  icon,
  isActive,
  onClick,
  className = "",
}: TabButtonProps) {
  return (
    // Menggunakan UnstyledButton Mantine agar tombol bersih dari gaya default browser
    <UnstyledButton
      type="button"
      onClick={onClick}
      px="md"
      py="xs"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 12,
        transition: "all 150ms ease",
        // Gaya visual berubah dinamis: putih + bayangan saat aktif, transparan saat tidak aktif
        backgroundColor: isActive ? "#ffffff" : "transparent",
        boxShadow: isActive ? "var(--mantine-color-shadow-xs, 0 1px 3px rgba(0,0,0,0.05))" : "none",
        color: isActive ? "var(--mantine-color-brandPrimary-8)" : "var(--mantine-color-brandSecondary-6)",
        fontWeight: 700,
        fontSize: "12px",
      }}
      className={className}
    >
      {/* Ikon tab (opsional) */}
      {icon}

      {/* Teks label tab */}
      <Text size="xs" fw={700} inherit>
        {label}
      </Text>
    </UnstyledButton>
  );
}

export default TabButton;
