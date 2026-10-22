import httpClient from "@/lib/api/http/client";
import {
  TrainedModel,
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
  SaveModelPayload,
} from "../_types";

export const regressionService = {
  /**
   * Mengambil seluruh daftar model yang tersimpan di basis data untuk dropdown antarmuka.
   */
  getModels: async (page: number = 1, limit: number = 100): Promise<TrainedModel[]> => {
    const response = await httpClient.get<TrainedModel[]>("/regression/models", {
      params: { page, limit },
    });
    return response.data;
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

  /**
   * Menguji parameter model langsung tanpa harus tersimpan di basis data.
   */
  testCustomModel: async (
    params: {
      intercept?: number;
      coef_co: number;
      coef_no2: number;
      estimator_type?: string;
      model_name?: string;
    },
    file: File
  ): Promise<TestModelResult> => {
    const formData = new FormData();
    formData.append("file", file);
    if (params.intercept !== undefined && params.intercept !== null) {
      formData.append("intercept", String(params.intercept));
    }
    formData.append("coef_co", String(params.coef_co));
    formData.append("coef_no2", String(params.coef_no2));
    if (params.estimator_type) {
      formData.append("estimator_type", params.estimator_type);
    }
    if (params.model_name) {
      formData.append("model_name", params.model_name);
    }

    const response = await httpClient.post<TestModelResult>(
      "/regression/test-custom",
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
