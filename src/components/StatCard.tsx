"use client";

import React, { ReactNode } from "react";
import { Paper, Text, MantineRadius } from "@mantine/core";

// Interface definisi properti untuk kartu ringkasan metrik statistik
interface StatCardProps {
  label: string;             // Judul metrik (misal: "R-SQUARED", "RMSE", "JUMLAH DATA")
  value: ReactNode;          // Nilai angka atau elemen tampilan metrik
  variant?: "sky" | "slate"; // Tema warna kartu: "sky" (biru muda) atau "slate" (abu netral)
  radius?: MantineRadius;    // Kebulatan sudut kartu Mantine (default: "lg")
  className?: string;        // Kelas CSS tambahan untuk kartu luar
  valueClassName?: string;   // Kelas CSS tambahan untuk elemen nilai
  labelClassName?: string;   // Kelas CSS tambahan untuk elemen label
}

/**
 * Komponen StatCard
 * Berfungsi menampilkan angka metrik statistik (seperti metrik performa model R², RMSE, MAE, atau hitungan data)
 * secara ringkas, tegas, dan seragam.
 */
export function StatCard({
  label,
  value,
  variant = "sky",
  radius = "lg",
  className = "",
  valueClassName = "",
  labelClassName = "",
}: StatCardProps) {
  // Pengecekan varian warna: tema langit (sky) vs abu-abu (slate)
  const isSky = variant === "sky";

  return (
    // Kartu Paper Mantine dengan batas garis (withBorder) dan isi di tengah
    <Paper
      p="sm"
      radius={radius}
      withBorder
      style={{
        backgroundColor: isSky ? "var(--mantine-color-brandPrimary-0)" : "var(--mantine-color-brandSecondary-0)",
        borderColor: isSky ? "var(--mantine-color-brandPrimary-2)" : "var(--mantine-color-brandSecondary-2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 84, // Menjaga keseragaman tinggi kartu dalam grid
      }}
      className={className}
    >
      {/* Label Metrik: Huruf kapital (uppercase) dengan jarak antar huruf renggang */}
      <Text
        size="xs"
        fw={700}
        tt="uppercase"
        style={{ letterSpacing: "0.05em", fontSize: "11px" }}
        c={isSky ? "brandSecondary.6" : "brandSecondary.5"}
        className={labelClassName}
      >
        {label}
      </Text>

      {/* Nilai Metrik: Angka tebal berukuran besar (xl, fw 800) */}
      <Text
        size="xl"
        fw={800}
        c={isSky ? "brandPrimary.7" : "brandSecondary.9"}
        className={valueClassName}
        style={{ letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: 4 }}
      >
        {value}
      </Text>
    </Paper>
  );
}

export default StatCard;
