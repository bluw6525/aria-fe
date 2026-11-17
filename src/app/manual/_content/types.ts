import type { ReactNode } from "react";
import type { CoverProps } from "../_components/primitives";

export type PartKey = "A" | "B";

export type PageDesc =
  | { kind: "cover" }
  | { kind: "divider"; id: string; label: string; cover: CoverProps }
  | { kind: "toc"; id: string; part: PartKey }
  | { kind: "back" }
  | {
      kind: "page";
      id: string;
      part: PartKey;
      chapterNo: string;
      chapter: string;
      toc: string;
      body: ReactNode;
    };
