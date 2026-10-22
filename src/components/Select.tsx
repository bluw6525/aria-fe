"use client";

import React, { SelectHTMLAttributes, ReactNode, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  labelRight?: ReactNode;
  options?: SelectOption[];
  containerClassName?: string;
  children?: ReactNode;
}

/**
 * Reusable Select Dropdown dengan styling kustom Aria System dan chevron down icon.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      labelRight,
      options,
      children,
      className = "",
      containerClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {(label || labelRight) && (
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            {label && <label>{label}</label>}
            {labelRight && (
              <span className="text-[10px] font-normal text-slate-500">
                {labelRight}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`w-full h-11 pl-3.5 pr-9 border border-slate-300 hover:border-slate-400 rounded-xl bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 shadow-sm transition-all appearance-none cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed ${className}`}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option
                    key={String(opt.value)}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
