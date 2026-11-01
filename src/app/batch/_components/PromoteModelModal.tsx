"use client";

import React, { useState } from "react";
import { Modal, TextInput, Group, Button, Stack, Text } from "@mantine/core";
import { BatchIteration, batchService } from "@/lib/api/services/batch-service";
import { CheckCircle2 } from "lucide-react";
import { notify } from "@/lib/notifications";
import { extractApiErrorMessage } from "@/lib/api/error";

interface PromoteModelModalProps {
  iteration: BatchIteration | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function PromoteModelForm({
  iteration,
  onClose,
  onSuccess,
}: {
  iteration: BatchIteration;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const rmseStr = iteration.test_rmse != null ? iteration.test_rmse.toFixed(2) : "-";
  const defaultName = `${iteration.estimator_type} - Seed ${iteration.random_state ?? "N/A"} (RMSE ${rmseStr})`;
  const [modelName, setModelName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName.trim()) {
      notify.warning("Nama Model Kosong", {
        description: "Harap masukkan nama model sebelum menyimpan ke database.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await batchService.promoteModel({
        iteration_id: iteration.id,
        model_name: modelName.trim(),
      });
      notify.success("Model Berhasil Disimpan", {
        description: `Model "${modelName.trim()}" berhasil tersimpan ke sistem.`,
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message = extractApiErrorMessage(err, "Gagal menyimpan model.");
      notify.error("Penyimpanan Model Gagal", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <Text size="xs" c="brandSecondary.5">
          Model ini akan disimpan ke daftar model yang ditunjukan ke publik. Sehingga dapat digunakan pada modul Estimasi ISPU.
        </Text>

        <TextInput
          id="modelName"
          label="Nama Model di Database"
          placeholder="Ketik nama model..."
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          disabled={isSubmitting}
          autoFocus
          radius="md"
        />

        <Group justify="flex-end" gap="sm" pt="xs">
          <Button
            type="button"
            variant="default"
            radius="md"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            type="submit"
            color="brandPrimary"
            radius="md"
            loading={isSubmitting}
            leftSection={<CheckCircle2 size={16} />}
          >
            Simpan ke Database
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export function PromoteModelModal({
  iteration,
  isOpen,
  onClose,
  onSuccess,
}: PromoteModelModalProps) {
  if (!iteration) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text fw={700} size="sm" c="brandSecondary.9">
          Simpan Model Produksi
        </Text>
      }
      centered
      radius="lg"
      padding="l"
    >
      <PromoteModelForm
        key={iteration.id}
        iteration={iteration}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}

