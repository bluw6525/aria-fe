import type { Metadata } from "next";
import { ManualBook } from "./_components/ManualBook";
import { administratorAkses } from "./_content/administrator";
import { byId } from "./_content/assemble";
import { chapter01 } from "./_content/chapter-01";
import { chapter02 } from "./_content/chapter-02";
import { chapter04 } from "./_content/chapter-04";
import { chapter05 } from "./_content/chapter-05";
import { chapter06 } from "./_content/chapter-06";
import { estimasi } from "./_content/estimasi";
import { penggunaIntro, penggunaTeori } from "./_content/pengguna";
import type { PageDesc } from "./_content/types";

export const metadata: Metadata = {
  title: "Buku Manual Program Aria",
  description:
    "Panduan Aria untuk pengguna umum dan administrator dalam memperkirakan ISPU ozon permukaan DKI Jakarta dari data Sentinel-5P.",
};

const descs: PageDesc[] = [
  { kind: "cover" },
  { kind: "toc", id: "toc-a", part: "A" },
  ...penggunaIntro,
  ...byId(chapter01, "c1-ispu"),
  ...penggunaTeori,
  ...byId(chapter02, "c2-beranda"),
  ...estimasi,
  ...chapter06,
  {
    kind: "divider",
    id: "divider-b",
    label: "Administrator",
    cover: {
      kicker: "Administrator",
      lines: [
        "Melatih dan Menyimpan",
        <>
          <em>Model Estimasi</em>
        </>,
      ],
      sub: "Panduan khusus administrator untuk masuk ke aplikasi, melatih dan menguji model regresi robust, membandingkan metode, serta menyimpan model aktif yang dipakai peta Estimasi ISPU.",
    },
  },
  { kind: "toc", id: "toc-b", part: "B" },
  ...administratorAkses,
  ...byId(chapter01, "c1-robust"),
  ...byId(chapter02, "c2-masuk"),
  ...chapter04,
  ...chapter05,
  { kind: "back" },
];

export default function ManualPage() {
  return (
    <ManualBook
      descs={descs}
      book="Buku Manual Program"
      cover={{
        kicker: "Buku Manual Program",
        lines: [
          "Estimasi ISPU",
          <>
            dari <em>Sentinel-5P</em>
          </>,
        ],
        sub: "Panduan membaca peta ISPU lima wilayah Jakarta beserta proyeksinya, serta melatih, menguji, dan menyimpan model regresi robust yang menjadi dasar estimasi.",
      }}
    />
  );
}
