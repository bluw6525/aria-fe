"use client";

import { styles } from "./styles";

export function PrintToolbar({
  totalPages,
  title = "Buku Manual Program",
}: {
  totalPages: number;
  title?: string;
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarBrand}>
        aria.
        <span className={styles.toolbarHint}>
          {title} &middot; {totalPages} halaman A4 lanskap
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span className={styles.toolbarHint}>
          Pada dialog cetak pilih Simpan sebagai PDF dan aktifkan grafik latar
          belakang.
        </span>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => window.print()}
        >
          Unduh PDF
        </button>
      </div>
    </div>
  );
}
