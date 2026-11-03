"use client";

import React, { useRef } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Stack, Text, Paper, UnstyledButton, ActionIcon, Flex } from "@mantine/core";

// Interface definisi properti untuk komponen FileUploader
export interface FileUploaderProps {
  file: File | null;                     // State file yang sedang terpilih (atau null jika belum ada)
  onFileSelect: (file: File) => void;    // Callback fungsi ketika pengguna memilih berkas baru
  onFileRemove: () => void;              // Callback fungsi ketika pengguna menekan tombol hapus berkas
  label?: string;                        // Label di bagian atas uploader (opsional)
  hint?: string;                         // Teks petunjuk kecil di bawah uploader (opsional)
  accept?: string;                       // Ekstensi berkas yang diizinkan (default: .xlsx, .xls, .csv)
  placeholder?: string;                  // Pesan teks saat area upload masih kosong
  disabled?: boolean;                    // Menonaktifkan interaksi upload
}

/**
 * Komponen FileUploader
 * Mengelola interaksi upload berkas spreadsheet (Excel / CSV) dengan dua mode tampilan:
 * 1. Mode Belum Dipilih: Tombol putus-putus untuk memicu dialog pemilihan berkas.
 * 2. Mode Sudah Dipilih: Kartu informasi nama dan ukuran berkas terpilih serta tombol hapus.
 */
export function FileUploader({
  file,
  onFileSelect,
  onFileRemove,
  label,
  hint,
  accept = ".xlsx,.xls,.csv",
  placeholder = "Pilih file (.xlsx, .csv, .xls)",
  disabled = false,
}: FileUploaderProps) {
  // Ref untuk mengontrol elemen <input type="file"> tersembunyi
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper fungsi untuk memformat ukuran berkas dari byte ke B / KB / MB
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    // Wadah vertikal utama dengan jarak 6px
    <Stack gap={6}>
      {/* Label Komponen di bagian atas */}
      {label && (
        <Text size="xs" fw={700} c="brandSecondary.9">
          {label}
        </Text>
      )}

      {/* 
        Elemen input file HTML asli.
        Disembunyikan dengan `display: none` agar kita bisa mendesain tombol upload sendiri 
        yang lebih menarik secara estetika, lalu diklik via inputRef.current?.click().
      */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        style={{ display: "none" }}
        onChange={(e) => {
          // Ketika user selesai memilih berkas dari dialog komputer, kirim ke parent
          if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* 
        Kondisi Rendering:
        - Jika file SUDAH ada -> Tampilkan Paper card dengan nama file, ukuran, dan tombol hapus (X)
        - Jika file BELUM ada -> Tampilkan tombol putus-putus untuk memicu dialog upload
      */}
      {file ? (
        /* TAMPILAN KETIKA BERKAS SUDAH DIPILIH */
        <Paper
          px="sm"
          py="xs"
          radius="md"
          withBorder
          style={{
            backgroundColor: "var(--mantine-color-brandPrimary-0)",
            borderColor: "var(--mantine-color-brandPrimary-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Ikon Spreadsheet + Nama File + Ukuran */}
          <Flex align="center" gap="xs" style={{ minWidth: 0 }}>
            <FileSpreadsheet size={16} color="var(--mantine-color-brandPrimary-6)" style={{ flexShrink: 0 }} />
            <Flex align="center" gap={6} style={{ minWidth: 0 }}>
              <Text size="xs" fw={700} c="brandPrimary.9" truncate>
                {file.name}
              </Text>
              <Text size="xs" c="brandSecondary.4" fw={500} style={{ flexShrink: 0, fontSize: 10 }}>
                ({formatFileSize(file.size)})
              </Text>
            </Flex>
          </Flex>

          {/* Tombol Hapus Berkas (ikon silang X) */}
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={onFileRemove}
            disabled={disabled}
            title="Hapus berkas"
          >
            <X size={14} />
          </ActionIcon>
        </Paper>
      ) : (
        /* TAMPILAN KETIKA BERKAS BELUM DIPILIH (Tombol Dropzone/Upload) */
        <UnstyledButton
          onClick={() => inputRef.current?.click()} // Memicu klik pada input file tersembunyi
          disabled={disabled}
          p="sm"
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: 12,
            backgroundColor: "var(--mantine-color-brandSecondary-0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--mantine-color-brandSecondary-6)",
            transition: "all 150ms ease",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <Flex align="center" gap="xs" style={{ minWidth: 0, paddingRight: 8 }}>
            <FileSpreadsheet size={16} color="var(--mantine-color-brandSecondary-4)" style={{ flexShrink: 0 }} />
            <Text size="xs" c="brandSecondary.5" truncate>
              {placeholder}
            </Text>
          </Flex>
          <Upload size={14} color="var(--mantine-color-brandSecondary-4)" style={{ flexShrink: 0 }} />
        </UnstyledButton>
      )}

      {/* Teks Petunjuk Tambahan di bagian bawah (opsional) */}
      {hint && (
        <Text size="xs" c="brandSecondary.4" style={{ fontSize: 11 }}>
          {hint}
        </Text>
      )}
    </Stack>
  );
}

export default FileUploader;
