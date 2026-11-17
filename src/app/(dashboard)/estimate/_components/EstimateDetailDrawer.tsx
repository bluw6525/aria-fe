"use client";

import React, { useMemo } from "react";
import {
  Drawer,
  Stack,
  Flex,
  Box,
  Text,
  Badge,
  Button,
  LoadingOverlay,
  Group,
  ThemeIcon,
  Alert,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import {
  MapPin,
  Calendar,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Info,
} from "lucide-react";
import { LineChart, LineSeries } from "@/components/LineChart";
import { IspuBadge } from "@/components/IspuBadge";
import { useEstimateApi, getLocalTodayDate } from "../_hooks/use-estimate-api";
import { EstimateBatchMetrics } from "./EstimateBatchMetrics";
import { EstimateBatchTable } from "./EstimateBatchTable";

const REGION_LABELS: Record<string, string> = {
  jakarta_barat: "Jakarta Barat",
  jakarta_pusat: "Jakarta Pusat",
  jakarta_selatan: "Jakarta Selatan",
  jakarta_timur: "Jakarta Timur",
  jakarta_utara: "Jakarta Utara",
};

export function EstimateDetailDrawer() {
  const isDrawerOpen = useEstimateApi((s) => s.isDrawerOpen);
  const setIsDrawerOpen = useEstimateApi((s) => s.setIsDrawerOpen);
  const selectedRegion = useEstimateApi((s) => s.selectedRegion);
  const drawerStartDate = useEstimateApi((s) => s.drawerStartDate);
  const drawerEndDate = useEstimateApi((s) => s.drawerEndDate);
  const setDrawerDateRange = useEstimateApi((s) => s.setDrawerDateRange);
  const isEstimating = useEstimateApi((s) => s.isEstimating);
  const batchResult = useEstimateApi((s) => s.batchResult);
  const estimateError = useEstimateApi((s) => s.estimateError);
  const runSatelliteEstimate = useEstimateApi((s) => s.runSatelliteEstimate);
  const mapOverview = useEstimateApi((s) => s.mapOverview);

  const regionName = selectedRegion ? REGION_LABELS[selectedRegion] || selectedRegion : "";
  const regionSummary = mapOverview.find((m) => m.region === selectedRegion);

  const [todayStr, setTodayStr] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTodayStr(getLocalTodayDate());
  }, []);

  const [localStartDate, setLocalStartDate] = React.useState<string>(drawerStartDate);
  const [localEndDate, setLocalEndDate] = React.useState<string>(drawerEndDate);
  const [dateError, setDateError] = React.useState<string | null>(null);

  // Sinkronkan input lokal saat drawer dibuka atau nilai drawer di store berganti (misal pilih wilayah baru)
  React.useEffect(() => {
    setLocalStartDate(drawerStartDate);
    setLocalEndDate(drawerEndDate);
    setDateError(null);
  }, [drawerStartDate, drawerEndDate, isDrawerOpen]);

  const hasForecastInChart = Boolean(batchResult?.chart_data?.some((pt) => pt.is_forecast));

  // Garis grafik: Garis tegas biru untuk observasi historis, garis putus-putus hijau untuk peramalan 2 hari (hanya jika ada titik proyeksi di grafik)
  const chartLines: LineSeries[] = useMemo(() => {
    const lines: LineSeries[] = [
      {
        key: "estimated_value",
        name: "Observasi Historis",
        color: "var(--mantine-color-brandPrimary-6)",
      },
    ];
    if (hasForecastInChart) {
      lines.push({
        key: "forecast_value",
        name: "Proyeksi 2 Hari",
        color: "#16a34a", // Hijau cerah (Green 600)
        dashed: true,
      });
    }
    return lines;
  }, [hasForecastInChart]);

  // Update nilai tanggal lokal tanpa melakukan request ke backend
  const handleDateChange = (type: "start" | "end", val: string) => {
    setDateError(null);
    if (type === "start") {
      setLocalStartDate(val);
    } else {
      setLocalEndDate(val);
    }
  };

  // Validasi rentang tanggal dieksekusi hanya ketika tombol ditekan
  const handleUpdateTrend = async () => {
    if (!localStartDate || !localEndDate) {
      setDateError("Tanggal awal dan tanggal akhir harus diisi.");
      return;
    }

    if (localStartDate > todayStr || localEndDate > todayStr) {
      setDateError("Tanggal observasi tidak boleh melebihi hari ini.");
      return;
    }

    const start = new Date(localStartDate).getTime();
    const end = new Date(localEndDate).getTime();

    if (start > end) {
      setDateError("Tanggal awal tidak boleh melebihi tanggal akhir.");
      return;
    }

    const diffDays = (end - start) / (1000 * 3600 * 24);
    if (diffDays > 31) {
      setDateError(`Rentang tanggal observasi saat ini ${Math.round(diffDays)} hari. Batas maksimal adalah 31 hari.`);
      return;
    }

    setDateError(null);
    setDrawerDateRange(localStartDate, localEndDate);
    await runSatelliteEstimate();
  };

  return (
    <Drawer
      opened={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      position="right"
      size="xl"
      title={
        <Group gap="xs">
          <ThemeIcon color="brandPrimary.6" variant="filled" size="md" radius="md">
            <MapPin size={18} color="#ffffff" />
          </ThemeIcon>
          <Box>
            <Flex align="center" gap={8}>
              <Text fw={800} size="md" c="brandSecondary.9">
                {regionName}
              </Text>
              {regionSummary && (
                <IspuBadge category={regionSummary.category} size="xs" />
              )}
            </Flex>
            <Text size="xs" c="brandSecondary.5">
              Estimasi & Peramalan Kualitas Udara Satelit Sentinel-5P
            </Text>
          </Box>
        </Group>
      }
      padding="lg"
      styles={{
        header: {
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: 16,
        },
        body: {
          position: "relative",
          minHeight: 400,
        },
      }}
    >
      <LoadingOverlay visible={isEstimating} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

      <Stack gap="lg" mt="sm">
        {/* Banner Informasi Observasi Terakhir jika data acuan fallback */}
        {regionSummary?.is_fallback && regionSummary.observation_date && (
          <Alert
            icon={<Info size={16} />}
            color="amber"
            variant="light"
            radius="md"
            p="xs"
          >
            <Text size="xs">
              Pada tanggal acuan peta, wilayah <strong>{regionName}</strong> tidak memiliki data satelit lengkap. Nilai estimasi ISPU (<strong>{regionSummary.estimated_ispu?.toFixed(1)}</strong>) berbasis data observasi valid terdekat pada <strong>{regionSummary.observation_date}</strong>.
            </Text>
          </Alert>
        )}

        {/* 1. KARTU PROYEKSI 2 HARI KEDEPAN (Selalu Terkini / Paling Atas) */}
        {batchResult?.forecast_days && batchResult.forecast_days.length > 0 && (
          <Paper
            p="md"
            radius="md"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
            }}
          >
            <Flex justify="space-between" align="center" mb="xs">
              <Group gap={8}>
                <ThemeIcon color="brandPrimary.6" variant="filled" size="sm" radius="md">
                  <Calendar size={14} color="#ffffff" />
                </ThemeIcon>
                <Text size="xs" fw={700} c="brandSecondary.9">
                  Proyeksi Kualitas Udara (2 Hari Kedepan)
                </Text>
              </Group>
            </Flex>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              {batchResult.forecast_days.map((item) => (
                <Paper
                  key={item.day_offset}
                  p="sm"
                  radius="md"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text size="xs" fw={700} c="brandSecondary.8">
                      {item.label}
                    </Text>
                    <IspuBadge category={item.ispu_category} size="xs" />
                  </Flex>
                  <Text size="xs" c="brandSecondary.4" mb={6}>
                    {item.date}
                  </Text>
                  <Flex align="baseline" justify="space-between">
                    <Text size="lg" fw={800} c="brandPrimary.7">
                      {item.estimated_value}
                      <Text span size="xs" fw={500} c="brandSecondary.5" ml={4}>
                        ISPU
                      </Text>
                    </Text>
                    <Badge
                      size="xs"
                      variant="light"
                      color={item.delta >= 0 ? "orange" : "teal"}
                      leftSection={item.delta >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    >
                      {item.delta >= 0 ? `+${item.delta}` : item.delta}
                    </Badge>
                  </Flex>
                </Paper>
              ))}
            </SimpleGrid>
          </Paper>
        )}

        {/* 2. EKSPLORASI TREN HISTORIS WILAYAH (Form Parameter Rentang Tanggal) */}
        <Box
          p="md"
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
          }}
        >
          <Text size="xs" fw={700} c="brandSecondary.8" mb={12}>
            Rentang Waktu Observasi Wilayah:
          </Text>

          <Stack gap="sm">
            {/* Rentang Tanggal Deret Waktu Satelit */}
            <Flex gap="sm" direction={{ base: "column", sm: "row" }}>
              <Box style={{ flex: 1 }}>
                <Text size="xs" fw={500} c="brandSecondary.7" mb={4}>
                  Tanggal Awal
                </Text>
                <input
                  type="date"
                  value={localStartDate}
                  max={mounted ? (localEndDate || todayStr) : undefined}
                  suppressHydrationWarning
                  onChange={(e) => handleDateChange("start", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    fontFamily: "inherit",
                    backgroundColor: "#ffffff",
                  }}
                />
              </Box>

              <Box style={{ flex: 1 }}>
                <Text size="xs" fw={500} c="brandSecondary.7" mb={4}>
                  Tanggal Akhir
                </Text>
                <input
                  type="date"
                  value={localEndDate}
                  min={localStartDate}
                  max={mounted ? (todayStr || getLocalTodayDate()) : undefined}
                  suppressHydrationWarning
                  onChange={(e) => handleDateChange("end", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    fontFamily: "inherit",
                    backgroundColor: "#ffffff",
                  }}
                />
              </Box>
            </Flex>

            {/* Pesan Kesalahan Validasi Tanggal (jika ada) */}
            {dateError && (
              <Alert
                icon={<AlertCircle size={14} />}
                color="red"
                variant="light"
                radius="md"
                p="xs"
              >
                <Text size="xs" fw={500}>
                  {dateError}
                </Text>
              </Alert>
            )}

            {/* Tombol Eksekusi Estimasi */}
            <Button
              variant="filled"
              color="brandPrimary.6"
              size="xs"
              radius="md"
              mt={4}
              loading={isEstimating}
              onClick={handleUpdateTrend}
              leftSection={<RefreshCw size={14} />}
            >
              Terapkan Rentang Waktu
            </Button>
          </Stack>
        </Box>

        {/* 3. Tampilan Hasil Estimasi & Grafik Historis */}
        {batchResult ? (
          <Stack gap="md">
            {/* Kartu Metrik Ringkasan Observasi */}
            <EstimateBatchMetrics summary={batchResult.summary} />

            {/* Grafik Garis Tren Historis & Garis Putus-putus Proyeksi (jika tanggal akhir hari ini) */}
            <Box>
              <LineChart
                data={batchResult.chart_data}
                title={hasForecastInChart ? `Tren Harian ISPU & Proyeksi - ${regionName}` : `Tren Harian ISPU - ${regionName}`}
                subtitle={hasForecastInChart ? "Garis tegas: Observasi Historis • Garis putus-putus: Proyeksi 2 Hari" : "Garis tegas: Observasi Historis"}
                lines={chartLines}
                xAxisKey="label"
                height={260}
              />
            </Box>

            {/* Tabel Detail Observasi Harian */}
            <EstimateBatchTable
              data={batchResult.chart_data}
            />
          </Stack>
        ) : estimateError ? (
          <Alert
            icon={<AlertCircle size={16} />}
            title="Data Satelit Tidak Tersedia"
            color="orange"
            radius="md"
          >
            {estimateError}
          </Alert>
        ) : (
          <Alert
            icon={<AlertCircle size={16} />}
            title="Belum Ada Hasil"
            color="blue"
            radius="md"
          >
            Silakan klik tombol &apos;Terapkan Rentang Waktu&apos; untuk memuat data observasi.
          </Alert>
        )}
      </Stack>
    </Drawer>
  );
}

export default EstimateDetailDrawer;
