"use client";

import { Title, Text, Box } from "@mantine/core";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
}

export function PageHeader({
  title = "Aria - Sentinel-5P Ozone Monitoring",
  subtitle,
}: PageHeaderProps) {
  return (
    <Box component="header" w="100%" mb={32} style={{ textAlign: "center" }}>
      <Title order={2} size="h2" fw={800} c="brandSecondary.9" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </Title>
      {subtitle && (
        <Text size="sm" c="brandSecondary.5" fw={500} mt={6}>
          {subtitle}
        </Text>
      )}
      {/* Garis Pembatas Header Solid */}
      <Box
        mx="auto"
        mt="md"
        style={{
          width: "100%",
          maxWidth: 896,
          height: 1.5,
          backgroundColor: "var(--mantine-color-brandSecondary-3)",
        }}
      />
    </Box>
  );
}

export default PageHeader;
