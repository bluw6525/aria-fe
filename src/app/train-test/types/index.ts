export interface TrainedModel {
  id: number;
  name: string;
  estimator_type: string;
  is_default: boolean;
  intercept: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  train_rmse: number;
  train_mae: number;
  train_r2: number;
  created_at?: string;
}

export interface OutlierPoint {
  observation_id: number;
  leverage: number;
  leverage_outlier: boolean;
  dffits: number;
  dffits_outlier: boolean;
  status: string;
}

export interface OutlierDetectionResponse {
  summary: {
    n_samples: number;
    n_parameters: number;
    leverage_threshold: number;
    dffits_threshold: number;
    total_leverage_outliers: number;
    total_dffits_outliers: number;
    total_influential_both: number;
    total_unique_outliers: number;
    leverage_outlier_indices?: number[];
    dffits_outlier_indices?: number[];
    both_outlier_indices?: number[];
  };
  leverage_outliers: number[];
  dffits_outliers: number[];
  influential_points: number[];
  detail_outliers: OutlierPoint[];
}

export interface ChartDataPoint {
  index: number;
  actual: number;
  predicted: number;
}

export interface TrainModelResult {
  estimator_type: string;
  equation: string;
  intercept: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  rmse: number;
  mae: number;
  r2: number;
  chart_data: ChartDataPoint[];
  total_samples: number;
}

export interface TestModelResult {
  model_id: number;
  model_name: string;
  estimator_type: string;
  equation: string;
  rmse: number;
  mae: number;
  r2: number;
  chart_data: ChartDataPoint[];
  total_samples: number;
}

export interface SaveModelPayload {
  name: string;
  estimator_type: string;
  is_default?: boolean;
  intercept: number;
  coef_co: number;
  coef_no2: number;
  scale?: number | null;
  train_rmse: number;
  train_mae: number;
  train_r2: number;
}
