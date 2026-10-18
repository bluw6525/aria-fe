"use client";

import React, { useState, useMemo } from "react";
import { ChartDataPoint } from "../types";

interface InteractiveChartProps {
  data: ChartDataPoint[];
  title?: string;
  subtitle?: string;
  actualLabel?: string;
  predictedLabel?: string;
  height?: number;
}

export function InteractiveChart({
  data,
  title = "Perbandingan Observasi Aktual vs Estimasi Model",
  subtitle = "Evaluasi titik data observasi SPKU vs nilai estimasi Sentinel-5P",
  actualLabel = "O3 Sebenarnya (SPKU)",
  predictedLabel = "O3 Estimasi (Model)",
  height = 260,
}: InteractiveChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Batasi sampel untuk render jika data sangat besar agar 60fps mulus
  const displayData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (data.length <= 60) return data;
    const step = Math.ceil(data.length / 50);
    return data.filter((_, idx) => idx % step === 0 || idx === data.length - 1);
  }, [data]);

  const { minVal, maxVal, width, padding } = useMemo(() => {
    if (!displayData || displayData.length === 0) {
      return { minVal: 0, maxVal: 50, width: 680, padding: 45 };
    }
    const allVals = displayData.flatMap((d) => [d.actual, d.predicted]);
    const min = Math.floor(Math.min(...allVals) * 0.9);
    const max = Math.ceil(Math.max(...allVals) * 1.1) || 10;
    return { minVal: Math.max(0, min), maxVal: max, width: 680, padding: 45 };
  }, [displayData]);

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const getX = (index: number) => {
    if (displayData.length <= 1) return padding + innerWidth / 2;
    return padding + (index / (displayData.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const range = maxVal - minVal || 1;
    return height - padding - ((val - minVal) / range) * innerHeight;
  };

  // SVG Paths
  const { actualLinePath, predictedLinePath, actualAreaPath, predictedAreaPath } = useMemo(() => {
    if (displayData.length === 0) {
      return { actualLinePath: "", predictedLinePath: "", actualAreaPath: "", predictedAreaPath: "" };
    }

    const calcX = (index: number) => {
      if (displayData.length <= 1) return padding + innerWidth / 2;
      return padding + (index / (displayData.length - 1)) * innerWidth;
    };
    const calcY = (val: number) => {
      const range = maxVal - minVal || 1;
      return height - padding - ((val - minVal) / range) * innerHeight;
    };

    const firstX = calcX(0);
    const lastX = calcX(displayData.length - 1);
    const baseY = height - padding;

    const actLine = displayData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${calcX(i).toFixed(1)} ${calcY(d.actual).toFixed(1)}`)
      .join(" ");

    const predLine = displayData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${calcX(i).toFixed(1)} ${calcY(d.predicted).toFixed(1)}`)
      .join(" ");

    const actArea = `${actLine} L ${lastX.toFixed(1)} ${baseY} L ${firstX.toFixed(1)} ${baseY} Z`;
    const predArea = `${predLine} L ${lastX.toFixed(1)} ${baseY} L ${firstX.toFixed(1)} ${baseY} Z`;

    return {
      actualLinePath: actLine,
      predictedLinePath: predLine,
      actualAreaPath: actArea,
      predictedAreaPath: predArea,
    };
  }, [displayData, minVal, maxVal, innerWidth, innerHeight, padding, height]);

  if (!displayData || displayData.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center text-slate-400 text-xs bg-slate-50/80 rounded-2xl border border-dashed border-slate-200">
        <span>Belum ada data evaluasi grafik untuk ditampilkan</span>
      </div>
    );
  }

  const activePoint = hoveredIndex !== null ? displayData[hoveredIndex] : null;

  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs select-none">
      {/* Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-xs md:text-sm font-bold text-slate-900 tracking-tight">
            {title}
          </h4>
          <p className="text-[11px] text-slate-500 font-normal">
            {subtitle} • {data.length} total observasi
          </p>
        </div>

        <div className="flex items-center gap-3.5 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-sky-50/80 px-2.5 py-1 rounded-lg border border-sky-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shadow-xs" />
            <span className="text-sky-900 text-[11px]">{actualLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-50/80 px-2.5 py-1 rounded-lg border border-rose-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
            <span className="text-rose-900 text-[11px]">{predictedLabel}</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Gradient untuk Area Aktual (Sky) */}
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>

            {/* Gradient untuk Area Estimasi (Rose) */}
            <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines horizontal */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - padding - ratio * innerHeight;
            const val = Math.round(minVal + ratio * (maxVal - minVal));
            return (
              <g key={ratio}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                <text
                  x={padding - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono font-medium"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Gradient Area Fill */}
          <path d={actualAreaPath} fill="url(#actualGradient)" />
          <path d={predictedAreaPath} fill="url(#predictedGradient)" />

          {/* Garis Data Aktual (Sky-600) */}
          <path
            d={actualLinePath}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_2px_4px_rgba(2,132,199,0.15)]"
          />

          {/* Garis Data Estimasi (Rose-500) */}
          <path
            d={predictedLinePath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 3"
            className="filter drop-shadow-[0_2px_4px_rgba(244,63,94,0.15)]"
          />

          {/* Interactive Hover Vertical Guide Line */}
          {hoveredIndex !== null && (
            <line
              x1={getX(hoveredIndex)}
              y1={padding}
              x2={getX(hoveredIndex)}
              y2={height - padding}
              stroke="#0284c7"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              className="opacity-75"
            />
          )}

          {/* Titik-titik data (Circle) */}
          {displayData.map((d, i) => {
            const x = getX(i);
            const yAct = getY(d.actual);
            const yPred = getY(d.predicted);
            const isHovered = hoveredIndex === i;

            return (
              <g key={d.index || i}>
                {/* Hotspot Hover Interaktif */}
                <rect
                  x={x - 8}
                  y={padding}
                  width={16}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                />

                {/* Point Aktual */}
                <circle
                  cx={x}
                  cy={yAct}
                  r={isHovered ? 5.5 : 3}
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? "2.5" : "1.2"}
                  className="transition-all duration-150 pointer-events-none"
                />

                {/* Point Estimasi */}
                <circle
                  cx={x}
                  cy={yPred}
                  r={isHovered ? 5.5 : 3}
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? "2.5" : "1.2"}
                  className="transition-all duration-150 pointer-events-none"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Card */}
        {activePoint && hoveredIndex !== null && (
          <div
            className="absolute top-2 pointer-events-none bg-slate-900/90 text-white rounded-xl px-3.5 py-2.5 shadow-xl border border-slate-700/80 text-xs font-mono z-10 transition-all duration-100 backdrop-blur-md"
            style={{
              left: `${Math.min(Math.max(10, (getX(hoveredIndex) / width) * 100), 75)}%`,
            }}
          >
            <div className="font-sans font-bold text-sky-400 text-[11px] mb-1 flex items-center justify-between gap-4">
              <span>Observasi #{activePoint.index}</span>
              <span className="text-[10px] text-slate-400 font-normal">Sampel SPKU</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-0.5">
              <span className="text-sky-300 font-sans text-[11px]">Aktual (SPKU):</span>
              <span className="font-bold text-white">{activePoint.actual.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-0.5">
              <span className="text-rose-300 font-sans text-[11px]">Estimasi (Model):</span>
              <span className="font-bold text-white">{activePoint.predicted.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-slate-300 border-t border-slate-700/80 mt-1.5 pt-1 flex items-center justify-between gap-4">
              <span className="font-sans">Residual Error (e):</span>
              <span className={activePoint.actual - activePoint.predicted >= 0 ? "text-emerald-400" : "text-amber-400"}>
                {(activePoint.actual - activePoint.predicted >= 0 ? "+" : "")}
                {(activePoint.actual - activePoint.predicted).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
