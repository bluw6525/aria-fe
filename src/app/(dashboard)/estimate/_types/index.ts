import { TrainedModel } from "@/app/(dashboard)/train-test/_types";

export type { TrainedModel };

export interface SingleEstimatePayload {
  co: number;
  no2: number;
  model_id?: number;
}

export interface SingleEstimateResult {
  model_id?: number | null;
  model_name: string;
  estimator_type: string;
  equation?: string | null;
  estimated_value: number;
  ispu_category: string;
}

export interface BatchEstimatePoint {
  index: number;
  label: string;
  co: number;
  no2: number;
  actual_value?: number | null;
  estimated_value: number;
  ispu_category: string;
}

export interface BatchEstimateSummary {
  total_samples: number;
  avg_estimated: number;
  min_estimated: number;
  max_estimated: number;
}

export interface BatchEstimateResult {
  model_id: number;
  model_name: string;
  estimator_type: string;
  equation: string;
  chart_data: BatchEstimatePoint[];
  summary: BatchEstimateSummary;
}

export interface IspuStyleConfig {
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  bgHex: string;
  borderHex: string;
  textHex: string;
  description: string;
  healthImpact: string;
}

/**
 * Menghasilkan konfigurasi warna dan deskripsi kategori ISPU sesuai Permen LHK No. 14 Tahun 2020.
 */
export function getIspuStyle(category: string): IspuStyleConfig {
  switch (category) {
    case "Baik":
      return {
        color: "green",
        badgeBg: "bg-emerald-50",
        badgeBorder: "border-emerald-300",
        badgeText: "text-emerald-800",
        bgHex: "#ecfdf5",
        borderHex: "#6ee7b7",
        textHex: "#065f46",
        description: "Tingkat mutu udara sangat baik, tidak memberikan efek negatif bagi manusia maupun lingkungan.",
        healthImpact: "Sangat aman untuk seluruh aktivitas luar ruangan.",
      };
    case "Sedang":
      return {
        color: "sky",
        badgeBg: "bg-sky-50",
        badgeBorder: "border-sky-300",
        badgeText: "text-sky-800",
        bgHex: "#f0f9ff",
        borderHex: "#7dd3fc",
        textHex: "#0369a1",
        description: "Kualitas udara masih dapat diterima, namun bagi kelompok yang sangat sensitif disarankan membatasi paparan.",
        healthImpact: "Aman bagi masyarakat umum, kelompok sensitif disarankan waspada.",
      };
    case "Tidak Sehat":
      return {
        color: "yellow",
        badgeBg: "bg-amber-50",
        badgeBorder: "border-amber-300",
        badgeText: "text-amber-900",
        bgHex: "#fffbeb",
        borderHex: "#fcd34d",
        textHex: "#92400e",
        description: "Tingkat mutu udara bersifat merugikan pada manusia ataupun kelompok hewan yang sensitif.",
        healthImpact: "Kurangi aktivitas berat di luar ruangan, terutama bagi anak-anak dan lansia.",
      };
    case "Sangat Tidak Sehat":
      return {
        color: "red",
        badgeBg: "bg-rose-50",
        badgeBorder: "border-rose-300",
        badgeText: "text-rose-900",
        bgHex: "#fff1f2",
        borderHex: "#fda4af",
        textHex: "#9f1239",
        description: "Tingkat mutu udara yang dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi terpapar.",
        healthImpact: "Hindari aktivitas luar ruangan yang berkepanjangan.",
      };
    case "Berbahaya":
      return {
        color: "grape",
        badgeBg: "bg-purple-950",
        badgeBorder: "border-purple-800",
        badgeText: "text-purple-100",
        bgHex: "#3b0764",
        borderHex: "#581c87",
        textHex: "#f3e8ff",
        description: "Tingkat mutu udara berbahaya yang secara umum dapat merugikan kesehatan serius pada seluruh populasi.",
        healthImpact: "Gunakan masker pelindung dan tetap berada di dalam ruangan.",
      };
    default:
      return {
        color: "gray",
        badgeBg: "bg-slate-100",
        badgeBorder: "border-slate-300",
        badgeText: "text-slate-800",
        bgHex: "#f1f5f9",
        borderHex: "#cbd5e1",
        textHex: "#334155",
        description: "Data ISPU tidak terdefinisi.",
        healthImpact: "Tidak ada informasi dampak kesehatan.",
      };
  }
}
