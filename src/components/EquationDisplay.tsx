import React from "react";

interface EquationDisplayProps {
  equation: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function EquationDisplay({
  equation,
  label,
  className = "",
  size = "md",
}: EquationDisplayProps) {
  const sizeClass = size === "sm" ? "text-xs py-2 px-3.5" : "text-sm py-2.5 px-4";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-bold text-slate-700 capitalize">
          {label}
        </span>
      )}
      <div
        className={`bg-sky-50 border border-sky-200 rounded-xl text-sky-950 font-bold font-mono tracking-tight overflow-x-auto ${sizeClass}`}
      >
        {equation}
      </div>
    </div>
  );
}

export default EquationDisplay;
