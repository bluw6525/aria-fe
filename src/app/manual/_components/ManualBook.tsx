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
import type { PageDesc, PartKey } from "../_content/types";

const PART_NAME: Record<PartKey, string> = {
  A: "Pengguna Umum",
  B: "Administrator",
};

function buildToc(descs: PageDesc[], part: PartKey): TocGroup[] {
  const groups: TocGroup[] = [];
  descs.forEach((d, i) => {
    if (d.kind !== "page" || d.part !== part) return;
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
  const groups = { A: buildToc(descs, "A"), B: buildToc(descs, "B") };

  return (
    <div className={styles.root}>
      <PrintToolbar totalPages={descs.length} title={book} />
      <main className={styles.pages}>
        {descs.map((d, i) => {
          const no = i + 1;
          switch (d.kind) {
            case "cover":
              return <Cover key="cover" {...cover} />;
            case "divider":
              return <Cover key={d.id} {...d.cover} no={no} />;
            case "toc":
              return (
                <Sheet
                  key={d.id}
                  label={`Daftar Isi · ${PART_NAME[d.part]}`}
                  no={no}
                  book={`${book} · ${PART_NAME[d.part]}`}
                >
                  <PageHead
                    kicker={`Bagian ${d.part} · ${PART_NAME[d.part]}`}
                    title="Daftar Isi"
                  />
                  <Toc groups={groups[d.part]} />
                </Sheet>
              );
            case "page":
              return (
                <Sheet
                  key={d.id}
                  label={`Bab ${d.chapterNo} · ${d.chapter}`}
                  no={no}
                  book={`${book} · ${PART_NAME[d.part]}`}
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
