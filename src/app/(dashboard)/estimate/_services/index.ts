import httpClient from "@/lib/api/http/client";
import {
  BatchEstimateResult,
  MapOverviewResponse,
  SatelliteEstimatePayload,
} from "../_types";

export const estimateService = {
  /**
   * Mengambil estimasi nilai rata-rata ISPU 5 wilayah DKI Jakarta untuk visualisasi Peta Choropleth.
   */
  getMapOverview: async (
    startDate: string,
    endDate: string
  ): Promise<MapOverviewResponse> => {
    const params = {
      start_date: startDate,
      end_date: endDate,
    };
    const response = await httpClient.get<MapOverviewResponse>(
      "/regression/estimates/map-overview",
      { params }
    );
    return response.data;
  },

  /**
   * Melakukan estimasi satelit Sentinel-5P L3 untuk wilayah administrasi dan rentang tanggal tertentu.
   */
  estimateFromSatellite: async (
    payload: SatelliteEstimatePayload
  ): Promise<BatchEstimateResult> => {
    const response = await httpClient.post<BatchEstimateResult>(
      "/regression/estimates/satellite",
      payload
    );
    return response.data;
  },
};

export default estimateService;
