"use client";

import React from "react";
import mapData from "@/data/jakarta-map-data.json";
import { RegionMapItem } from "../_types";
import { getCategoryFromIspu } from "../_hooks/use-estimate-api";
import { CATEGORY_COLORS } from "./map-constants";

interface JakartaMapSvgProps {
  regionMap: Record<string, RegionMapItem>;
  hoveredRegion: string | null;
  selectedRegion: string | null;
  isDrawerOpen: boolean;
  onHoverRegion: (regionId: string | null) => void;
  onSelectRegion: (regionId: string) => void;
}

export function JakartaMapSvg({
  regionMap,
  hoveredRegion,
  selectedRegion,
  isDrawerOpen,
  onHoverRegion,
  onSelectRegion,
}: JakartaMapSvgProps) {
  return (
    <svg
      viewBox={mapData.viewBox}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: 480,
        filter: "drop-shadow(0 4px 12px rgba(15, 23, 42, 0.06))",
      }}
    >
      {/* Definisikan filter glow untuk hover */}
      <defs>
        <filter id="region-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Render 5 Poligon Wilayah */}
      {mapData.regions.map((reg) => {
        const data = regionMap[reg.id];
        const hasValue = data?.estimated_ispu !== null && data?.estimated_ispu !== undefined;
        const ispuValue = hasValue ? data!.estimated_ispu! : null;
        const category = hasValue ? (data!.category || getCategoryFromIspu(ispuValue)) : "Default";
        const colorConfig = CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
        const isHovered = hoveredRegion === reg.id;
        const isSelected = isDrawerOpen && selectedRegion === reg.id;

        return (
          <g
            key={reg.id}
            onClick={() => onSelectRegion(reg.id)}
            onMouseEnter={() => onHoverRegion(reg.id)}
            onMouseLeave={() => onHoverRegion(null)}
            style={{ cursor: "pointer", transition: "all 200ms ease" }}
          >
            {/* Jalur Geometri Poligon Wilayah */}
            <path
              d={reg.path}
              fill={isHovered ? colorConfig.stroke : colorConfig.fill}
              stroke={isSelected ? "#0f172a" : isHovered ? "#0f172a" : "#ffffff"}
              strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter={isHovered || isSelected ? "url(#region-glow)" : undefined}
              style={{
                transition: "fill 180ms ease, stroke 180ms ease, stroke-width 180ms ease",
                opacity: hoveredRegion && !isHovered ? 0.75 : 1,
              }}
            />

            {/* Badge Label Teks Wilayah di Titik Sentroid */}
            <g transform={`translate(${reg.center[0]}, ${reg.center[1]})`}>
              {/* Kotak latar belakang label */}
              <rect
                x={-62}
                y={-22}
                width={124}
                height={data?.is_fallback ? 48 : 44}
                rx={10}
                fill={isSelected ? "#0f172a" : "#ffffff"}
                stroke={isSelected ? "#38bdf8" : colorConfig.stroke}
                strokeWidth={isSelected ? 2 : 1.5}
                filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))"
              />
              {/* Nama Wilayah */}
              <text
                x={0}
                y={data?.is_fallback ? -7 : -5}
                textAnchor="middle"
                fill={isSelected ? "#ffffff" : "#1e293b"}
                fontSize={11}
                fontWeight={700}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {reg.name}
              </text>
              {/* Nilai ISPU Observasi */}
              <text
                x={0}
                y={data?.is_fallback ? 8 : 12}
                textAnchor="middle"
                fill={isSelected ? "#38bdf8" : colorConfig.stroke}
                fontSize={12}
                fontWeight={800}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                ISPU: {hasValue && ispuValue !== null ? ispuValue.toFixed(1) : "--"}
              </text>
              {/* Tanggal Observasi jika data terakhir (fallback) */}
              {data?.is_fallback && data.observation_date && (
                <text
                  x={0}
                  y={20}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={9}
                  fontWeight={600}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  ({data.observation_date})
                </text>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default JakartaMapSvg;
