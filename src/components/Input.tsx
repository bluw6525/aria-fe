"use client";

import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  labelRight?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  containerClassName?: string;
}

/**
 * Reusable Input Component dengan standar styling Aria System:
 * - Dukungan label & labelRight (opsional)
 * - Dukungan ikon kiri/kanan (opsional)
 * - Dukungan pesan error / petunjuk (hint)
 * - State focus ring sky-500, hover border, disabled state terstandardisasi
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelRight,
      hint,
      error,
      icon,
      iconPosition = "left",
      containerClassName = "",
      className = "",
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasIconLeft = Boolean(icon && iconPosition === "left");
    const hasIconRight = Boolean(icon && iconPosition === "right");

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {(label || labelRight) && (
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            {label && (
              <label htmlFor={id} className="cursor-pointer">
                {label}
              </label>
            )}
            {labelRight && (
              <span className="text-[10px] font-normal text-slate-500">
                {labelRight}
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          {hasIconLeft && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={`w-full h-10 px-3.5 border rounded-xl bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-sm transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed ${
              error
                ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                : "border-slate-300 hover:border-slate-400 focus:ring-sky-500/20 focus:border-sky-600"
            } ${hasIconLeft ? "pl-10" : ""} ${hasIconRight ? "pr-10" : ""} ${className}`}
            {...props}
          />

          {hasIconRight && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-[11px] font-medium text-rose-600">{error}</span>
        ) : hint ? (
          <span className="text-[11px] text-slate-500">{hint}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
