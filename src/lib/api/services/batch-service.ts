import httpClient from "@/lib/api/http/client";

export interface BatchSummaryRow {
  estimator: string;
  test_rmse_mean: number;
  test_rmse_std: number;
  test_rmse_display: string;
  test_mae_mean: number;
  test_mae_std: number;
  test_mae_display: string;
  train_rmse_mean: number;
  train_rmse_std: number;
  train_rmse_display: string;
  train_mae_mean: number;
  train_mae_std: number;
  train_mae_display: string;
}

export interface BatchSession {
  id: number;
  session_name: string | null;
  dataset_name: string;
  test_size: number;
  total_seeds: number;
  total_samples?: number | null;
  fit_intercept: boolean;
  summary_metrics: BatchSummaryRow[] | null;
  seeds?: number[] | null;
  best_iteration?: BatchIteration | null;
  created_at: string | null;
}

export interface BatchIteration {
  id: number;
  session_id: number;
  estimator_type: string;
  random_state: number | null;
  intercept: number | null;
  coefficients: Record<string, number>;
  scale?: number | null;
  iterations?: number | null;
  converged?: boolean | null;
  test_rmse: number;
  test_mae: number;
  train_rmse?: number | null;
  train_mae?: number | null;
  created_at?: string | null;
}

export interface PaginatedBatchIterations {
  items: BatchIteration[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BatchRunResponse {
  session: BatchSession;
  summary_rows: BatchSummaryRow[];
  top_iterations: BatchIteration[];
  seeds: number[];
  has_interpolated?: boolean;
  interpolated_count?: number;
}

export interface RunBatchParams {
  file: File;
  sessionName?: string;
  nSplits?: number;
  seeds?: string;
  testSize?: number;
  fitIntercept?: boolean;
  estimatorTypes?: string[];
}

export interface PromoteModelPayload {
  iteration_id: number;
  model_name: string;
}

export const batchService = {
  async runBatch(params: RunBatchParams): Promise<BatchRunResponse> {
    const formData = new FormData();
    formData.append("file", params.file);

    if (params.sessionName && params.sessionName.trim()) {
      formData.append("session_name", params.sessionName.trim());
    }
    if (params.nSplits) {
      formData.append("n_splits", String(params.nSplits));
    }
    if (params.seeds && params.seeds.trim()) {
      formData.append("seeds", params.seeds.trim());
    }
    if (params.testSize !== undefined) {
      formData.append("test_size", String(params.testSize));
    }
    if (params.fitIntercept !== undefined) {
      formData.append("fit_intercept", String(params.fitIntercept));
    }
    if (params.estimatorTypes && params.estimatorTypes.length > 0) {
      formData.append("estimator_types", JSON.stringify(params.estimatorTypes));
    }

    const res = await httpClient.post<BatchRunResponse>("/regression/batch-sessions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async getSessions(page = 1, limit = 50): Promise<BatchSession[]> {
    const res = await httpClient.get<BatchSession[]>("/regression/batch-sessions", {
      params: { page, limit },
    });
    return res.data;
  },

  async getSessionDetail(sessionId: number): Promise<BatchSession> {
    const res = await httpClient.get<BatchSession>(`/regression/batch-sessions/${sessionId}`);
    return res.data;
  },

  async getIterations(
    sessionId: number,
    params: {
      page?: number;
      limit?: number;
      estimator_type?: string;
      sort_by?: string;
      sort_order?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedBatchIterations> {
    const res = await httpClient.get<PaginatedBatchIterations>(
      `/regression/batch-sessions/${sessionId}/iterations`,
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 20,
          estimator_type: params.estimator_type || undefined,
          sort_by: params.sort_by ?? "test_rmse",
          sort_order: params.sort_order ?? "asc",
        },
      }
    );
    return res.data;
  },

  async promoteModel(payload: PromoteModelPayload): Promise<unknown> {
    const res = await httpClient.post("/regression/models/promote", payload);
    return res.data;
  },
};

