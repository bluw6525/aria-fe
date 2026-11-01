import type { ReactNode } from "react";

export type PageDesc =
  | { kind: "cover" }
  | { kind: "toc"; id: string }
  | { kind: "back" }
  | {
      kind: "page";
      id: string;
      chapterNo: string;
      chapter: string;
      toc: string;
      body: ReactNode;
    };
