import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-sm disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none",
  secondary:
    "bg-sky-50 hover:bg-sky-100 active:bg-sky-200 text-sky-800 border border-sky-300 shadow-xs disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200",
  outline:
    "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
  ghost:
    "bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 disabled:text-slate-400",
  danger:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm disabled:bg-slate-200 disabled:text-slate-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
  md: "h-11 px-4 text-xs font-bold rounded-xl gap-2",
  lg: "h-12 px-6 text-sm font-bold rounded-xl gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  icon,
  fullWidth = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-150 select-none cursor-pointer disabled:cursor-not-allowed [transform:translateZ(0)] [backface-visibility:hidden] ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0 [transform:translateZ(0)]" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
}

export default Button;
