/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { styles } from "./styles";

/** Ukuran asli tangkapan layar (piksel) agar rasio gambar tersedia sebelum dimuat. */
export const SHOTS = {
  "01-beranda": [2880, 1800],
  "01-sidebar-pengguna": [544, 1800],
  "02-bantuan-panduan": [2336, 2042],
  "03-login": [896, 880],
  "03-sidebar-admin": [544, 1800],
  "04-latih-form": [664, 968],
  "05-deteksi-outlier": [1284, 296],
  "06-hasil-latih": [1256, 1160],
  "07-hasil-uji": [1256, 1048],
  "07-uji-form": [664, 596],
  "08-benchmark-formulir": [2176, 1282],
  "09-benchmark-iterasi": [2176, 1520],
  "09-benchmark-ringkasan": [2176, 940],
  "10-benchmark-simpan-model": [1024, 484],
  "11-estimasi-berkas-form": [760, 738],
  "11-estimasi-berkas-hasil": [1256, 1120],
  "12-estimasi-manual-form": [760, 1034],
  "12-estimasi-manual-hasil": [1256, 1040],
  "13-estimasi-multi-form": [760, 1034],
  "13-estimasi-multi-hasil": [1256, 1280],
} as const;

export type ShotName = keyof typeof SHOTS;

type Kids = { children?: ReactNode };

/* ---------------------------------------------------------------- */
/* Lembar                                                            */
/* ---------------------------------------------------------------- */

