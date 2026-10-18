"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import axios from "axios";
import { regressionService } from "../services";
import {
  TrainedModel,
  OutlierDetectionResponse,
  TrainModelResult,
  TestModelResult,
  SaveModelPayload,
} from "../types";

export function useRegressionApi() {
  // ── 1. Fetch Daftar Model Tersimpan (SWR) ──────────────────────────────────
  const {
    data: models,
    error: modelsError,
    isLoading: isModelsLoading,
    mutate: mutateModels,
  } = useSWR<TrainedModel[]>("/regression/models", regressionService.getModels, {
    revalidateOnFocus: false,
  });

  // ── 2. Local State Hasil & Status Proses ────────────────────────────────────
  const [outlierResult, setOutlierResult] = useState<OutlierDetectionResponse | null>(null);
  const [isDetectingOutliers, setIsDetectingOutliers] = useState<boolean>(false);

  const [trainResult, setTrainResult] = useState<TrainModelResult | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const [testResult, setTestResult] = useState<TestModelResult | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback(() => setErrorMessage(null), []);

  const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
      return (
        err.response?.data?.detail ||
        err.message ||
        fallback
      );
    }
    if (err instanceof Error) {
      return err.message;
    }
    return fallback;
  };

  // ── 3. Action: Deteksi Outlier ─────────────────────────────────────────────
  const detectOutliers = useCallback(
    async (file: File, fitIntercept: boolean = true) => {
      setIsDetectingOutliers(true);
      setErrorMessage(null);
      try {
        const res = await regressionService.detectOutliers(file, fitIntercept);
        setOutlierResult(res);
        return res;
      } catch (err: unknown) {
        setErrorMessage(extractErrorMessage(err, "Gagal menjalankan deteksi outlier"));
        throw err;
      } finally {
        setIsDetectingOutliers(false);
      }
    },
    []
  );

  // ── 4. Action: Latih Model ────────────────────────────────────────────────
  const trainModel = useCallback(
    async (file: File, estimatorType: string = "MM", fitIntercept: boolean = true) => {
      setIsTraining(true);
      setErrorMessage(null);
      setSaveSuccessMessage(null);
      try {
        const res = await regressionService.trainModel(file, estimatorType, fitIntercept);
        setTrainResult(res);
        return res;
      } catch (err: unknown) {
        setErrorMessage(extractErrorMessage(err, "Gagal melakukan pelatihan model"));
        throw err;
      } finally {
        setIsTraining(false);
      }
    },
    []
  );

  // ── 5. Action: Simpan Model ───────────────────────────────────────────────
  const saveModel = useCallback(
    async (payload: SaveModelPayload) => {
      setIsSaving(true);
      setErrorMessage(null);
      setSaveSuccessMessage(null);
      try {
        const saved = await regressionService.saveModel(payload);
        setSaveSuccessMessage(`Model "${saved.name}" berhasil disimpan ke sistem!`);
        // Refresh daftar model untuk dropdown
        await mutateModels();
        return saved;
      } catch (err: unknown) {
        setErrorMessage(extractErrorMessage(err, "Gagal menyimpan model ke basis data"));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [mutateModels]
  );

  // ── 6. Action: Uji Model ──────────────────────────────────────────────────
  const testModel = useCallback(
    async (modelId: number, file: File) => {
      setIsTesting(true);
      setErrorMessage(null);
      try {
        const res = await regressionService.testModel(modelId, file);
        setTestResult(res);
        return res;
      } catch (err: unknown) {
        setErrorMessage(extractErrorMessage(err, "Gagal melakukan pengujian model"));
        throw err;
      } finally {
        setIsTesting(false);
      }
    },
    []
  );

  return {
    // Models
    models: models || [],
    isModelsLoading,
    modelsError,
    refreshModels: mutateModels,

    // Outlier
    outlierResult,
    isDetectingOutliers,
    detectOutliers,

    // Training
    trainResult,
    isTraining,
    trainModel,

    // Saving
    isSaving,
    saveSuccessMessage,
    saveModel,

    // Testing
    testResult,
    isTesting,
    testModel,

    // Global Error
    errorMessage,
    clearError,
  };
}
