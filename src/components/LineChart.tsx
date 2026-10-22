"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { LineChartTooltip } from "./LineChartTooltip";

export interface LineSeries {
  key: string;
  name: string;
  color?: string;
  dashed?: boolean;
}

export interface LineChartProps<T extends object = Record<string, unknown>> {
  data: T[];
  lines: LineSeries[];
  xAxisKey?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
}

export function LineChart<T extends object = Record<string, unknown>>({
  data,
  lines,
  xAxisKey = "index",
  title,
  subtitle,
  height = 250,
  className = "",
}: LineChartProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
        Belum ada data grafik untuk ditampilkan
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-xs select-none ${className}`}
    >
      {/* Header & Legend Simpel */}
      {(title || lines.length > 0) && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-100">
          <div>
            {title && (
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="text-[11px] text-slate-500 font-normal">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold">
            {lines.map((l) => (
              <div
                key={l.key}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-700"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: l.color || "#0284c7" }}
                />
                <span>{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Area Grafik Recharts Minimalis */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLine
            data={data}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xAxisKey}
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<LineChartTooltip />} />

            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.name}
                stroke={l.color || "#0284c7"}
                strokeWidth={2}
                strokeDasharray={l.dashed ? "4 4" : undefined}
                dot={{ r: 2, fill: l.color || "#0284c7", strokeWidth: 0 }}
                activeDot={{ r: 4.5, stroke: "#fff", strokeWidth: 1.5 }}
                isAnimationActive={true}
              />
            ))}
          </RechartsLine>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChart;
