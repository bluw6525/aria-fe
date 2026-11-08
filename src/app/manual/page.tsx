import type { Metadata } from "next";
import { ManualBook } from "./_components/ManualBook";
import { chapter01 } from "./_content/chapter-01";
import { chapter02 } from "./_content/chapter-02";
import { chapter03 } from "./_content/chapter-03";
import { chapter04 } from "./_content/chapter-04";
import { chapter05 } from "./_content/chapter-05";
import { chapter06 } from "./_content/chapter-06";
import type { PageDesc } from "./_content/types";

export const metadata: Metadata = {
  title: "Buku Manual Program Aria",
  description:
    "Panduan pengguna Aria untuk memperkirakan ISPU ozon permukaan dari data Sentinel-5P dengan regresi robust.",
};

const descs: PageDesc[] = [
  { kind: "cover" },
  { kind: "toc", id: "toc" },
  ...chapter01,
  ...chapter02,
  ...chapter03,
  ...chapter04,
  ...chapter05,
  ...chapter06,
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
        sub: "Panduan pengguna aplikasi Aria untuk memperkirakan Indeks Standar Pencemar Udara ozon permukaan DKI Jakarta dari kadar CO dan NO2 satelit, serta melatih dan menguji model regresi robust.",
      }}
    />
  );
}
