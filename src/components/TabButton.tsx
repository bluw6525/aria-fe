"use client";

import React, { ReactNode } from "react";
import { UnstyledButton, Text } from "@mantine/core";

export interface TabButtonProps {
  label: string;
  icon?: ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function TabButton({
  label,
  icon,
  isActive,
  onClick,
  className = "",
}: TabButtonProps) {
  return (
    <UnstyledButton
      type="button"
      onClick={onClick}
      px="md"
      py="xs"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 12,
        transition: "all 150ms ease",
        backgroundColor: isActive ? "#ffffff" : "transparent",
        boxShadow: isActive ? "var(--mantine-shadow-xs)" : "none",
        color: isActive ? "var(--mantine-color-brandPrimary-8)" : "var(--mantine-color-brandSecondary-6)",
        fontWeight: 700,
        fontSize: "12px",
      }}
      className={className}
    >
      {icon}
      <Text size="xs" fw={700} inherit>
        {label}
      </Text>
    </UnstyledButton>
  );
}

export default TabButton;
