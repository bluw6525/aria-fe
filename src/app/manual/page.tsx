import type { Metadata } from "next";
import "@fontsource-variable/outfit/index.css";
import "@fontsource/outfit/800.css";
import "@fontsource-variable/stix-two-text/index.css";
import "@fontsource-variable/stix-two-text/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./manual.css";
import { styles } from "./_components/styles";
import {
  Back,
  Cover,
  Opener,
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
import { chapterA } from "./_content/chapter-a";
import type { PageDesc } from "./_content/types";

export const metadata: Metadata = {
  title: "Buku Manual Program Aria",
  description:
    "Panduan penggunaan Aria untuk estimasi ISPU dari data Sentinel-5P dengan regresi robust.",
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
  ...chapterA,
  { kind: "back" },
];

function buildPageIndex() {
  const pageOf: Record<string, number> = {};
  descs.forEach((d, i) => {
    if ("id" in d) pageOf[d.id] = i + 1;
  });
  return pageOf;
}

function buildToc(pageOf: Record<string, number>): TocGroup[] {
  const groups: TocGroup[] = [];
  for (const d of descs) {
    if (d.kind === "opener") {
      groups.push({
        number: d.number,
        title: d.title,
        page: pageOf[d.id],
        entries: [],
      });
    } else if (d.kind === "page" && d.toc && groups.length > 0) {
      groups[groups.length - 1].entries.push({
        label: d.toc,
        page: pageOf[d.id],
      });
    }
  }
  return groups;
}

export default function ManualPage() {
  const pageOf = buildPageIndex();
  const groups = buildToc(pageOf);

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
                <Sheet key={d.id} chapter="Daftar Isi" no={no}>
                  <PageHead kicker="Buku Manual Program" title="Daftar Isi" />
                  <Toc groups={groups} />
                </Sheet>
              );
            case "opener":
              return (
                <Opener
                  key={d.id}
                  no={no}
                  number={d.number}
                  title={d.title}
                  lead={d.lead}
                  items={d.items.map((it) => ({
                    label: it.label,
                    page: pageOf[it.id],
                  }))}
                />
              );
            case "page":
              return (
                <Sheet key={d.id} chapter={d.chapter} no={no}>
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
