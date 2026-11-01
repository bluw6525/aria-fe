"use client";

import React, { useState } from "react";
import { Stack, Box, Paper, Text, Center } from "@mantine/core";
import {
  BatchSession,
  BatchSummaryRow,
  BatchIteration,
  batchService,
} from "@/lib/api/services/batch-service";
import { BatchForm } from "./BatchForm";
import { BatchSummary } from "./BatchSummary";
import { BatchIterationsTable } from "./BatchIterationsTable";
import { PromoteModelModal } from "./PromoteModelModal";
import { Layers } from "lucide-react";
import { notify } from "@/lib/notifications";
import { extractApiErrorMessage } from "@/lib/api/error";

export function BatchContainer() {
  const [currentSession, setCurrentSession] = useState<BatchSession | null>(null);
  const [summaryRows, setSummaryRows] = useState<BatchSummaryRow[]>([]);
  const [activeSeeds, setActiveSeeds] = useState<number[]>([]);
  const [bestIteration, setBestIteration] = useState<BatchIteration | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // State Modal Simpan Model (Promote)
  const [promoteIteration, setPromoteIteration] = useState<BatchIteration | null>(null);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);

  // 1. Eksekusi Batch Run Baru
  const handleRunBatch = async (params: {
    file: File;
    sessionName: string;
    nSplits: number;
    seeds: string;
    testSize: number;
    fitIntercept: boolean;
    estimatorTypes: string[];
  }) => {
    setIsRunning(true);
    try {
      const res = await batchService.runBatch(params);
      setCurrentSession(res.session);
      setSummaryRows(res.summary_rows || []);
      setActiveSeeds(res.seeds || []);
      setBestIteration(res.top_iterations?.[0] || res.session.best_iteration || null);
      notify.success("Pelatihan Massal Selesai", {
        description: `Sesi "${res.session.session_name || res.session.id}" berhasil dijalankan dan disimpan.`,
      });
    } catch (err: unknown) {
      const message = extractApiErrorMessage(err, "Gagal menjalankan pelatihan massal.");
      notify.error("Pelatihan Massal Gagal", {
        description: message,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // 2. Muat Sesi Sebelumnya dari Database
  const handleSelectExistingSession = async (sessionId: number) => {
    setIsRunning(true);
    try {
      const session = await batchService.getSessionDetail(sessionId);
      setCurrentSession(session);
      setSummaryRows(session.summary_metrics || []);
      setActiveSeeds(session.seeds || []);
      setBestIteration(session.best_iteration || null);
      notify.success("Sesi Pelatihan Massal Dimuat", {
        description: `Berhasil memuat data sesi "${session.session_name || session.id}".`,
      });
    } catch (err: unknown) {
      const message = extractApiErrorMessage(err, "Gagal memuat sesi pelatihan massal.");
      notify.error("Gagal Memuat Sesi", {
        description: message,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // 3. Handler Buka Modal Promosi Model
  const handleOpenPromoteModal = (iteration: BatchIteration) => {
    setPromoteIteration(iteration);
    setIsPromoteModalOpen(true);
  };

  const availableEstimatorTypes = summaryRows.map((r) => r.estimator);

  return (
    <Stack gap="xl" w="100%">
      {/* Bagian Atas: Form Konfigurasi / Muat Sesi */}
      <Box w="100%">
        <BatchForm
          onRunBatch={handleRunBatch}
          onSelectExistingSession={handleSelectExistingSession}
          isRunning={isRunning}
        />
      </Box>

      {/* Bagian Bawah: Hasil Ringkasan & Tabel Iterasi */}
      <Box w="100%">
        {currentSession ? (
          <Stack gap="xl">
            {/* Ringkasan Evaluasi Metrik Rata-rata */}
            <BatchSummary
              session={currentSession}
              summaryRows={summaryRows}
              seeds={activeSeeds.length > 0 ? activeSeeds : (currentSession.seeds || [])}
              bestIteration={bestIteration || currentSession.best_iteration}
              onPromoteClick={handleOpenPromoteModal}
            />

            {/* Tabel Detail Iterasi Diurutkan dari Test RMSE Terendah */}
            <BatchIterationsTable
              sessionId={currentSession.id}
              availableEstimators={availableEstimatorTypes}
              onPromoteClick={handleOpenPromoteModal}
            />
          </Stack>
        ) : (
          /* Placeholder Sebelum Run atau Pilih Sesi */
          <Paper
            p="xl"
            py={56}
            shadow="xs"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 280,
            }}
          >
            <Center
              w={64}
              h={64}
              mb="md"
              style={{
                borderRadius: 16,
                backgroundColor: "var(--mantine-color-brandPrimary-0)",
                border: "1px solid var(--mantine-color-brandPrimary-2)",
                color: "var(--mantine-color-brandPrimary-6)",
              }}
            >
              <Layers size={32} />
            </Center>
            <Box maw={420}>
              <Text size="md" fw={700} c="brandSecondary.8">
                Belum Ada Sesi Pelatihan Massal yang Aktif
              </Text>
              <Text size="xs" c="brandSecondary.5" mt={6} style={{ lineHeight: 1.6 }}>
                Silakan unggah dataset dan jalankan pengujian pelatihan massal baru pada form di atas,
                atau muat sesi pengujian sebelumnya dari basis data.
              </Text>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Modal Simpan Model ke PublicModel */}
      <PromoteModelModal
        iteration={promoteIteration}
        isOpen={isPromoteModalOpen}
        onClose={() => setIsPromoteModalOpen(false)}
        onSuccess={() => {}}
      />
    </Stack>
  );
}

