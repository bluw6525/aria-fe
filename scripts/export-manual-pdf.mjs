/**
 * Mengekspor halaman buku manual (/manual) menjadi PDF A4 lanskap dengan Playwright.
 *
 * Prasyarat: server Next.js aktif (bun dev atau bun start) dan Chromium untuk Playwright.
 *
 * Variabel lingkungan:
 *   ARIA_BASE_URL   alamat aplikasi              (bawaan http://localhost:3000)
 *   ARIA_MANUAL_PATH jalur halaman manual         (bawaan /manual)
 *   ARIA_PDF_OUT    berkas keluaran              (bawaan manual/Buku-Manual-Aria.pdf)
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.ARIA_BASE_URL ?? "http://localhost:3000";
const MANUAL_PATH = process.env.ARIA_MANUAL_PATH ?? "/manual";
const OUT = path.resolve(process.env.ARIA_PDF_OUT ?? "manual/Buku-Manual-Aria.pdf");

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}${MANUAL_PATH}`, { waitUntil: "networkidle" });

  // Tunggu font dan seluruh gambar selesai dimuat sebelum mengukur tata letak.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });

  // Pemeriksaan luapan: isi yang lebih tinggi atau lebih lebar dari lembarnya terpotong pada PDF.
  const problems = await page.evaluate(() => {
    const found = [];
    for (const sheet of document.querySelectorAll("[data-sheet]")) {
      const no = sheet.getAttribute("data-sheet");
      const body = sheet.querySelector("[data-body]");
      if (body) {
        const over = body.scrollHeight - body.clientHeight;
        if (over > 1) found.push(`Halaman ${no}: isi melebihi area sebesar ${over}px`);
        if (body.scrollWidth - body.clientWidth > 1) found.push(`Halaman ${no}: isi melebihi lebar area`);
      }
    }
    for (const img of document.images) {
      if (img.naturalWidth === 0) found.push(`Gambar gagal dimuat: ${img.getAttribute("src")}`);
    }
    return found;
  });

  if (problems.length > 0) {
    console.warn("Peringatan tata letak:");
    for (const p of problems) console.warn(`  - ${p}`);
  } else {
    console.log("Pemeriksaan tata letak: tidak ada luapan.");
  }

  await mkdir(path.dirname(OUT), { recursive: true });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: OUT,
    width: "297mm",
    height: "210mm",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  console.log(`PDF tersimpan: ${OUT}`);

  if (problems.length > 0) process.exitCode = 2;
} finally {
  await browser.close();
}
