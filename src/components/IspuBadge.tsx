"use client";

import React from "react";
import { Badge } from "@mantine/core";
import { getIspuStyle } from "@/app/(dashboard)/estimate/_types";

// Interface untuk properti badge kategori ISPU
interface IspuBadgeProps {
  category: string;             // Nama kategori ISPU (misal: "BAIK", "SEDANG", "TIDAK SEHAT", dll.)
  size?: "xs" | "sm" | "md";    // Pilihan ukuran badge (default: "sm")
  className?: string;           // Kelas CSS tambahan (opsional)
}

/**
 * Komponen IspuBadge
 * Berfungsi menampilkan label/badge kategori kualitas udara ISPU dengan warna latar, border, 
 * dan warna teks yang disesuaikan secara otomatis berdasarkan standar KLHK.
 */
export function IspuBadge({
  category,
  size = "sm",
  className = "",
}: IspuBadgeProps) {
  // Mengambil konfigurasi palet warna (bgHex, borderHex, textHex, color) berdasarkan kategori
  const ispuStyle = getIspuStyle(category);

  // Menyesuaikan ukuran dengan format prop yang diterima oleh Mantine Badge
  const mantineSize = size === "xs" ? "xs" : size === "md" ? "md" : "sm";

  return (
    // Badge Mantine berbentuk pill (radius="xl") dengan border dan warna dinamis
    <Badge
      size={mantineSize}
      radius="xl"
      variant="light"
      color={ispuStyle.color}
      style={{
        backgroundColor: ispuStyle.bgHex,
        borderColor: ispuStyle.borderHex,
        color: ispuStyle.textHex,
        border: `1px solid ${ispuStyle.borderHex}`,
        fontWeight: 700,
        userSelect: "none", // Mencegah teks terpilih tidak sengaja saat diklik
      }}
      className={className}
    >
      {category}
    </Badge>
  );
}

export default IspuBadge;
