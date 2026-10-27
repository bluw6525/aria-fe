import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className = "",
  action,
}: EmptyStateProps) {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-24 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="font-bold text-slate-800 text-base mb-1">{title}</h4>
      <div className="text-xs text-slate-500 max-w-md leading-relaxed">
        {description}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
