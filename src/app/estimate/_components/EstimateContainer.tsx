import React from "react";
import { EstimateLeftPanel } from "./EstimateLeftPanel";
import { EstimateRightPanel } from "./EstimateRightPanel";

/**
 * Server Component container untuk halaman Estimasi Indeks Standar Pencemar Udara (ISPU).
 * Komponen ini murni mengelola layout tanpa state/hook.
 */
export function EstimateContainer() {
  return (
    <div className="w-full flex flex-col">
      {/* 2 Kolom: Kiri Kontrol (380px) & Kanan Output (flex-1) */}
      <div className="max-w-6xl mx-auto w-full flex flex-row gap-8 pb-16 items-start">
        {/* Kolom Kiri: Form Kontrol (Client Component) */}
        <div className="w-95 shrink-0 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <EstimateLeftPanel />
        </div>

        {/* Kolom Kanan: Output & Visualisasi Grafik (Client Component) */}
        <div className="flex-1 min-w-0">
          <EstimateRightPanel />
        </div>
      </div>
    </div>
  );
}

export default EstimateContainer;
