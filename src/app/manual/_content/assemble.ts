import type { PageDesc } from "./types";

/** Mengambil halaman bab tertentu berdasarkan id. */
export const byId = (list: PageDesc[], ...ids: string[]): PageDesc[] =>
  list.filter((d) => d.kind === "page" && ids.includes(d.id));
