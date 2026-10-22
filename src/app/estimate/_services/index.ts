import httpClient from "@/lib/api/http/client";
import {
  TrainedModel,
  SingleEstimatePayload,
  SingleEstimateResult,
  BatchEstimateResult,
} from "../_types";

export const estimateService = {
  /**
   * Mengambil daftar model regresi tersimpan dari basis data untuk dropdown pilihan.
   */
  getModels: async (page: number = 1, limit: number = 100): Promise<TrainedModel[]> => {
    const response = await httpClient.get<TrainedModel[]>("/regression/models", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Melakukan estimasi nilai dan klasifikasi ISPU untuk input titik tunggal CO dan NO2 (Manual).
   */
  estimateSingle: async (payload: SingleEstimatePayload): Promise<SingleEstimateResult> => {
    const response = await httpClient.post<SingleEstimateResult>(
      "/regression/estimate",
      payload
    );
    return response.data;
  },

  /**
   * Melakukan estimasi nilai dan klasifikasi ISPU untuk berkas satelit (.xlsx, .xls, .csv) secara batch.
   */
  estimateFromFile: async (
    modelId: number,
    file: File
  ): Promise<BatchEstimateResult> => {
    const formData = new FormData();
    formData.append("model_id", String(modelId));
    formData.append("file", file);

    const response = await httpClient.post<BatchEstimateResult>(
      "/regression/estimate-file",
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

export default estimateService;
