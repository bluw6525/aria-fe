/**
 * Pemetaan nama kelas untuk stylesheet manual.css.
 * styles.sheet menghasilkan "m-sheet", sehingga komponen tetap memakai penulisan
 * ala CSS Modules sementara berkasnya bersifat global dengan awalan m-.
 */
export const styles: Record<string, string> = new Proxy(
  {},
  {
    get: (_target, key) => (typeof key === "string" ? `m-${key}` : undefined),
  },
);
