/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { styles } from "./styles";
import shots from "../_content/shots.json";

const SHOTS = shots as unknown as Record<string, [number, number]>;

export type ShotName = keyof typeof shots;

type Kids = { children?: ReactNode };

/* ---------------------------------------------------------------- */
/* Lembar                                                            */
/* ---------------------------------------------------------------- */

export function Sheet({
  label,
  no,
  book = "Buku Manual Program",
  children,
}: Kids & { label: string; no: number; book?: string }) {
  return (
    <section className={styles.sheet} data-sheet={no}>
      <header className={styles.sheetHeader}>
        <span>
          <b>Aria</b> &nbsp;/&nbsp; {book}
        </span>
        <span>{label}</span>
      </header>
      <div className={styles.sheetBody} data-body>
        {children}
      </div>
      <footer className={styles.sheetFooter}>
        <span className={styles.footBrand}>
          aria<i>.</i>
        </span>
        <span className={styles.pageNo}>{no}</span>
      </footer>
    </section>
  );
}

export function Circles({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.circles, className)} aria-hidden>
      <span className={clsx(styles.circle, styles.circleA)} />
      <span className={clsx(styles.circle, styles.circleB)} />
      <span className={clsx(styles.circle, styles.circleC)} />
    </div>
  );
}

export type CoverProps = {
  kicker: string;
  lines: [ReactNode, ReactNode];
  sub: string;
};

export function Cover({
  kicker,
  lines,
  sub,
  no = 1,
}: CoverProps & { no?: number }) {
  return (
    <section className={clsx(styles.sheet, styles.cover)} data-sheet={no}>
      <div className={styles.coverGlow} />
      <div className={styles.coverBand} />
      <Circles className={styles.coverCircles} />
      <div className={styles.brandChip}>
        <span className={styles.brandDot}>A</span>
        aria.
      </div>
      <div className={styles.coverTitle}>
        <p className={styles.coverKicker}>{kicker}</p>
        <h1 className={styles.coverH1}>
          {lines[0]}
          <br />
          {lines[1]}
        </h1>
        <p className={styles.coverSub}>{sub}</p>
      </div>
      <div className={styles.coverStrip}>
        <div>
          <span>Penyusun</span>
          <b>Christopher Wijaya &middot; NIM 535230158</b>
        </div>
        <div>
          <span>Institusi</span>
          <b>Universitas Tarumanagara</b>
        </div>
        <div>
          <span>Dosen Pembimbing</span>
          <b>Utama: Prof. Dr. Ir. Dyah Erny Herwindiati, M.Si</b>
          <b>Pendamping: Lely Hiryanto, S.T., M.Sc., Ph.D.</b>
        </div>
      </div>
    </section>
  );
}

