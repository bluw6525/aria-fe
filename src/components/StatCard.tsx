import React, { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  variant?: "sky" | "slate";
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatCard({
  label,
  value,
  variant = "sky",
  className = "",
  valueClassName = "",
  labelClassName = "",
}: StatCardProps) {
  const variantStyles =
    variant === "sky"
      ? "bg-sky-50 border-sky-200 text-sky-900"
      : "bg-slate-50 border-slate-200 text-slate-800";

  const defaultValColor =
    variant === "sky" ? "text-sky-700" : "text-slate-800";

  return (
    <div
      className={`border p-3.5 rounded-xl text-center flex flex-col justify-center gap-0.5 ${variantStyles} ${className}`}
    >
      <span
        className={`block text-[11px] font-bold uppercase tracking-wider ${labelClassName}`}
      >
        {label}
      </span>
      <span
        className={`text-xl font-extrabold tracking-tight ${defaultValColor} ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

export default StatCard;
