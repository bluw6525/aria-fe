import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { regressionService } from "../_services";
import {
  TrainedModel,
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
  SaveModelPayload,
  formatEstimatorType,
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

export interface RegressionState {
  // ── State ──────────────────────────────────────────────────────────────────
  models: TrainedModel[];
  isModelsLoading: boolean;

  outlierResult: OutlierDetectionResponse | null;
  isDetectingOutliers: boolean;

  trainResult: TrainModelResult | null;
  isTraining: boolean;

  isSaving: boolean;

  testResult: TestModelResult | null;
  isTesting: boolean;

  // ── Actions ────────────────────────────────────────────────────────────────
  fetchModels: () => Promise<void>;
  detectOutliers: (file: File, fitIntercept?: boolean) => Promise<OutlierDetectionResponse>;
  trainModel: (file: File, estimatorType?: string, fitIntercept?: boolean) => Promise<TrainModelResult>;
  saveModel: (payload: SaveModelPayload) => Promise<TrainedModel>;
  saveCurrentModel: (name: string) => Promise<void>;
  testModel: (modelId: number | "current", file: File) => Promise<TestModelResult>;
}

export const useRegressionApi = create<RegressionState>((set, get) => ({
  // Initial State
  models: [],
  isModelsLoading: false,

  outlierResult: null,
  isDetectingOutliers: false,

  trainResult: null,
  isTraining: false,

  isSaving: false,

  testResult: null,
  isTesting: false,

  // Fetch daftar model tersimpan
  fetchModels: async () => {
    set({ isModelsLoading: true });
    try {
      const models = await regressionService.getModels();
      set({ models });
    } catch (err) {
      console.error("Gagal mengambil daftar model:", err);
    } finally {
      set({ isModelsLoading: false });
    }
  },

  // Action: Deteksi Outlier
  detectOutliers: async (file: File, fitIntercept: boolean = true) => {
    set({ isDetectingOutliers: true });
    try {
      const result = await regressionService.detectOutliers(file, fitIntercept);
      const count = result.total_outliers ?? 0;
      set({ outlierResult: result });
      toast.success("Deteksi Outlier Berhasil", {
        description: `Analisis selesai. Teridentifikasi ${count} titik outlier pada data latih.`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menjalankan deteksi outlier.");
      toast.error("Deteksi Outlier Gagal", {
        description: msg,
      });
      throw err;
    } finally {
      set({ isDetectingOutliers: false });
    }
  },

  // Action: Latih Model
  trainModel: async (file: File, estimatorType: string = "MM", fitIntercept: boolean = true) => {
    set({ isTraining: true });
    try {
      const result = await regressionService.trainModel(file, estimatorType, fitIntercept);
      const r2Display =
        Math.abs(result.r2) <= 1.0
          ? (result.r2 * 100).toFixed(1)
          : result.r2.toFixed(1);
      set({ trainResult: result });
      toast.success("Pelatihan Model Berhasil", {
        description: `Model ${formatEstimatorType(result.estimator_type)} berhasil diestimasi (R²: ${r2Display}%).`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal melatih model regresi.");
      toast.error("Pelatihan Model Gagal", {
        description: msg,
      });
      throw err;
    } finally {
      set({ isTraining: false });
    }
  },

  // Action: Simpan Model ke Basis Data
  saveModel: async (payload: SaveModelPayload) => {
    set({ isSaving: true });
    try {
      const saved = await regressionService.saveModel(payload);
      await get().fetchModels();
      toast.success("Model Berhasil Disimpan", {
        description: `Model "${saved.name}" berhasil tersimpan ke sistem.`,
      });
      return saved;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menyimpan model ke database.");
      toast.error("Penyimpanan Model Gagal", {
        description: msg,
      });
      throw err;
    } finally {
      set({ isSaving: false });
    }
  },

  // Convenience Action: Simpan model yang baru saja dilatih (trainResult aktif)
  saveCurrentModel: async (name: string) => {
    const { trainResult } = get();
    if (!trainResult) {
      toast.warning("Model Belum Dilatih", {
        description: "Harap lakukan pelatihan (Latih) terlebih dahulu sebelum menyimpan model.",
      });
      return;
    }

    const r2Percentage =
      Math.abs(trainResult.r2) <= 1.0
        ? Number((trainResult.r2 * 100).toFixed(2))
        : Number(trainResult.r2.toFixed(2));

    await get().saveModel({
      name,
      estimator_type: trainResult.estimator_type,
      intercept: trainResult.intercept,
      coef_co: trainResult.coef_co,
      coef_no2: trainResult.coef_no2,
      scale: trainResult.scale,
      train_rmse: trainResult.rmse,
      train_mae: trainResult.mae,
      train_r2: r2Percentage,
      is_default: false,
    });
  },

  // Action: Uji Model (Tersimpan di DB atau Model Baru Dilatih In-Memory)
  testModel: async (modelId: number | "current", file: File) => {
    set({ isTesting: true });
    try {
      let result: TestModelResult;
      if (modelId === "current") {
        const { trainResult } = get();
        if (!trainResult) {
          throw new Error("Belum ada model yang dilatih pada sesi saat ini.");
        }
        result = await regressionService.testCustomModel(
          {
            intercept: trainResult.intercept,
            coef_co: trainResult.coef_co,
            coef_no2: trainResult.coef_no2,
            estimator_type: trainResult.estimator_type,
            model_name: `Model Baru Dilatih (${formatEstimatorType(trainResult.estimator_type)})`,
          },
          file
        );
      } else {
        result = await regressionService.testModel(modelId, file);
      }

      const r2Display =
        Math.abs(result.r2) <= 1.0
          ? (result.r2 * 100).toFixed(1)
          : result.r2.toFixed(1);
      set({ testResult: result });
      toast.success("Pengujian Model Berhasil", {
        description: `Model "${result.model_name}" selesai dievaluasi (R²: ${r2Display}%).`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menguji model terhadap data uji.");
      toast.error("Pengujian Model Gagal", {
        description: msg,
      });
      throw err;
    } finally {
      set({ isTesting: false });
    }
  },
}));

export default useRegressionApi;
