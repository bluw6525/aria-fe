"use client";

import React from "react";

export interface LineChartTooltipItem {
  name?: string;
  value?: number | string;
  dataKey?: string | number;
  color?: string;
}

export interface LineChartTooltipProps {
  active?: boolean;
  payload?: LineChartTooltipItem[];
  label?: string | number;
}

/**
 * Tooltip khusus untuk komponen LineChart dengan gaya dark glassmorphism.
 */
export function LineChartTooltip({
  active,
  payload,
  label,
}: LineChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 text-white p-2.5 rounded-xl border border-slate-700/80 shadow-xl text-xs backdrop-blur-md min-w-[170px] select-none pointer-events-none">
        <div className="font-bold text-sky-400 text-[11px] mb-1.5 border-b border-slate-700/80 pb-1 flex justify-between">
          <span>Observasi #{label}</span>
        </div>
        <div className="flex flex-col gap-1">
          {payload.map((item) => (
            <div
              key={String(item.dataKey || item.name)}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300">{item.name}:</span>
              </div>
              <span className="font-bold text-white">
                {typeof item.value === "number"
                  ? item.value.toFixed(2)
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default LineChartTooltip;
