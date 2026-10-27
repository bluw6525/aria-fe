import React from "react";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export function TrainTestEmptyState() {
  return (
    <EmptyState
      icon={TrendingUp}
      title="Panel Hasil dan Evaluasi"
      description={
        <span>
          Unggah berkas data latih di sisi kiri dan klik tombol <b>Latih</b> atau <b>Deteksi Outlier</b> untuk menampilkan hasil pemodelan dan grafik evaluasi.
        </span>
      }
    />
  );
}
