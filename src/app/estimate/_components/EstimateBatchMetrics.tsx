import React from "react";
import { StatCard } from "@/components/StatCard";
import { getIspuStyle, type BatchEstimateSummary } from "../_types";

interface EstimateBatchMetricsProps {
  summary: BatchEstimateSummary;
}

export function EstimateBatchMetrics({ summary }: EstimateBatchMetricsProps) {
  const domStyle = getIspuStyle(summary.dominant_ispu_category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Total Sampel */}
      <StatCard label="Total Sampel" value={summary.total_samples} />

      {/* Rata-rata ISPU */}
      <StatCard label="Rata-rata ISPU" value={summary.avg_estimated} />

      {/* Min - Max ISPU */}
      <StatCard
        label="Rentang ISPU"
        value={`${summary.min_estimated} – ${summary.max_estimated}`}
        valueClassName="text-sm font-extrabold leading-snug"
      />

      {/* Kategori Dominan */}
      <div
        className={`border p-3.5 rounded-xl text-center flex flex-col justify-center gap-0.5 ${domStyle.badgeBorder} ${domStyle.badgeBg}`}
      >
        <span className={`block text-[11px] font-bold uppercase tracking-wider ${domStyle.badgeText}`}>
          Kategori Dominan
        </span>
        <span className={`text-sm font-extrabold ${domStyle.badgeText}`}>
          {summary.dominant_ispu_category}
        </span>
      </div>
    </div>
  );
}
