import React from "react";
import { LineChart } from "@/components/LineChart";
import { StatCard } from "@/components/StatCard";
import { EquationDisplay } from "@/components/EquationDisplay";
import { formatEstimatorType, formatR2, type TrainModelResult } from "../_types";

interface TrainResultCardProps {
  result: TrainModelResult;
}

export function TrainResultCard({ result }: TrainResultCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header Section Sederhana */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <h3 className="text-base font-bold text-slate-900">
          Hasil Pelatihan Model ({formatEstimatorType(result.estimator_type)})
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Jumlah data latih: {result.total_samples}
        </span>
      </div>

      {/* Persamaan Parameter */}
      <EquationDisplay
        label="hasil estimasi parameter"
        equation={result.equation}
      />

      {/* Kotak Metrik Evaluasi Data Latih */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-slate-700">
          hasil evaluasi model terhadap data latih
        </span>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="RMSE" value={result.rmse} />
          <StatCard label="MAE" value={result.mae} />
          <StatCard label="R² Score" value={`${formatR2(result.r2)}%`} />
        </div>
      </div>

      {/* Grafik Interaktif Data Latih */}
      <div className="mt-1">
        <LineChart
          data={result.chart_data}
          title={`Grafik Data Latih (${formatEstimatorType(result.estimator_type)})`}
          lines={[
            { key: "actual", name: "O3 Sebenarnya", color: "#0284c7" },
            { key: "predicted", name: "O3 Estimasi", color: "#f43f5e", dashed: true },
          ]}
          height={240}
        />
      </div>
    </div>
  );
}
