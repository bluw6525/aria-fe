import type { Metadata } from "next";
import { ManualBook } from "../_components/ManualBook";
import { chapter01 } from "../_content/chapter-01";
import { chapter02 } from "../_content/chapter-02";
import { buildChapter03 } from "../_content/chapter-03";
import { buildChapter06 } from "../_content/chapter-06";
import { penggunaTentang, penggunaAlur } from "../_content/pengguna";
import type { PageDesc } from "../_content/types";

export const metadata: Metadata = {
  title: "Buku Manual Pengguna Aria",
  description:
    "Panduan pengguna umum Aria untuk memperkirakan ISPU ozon permukaan dari data Sentinel-5P.",
};

const byId = (list: PageDesc[], id: string) =>
  list.filter((d) => d.kind === "page" && d.id === id);

const descs: PageDesc[] = [
  { kind: "cover" },
  { kind: "toc", id: "toc" },
  ...penggunaTentang,
  ...penggunaAlur,
  ...byId(chapter01, "c1-ispu"),
  ...byId(chapter01, "c1-robust"),
  ...byId(chapter02, "c2-beranda"),
  ...buildChapter03("04-estimasi-hero-pengguna"),
  ...buildChapter06("4"),
  { kind: "back" },
];

export default function ManualPenggunaPage() {
  return (
    <ManualBook
      descs={descs}
      book="Buku Manual Pengguna"
      cover={{
        kicker: "Buku Manual Pengguna",
        lines: [
          "Cek Kualitas Udara",
          <>
            dari <em>Data Satelit</em>
          </>,
        ],
        sub: "Panduan singkat bagi pengguna umum Aria untuk melihat perkiraan Indeks Standar Pencemar Udara ozon permukaan DKI Jakarta dari kadar CO dan NO2 satelit Sentinel-5P.",
        audience: "Pengguna umum · November 2026",
      }}
    />
  );
}
