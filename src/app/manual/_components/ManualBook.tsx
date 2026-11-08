import "@fontsource-variable/outfit/index.css";
import "@fontsource/outfit/800.css";
import "../manual.css";
import { styles } from "./styles";
import {
  Back,
  Cover,
  PageHead,
  Sheet,
  Toc,
  type CoverProps,
  type TocGroup,
} from "./primitives";
import { PrintToolbar } from "./PrintToolbar";
import type { PageDesc } from "../_content/types";

function buildToc(descs: PageDesc[]): TocGroup[] {
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

export function ManualBook({
  descs,
  book,
  cover,
}: {
  descs: PageDesc[];
  book: string;
  cover: CoverProps;
}) {
  const groups = buildToc(descs);

  return (
    <div className={styles.root}>
      <PrintToolbar totalPages={descs.length} title={book} />
      <main className={styles.pages}>
        {descs.map((d, i) => {
          const no = i + 1;
          switch (d.kind) {
            case "cover":
              return <Cover key="cover" {...cover} />;
            case "toc":
              return (
                <Sheet key={d.id} label="Daftar Isi" no={no} book={book}>
                  <PageHead kicker={book} title="Daftar Isi" />
                  <Toc groups={groups} />
                </Sheet>
              );
            case "page":
              return (
                <Sheet
                  key={d.id}
                  label={`Bab ${d.chapterNo} · ${d.chapter}`}
                  no={no}
                  book={book}
                >
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
