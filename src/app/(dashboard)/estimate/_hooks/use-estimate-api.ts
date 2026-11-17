import { create } from "zustand";
import { estimateService } from "../_services";
import {
  BatchEstimateResult,
  RegionMapItem,
  MapOverviewResponse,
} from "../_types";

export function getLocalTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDefaultStartDate(daysAgo = 29): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Template awal 5 wilayah administratif DKI Jakarta sebelum data API dimuat
export const INITIAL_MAP_ITEMS: RegionMapItem[] = [
  { region: "jakarta_pusat", name: "Jakarta Pusat", estimated_ispu: null, category: "Tidak Ada Data", count: 0 },
  { region: "jakarta_selatan", name: "Jakarta Selatan", estimated_ispu: null, category: "Tidak Ada Data", count: 0 },
  { region: "jakarta_barat", name: "Jakarta Barat", estimated_ispu: null, category: "Tidak Ada Data", count: 0 },
  { region: "jakarta_timur", name: "Jakarta Timur", estimated_ispu: null, category: "Tidak Ada Data", count: 0 },
  { region: "jakarta_utara", name: "Jakarta Utara", estimated_ispu: null, category: "Tidak Ada Data", count: 0 },
];

export function getCategoryFromIspu(val?: number | null): string {
  if (val === null || val === undefined || isNaN(val)) return "Tidak Ada Data";
  if (val > 300) return "Berbahaya";
  if (val > 200) return "Sangat Tidak Sehat";
  if (val > 100) return "Tidak Sehat";
  if (val > 50) return "Sedang";
  return "Baik";
}

export interface EstimateState {
  // ── Single Date Picker (Peta Distribusi) ────────────────────────────────────
  selectedDate: string;

  // ── Date Range untuk Detail Drawer ──────────────────────────────────────────
  drawerStartDate: string;
  drawerEndDate: string;
  selectedRegion: string | null;

  // ── Map Overview State ──────────────────────────────────────────────────────
  mapOverview: RegionMapItem[];
  isMapLoading: boolean;
  isDrawerOpen: boolean;

  // ── Output State Detail Wilayah ─────────────────────────────────────────────
  isEstimating: boolean;
  batchResult: BatchEstimateResult | null;
  estimateError: string | null;

  // ── Actions ─────────────────────────────────────────────────────────────────
  setSelectedDate: (date: string) => void;
  setDrawerDateRange: (start: string, end: string) => void;
  setSelectedRegion: (regionKey: string | null) => void;
  setIsDrawerOpen: (open: boolean) => void;
  selectRegionAndEstimate: (regionKey: string) => Promise<void>;
  runSatelliteEstimate: () => Promise<void>;
}

export const useEstimateApi = create<EstimateState>((set, get) => ({
  selectedDate: getLocalTodayDate(),

  drawerStartDate: getDefaultStartDate(29),
  drawerEndDate: getLocalTodayDate(),
  selectedRegion: null,

  mapOverview: INITIAL_MAP_ITEMS,
  isMapLoading: false,
  isDrawerOpen: false,

  isEstimating: false,
  batchResult: null,
  estimateError: null,

  setSelectedDate: async (selectedDate: string) => {
    set({ selectedDate, isMapLoading: true });
    const end = new Date(selectedDate);
    const start = new Date(end);
    start.setDate(start.getDate() - 29);
    const startStr = start.toISOString().split("T")[0];

    try {
      const data = await estimateService.getMapOverview(selectedDate, selectedDate);
      const items = data.regions || [];
      if (items.length > 0) {
        const updatedMap: RegionMapItem[] = items.map((item: any) => {
          const hasIspu = item.estimated_ispu !== null && item.estimated_ispu !== undefined;
          const ispuVal = hasIspu ? Number(item.estimated_ispu) : null;
          const cat = hasIspu
            ? (item.ispu_category || getCategoryFromIspu(ispuVal))
            : "Tidak Ada Data";

          return {
            region: item.region,
            name: item.region_name || item.name,
            estimated_ispu: ispuVal,
            category: cat,
            count: hasIspu ? 1 : 0,
            observation_date: item.observation_date,
            is_fallback: Boolean(item.is_fallback),
          };
        });
        set({
          selectedDate,
          drawerStartDate: startStr,
          drawerEndDate: selectedDate,
          mapOverview: updatedMap,
          isMapLoading: false,
        });
        return;
      }
    } catch (err) {
      console.error("Gagal memuat overview peta dari backend:", err);
    }

    // Jika API gagal atau tidak ada respons, set ke template netral (tanpa data palsu)
    set({
      selectedDate,
      drawerStartDate: startStr,
      drawerEndDate: selectedDate,
      mapOverview: INITIAL_MAP_ITEMS,
      isMapLoading: false,
    });
  },

  setDrawerDateRange: (drawerStartDate: string, drawerEndDate: string) => {
    set({ drawerStartDate, drawerEndDate });
  },

  setSelectedRegion: (selectedRegion) => {
    set({ selectedRegion });
  },

  setIsDrawerOpen: (isDrawerOpen) => {
    if (!isDrawerOpen) {
      set({ isDrawerOpen: false, selectedRegion: null });
    } else {
      set({ isDrawerOpen: true });
    }
  },

  selectRegionAndEstimate: async (regionKey: string) => {
    set({ selectedRegion: regionKey, isDrawerOpen: true, isEstimating: true, estimateError: null });
    const { drawerStartDate, drawerEndDate } = get();

    try {
      const data = await estimateService.estimateFromSatellite({
        region: regionKey,
        start_date: drawerStartDate,
        end_date: drawerEndDate,
      });
      if (data) {
        set({ batchResult: data, isEstimating: false, estimateError: null });
        return;
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail || err?.message || "Gagal memuat data estimasi satelit.";
      console.error("Gagal memuat estimasi satelit dari backend:", err);
      set({ batchResult: null, isEstimating: false, estimateError: detail });
    }
  },

  runSatelliteEstimate: async () => {
    const { selectedRegion, drawerStartDate, drawerEndDate } = get();
    if (!selectedRegion) return;

    set({ isEstimating: true, estimateError: null });
    try {
      const data = await estimateService.estimateFromSatellite({
        region: selectedRegion,
        start_date: drawerStartDate,
        end_date: drawerEndDate,
      });
      if (data) {
        set({ batchResult: data, isEstimating: false, estimateError: null });
        return;
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail || err?.message || "Gagal memuat data estimasi satelit.";
      console.error("Gagal memuat estimasi satelit dari backend:", err);
      set({ batchResult: null, isEstimating: false, estimateError: detail });
    }
  },
}));

export default useEstimateApi;
