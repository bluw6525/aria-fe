import React from "react";
import { getIspuStyle } from "@/app/estimate/_types";

interface IspuBadgeProps {
  category: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export function IspuBadge({
  category,
  size = "sm",
  className = "",
}: IspuBadgeProps) {
  const ispuStyle = getIspuStyle(category);

  const sizeStyles = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-0.5 text-xs font-bold",
    md: "px-3 py-1 text-xs font-extrabold",
  }[size];

  return (
    <span
      className={`inline-block rounded-full border transition-colors select-none ${ispuStyle.badgeBorder} ${ispuStyle.badgeBg} ${ispuStyle.badgeText} ${sizeStyles} ${className}`}
    >
      {category}
    </span>
  );
}

export default IspuBadge;
