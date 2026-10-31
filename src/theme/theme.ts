import { createTheme, MantineColorsTuple, DefaultMantineColor } from "@mantine/core";

// Warna Biru Utama (Sky / Blue #0284c7)
export const brandPrimary: MantineColorsTuple = [
  "#f0f9ff", // 0 - bg paling terang (sky-50)
  "#e0f2fe", // 1 - sky-100
  "#bae6fd", // 2 - border terang / badge (sky-200)
  "#7dd3fc", // 3 - sky-300
  "#38bdf8", // 4 - aksen hover cerah (sky-400)
  "#0ea5e9", // 5 - sky-500
  "#0284c7", // 6 - WARNA UTAMA BRAND (sky-600 / primary)
  "#0369a1", // 7 - hover state / text kontras (sky-700)
  "#075985", // 8 - sky-800
  "#0c4a6e", // 9 - text paling gelap (sky-900)
];

// Warna Sekunder (Deep Slate-Blue / Navy)
export const brandSecondary: MantineColorsTuple = [
  "#f8fafc", // 0 - background panel lembut (slate-50)
  "#f1f5f9", // 1 - divider / border sangat lembut (slate-100)
  "#e2e8f0", // 2 - border standar card & panel (slate-200)
  "#cbd5e1", // 3 - border fokus / garis pembatas (slate-300)
  "#94a3b8", // 4 - icon muted / text placeholder (slate-400)
  "#64748b", // 5 - text sekunder / keterangan (slate-500)
  "#475569", // 6 - text isi standar (slate-600)
  "#334155", // 7 - text label tebal (slate-700)
  "#1e293b", // 8 - heading / text gelap (slate-800)
  "#0f172a", // 9 - WARNA UTAMA TEKS / JUDUL (slate-900)
];

type ExtendedCustomColors =
  | "brandPrimary"
  | "brandSecondary"
  | "sky"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export const theme = createTheme({
  // Jadikan brandPrimary shade 5 (#0ea5e9) sebagai warna utama terang default
  primaryColor: "brandPrimary",
  primaryShade: 5,
  // Mengatur warna teks gelap default (#0f172a) untuk seluruh komponen Mantine
  black: "#0f172a",
  white: "#ffffff",
  colors: {
    brandPrimary,
    brandSecondary,
    sky: brandPrimary,
  },
  defaultRadius: "md",
  fontFamily:
    "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  headings: {
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "700",
  },
  components: {
    Title: {
      defaultProps: {
        c: "brandSecondary.9", // Otomatis warna teks judul utama #0f172a
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
        fw: 600,
        color: "brandPrimary",
      },
    },
    Badge: {
      defaultProps: {
        radius: "md",
        color: "brandPrimary",
      },
    },
    ThemeIcon: {
      defaultProps: {
        color: "brandPrimary",
        radius: "md",
      },
    },
    Loader: {
      defaultProps: {
        color: "brandPrimary",
      },
    },
    Pagination: {
      defaultProps: {
        color: "brandPrimary",
      },
    },
    Checkbox: {
      defaultProps: {
        color: "brandPrimary",
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: "#ffffff",
          borderColor: "var(--mantine-color-brandSecondary-2)", // #e2e8f0
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: "#ffffff",
          borderColor: "var(--mantine-color-brandSecondary-2)",
        },
      },
    },
    Table: {
      styles: {
        table: {
          borderColor: "var(--mantine-color-brandSecondary-2)",
        },
        th: {
          color: "var(--mantine-color-brandSecondary-6)",
          borderColor: "var(--mantine-color-brandSecondary-2)",
        },
        td: {
          borderColor: "var(--mantine-color-brandSecondary-1)",
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});
