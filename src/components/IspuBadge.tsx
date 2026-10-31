"use client";

import React from "react";
import { Badge } from "@mantine/core";
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
  const mantineSize = size === "xs" ? "xs" : size === "md" ? "md" : "sm";

  return (
    <Badge
      size={mantineSize}
      radius="xl"
      variant="light"
      color={ispuStyle.color}
      style={{
        backgroundColor: ispuStyle.bgHex,
        borderColor: ispuStyle.borderHex,
        color: ispuStyle.textHex,
        border: `1px solid ${ispuStyle.borderHex}`,
        fontWeight: 700,
        userSelect: "none",
      }}
      className={className}
    >
      {category}
    </Badge>
  );
}

export default IspuBadge;
