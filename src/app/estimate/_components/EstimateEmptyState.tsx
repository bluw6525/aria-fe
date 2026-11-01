import React from "react";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

interface EstimateEmptyStateProps {
  isFileUploadActive: boolean;
}

export function EstimateEmptyState({ isFileUploadActive }: EstimateEmptyStateProps) {
  return (
    <EmptyState
      icon={TrendingUp}
      title="Panel Hasil Estimasi & Klasifikasi ISPU"
      description={
        <span>
          {isFileUploadActive
            ? "Pilih model regresi dari database dan unggah berkas data satelit Sentinel-5P (.xlsx, .csv, atau .xls), lalu klik tombol Jalankan Estimasi."
            : "Pilih model regresi dan masukkan nilai gas prekursor CO serta NO2 pada panel sebelah kiri, lalu klik tombol Jalankan Estimasi."}
        </span>
      }
    />
  );
}
