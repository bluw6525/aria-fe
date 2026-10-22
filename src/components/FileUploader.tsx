"use client";

import React, { useRef } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";

export interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  label?: string;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUploader({
  file,
  onFileSelect,
  onFileRemove,
  label,
  accept = ".xlsx,.xls,.csv",
  placeholder = "Pilih file (.xlsx, .csv, .xls)",
  disabled = false,
  className = "",
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-slate-800">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />

      {file ? (
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-sky-300 bg-sky-50 text-slate-800 transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileSpreadsheet className="w-4 h-4 text-sky-600 shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-bold truncate text-sky-950">
                {file.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium shrink-0">
                ({formatFileSize(file.size)})
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onFileRemove}
            disabled={disabled}
            className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Hapus berkas"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="group w-full h-11 px-4 border border-dashed border-slate-300 hover:border-sky-500 rounded-xl bg-slate-50 hover:bg-sky-50/50 flex items-center justify-between text-xs font-medium text-slate-600 transition-all cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <FileSpreadsheet className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
            <span className="truncate">{placeholder}</span>
          </div>
          <Upload className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
        </button>
      )}
    </div>
  );
}

export default FileUploader;