export function Back({ no }: { no: number }) {
  return (
    <section className={clsx(styles.sheet, styles.back)} data-sheet={no}>
      <div className={styles.coverGlow} />
      <Circles className={styles.backCircles} />
      <div className={styles.backInner}>
        <div className={styles.brandChip} style={{ position: "static" }}>
          <span className={styles.brandDot}>A</span>
          aria.
        </div>
        <h2>Pemantauan udara dari orbit</h2>
        <p>
          Aria menghubungkan data Sentinel-5P dengan kategori ISPU Kementerian
          Lingkungan Hidup dan Kehutanan.
        </p>
      </div>
      <div className={styles.backBand} />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Teks                                                              */
/* ---------------------------------------------------------------- */

export function PageHead({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className={styles.pageHead}>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

export function H3({ children }: Kids) {
  return <h3 className={styles.h3}>{children}</h3>;
}

export function P({ children, muted }: Kids & { muted?: boolean }) {
  return <p className={clsx(styles.p, muted && styles.muted)}>{children}</p>;
}

/** Nama elemen pada layar, ditulis tebal dengan warna tema. */
export function Ui({ children }: Kids) {
  return <b className={styles.ui}>{children}</b>;
}

export function Steps({ children }: Kids) {
  return <ol className={styles.steps}>{children}</ol>;
}

export function Bullets({ children }: Kids) {
  return <ul className={styles.bullets}>{children}</ul>;
}

export function Callout({
  label,
  kind = "tip",
  children,
}: Kids & { label: string; kind?: "tip" | "note" | "warn" }) {
  return (
    <div
      className={clsx(
        styles.callout,
        kind === "tip" && styles.calloutTip,
        kind === "note" && styles.calloutNote,
        kind === "warn" && styles.calloutWarn,
      )}
    >
      <span className={styles.calloutLabel}>{label}</span>
      <div>{children}</div>
    </div>
  );
}

export function Table({
  head,
  rows,
  widths,
  compact,
}: {
  head: string[];
  rows: ReactNode[][];
  widths?: string[];
  compact?: boolean;
}) {
  return (
    <table className={clsx(styles.table, compact && styles.tableCompact)}>
      {widths ? (
        <colgroup>
          {widths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
      ) : null}
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type IspuTone = "baik" | "sedang" | "tidak" | "sangat" | "bahaya";

/** Lencana kategori ISPU dengan warna yang sama seperti pada aplikasi. */
export function Chip({ tone, children }: Kids & { tone: IspuTone }) {
  return (
    <span
      className={clsx(
        styles.chip,
        tone === "baik" && styles.chipBaik,
        tone === "sedang" && styles.chipSedang,
        tone === "tidak" && styles.chipTidak,
        tone === "sangat" && styles.chipSangat,
        tone === "bahaya" && styles.chipBahaya,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Tata letak                                                        */
/* ---------------------------------------------------------------- */

export function Cols({
  template,
  gap,
  children,
  style,
}: Kids & { template: string; gap?: string; style?: CSSProperties }) {
  return (
    <div
      className={styles.cols}
      style={{ gridTemplateColumns: template, columnGap: gap, ...style }}
    >
      {children}
    </div>
  );
}

export function Col({ children, style }: Kids & { style?: CSSProperties }) {
  return (
    <div className={styles.col} style={style}>
      {children}
    </div>
  );
}

/** Kartu langkah bernomor seperti pada halaman alur kerja manual acuan. */
export function Cards({
  cols,
  children,
}: Kids & { cols: number }) {
  return (
    <div className={styles.cards} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {children}
    </div>
  );
}

export function Card({
  n,
  title,
  children,
}: Kids & { n: string; title: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardNo}>{n}</span>
      <h4 className={styles.cardTitle}>{title}</h4>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Gambar                                                            */
/* ---------------------------------------------------------------- */

export type Mark = { n: number; x: number; y: number };

/**
 * Tangkapan layar dengan area tampilan opsional.
 * box = [x, y, lebar, tinggi] dalam persen terhadap gambar asli.
 * marks memakai persen terhadap area tampilan.
 */
export function Shot({
  name,
  width,
  box = [0, 0, 100, 100],
  marks,
  n,
  caption,
  center,
}: {
  name: ShotName;
  width: string;
  box?: [number, number, number, number];
  marks?: Mark[];
  n: string;
  caption: string;
  center?: boolean;
}) {
  const [w, h] = SHOTS[name as string];
  const [bx, by, bw, bh] = box;
  const aspect = ((bw / 100) * w) / ((bh / 100) * h);
  const full = bx === 0 && by === 0 && bw === 100 && bh === 100;
  return (
    <figure className={clsx(styles.figure, center && styles.figCenter)}>
      <div className={styles.shotBox} style={{ width, aspectRatio: String(aspect) }}>
        <img
          src={`/manual/${name}.png`}
          width={w}
          height={h}
          alt={caption}
          loading="eager"
          decoding="sync"
          style={
            full
              ? { width: "100%", height: "100%" }
              : {
                  position: "absolute",
                  width: `${(100 / bw) * 100}%`,
                  height: "auto",
                  left: `${(-bx / bw) * 100}%`,
                  top: `${(-by / bh) * 100}%`,
                }
          }
        />
        {marks?.map((m) => (
          <span
            key={m.n}
            className={styles.mk}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {m.n}
          </span>
        ))}
      </div>
      <figcaption style={{ width }}>
        <b>Gambar {n}.</b> {caption}
      </figcaption>
    </figure>
  );
}

/** Daftar keterangan bernomor yang mengacu pada penanda pada gambar. */
export function MarkList({
  items,
  start = 1,
}: {
  items: [string, ReactNode][];
  start?: number;
}) {
  return (
    <ol className={styles.markList}>
      {items.map(([title, text], i) => (
        <li key={title}>
          <span className={styles.mkInline}>{start + i}</span>
          <div>
            <b>{title}</b>
            {text ? <span> {text}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/* Daftar isi                                                        */
/* ---------------------------------------------------------------- */

export type TocGroup = {
  number: string;
  title: string;
  page: number;
  entries: { label: string; page: number }[];
};

export function Toc({ groups }: { groups: TocGroup[] }) {
  return (
    <div className={styles.toc}>
      {groups.map((g) => (
        <div key={g.number + g.title} className={styles.tocGroup}>
          <div className={styles.tocChapter}>
            <i>{g.number}</i>
            <span>{g.title}</span>
            <span>{g.page}</span>
          </div>
          {g.entries.map((e) => (
            <div key={e.label} className={styles.tocLine}>
              <span>{e.label}</span>
              <span>{e.page}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