export function Sheet({
  chapter,
  no,
  children,
}: Kids & { chapter: string; no: number }) {
  return (
    <section className={styles.sheet} data-sheet={no}>
      <header className={styles.sheetHeader}>
        <span>
          <b>Aria</b> &nbsp;/&nbsp; Buku Manual Program
        </span>
        <span>{chapter}</span>
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

export function Cover() {
  return (
    <section className={clsx(styles.sheet, styles.cover)} data-sheet={1}>
      <div className={styles.coverGlow} />
      <div className={styles.coverBand} />
      <Circles className={styles.coverCircles} />
      <div className={styles.brandChip}>
        <span className={styles.brandDot}>A</span>
        aria.
      </div>
      <div className={styles.coverTitle}>
        <p className={styles.coverKicker}>Buku Manual Program</p>
        <h1 className={styles.coverH1}>
          Estimasi ISPU
          <br />
          dari <em>Sentinel-5P</em>
        </h1>
        <p className={styles.coverSub}>
          Panduan penggunaan sistem Aria untuk melatih model regresi robust,
          menguji, membandingkan estimator, dan menghitung Indeks Standar
          Pencemar Udara dari kadar CO dan NO2 satelit.
        </p>
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
          <span>Versi</span>
          <b>1.0 &middot; Oktober 2026</b>
        </div>
      </div>
    </section>
  );
}

export function Opener({
  no,
  number,
  title,
  lead,
  items,
}: {
  no: number;
  number: string;
  title: string;
  lead: string;
  items: { label: string; page: number }[];
}) {
  return (
    <section className={clsx(styles.sheet, styles.opener)} data-sheet={no}>
      <div className={styles.openerLeft}>
        <Circles className={styles.openerCircles} />
        <p className={styles.openerNum}>{number}</p>
        <p className={styles.openerTag}>
          Bab
          <b>{title}</b>
        </p>
        <div className={styles.openerBandLeft} />
      </div>
      <div className={styles.openerRight}>
        <h2>{title}</h2>
        <p className={styles.openerLead}>{lead}</p>
        <ul className={styles.openerList}>
          {items.map((it) => (
            <li key={it.label}>
              {it.label}
              <span>Halaman {it.page}</span>
            </li>
          ))}
        </ul>
        <div className={styles.openerBandRight} />
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
          Aria menghubungkan data Sentinel-5P dengan standar ISPU Kementerian
          Lingkungan Hidup dan Kehutanan.
        </p>
      </div>
      <div className={styles.openerBandRight} style={{ height: "14mm" }} />
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

export function Ic({ children }: Kids) {
  return <code className={styles.inline}>{children}</code>;
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
}: {
  head: string[];
  rows: ReactNode[][];
  widths?: string[];
}) {
  return (
    <table className={styles.table}>
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

export function Code({ children }: { children: string }) {
  return <pre className={styles.code}>{children}</pre>;
}

export function Chip({
  tone,
  children,
}: Kids & { tone?: "baik" | "sedang" | "tidak" | "sangat" | "bahaya" }) {
  return (
    <span
      className={clsx(
        styles.chip,
        tone === "baik" && styles.chipBaik,
        tone === "sedang" && styles.chipSedang,
        tone === "tidak" && styles.chipTidakSehat,
        tone === "sangat" && styles.chipSangat,
        tone === "bahaya" && styles.chipBerbahaya,
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

/* ---------------------------------------------------------------- */
/* Gambar                                                            */
/* ---------------------------------------------------------------- */

export function Fig({
  name,
  width,
  n,
  caption,
  alt,
  center,
}: {
  name: ShotName;
  width: string;
  n: string;
  caption: string;
  alt?: string;
  center?: boolean;
}) {
  const [w, h] = SHOTS[name];
  return (
    <figure className={clsx(styles.figure, center && styles.figCenter)}>
      <img
        src={`/manual/${name}.png`}
        width={w}
        height={h}
        alt={alt ?? caption}
        loading="eager"
        decoding="sync"
        style={{ width }}
      />
      <figcaption style={{ width }}>
        <b>Gambar {n}.</b> {caption}
      </figcaption>
    </figure>
  );
}

/** Gambar dengan area tampilan dipotong (tinggi tetap, posisi atas). */
export function Crop({
  name,
  width,
  height,
  pos = "top",
  n,
  caption,
  center,
}: {
  name: ShotName;
  width: string;
  height: string;
  pos?: string;
  n: string;
  caption: string;
  center?: boolean;
}) {
  const [w, h] = SHOTS[name];
  return (
    <figure className={clsx(styles.figure, center && styles.figCenter)}>
      <div className={styles.cropBox} style={{ width, height }}>
        <img
          src={`/manual/${name}.png`}
          width={w}
          height={h}
          alt={caption}
          loading="eager"
          decoding="sync"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }}
        />
      </div>
      <figcaption style={{ width }}>
        <b>Gambar {n}.</b> {caption}
      </figcaption>
    </figure>
  );
}

export function Diagram({
  src,
  width,
  n,
  caption,
  ratio,
}: {
  src: string;
  width: string;
  n: string;
  caption: string;
  ratio: [number, number];
}) {
  return (
    <figure className={clsx(styles.figure, styles.figCenter)}>
      <div className={styles.diagram} style={{ width }}>
        <img src={src} width={ratio[0]} height={ratio[1]} alt={caption} loading="eager" decoding="sync" />
      </div>
      <figcaption style={{ width }}>
        <b>Gambar {n}.</b> {caption}
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- */
/* Persamaan                                                         */
/* ---------------------------------------------------------------- */

export function Eq({ children, tag }: Kids & { tag?: string }) {
  return (
    <div className={styles.eq} role="math">
      <span>{children}</span>
      {tag ? <span className={styles.eqTag}>{tag}</span> : null}
    </div>
  );
}

export function Frac({ n, d }: { n: ReactNode; d: ReactNode }) {
  return (
    <span className={styles.frac}>
      <span>{n}</span>
      <span>{d}</span>
    </span>
  );
}

export function Sqrt({ children }: Kids) {
  return (
    <span className={styles.sqrt}>
      <span className={styles.sqrtSign}>√</span>
      <span className={styles.sqrtBody}>{children}</span>
    </span>
  );
}

export function Legend({ items }: { items: [ReactNode, ReactNode][] }) {
  return (
    <dl className={styles.legendWrap}>
      {items.map(([k, v], i) => (
        <div key={i} style={{ display: "contents" }}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
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
