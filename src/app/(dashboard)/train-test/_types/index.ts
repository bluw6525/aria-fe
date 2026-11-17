export interface TrainedModel {
  id: number;
  name: string;
  estimator_type: string;
  is_default?: boolean;
  is_active?: boolean;
  intercept?: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  train_rmse: number;
  train_mae: number;
  created_at?: string;
}

export interface OutlierCategorySummary {
  threshold?: number;
  outliers_count: number;
  outlier_indices: number[];
}

export interface OutlierDetectionResponse {
  total_outliers: number;
  leverage?: OutlierCategorySummary;
  dffits?: OutlierCategorySummary;
  both?: OutlierCategorySummary;
}

export interface RegressionPoint {
  index: number;
  actual: number;
  predicted: number;
  residual?: number;
}

export interface TrainModelResult {
  estimator_type: string;
  equation: string;
  intercept?: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  rmse: number;
  mae: number;
  chart_data: RegressionPoint[];
  total_samples: number;
  has_interpolated?: boolean;
  interpolated_count?: number;
}

export interface TestModelResult {
  model_id?: number | null;
  model_name: string;
  estimator_type: string;
  equation: string;
  rmse: number;
  mae: number;
  chart_data: RegressionPoint[];
  total_samples: number;
  has_interpolated?: boolean;
  interpolated_count?: number;
}

export interface SaveModelPayload {
  name: string;
  estimator_type: string;
  is_default?: boolean;
  intercept?: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  train_rmse: number;
  train_mae: number;
}

/**
 * Memformat nama estimator agar bersih dan konsisten.
 */
export function formatEstimatorType(type?: string | null): string {
  if (!type) return "";
  const t = type.trim();
  const lower = t.toLowerCase();

  if (lower === "mm" || lower === "mm-estimator") {
    return "MM-Estimator";
  }
  if (lower === "m" || lower === "m-estimator") {
    return "M-Estimator";
  }
  if (lower === "s" || lower === "s-estimator") {
    return "S-Estimator";
  }
  if (lower === "ols") {
    return "OLS";
  }
  return t;
}
