import React from "react";
import { LeftPanelForm } from "./LeftPanelForm";
import { RightPanelOutput } from "./RightPanelOutput";

/**
 * Server Component container untuk halaman Latih & Uji Regresi.
 * Komponen ini murni mengelola layout tanpa state/hook.
 */
export function TrainTestContainer() {
  return (
    <div className="w-full flex flex-col">
      {/* 2 Kolom: Kiri Kontrol (380px) & Kanan Output (flex-1) */}
      <div className="max-w-6xl mx-auto w-full flex flex-row gap-8 pb-16 items-start">
        {/* Kolom Kiri: Form Kontrol (Client Component) */}
        <div className="w-95 shrink-0 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <LeftPanelForm />
        </div>

        {/* Kolom Kanan: Output & Visualisasi Grafik (Client Component) */}
        <div className="flex-1 min-w-0">
          <RightPanelOutput />
        </div>
      </div>
    </div>
  );
}

export default TrainTestContainer;
