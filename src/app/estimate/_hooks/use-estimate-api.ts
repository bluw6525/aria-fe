import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { estimateService } from "../_services";
import {
  TrainedModel,
  SingleEstimateResult,
  BatchEstimateResult,
  BatchEstimatePoint,
} from "../_types";

function extractErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.detail || err.message || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}

export interface EstimateState {
  // ── Models State ────────────────────────────────────────────────────────────
  models: TrainedModel[];
  isModelsLoading: boolean;

  // ── Form Inputs ─────────────────────────────────────────────────────────────
  inputMode: "file" | "manual";
  selectedModelId: string;
  file: File | null;
  coInput: string;
  no2Input: string;

  // ── Output State ────────────────────────────────────────────────────────────
  isEstimating: boolean;
  singleResult: SingleEstimateResult | null;
  batchResult: BatchEstimateResult | null;
  manualHistory: BatchEstimatePoint[];

  // ── Actions ─────────────────────────────────────────────────────────────────
  fetchModels: () => Promise<void>;
  setInputMode: (mode: "file" | "manual") => void;
  setSelectedModelId: (id: string) => void;
  setFile: (file: File | null) => void;
  setCoInput: (val: string) => void;
  setNo2Input: (val: string) => void;

  runEstimate: () => Promise<void>;
  resetEstimate: () => void;
  resetManualHistory: () => void;
}

export const useEstimateApi = create<EstimateState>((set, get) => ({
  models: [],
  isModelsLoading: false,

  inputMode: "file",
  selectedModelId: "",
  file: null,
  coInput: "",
  no2Input: "",

  isEstimating: false,
  singleResult: null,
  batchResult: null,
  manualHistory: [],

  fetchModels: async () => {
    set({ isModelsLoading: true });
    try {
      const models = await estimateService.getModels();
      set({ models });
      // Jika belum ada model yang dipilih dan ada model default atau model pertama
      const currentSelected = get().selectedModelId;
      if (!currentSelected && models.length > 0) {
        const defaultModel = models.find((m) => m.is_default) || models[0];
        set({ selectedModelId: String(defaultModel.id) });
      }
    } catch (err) {
      console.error("Gagal mengambil daftar model estimasi:", err);
    } finally {
      set({ isModelsLoading: false });
    }
  },

  setInputMode: (inputMode) => {
    set({ inputMode });
  },

  setSelectedModelId: (selectedModelId) => set({ selectedModelId }),
  setFile: (file) => set({ file }),
  setCoInput: (coInput) => set({ coInput }),
  setNo2Input: (no2Input) => set({ no2Input }),

  runEstimate: async () => {
    const { inputMode, selectedModelId, file, coInput, no2Input, manualHistory } = get();

    if (!selectedModelId) {
      toast.warning("Model Belum Dipilih", {
        description: "Harap pilih model regresi terlebih dahulu dari dropdown.",
      });
      return;
    }

    const modelIdNum = parseInt(selectedModelId, 10);
    if (isNaN(modelIdNum)) {
      toast.error("ID Model Tidak Valid", {
        description: "Pastikan model yang dipilih valid.",
      });
      return;
    }

    set({ isEstimating: true });

    try {
      if (inputMode === "file") {
        if (!file) {
          toast.warning("Berkas Diperlukan", {
            description: "Harap pilih berkas data satelit (.xlsx, .csv, atau .xls).",
          });
          set({ isEstimating: false });
          return;
        }

        const res = await estimateService.estimateFromFile(modelIdNum, file);
        set({ batchResult: res });
        toast.success("Estimasi Satelit Selesai", {
          description: `Berhasil mengestimasi ${res.summary.total_samples} sampel data satelit. Kategori dominan: ${res.summary.dominant_ispu_category}.`,
        });
      } else {
        // Mode Manual: Input nilai tunggal CO & NO2
        const coVal = parseFloat(coInput);
        const no2Val = parseFloat(no2Input);

        if (isNaN(coVal) || isNaN(no2Val)) {
          toast.warning("Input Tidak Valid", {
            description: "Nilai konsentrasi CO dan NO2 harus berupa bilangan numerik.",
          });
          set({ isEstimating: false });
          return;
        }

        const res = await estimateService.estimateSingle({
          co: coVal,
          no2: no2Val,
          model_id: modelIdNum,
        });

        const nextIndex = manualHistory.length + 1;
        const newPoint: BatchEstimatePoint = {
          index: nextIndex,
          label: `Titik #${nextIndex}`,
          co: coVal,
          no2: no2Val,
          estimated_value: res.estimated_value,
          ispu_category: res.ispu_category,
        };

        const updatedHistory = [...manualHistory, newPoint];
        set({
          manualHistory: updatedHistory,
          singleResult: res,
          coInput: "",
          no2Input: "",
        });

        toast.success("Estimasi ISPU Berhasil", {
          description: `Nilai ISPU: ${res.estimated_value} (Kategori: ${res.ispu_category}).`,
        });
      }
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "Gagal menjalankan estimasi kualitas udara.");
      toast.error("Estimasi Gagal", {
        description: msg,
      });
    } finally {
      set({ isEstimating: false });
    }
  },

  resetEstimate: () => {
    const { inputMode } = get();
    if (inputMode === "file") {
      set({ batchResult: null, file: null });
    } else {
      set({
        singleResult: null,
        manualHistory: [],
        coInput: "",
        no2Input: "",
      });
    }
    toast.info("Hasil Estimasi Direset");
  },

  resetManualHistory: () => {
    set({
      manualHistory: [],
      singleResult: null,
      coInput: "",
      no2Input: "",
    });
    toast.info("Riwayat titik manual telah dibersihkan.");
  },
}));

/**
 * Selector helper untuk mengonversi riwayat titik manual menjadi struktur BatchEstimateResult
 * jika titik yang tercatat sudah berjumlah >= 2 titik (sehingga bisa ditampilkan grafik dan ringkasan metrik).
 */
export function getManualBatchResult(
  history: BatchEstimatePoint[],
  singleResult: SingleEstimateResult | null,
  modelId: string
): BatchEstimateResult | null {
  if (history.length < 2 || !singleResult) return null;

  const allValues = history.map((p) => p.estimated_value);
  const ispuCounts: Record<string, number> = {
    Baik: 0,
    Sedang: 0,
    "Tidak Sehat": 0,
    "Sangat Tidak Sehat": 0,
    Berbahaya: 0,
  };

  history.forEach((p) => {
    if (p.ispu_category in ispuCounts) {
      ispuCounts[p.ispu_category]++;
    }
  });

  const dominantCat = Object.keys(ispuCounts).reduce((a, b) =>
    ispuCounts[a] >= ispuCounts[b] ? a : b
  );

  const sum = allValues.reduce((a, b) => a + b, 0);
  const avgEst = Number((sum / allValues.length).toFixed(1));
  const minEst = Number(Math.min(...allValues).toFixed(1));
  const maxEst = Number(Math.max(...allValues).toFixed(1));

  return {
    model_id: singleResult.model_id || parseInt(modelId, 10) || 0,
    model_name: singleResult.model_name,
    estimator_type: singleResult.estimator_type,
    equation: singleResult.equation || "",
    chart_data: history,
    summary: {
      total_samples: history.length,
      avg_estimated: avgEst,
      min_estimated: minEst,
      max_estimated: maxEst,
      dominant_ispu_category: dominantCat,
      ispu_distribution: ispuCounts,
    },
  };
}

export default useEstimateApi;
