// Palet warna choropleth sesuai kategori ISPU (Permen LHK No. 14 Tahun 2020)
export const CATEGORY_COLORS: Record<string, { fill: string; stroke: string; lightBg: string }> = {
  Baik: {
    fill: "#4ade80", // Emerald 400
    stroke: "#16a34a",
    lightBg: "#dcfce7",
  },
  Sedang: {
    fill: "#38bdf8", // Sky 400
    stroke: "#0284c7",
    lightBg: "#e0f2fe",
  },
  "Tidak Sehat": {
    fill: "#fbbf24", // Amber 400
    stroke: "#d97706",
    lightBg: "#fef3c7",
  },
  "Sangat Tidak Sehat": {
    fill: "#f87171", // Rose 400
    stroke: "#dc2626",
    lightBg: "#fee2e2",
  },
  Berbahaya: {
    fill: "#a855f7", // Purple 500
    stroke: "#7e22ce",
    lightBg: "#f3e8ff",
  },
  "Tidak Ada Data": {
    fill: "#cbd5e1", // Slate 300
    stroke: "#64748b",
    lightBg: "#f1f5f9",
  },
  Default: {
    fill: "#cbd5e1", // Slate 300
    stroke: "#64748b",
    lightBg: "#f1f5f9",
  },
};
