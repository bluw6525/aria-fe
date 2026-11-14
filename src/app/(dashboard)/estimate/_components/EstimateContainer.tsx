"use client";

import React from "react";
import {
  Box,
  Flex,
  Paper,
  Text,
  Button as MantineButton,
  Group,
} from "@mantine/core";
import {
  Calendar,
  Satellite,
} from "lucide-react";
import { useEstimateApi, getLocalTodayDate } from "../_hooks/use-estimate-api";
import { JakartaMap } from "./JakartaMap";
import { EstimateDetailDrawer } from "./EstimateDetailDrawer";

/**
 * Container untuk halaman Estimasi Indeks Standar Pencemar Udara (ISPU).
 * Menampilkan Peta Distribusi Spasial Citra Satelit Sentinel-5P dan drawer analisis peramalan.
 */
export function EstimateContainer() {
  const selectedDate = useEstimateApi((s) => s.selectedDate);
  const setSelectedDate = useEstimateApi((s) => s.setSelectedDate);
  const isMapLoading = useEstimateApi((s) => s.isMapLoading);

  const [todayStr, setTodayStr] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const today = getLocalTodayDate();
    setTodayStr(today);
    setSelectedDate(today);
  }, [setSelectedDate]);

  const isToday = Boolean(todayStr && selectedDate === todayStr);

  return (
    <Box style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* 1. Bar Header Kontrol Tanggal Observasi Satelit */}
      <Paper
        p="sm"
        shadow="xs"
        radius="md"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap="sm"
        >
          {/* Judul & Keterangan Mode Observasi */}
          <Group gap="xs">
            <Box
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Satellite size={20} color="#ffffff" />
            </Box>
            <Box>
              <Text size="sm" fw={800} c="brandSecondary.9">
                Peta Sebaran Observasi Satelit ISPU
              </Text>
              <Text size="xs" c="brandSecondary.5">
                Citra Satelit Sentinel-5P Level-3 Wilayah DKI Jakarta
              </Text>
            </Box>
          </Group>

          {/* Kontrol Kalender Single Date Picker */}
          <Flex gap="sm" align="center" wrap="wrap" justify="flex-end">
            <Group gap={6}>
              <Box
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  backgroundColor: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Calendar size={14} color="#ffffff" />
              </Box>
              <Text size="xs" fw={600} c="brandSecondary.7">
                Basis Tanggal:
              </Text>
            </Group>

            <Box>
              <input
                type="date"
                value={selectedDate}
                max={mounted ? (todayStr || getLocalTodayDate()) : undefined}
                suppressHydrationWarning
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const maxDate = todayStr || getLocalTodayDate();
                  if (val > maxDate) {
                    setSelectedDate(maxDate);
                  } else {
                    setSelectedDate(val);
                  }
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                }}
              />
            </Box>

            {/* Tombol Pintas Hari Ini */}
            <MantineButton
              variant={isToday ? "filled" : "default"}
              size="xs"
              radius="md"
              loading={isMapLoading}
              onClick={() => setSelectedDate(todayStr || getLocalTodayDate())}
              leftSection={<Calendar size={14} color={isToday ? "#ffffff" : "#0284c7"} />}
              style={
                isToday
                  ? { backgroundColor: "#0284c7", color: "#ffffff" }
                  : { backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#1e293b" }
              }
            >
              {isToday ? "Hari Ini (Aktif)" : "Reset ke Hari Ini"}
            </MantineButton>
          </Flex>
        </Flex>
      </Paper>

      {/* 2. Area Peta Interaktif & Panel Samping Kanan */}
      <Paper
        p={{ base: 14, sm: 20 }}
        shadow="xs"
        radius="md"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <JakartaMap />
        <EstimateDetailDrawer />
      </Paper>
    </Box>
  );
}

export default EstimateContainer;
