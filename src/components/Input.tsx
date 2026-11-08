"use client";

import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Box, Group, Text } from "@mantine/core";

// Interface properti input yang memperluas atribut bawaan HTML input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;             // Label teks di atas field input
  labelRight?: ReactNode;        // Label tambahan di pojok kanan atas (misal: "Opsional" atau satuan)
  hint?: ReactNode;              // Teks petunjuk kecil di bawah input
  error?: ReactNode;             // Pesan error jika validasi gagal
  icon?: ReactNode;              // Komponen ikon utama
  iconPosition?: "left" | "right"; // Posisi ikon utama (default: kiri)
  iconRight?: ReactNode;         // Ikon khusus sisi kanan (misal: tombol toggle lihat password)
  containerClassName?: string;   // Kelas CSS pembungkus luar
}

/**
 * Komponen Input Reusable
 * Menggunakan `forwardRef` agar komponen parent dapat mengakses elemen DOM <input> asli
 * secara langsung (misal untuk fokus kursor, atau integrasi dengan form library).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelRight,
      hint,
      error,
      icon,
      iconPosition = "left",
      iconRight,
      containerClassName = "",
      className = "",
      disabled,
      id,
      style,
      ...props
    },
    ref // Parameter ref yang diteruskan ke tag <input> asli
  ) => {
    // Penentuan keberadaan ikon kiri & kanan
    const hasIconLeft = Boolean(icon && iconPosition === "left");
    const rightContent = iconRight || (iconPosition === "right" ? icon : null);
    const hasIconRight = Boolean(rightContent);

    return (
      // Wadah luar bertipe Box kolom vertikal dengan gap antar elemen sebesar 6px
      <Box style={{ display: "flex", flexDirection: "column", gap: 6 }} className={containerClassName}>
        
        {/* Header Label (Label kiri dan label kanan opsional) */}
        {(label || labelRight) && (
          <Group justify="space-between" align="center" style={{ fontSize: "12px", fontWeight: 700 }}>
            {label && (
              <label htmlFor={id} style={{ cursor: "pointer", color: "var(--mantine-color-brandSecondary-8)" }}>
                {label}
              </label>
            )}
            {labelRight && (
              <Text size="xs" c="dimmed" style={{ fontSize: "10px", fontWeight: 400 }}>
                {labelRight}
              </Text>
            )}
          </Group>
        )}

        {/* Wadah relatif untuk elemen <input> beserta posisi absolut ikonnya */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          
          {/* Render Ikon Sisi Kiri (jika ada) */}
          {hasIconLeft && (
            <div
              style={{
                position: "absolute",
                left: 14,
                display: "flex",
                alignItems: "center",
                pointerEvents: "none", // Agar klik mouse tembus langsung ke kolom input
                color: "var(--mantine-color-brandSecondary-4)",
              }}
            >
              {icon}
            </div>
          )}

          {/* Elemen HTML <input> asli */}
          <input
            ref={ref}              // Menyambungkan ref dari parent ke elemen DOM ini
            id={id}
            disabled={disabled}
            style={{
              width: "100%",
              height: 40,
              paddingLeft: hasIconLeft ? 40 : 14,   // Beri padding ekstra jika ada ikon di kiri
              paddingRight: hasIconRight ? 40 : 14, // Beri padding ekstra jika ada ikon di kanan
              border: error ? "1px solid #f43f5e" : "1px solid #cbd5e1", // Garis merah jika error
              borderRadius: 12,
              backgroundColor: disabled ? "#f1f5f9" : "#ffffff",
              color: disabled
                ? "var(--mantine-color-brandSecondary-4)"
                : "var(--mantine-color-brandSecondary-9)",
              fontSize: 12,
              fontWeight: 600,
              outline: "none",
              boxShadow: "var(--mantine-shadow-xs)",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
              cursor: disabled ? "not-allowed" : "text",
              ...style,
            }}
            className={className}
            {...props}
          />

          {/* Render Ikon Sisi Kanan (jika ada, misal ikon toggle mata password) */}
          {hasIconRight && (
            <div
              style={{
                position: "absolute",
                right: 14,
                display: "flex",
                alignItems: "center",
                color: "var(--mantine-color-brandSecondary-4)",
              }}
            >
              {rightContent}
            </div>
          )}
        </div>

        {/* Tampilan Pesan Error (prioritas utama) atau Teks Petunjuk (hint) */}
        {error ? (
          <Text size="xs" c="red.6" style={{ fontSize: 11, fontWeight: 500 }}>
            {error}
          </Text>
        ) : hint ? (
          <Text size="xs" c="dimmed" style={{ fontSize: 11 }}>
            {hint}
          </Text>
        ) : null}
      </Box>
    );
  }
);

// Menetapkan displayName untuk kemudahan debugging di React DevTools
Input.displayName = "Input";

export default Input;
