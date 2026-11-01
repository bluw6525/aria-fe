"use client";

import React, { useRef } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Stack, Text, Paper, UnstyledButton, ActionIcon, Flex } from "@mantine/core";

export interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  label?: string;
  hint?: string;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
}

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
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Stack gap={6}>
      {label && (
        <Text size="xs" fw={700} c="brandSecondary.9">
          {label}
        </Text>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />

      {file ? (
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
        <UnstyledButton
          onClick={() => inputRef.current?.click()}
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

      {hint && (
        <Text size="xs" c="brandSecondary.4" style={{ fontSize: 11 }}>
          {hint}
        </Text>
      )}
    </Stack>
  );
}

export default FileUploader;
