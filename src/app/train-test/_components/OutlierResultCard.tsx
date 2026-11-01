import React from "react";
import { Stack, Text, Paper, Flex } from "@mantine/core";
import type { OutlierDetectionResponse } from "../_types";

interface OutlierResultCardProps {
  result: OutlierDetectionResponse;
}

export function OutlierResultCard({ result }: OutlierResultCardProps) {
  const leverageOutliers = result.leverage?.outlier_indices || [];
  const dffitsOutliers = result.dffits?.outlier_indices || [];
  const bothOutliers = result.both?.outlier_indices || [];

  return (
    <Stack gap="xs" pb="xs">
      <Text size="md" fw={700} c="brandSecondary.9">
        Outlier pada data latih
      </Text>

      <Paper
        bg="brandSecondary.0"
        style={{
          overflow: "hidden",
        }}
      >
        <Stack gap={0} style={{ divideColor: "var(--mantine-color-brandSecondary-2)" }}>
          {/* Leverage Value */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, sm: 16 }}
            align={{ base: "flex-start", sm: "baseline" }}
            p="md"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <Text size="xs" fw={700} c="brandSecondary.9" w={140} style={{ flexShrink: 0 }}>
              Leverage Value
            </Text>
            <Text size="xs" c="brandSecondary.8" style={{ lineHeight: 1.6 }}>
              {leverageOutliers.length > 0 ? (
                <>
                  data ke{" "}
                  <Text component="span" fw={600} c="brandSecondary.9">
                    {leverageOutliers.join(", ")}
                  </Text>
                </>
              ) : (
                <Text component="span" c="brandSecondary.4" fs="italic">
                  Tidak terdeteksi pencilan leverage
                </Text>
              )}
            </Text>
          </Flex>

          {/* DFFITS */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, sm: 16 }}
            align={{ base: "flex-start", sm: "baseline" }}
            p="md"
            style={{ borderBottom: bothOutliers.length > 0 ? "1px solid #e2e8f0" : "none" }}
          >
            <Text size="xs" fw={700} c="brandSecondary.9" w={140} style={{ flexShrink: 0 }}>
              DFFITS
            </Text>
            <Text size="xs" c="brandSecondary.8" style={{ lineHeight: 1.6 }}>
              {dffitsOutliers.length > 0 ? (
                <>
                  data ke{" "}
                  <Text component="span" fw={600} c="brandSecondary.9">
                    {dffitsOutliers.join(", ")}
                  </Text>
                </>
              ) : (
                <Text component="span" c="brandSecondary.4" fs="italic">
                  Tidak terdeteksi pencilan DFFITS
                </Text>
              )}
            </Text>
          </Flex>

          {/* Both (Irisan) */}
          {bothOutliers.length > 0 && (
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 4, sm: 16 }}
              align={{ base: "flex-start", sm: "baseline" }}
              p="md"
            >
              <Text size="xs" fw={700} c="brandSecondary.9" w={140} style={{ flexShrink: 0 }}>
                Both (Irisan)
              </Text>
              <Text size="xs" c="brandSecondary.8" style={{ lineHeight: 1.6 }}>
                data ke{" "}
                <Text component="span" fw={600} c="brandSecondary.9">
                  {bothOutliers.join(", ")}
                </Text>
              </Text>
            </Flex>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
