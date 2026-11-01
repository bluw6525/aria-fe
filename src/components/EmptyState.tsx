"use client";

import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Title, Text, Box, Center, Stack } from "@mantine/core";

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
  action,
}: EmptyStateProps) {
  return (
    <Center py={64} style={{ flex: 1, width: "100%", textAlign: "center" }}>
      <Stack align="center" gap="xs">
        <Center
          w={56}
          h={56}
          mb="xs"
          style={{
            borderRadius: 16,
            backgroundColor: "var(--mantine-color-brandPrimary-0)",
            border: "1px solid var(--mantine-color-brandPrimary-1)",
            color: "var(--mantine-color-brandPrimary-6)",
          }}
        >
          <Icon size={28} />
        </Center>
        <Title order={4} size="h5" fw={700} c="brandSecondary.9">
          {title}
        </Title>
        <Text size="xs" c="brandSecondary.5" maw={420} lh={1.6}>
          {description}
        </Text>
        {action && <Box mt="md">{action}</Box>}
      </Stack>
    </Center>
  );
}

export default EmptyState;
