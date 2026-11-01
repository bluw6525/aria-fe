export interface TrainedModel {
  id: number;
  name: string;
  estimator_type: string;
  is_default?: boolean;
  intercept?: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  train_rmse: number;
  train_mae: number;
  train_r2?: number;
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
  r2?: number;
  chart_data: RegressionPoint[];
  total_samples: number;
}

export interface TestModelResult {
  model_id?: number | null;
  model_name: string;
  estimator_type: string;
  equation: string;
  rmse: number;
  mae: number;
  r2?: number;
  chart_data: RegressionPoint[];
  total_samples: number;
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
  train_r2?: number;
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

export function formatR2(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0.0";
  const num = Math.abs(val) <= 1.0 ? val * 100 : val;
  return num.toFixed(1);
}
