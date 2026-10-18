import httpClient from "@/lib/api/http/client";
import {
  TrainedModel,
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
  SaveModelPayload,
} from "../types";

export const regressionService = {
  /**
   * Mengambil seluruh daftar model yang tersimpan di basis data untuk dropdown antarmuka.
   */
  getModels: async (): Promise<TrainedModel[]> => {
    const response = await httpClient.get<TrainedModel[]>("/regression/models");
    return response.data;
  },

  /**
   * Mengambil detail satu model berdasarkan ID.
   */
  getModelById: async (modelId: number): Promise<TrainedModel> => {
    const response = await httpClient.get<TrainedModel>(`/regression/models/${modelId}`);
    return response.data;
  },

  /**
   * Menghapus model dari basis data.
   */
  deleteModel: async (modelId: number): Promise<void> => {
    await httpClient.delete(`/regression/models/${modelId}`);
  },

  /**
   * Menjalankan deteksi pencilan (Leverage & DFFITS) pada file data latih yang diunggah.
   */
  detectOutliers: async (
    file: File,
    fitIntercept: boolean = true
  ): Promise<OutlierDetectionResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fit_intercept", String(fitIntercept));

    const response = await httpClient.post<OutlierDetectionResponse>(
      "/regression/detect-outliers",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Melatih model regresi robust (MM, M, S) berdasarkan data latih yang diunggah.
   */
  trainModel: async (
    file: File,
    estimatorType: string = "MM",
    fitIntercept: boolean = true
  ): Promise<TrainModelResult> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("estimator_type", estimatorType);
    formData.append("fit_intercept", String(fitIntercept));

    const response = await httpClient.post<TrainModelResult>(
      "/regression/train",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Menyimpan model hasil pelatihan ke basis data PostgreSQL.
   */
  saveModel: async (payload: SaveModelPayload): Promise<TrainedModel> => {
    const response = await httpClient.post<TrainedModel>(
      "/regression/save",
      payload
    );
    return response.data;
  },

  /**
   * Menguji model tersimpan menggunakan file data uji yang diunggah.
   */
  testModel: async (
    modelId: number,
    file: File
  ): Promise<TestModelResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await httpClient.post<TestModelResult>(
      `/regression/test/${modelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
