"use client";

import React from "react";
import { useRegressionApi } from "../hooks/use-regression-api";
import { LeftPanelForm } from "./LeftPanelForm";
import { RightPanelOutput } from "./RightPanelOutput";

export function TrainTestContainer() {
  const {
    models,
    isModelsLoading,
    outlierResult,
    isDetectingOutliers,
    detectOutliers,
    trainResult,
    isTraining,
    trainModel,
    isSaving,
    saveSuccessMessage,
    saveModel,
    testResult,
    isTesting,
    testModel,
    errorMessage,
  } = useRegressionApi();

  const handleSaveModel = async (name: string) => {
    if (!trainResult) {
      alert("Harap lakukan pelatihan (Latih) terlebih dahulu sebelum menyimpan model.");
      return;
    }

    const r2Percentage =
      Math.abs(trainResult.r2) <= 1.0
        ? Number((trainResult.r2 * 100).toFixed(2))
        : Number(trainResult.r2.toFixed(2));

    await saveModel({
      name,
      estimator_type: trainResult.estimator_type,
      intercept: trainResult.intercept,
      coef_co: trainResult.coef_co,
      coef_no2: trainResult.coef_no2,
      scale: trainResult.scale,
      train_rmse: trainResult.rmse,
      train_mae: trainResult.mae,
      train_r2: r2Percentage,
      is_default: false,
    });
  };


  return (
    <div className="flex-1 min-h-screen bg-[#f3f4f6] flex flex-col px-8 lg:px-14 py-8">
      {/* 1. Header Halaman Konsisten dengan HomeHero */}
      <div className="w-full mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Latih Dan Uji Model Regresi
        </h2>
        <p className="text-xs md:text-sm text-slate-600 mt-1.5 font-normal">
          Pelatihan model Robust (MM, M, S) dan pengujian performa estimasi O3 berbasis data Sentinel-5P
        </p>
        {/* Garis Pembatas Header Solid persis seperti di Home */}
        <div className="w-full max-w-5xl mx-auto h-[1.5px] bg-slate-300 mt-4" />
      </div>

      {/* 2. Grid 2 Kolom Konsisten dengan Tema Home & Sidebar */}
      <div className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 items-start">
        {/* Kolom Kiri: Form Kontrol (5 Kolom) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-7 border border-slate-200/90 shadow-sm">
          <LeftPanelForm
            models={models}
            isModelsLoading={isModelsLoading}
            onDetectOutliers={detectOutliers}
            isDetectingOutliers={isDetectingOutliers}
            onTrain={trainModel}
            isTraining={isTraining}
            onSaveModel={handleSaveModel}
            isSaving={isSaving}
            saveSuccessMessage={saveSuccessMessage}
            onTestModel={testModel}
            isTesting={isTesting}
          />
        </div>

        {/* Kolom Kanan: Output & Visualisasi Grafik (7 Kolom) */}
        <div className="lg:col-span-7">
          <RightPanelOutput
            outlierResult={outlierResult}
            trainResult={trainResult}
            testResult={testResult}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
