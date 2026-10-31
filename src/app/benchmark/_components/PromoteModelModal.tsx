"use client";

import React, { useState } from "react";
import { MCCVIteration, benchmarkService } from "@/lib/api/services/benchmark-service";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

interface PromoteModelModalProps {
  iteration: MCCVIteration | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function PromoteModelForm({
  iteration,
  onClose,
  onSuccess,
}: {
  iteration: MCCVIteration;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const defaultName = `${iteration.estimator_type} - Seed ${iteration.random_state ?? "N/A"} (R² ${(iteration.test_r2 * 100).toFixed(1)}%)`;
  const [modelName, setModelName] = useState(defaultName);
  const isDefault = false;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName.trim()) {
      toast.warning("Nama Model Kosong", {
        description: "Harap masukkan nama model sebelum menyimpan ke database.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await benchmarkService.promoteModel({
        iteration_id: iteration.id,
        model_name: modelName.trim(),
        is_default: isDefault,
      });
      toast.success("Model Berhasil Disimpan", {
        description: `Model "${modelName.trim()}" berhasil tersimpan ke sistem.`,
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (err as any).response?.data?.detail || "Gagal menyimpan model."
          : "Gagal menyimpan model.";
      toast.error("Penyimpanan Model Gagal", {
        description: String(message),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header Modal */}
        <div className="px-6 py-4 bg-sky-600 text-white flex items-center justify-between">
          <h3 className="text-base font-bold">Simpan Model Produksi</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form: Hanya Input Nama Model */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <Input
            id="modelName"
            label="Nama Model di Database"
            placeholder="Ketik nama model..."
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            disabled={isSubmitting}
            autoFocus
          />

          {/* Tombol Aksi */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText="Menyimpan..."
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Simpan ke Database
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PromoteModelModal({
  iteration,
  isOpen,
  onClose,
  onSuccess,
}: PromoteModelModalProps) {
  if (!isOpen || !iteration) return null;

  return (
    <PromoteModelForm
      key={iteration.id}
      iteration={iteration}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}
