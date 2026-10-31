"use client";

import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Box, Group, Text } from "@mantine/core";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  labelRight?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconRight?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelRight,
      hint,
      error,
      icon,
      iconPosition = "left",
      iconRight,
      containerClassName = "",
      className = "",
      disabled,
      id,
      style,
      ...props
    },
    ref
  ) => {
    const hasIconLeft = Boolean(icon && iconPosition === "left");
    const rightContent = iconRight || (iconPosition === "right" ? icon : null);
    const hasIconRight = Boolean(rightContent);

    return (
      <Box style={{ display: "flex", flexDirection: "column", gap: 6 }} className={containerClassName}>
        {(label || labelRight) && (
          <Group justify="space-between" align="center" style={{ fontSize: "12px", fontWeight: 700 }}>
            {label && (
              <label htmlFor={id} style={{ cursor: "pointer", color: "var(--mantine-color-brandSecondary-8)" }}>
                {label}
              </label>
            )}
            {labelRight && (
              <Text size="xs" c="dimmed" style={{ fontSize: "10px", fontWeight: 400 }}>
                {labelRight}
              </Text>
            )}
          </Group>
        )}

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {hasIconLeft && (
            <div
              style={{
                position: "absolute",
                left: 14,
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                color: "var(--mantine-color-brandSecondary-4)",
              }}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            style={{
              width: "100%",
              height: 40,
              paddingLeft: hasIconLeft ? 40 : 14,
              paddingRight: hasIconRight ? 40 : 14,
              border: error ? "1px solid #f43f5e" : "1px solid #cbd5e1",
              borderRadius: 12,
              backgroundColor: disabled ? "#f1f5f9" : "#ffffff",
              color: disabled
                ? "var(--mantine-color-brandSecondary-4)"
                : "var(--mantine-color-brandSecondary-9)",
              fontSize: 12,
              fontWeight: 600,
              outline: "none",
              boxShadow: "var(--mantine-shadow-xs)",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
              cursor: disabled ? "not-allowed" : "text",
              ...style,
            }}
            className={className}
            {...props}
          />

          {hasIconRight && (
            <div
              style={{
                position: "absolute",
                right: 14,
                display: "flex",
                alignItems: "center",
                color: "var(--mantine-color-brandSecondary-4)",
              }}
            >
              {rightContent}
            </div>
          )}
        </div>

        {error ? (
          <Text size="xs" c="red.6" style={{ fontSize: 11, fontWeight: 500 }}>
            {error}
          </Text>
        ) : hint ? (
          <Text size="xs" c="dimmed" style={{ fontSize: 11 }}>
            {hint}
          </Text>
        ) : null}
      </Box>
    );
  }
);

Input.displayName = "Input";
export default Input;
