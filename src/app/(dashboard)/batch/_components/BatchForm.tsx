"use client";

import React, { useState } from "react";
import {
  Paper,
  Stack,
  Flex,
  Box,
  Text,
  SegmentedControl,
  SimpleGrid,
  Checkbox,
  Textarea,
  Select,
  NumberInput,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { BatchSession, batchService } from "@/lib/api/services/batch-service";
import { FileUploader } from "@/components/FileUploader";
import { Input } from "@/components/Input";
import {
  History,
  Layers,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { notify } from "@/lib/notifications";

const AVAILABLE_ALGORITHMS = [
  { id: "OLS", label: "OLS (Least Squares)", desc: "Metode kuadrat terkecil standar" },
  { id: "M", label: "M-Estimator", desc: "Robust terhadap outlier vertikal (y)" },
  { id: "S", label: "S-Estimator", desc: "Breakdown point tinggi 50%" },
  { id: "MM", label: "MM-Estimator", desc: "Breakdown point 50% & resisten leverage" },
];

interface BatchFormProps {
  onRunBatch: (formData: {
    file: File;
    sessionName: string;
    nSplits: number;
    seeds: string;
    testSize: number;
    fitIntercept: boolean;
    estimatorTypes: string[];
  }) => Promise<void>;
  onSelectExistingSession: (sessionId: number) => Promise<void>;
  isRunning: boolean;
}

export function BatchForm({
  onRunBatch,
  onSelectExistingSession,
  isRunning,
}: BatchFormProps) {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");

  // State Riwayat Sesi
  const [sessions, setSessions] = useState<BatchSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | "">("");
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);

  // Form State untuk Run Baru
  const [file, setFile] = useState<File | null>(null);
  const [sessionName, setSessionName] = useState("");
  const [nSplits, setNSplits] = useState<number | string>(200);
  const [seedsInput, setSeedsInput] = useState("");
  const [testSize, setTestSize] = useState<string>("0.2");
  const fitIntercept = true;
  const [selectedEstimators, setSelectedEstimators] = useState<string[]>([
    "OLS",
    "M",
    "S",
    "MM",
  ]);

  const loadSessions = async () => {
    setIsLoadingSessions(true);
    try {
      const data = await batchService.getSessions(1, 100);
      setSessions(data);
    } catch {
      notify.error("Gagal Memuat Riwayat", {
        description: "Tidak dapat mengambil daftar riwayat sesi pelatihan massal.",
      });
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const handleToggleEstimator = (id: string) => {
    if (selectedEstimators.includes(id)) {
      setSelectedEstimators(selectedEstimators.filter((e) => e !== id));
    } else {
      setSelectedEstimators([...selectedEstimators, id]);
    }
  };

  const handleSelectAllEstimators = () => {
    if (selectedEstimators.length === AVAILABLE_ALGORITHMS.length) {
      setSelectedEstimators([]);
    } else {
      setSelectedEstimators(AVAILABLE_ALGORITHMS.map((a) => a.id));
    }
  };

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      notify.warning("Berkas Diperlukan", {
        description: "Silakan pilih berkas dataset terlebih dahulu (.xlsx, .csv, atau .xls).",
      });
      return;
    }
    if (selectedEstimators.length === 0) {
      notify.warning("Algoritma Belum Dipilih", {
        description: "Pilih minimal satu algoritma regresi untuk dijalankan.",
      });
      return;
    }
    const parsedNSplits = typeof nSplits === "number" ? nSplits : parseInt(String(nSplits), 10);
    if (!parsedNSplits || isNaN(parsedNSplits) || parsedNSplits < 1 || !Number.isInteger(parsedNSplits)) {
      notify.warning("Input Tidak Valid", {
        description: "Jumlah iterasi harus berupa bilangan bulat positif (antara 1 hingga 1000).",
      });
      return;
    }

    await onRunBatch({
      file,
      sessionName: sessionName.trim(),
      nSplits: parsedNSplits,
      seeds: seedsInput.trim(),
      testSize: Number(testSize),
      fitIntercept,
      estimatorTypes: selectedEstimators,
    });
  };

  const handleLoadSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionId) {
      notify.warning("Sesi Belum Dipilih", {
        description: "Pilih sesi pelatihan massal terlebih dahulu dari daftar riwayat.",
      });
      return;
    }
    await onSelectExistingSession(Number(selectedSessionId));
  };

  return (
    <Paper shadow="xs" p="xl">
      <Stack gap="xl">
        {/* Tab Switcher */}
        <SegmentedControl
          value={activeTab}
          onChange={(val) => {
            const tab = val as "new" | "history";
            setActiveTab(tab);
            if (tab === "history") {
              loadSessions();
            }
          }}
          data={[
            {
              value: "new",
              label: (
                <Flex align="center" justify="center" gap={6} py={4}>
                  <Sparkles size={14} />
                  <span>Jalankan Pelatihan Massal Baru</span>
                </Flex>
              ),
            },
            {
              value: "history",
              label: (
                <Flex align="center" justify="center" gap={6} py={4}>
                  <History size={14} />
                  <span>Muat Sesi Lalu</span>
                </Flex>
              ),
            },
          ]}
          color="brandPrimary"
          radius="lg"
          fullWidth
        />

        {/* Konten Tab 1: Jalankan Batch Baru */}
        {activeTab === "new" && (
          <form onSubmit={handleSubmitNew}>
            <Stack gap="lg">
              {/* 1. Unggah File Dataset */}
              <FileUploader
                label="Unggah Berkas Dataset Latih & Uji"
                placeholder="Pilih berkas dataset (.xlsx, .csv, .xls)"
                hint="Minimal 20 baris data valid. Hanya variabel CO satelit, NO2 satelit, dan O3 SPKU yang diproses. Data missing O3 diinterpolasi Natural Cubic Spline."
                file={file}
                onFileSelect={setFile}
                onFileRemove={() => setFile(null)}
                disabled={isRunning}
              />

              {/* 2. Nama Sesi (Opsional) */}
              <Input
                id="sessionName"
                label="Nama Sesi Pelatihan Massal (Opsional)"
                placeholder="Contoh: Evaluasi 4 Model - Lahan Gambut"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                disabled={isRunning}
              />

              {/* 3. Pilihan Algoritma Regresi */}
              <Stack gap={6}>
                <Flex justify="space-between" align="center">
                  <Text size="xs" fw={700} c="brandSecondary.9">
                    Pilih Algoritma Model ({selectedEstimators.length}/{AVAILABLE_ALGORITHMS.length})
                  </Text>
                  <Button
                    variant="subtle"
                    size="compact-xs"
                    color="brandPrimary"
                    onClick={handleSelectAllEstimators}
                  >
                    {selectedEstimators.length === AVAILABLE_ALGORITHMS.length
                      ? "Batal Semua"
                      : "Pilih Semua"}
                  </Button>
                </Flex>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xs">
                  {AVAILABLE_ALGORITHMS.map((algo) => {
                    const isChecked = selectedEstimators.includes(algo.id);
                    return (
                      <Paper
                        key={algo.id}
                        p="xs"
                        radius="md"
                        withBorder
                        onClick={() => handleToggleEstimator(algo.id)}
                        style={{
                          backgroundColor: isChecked ? "#f0f9ff" : "#ffffff",
                          borderColor: isChecked
                            ? "var(--mantine-color-brandPrimary-6)"
                            : "var(--mantine-color-brandSecondary-2)",
                          cursor: "pointer",
                          userSelect: "none",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <Flex align="flex-start" gap="xs">
                          <Checkbox
                            checked={isChecked}
                            onChange={() => {}}
                            color="brandPrimary"
                            size="xs"
                            mt={2}
                          />
                          <Box>
                            <Text size="xs" fw={600} c="brandSecondary.9">
                              {algo.label}
                            </Text>
                            <Text size="xs" c="brandSecondary.5" style={{ fontSize: 10 }}>
                              {algo.desc}
                            </Text>
                          </Box>
                        </Flex>
                      </Paper>
                    );
                  })}
                </SimpleGrid>
              </Stack>

              {/* 4. Konfigurasi Iterasi & Split Latih:Uji */}
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <NumberInput
                  id="nSplits"
                  label={<Text size="xs" fw={700} c="brandSecondary.9">Jumlah Iterasi</Text>}
                  min={1}
                  max={1000}
                  step={1}
                  allowNegative={false}
                  allowDecimal={false}
                  clampBehavior="strict"
                  value={nSplits}
                  onChange={(val) => setNSplits(val)}
                  disabled={isRunning}
                  radius="md"
                />

                <Select
                  label={<Text size="xs" fw={700} c="brandSecondary.9">Rasio Data Latih & Uji</Text>}
                  value={testSize}
                  onChange={(val) => setTestSize(val || "0.2")}
                  disabled={isRunning}
                  data={[
                    { value: "0.2", label: "80:20 (80% Latih : 20% Uji)" },
                    { value: "0.3", label: "70:30 (70% Latih : 30% Uji)" },
                    { value: "0.4", label: "60:40 (60% Latih : 40% Uji)" },
                  ]}
                  radius="md"
                />
              </SimpleGrid>

              {/* 5. Input Seed Kustom (Opsional) */}
              <Stack gap={4}>
                <Flex justify="space-between" align="center">
                  <Text size="xs" fw={700} c="brandSecondary.9">
                    Seed Acak Kustom (Opsional)
                  </Text>
                  <Text size="xs" c="brandSecondary.4" style={{ fontSize: 10 }}>
                    Pisahkan koma / spasi
                  </Text>
                </Flex>
                <Textarea
                  id="seedsInput"
                  rows={2}
                  value={seedsInput}
                  onChange={(e) => setSeedsInput(e.target.value)}
                  disabled={isRunning}
                  placeholder="Contoh: 42, 100, 2024. Jika kurang akan digenerate otomatis, jika lebih akan dipotong sesuai jumlah iterasi."
                  radius="md"
                  style={{ fontFamily: "monospace", fontSize: 11 }}
                />
              </Stack>

              {/* Submit Button */}
              <Button
                type="submit"
                color="brandPrimary"
                size="md"
                radius="md"
                fullWidth
                loading={isRunning}
                leftSection={<Layers size={16} />}
                disabled={!file || selectedEstimators.length === 0}
              >
                Mulai Pelatihan Massal
              </Button>
            </Stack>
          </form>
        )}

        {/* Konten Tab 2: Muat Sesi Sebelumnya dari Database */}
        {activeTab === "history" && (
          <form onSubmit={handleLoadSessionSubmit}>
            <Stack gap="lg">
              <Flex justify="space-between" align="center">
                <Text size="xs" fw={700} c="brandSecondary.9">
                  Pilih Sesi Pelatihan Massal Sebelumnya
                </Text>
                <Tooltip label="Refresh Riwayat">
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={loadSessions}
                    size="sm"
                  >
                    <RotateCcw size={14} />
                  </ActionIcon>
                </Tooltip>
              </Flex>

              {isLoadingSessions ? (
                <Box p="xl" style={{ textAlign: "center", color: "var(--mantine-color-brandSecondary-4)", fontSize: 12 }}>
                  Memuat daftar sesi...
                </Box>
              ) : sessions.length === 0 ? (
                <Paper
                  p="lg"
                  radius="lg"
                  withBorder
                  style={{
                    textAlign: "center",
                    backgroundColor: "var(--mantine-color-brandSecondary-0)",
                    borderColor: "var(--mantine-color-brandSecondary-2)",
                    borderStyle: "dashed",
                  }}
                >
                  <Text size="xs" c="brandSecondary.5">
                    Belum ada riwayat sesi pelatihan massal di basis data. Silakan jalankan pengujian baru terlebih dahulu.
                  </Text>
                </Paper>
              ) : (
                <Stack gap="xs" style={{ maxHeight: 360, overflowY: "auto" }}>
                  {sessions.map((sess) => {
                    const isSelected = selectedSessionId === sess.id;
                    return (
                      <Paper
                        key={sess.id}
                        p="sm"
                        radius="md"
                        withBorder
                        onClick={() => setSelectedSessionId(sess.id)}
                        style={{
                          backgroundColor: isSelected ? "#f0f9ff" : "#ffffff",
                          borderColor: isSelected
                            ? "var(--mantine-color-brandPrimary-6)"
                            : "var(--mantine-color-brandSecondary-2)",
                          cursor: "pointer",
                          userSelect: "none",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <Flex justify="space-between" align="flex-start" gap="sm">
                          <Text size="xs" fw={700} c={isSelected ? "brandPrimary.7" : "brandSecondary.9"}>
                            {sess.session_name || `Sesi #${sess.id}`}
                          </Text>
                          <Text size="xs" c="brandSecondary.4" style={{ fontSize: 10, fontFamily: "monospace" }}>
                            {sess.created_at ? new Date(sess.created_at).toLocaleDateString("id-ID") : ""}
                          </Text>
                        </Flex>
                        <Flex align="center" gap="xs" mt={4} style={{ fontSize: 11, color: "var(--mantine-color-brandSecondary-5)" }}>
                          <span>File: {sess.dataset_name}</span>
                          <span>•</span>
                          <span>{sess.total_seeds} Seeds</span>
                          <span>•</span>
                          <span>Test {(sess.test_size * 100).toFixed(0)}%</span>
                        </Flex>
                      </Paper>
                    );
                  })}
                </Stack>
              )}

              <Button
                type="submit"
                color="brandPrimary"
                size="md"
                radius="md"
                fullWidth
                loading={isRunning}
                disabled={!selectedSessionId || isLoadingSessions}
                leftSection={<History size={16} />}
              >
                Tampilkan Data Sesi Terpilih
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Paper>
  );
}

