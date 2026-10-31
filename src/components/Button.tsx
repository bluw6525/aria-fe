"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as MantineBtn } from "@mantine/core";

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
  onClick,
  ...props
}: ButtonProps) {
  // Mapping variant custom Aria ke prop Mantine
  const getMantineProps = () => {
    switch (variant) {
      case "primary":
        return { color: "brandPrimary", variant: "filled" as const };
      case "secondary":
        return { color: "brandPrimary", variant: "light" as const };
      case "outline":
        return { color: "brandSecondary", variant: "outline" as const };
      case "ghost":
        return { color: "brandSecondary", variant: "subtle" as const };
      case "danger":
        return { color: "red", variant: "filled" as const };
      default:
        return { color: "brandPrimary", variant: "filled" as const };
    }
  };

  const mantineProps = getMantineProps();

  return (
    <MantineBtn
      type={type}
      size={size}
      loading={isLoading}
      loaderProps={{ type: "dots" }}
      leftSection={icon}
      fullWidth={fullWidth}
      disabled={disabled}
      radius="md"
      className={className}
      onClick={onClick}
      {...mantineProps}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </MantineBtn>
  );
}

export default Button;
