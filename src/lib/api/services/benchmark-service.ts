import httpClient from "@/lib/api/http/client";

export interface BenchmarkSummaryRow {
  estimator: string;
  test_r2_mean: number;
  test_r2_std: number;
  test_r2_display: string;
  test_rmse_mean: number;
  test_rmse_std: number;
  test_rmse_display: string;
  test_mae_mean: number;
  test_mae_std: number;
  test_mae_display: string;
  train_r2_mean: number;
  train_r2_std: number;
  train_r2_display: string;
  train_rmse_mean: number;
  train_rmse_std: number;
  train_rmse_display: string;
  train_mae_mean: number;
  train_mae_std: number;
  train_mae_display: string;
}

export interface BenchmarkSession {
  id: number;
  session_name: string | null;
  dataset_name: string;
  test_size: number;
  total_seeds: number;
  total_samples?: number | null;
  fit_intercept: boolean;
  summary_metrics: BenchmarkSummaryRow[] | null;
  created_at: string | null;
}

export interface MCCVIteration {
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
  test_r2: number;
  train_rmse?: number | null;
  train_mae?: number | null;
  train_r2?: number | null;
  created_at?: string | null;
}

export interface PaginatedIterations {
  items: MCCVIteration[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BenchmarkRunResponse {
  session: BenchmarkSession;
  summary_rows: BenchmarkSummaryRow[];
  top_iterations: MCCVIteration[];
  seeds: number[];
}

export interface RunBenchmarkParams {
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
  is_default?: boolean;
}

export const benchmarkService = {
  async runBenchmark(params: RunBenchmarkParams): Promise<BenchmarkRunResponse> {
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

    const res = await httpClient.post<BenchmarkRunResponse>("/regression/benchmark/run", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async getSessions(page = 1, limit = 50): Promise<BenchmarkSession[]> {
    const res = await httpClient.get<BenchmarkSession[]>("/regression/benchmark/sessions", {
      params: { page, limit },
    });
    return res.data;
  },

  async getSessionDetail(sessionId: number): Promise<BenchmarkSession> {
    const res = await httpClient.get<BenchmarkSession>(`/regression/benchmark/sessions/${sessionId}`);
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
  ): Promise<PaginatedIterations> {
    const res = await httpClient.get<PaginatedIterations>(
      `/regression/benchmark/sessions/${sessionId}/iterations`,
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 20,
          estimator_type: params.estimator_type || undefined,
          sort_by: params.sort_by ?? "test_r2",
          sort_order: params.sort_order ?? "desc",
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
