import { TrainedModel } from "@/app/train-test/_types";

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
  dominant_ispu_category: string;
  ispu_distribution: Record<string, number>;
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
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardBg: string;
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
        badgeBg: "bg-emerald-50",
        badgeBorder: "border-emerald-300",
        badgeText: "text-emerald-800",
        cardBg: "from-emerald-50/70 to-white",
        description: "Tingkat mutu udara sangat baik, tidak memberikan efek negatif bagi manusia maupun lingkungan.",
        healthImpact: "Sangat aman untuk seluruh aktivitas luar ruangan.",
      };
    case "Sedang":
      return {
        badgeBg: "bg-sky-50",
        badgeBorder: "border-sky-300",
        badgeText: "text-sky-800",
        cardBg: "from-sky-50/70 to-white",
        description: "Kualitas udara masih dapat diterima, namun bagi kelompok yang sangat sensitif disarankan membatasi paparan.",
        healthImpact: "Aman bagi masyarakat umum, kelompok sensitif disarankan waspada.",
      };
    case "Tidak Sehat":
      return {
        badgeBg: "bg-amber-50",
        badgeBorder: "border-amber-300",
        badgeText: "text-amber-900",
        cardBg: "from-amber-50/70 to-white",
        description: "Tingkat mutu udara bersifat merugikan pada manusia ataupun kelompok hewan yang sensitif.",
        healthImpact: "Kurangi aktivitas berat di luar ruangan, terutama bagi anak-anak dan lansia.",
      };
    case "Sangat Tidak Sehat":
      return {
        badgeBg: "bg-rose-50",
        badgeBorder: "border-rose-300",
        badgeText: "text-rose-900",
        cardBg: "from-rose-50/70 to-white",
        description: "Tingkat mutu udara yang dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi terpapar.",
        healthImpact: "Hindari aktivitas luar ruangan yang berkepanjangan.",
      };
    case "Berbahaya":
      return {
        badgeBg: "bg-purple-950",
        badgeBorder: "border-purple-800",
        badgeText: "text-purple-100",
        cardBg: "from-purple-950/10 to-white",
        description: "Tingkat mutu udara berbahaya yang secara umum dapat merugikan kesehatan serius pada seluruh populasi.",
        healthImpact: "Gunakan masker pelindung dan tetap berada di dalam ruangan.",
      };
    default:
      return {
        badgeBg: "bg-slate-100",
        badgeBorder: "border-slate-300",
        badgeText: "text-slate-800",
        cardBg: "from-slate-50 to-white",
        description: "Data ISPU tidak terdefinisi.",
        healthImpact: "Tidak ada informasi dampak kesehatan.",
      };
  }
}
