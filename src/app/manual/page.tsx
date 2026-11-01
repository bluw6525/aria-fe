import type { Metadata } from "next";
import "@fontsource-variable/outfit/index.css";
import "@fontsource/outfit/800.css";
import "./manual.css";
import { styles } from "./_components/styles";
import {
  Back,
  Cover,
  PageHead,
  Sheet,
  Toc,
  type TocGroup,
} from "./_components/primitives";
import { PrintToolbar } from "./_components/PrintToolbar";
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

function buildToc(): TocGroup[] {
  const groups: TocGroup[] = [];
  descs.forEach((d, i) => {
    if (d.kind !== "page") return;
    const page = i + 1;
    let g = groups.find((x) => x.number === d.chapterNo);
    if (!g) {
      g = { number: d.chapterNo, title: d.chapter, page, entries: [] };
      groups.push(g);
    }
    g.entries.push({ label: d.toc, page });
  });
  return groups;
}

export default function ManualPage() {
  const groups = buildToc();

  return (
    <div className={styles.root}>
      <PrintToolbar totalPages={descs.length} />
      <main className={styles.pages}>
        {descs.map((d, i) => {
          const no = i + 1;
          switch (d.kind) {
            case "cover":
              return <Cover key="cover" />;
            case "toc":
              return (
                <Sheet key={d.id} label="Daftar Isi" no={no}>
                  <PageHead kicker="Buku Manual Program" title="Daftar Isi" />
                  <Toc groups={groups} />
                </Sheet>
              );
            case "page":
              return (
                <Sheet key={d.id} label={`Bab ${d.chapterNo} · ${d.chapter}`} no={no}>
                  {d.body}
                </Sheet>
              );
            case "back":
              return <Back key="back" no={no} />;
          }
        })}
      </main>
    </div>
  );
}
