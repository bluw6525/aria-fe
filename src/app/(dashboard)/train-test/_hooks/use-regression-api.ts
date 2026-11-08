import { create } from "zustand";
import { notify } from "@/lib/notifications";
import { extractApiErrorMessage } from "@/lib/api/error";
import { regressionService } from "../_services";
import {
  TrainedModel,
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
  SaveModelPayload,
  formatEstimatorType,
} from "../_types";

const extractErrorMessage = extractApiErrorMessage;

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
      notify.success("Deteksi Outlier Berhasil", {
        description: `Analisis selesai. Teridentifikasi ${count} titik outlier pada data latih.`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menjalankan deteksi outlier.");
      notify.error("Deteksi Outlier Gagal", {
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
      set({ trainResult: result });
      notify.success("Pelatihan Model Berhasil", {
        description: `Model ${formatEstimatorType(result.estimator_type)} berhasil diestimasi (RMSE: ${result.rmse.toFixed(2)}).`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal melatih model regresi.");
      notify.error("Pelatihan Model Gagal", {
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
      notify.success("Model Berhasil Disimpan", {
        description: `Model "${saved.name}" berhasil tersimpan ke sistem.`,
      });
      return saved;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menyimpan model ke database.");
      notify.error("Penyimpanan Model Gagal", {
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
      notify.warning("Model Belum Dilatih", {
        description: "Harap lakukan pelatihan (Latih) terlebih dahulu sebelum menyimpan model.",
      });
      return;
    }

    await get().saveModel({
      name,
      estimator_type: trainResult.estimator_type,
      intercept: trainResult.intercept,
      coef_co: trainResult.coef_co,
      coef_no2: trainResult.coef_no2,
      scale: trainResult.scale,
      train_rmse: trainResult.rmse,
      train_mae: trainResult.mae,
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

      set({ testResult: result });
      notify.success("Pengujian Model Berhasil", {
        description: `Model "${result.model_name}" selesai dievaluasi (RMSE: ${result.rmse.toFixed(2)}).`,
      });
      return result;
    } catch (err) {
      const msg = extractErrorMessage(err, "Gagal menguji model terhadap data uji.");
      notify.error("Pengujian Model Gagal", {
        description: msg,
      });
      throw err;
    } finally {
      set({ isTesting: false });
    }
  },
}));

export default useRegressionApi;
