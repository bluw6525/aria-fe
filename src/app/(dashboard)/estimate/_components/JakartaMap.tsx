"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Group,
  ThemeIcon,
  Alert,
} from "@mantine/core";
import {
  MapPin,
  Calendar,
  Info,
  AlertCircle,
} from "lucide-react";
import { RegionMapItem } from "../_types";
import { useEstimateApi } from "../_hooks/use-estimate-api";
import { JakartaMapSvg } from "./JakartaMapSvg";
import { JakartaMapTooltip } from "./JakartaMapTooltip";
import { JakartaMapLegend } from "./JakartaMapLegend";
import { JakartaMapCards } from "./JakartaMapCards";

export function JakartaMap() {
  const mapOverview = useEstimateApi((s) => s.mapOverview);
  const selectedRegion = useEstimateApi((s) => s.selectedRegion);
  const isDrawerOpen = useEstimateApi((s) => s.isDrawerOpen);
  const selectRegionAndEstimate = useEstimateApi((s) => s.selectRegionAndEstimate);
  const selectedDate = useEstimateApi((s) => s.selectedDate);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Buat lookup map untuk performa O(1)
  const regionMap: Record<string, RegionMapItem> = useMemo(() => {
    const acc: Record<string, RegionMapItem> = {};
    mapOverview.forEach((item) => {
      acc[item.region] = item;
    });
    return acc;
  }, [mapOverview]);

  const activeHoveredData = hoveredRegion ? regionMap[hoveredRegion] : null;

  // Cek apakah seluruh wilayah kosong pada tanggal yang dipilih
  const allNoData =
    mapOverview.length > 0 &&
    mapOverview.every(
      (m) => m.estimated_ispu === null || m.estimated_ispu === undefined
    );

  // Ambil tanggal observasi aktual paling mutakhir dari data yang ditampilkan di peta
  const latestObservationDate = useMemo(() => {
    const dates = mapOverview
      .map((m) => m.observation_date)
      .filter((d): d is string => Boolean(d));
    if (dates.length === 0) return selectedDate;
    return [...dates].sort().reverse()[0];
  }, [mapOverview, selectedDate]);

  // Cek apakah ada wilayah yang menggunakan data fallback (mundur ke tanggal sebelumnya)
  const fallbackRegions = useMemo(() => {
    return mapOverview.filter((m) => Boolean(m.is_fallback));
  }, [mapOverview]);

  const allFallback =
    mapOverview.length > 0 &&
    fallbackRegions.length === mapOverview.length;

  const someFallback =
    fallbackRegions.length > 0 && !allFallback;

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      {/* 1. Header Info Bar Peta */}
      <Flex
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        direction={{ base: "column", sm: "row" }}
        gap="xs"
        pb="sm"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <Box>
          <Group gap={8}>
            <ThemeIcon
              color="brandPrimary.6"
              variant="filled"
              size="sm"
              radius="md"
            >
              <MapPin size={14} color="#ffffff" />
            </ThemeIcon>
            <Text size="sm" fw={700} c="brandSecondary.9">
              Peta Distribusi ISPU DKI Jakarta
            </Text>
          </Group>
          <Text size="xs" c="brandSecondary.5" mt={2}>
            Klik salah satu wilayah administrasi di peta untuk melihat grafik tren dan proyeksi 2 hari kedepan.
          </Text>
        </Box>

        <Group gap={8}>
          <Badge
            variant="default"
            size="sm"
            radius="md"
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#cbd5e1",
              color: "#334155",
              fontWeight: 600,
              textTransform: "none",
              letterSpacing: "0.2px",
              fontSize: 12,
            }}
            leftSection={<Calendar size={13} color="#64748b" />}
          >
            Tanggal Observasi Terakhir: {latestObservationDate}
          </Badge>
        </Group>
      </Flex>

      {/* Banner Peringatan jika tanggal kosong karena tutupan awan */}
      {allNoData && (
        <Alert
          icon={<AlertCircle size={16} />}
          color="blue"
          variant="light"
          radius="md"
          p="xs"
        >
          <Text size="xs" fw={500}>
            Pada tanggal <strong>{selectedDate}</strong>, citra satelit Sentinel-5P tidak memiliki data valid di atas DKI Jakarta (tutupan awan tebal / tidak ada orbit). Anda tetap dapat mengklik salah satu wilayah untuk melihat data historis dan peramalan pada Drawer.
          </Text>
        </Alert>
      )}

      {/* Banner Informasi jika SELURUH wilayah menggunakan observasi terakhir terdekat */}
      {allFallback && !allNoData && (
        <Alert
          icon={<Info size={16} />}
          color="blue"
          variant="light"
          radius="md"
          p="xs"
        >
          <Text size="xs" fw={500}>
            Seluruh wilayah tidak memiliki data satelit lengkap pada tanggal <strong>{selectedDate}</strong>. Peta menampilkan <strong>observasi valid terakhir ({latestObservationDate})</strong> untuk masing-masing wilayah administrasi.
          </Text>
        </Alert>
      )}

      {/* Banner Informasi jika SEBAGIAN wilayah saja yang menggunakan observasi terdekat */}
      {someFallback && !allNoData && (
        <Alert
          icon={<Info size={16} />}
          color="blue"
          variant="light"
          radius="md"
          p="xs"
        >
          <Text size="xs" fw={500}>
            Sebagian wilayah ({fallbackRegions.length} dari {mapOverview.length} wilayah) tidak memiliki data satelit lengkap pada tanggal <strong>{selectedDate}</strong>. Peta menampilkan <strong>observasi valid terdekat</strong> untuk wilayah administrasi tersebut.
          </Text>
        </Alert>
      )}

      {/* 2. Area Kanvas SVG Peta & Floating Tooltip */}
      <Box
        style={{
          position: "relative",
          width: "100%",
          maxHeight: 520,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          padding: "16px 8px",
          overflow: "hidden",
          transition: "background-color 300ms ease, border 300ms ease",
        }}
      >
        <JakartaMapSvg
          regionMap={regionMap}
          hoveredRegion={hoveredRegion}
          selectedRegion={selectedRegion}
          isDrawerOpen={isDrawerOpen}
          onHoverRegion={setHoveredRegion}
          onSelectRegion={selectRegionAndEstimate}
        />

        <JakartaMapTooltip data={activeHoveredData} />
      </Box>

      {/* 3. Legenda Kategori ISPU */}
      <JakartaMapLegend />

      {/* 4. Mini Cards 5 Wilayah DKI Jakarta */}
      <JakartaMapCards
        regionMap={regionMap}
        selectedRegion={selectedRegion}
        isDrawerOpen={isDrawerOpen}
        onSelectRegion={selectRegionAndEstimate}
      />
    </Box>
  );
}

export default JakartaMap;
