import React from "react";
import { RotateCcw } from "lucide-react";
import { LineChart, LineSeries } from "@/components/LineChart";
import { EquationDisplay } from "@/components/EquationDisplay";
import { formatEstimatorType } from "@/app/train-test/_types";
import type { BatchEstimateResult } from "../_types";
import { EstimateBatchMetrics } from "./EstimateBatchMetrics";
import { EstimateBatchTable } from "./EstimateBatchTable";

interface EstimateBatchResultProps {
  batch: BatchEstimateResult;
  showManualBatch: boolean;
  chartLines: LineSeries[];
  onReset: () => void;
}

export function EstimateBatchResult({
  batch,
  showManualBatch,
  chartLines,
  onReset,
}: EstimateBatchResultProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Hasil Estimasi ISPU
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Model: <strong>{batch.model_name}</strong>
            {!batch.model_name.includes(formatEstimatorType(batch.estimator_type)) && (
              <span> ({formatEstimatorType(batch.estimator_type)})</span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 4 Kartu Metrik Ringkasan ISPU */}
      <EstimateBatchMetrics summary={batch.summary} />

      {/* Persamaan Model */}
      {batch.equation && (
        <EquationDisplay
          label="Persamaan Estimasi ISPU:"
          equation={batch.equation}
        />
      )}

      {/* Grafik Garis Tren Estimasi ISPU Recharts */}
      <div className="mt-1">
        <LineChart
          data={batch.chart_data}
          title={`Grafik Tren Nilai ISPU (${batch.chart_data.length} Observasi)`}
          lines={chartLines}
          xAxisKey="label"
          height={260}
        />
      </div>

      {/* Tabel Sampel Data Hasil Estimasi ISPU */}
      <EstimateBatchTable
        data={batch.chart_data}
        showManualBatch={showManualBatch}
      />
    </div>
  );
}
