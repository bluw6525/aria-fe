"use client";

import React, { ReactNode } from "react";

export interface HelpTabButtonProps {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Reusable tab button untuk modul bantuan.
 */
export function HelpTabButton({
  label,
  icon,
  isActive,
  onClick,
}: HelpTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
        isActive
          ? "bg-white text-sky-800 shadow-sm"
          : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default HelpTabButton;
