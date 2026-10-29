import type { ReactNode } from "react";

export type PageDesc =
  | { kind: "cover" }
  | { kind: "toc"; id: string }
  | {
      kind: "opener";
      id: string;
      number: string;
      title: string;
      lead: string;
      items: { label: string; id: string }[];
    }
  | {
      kind: "page";
      id: string;
      chapter: string;
      /** Label pada daftar isi; kosong berarti tidak dicantumkan. */
      toc?: string;
      body: ReactNode;
    }
  | { kind: "back" };
