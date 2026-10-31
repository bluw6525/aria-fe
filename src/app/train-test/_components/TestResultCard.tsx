import React from "react";
import { LineChart } from "@/components/LineChart";
import { StatCard } from "@/components/StatCard";
import { formatR2, type TestModelResult } from "../_types";

interface TestResultCardProps {
  result: TestModelResult;
}

export function TestResultCard({ result }: TestResultCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Hasil Evaluasi Model terhadap Data Uji
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Model: <strong>{result.model_name}</strong>
          </p>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Jumlah data uji: {result.total_samples}
        </span>
      </div>

      {/* Kotak Metrik Evaluasi Data Uji */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-slate-700">
          hasil evaluasi model terhadap data uji
        </span>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="RMSE Uji" value={result.rmse} />
          <StatCard label="MAE Uji" value={result.mae} />
          <StatCard label="R² Uji" value={`${formatR2(result.r2)}%`} />
        </div>
      </div>

      {/* Grafik Interaktif Data Uji */}
      <div className="mt-1">
        <LineChart
          data={result.chart_data}
          title={`Grafik Evaluasi Data Uji (${result.model_name})`}
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
