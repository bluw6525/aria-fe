/**
 * Mengambil tangkapan layar aplikasi Aria untuk Buku Manual (halaman /manual).
 *
 * Prasyarat:
 *   1. Backend aria-be berjalan (default http://localhost:8000) dengan database yang sudah
 *      dimigrasi dan memiliki akun admin (uv run python commands/seed_admin.py).
 *   2. Frontend aria-fe berjalan (default http://localhost:3000), misalnya `bun run dev`.
 *   3. Chromium untuk Playwright terpasang (bunx playwright install chromium).
 *
 * Skrip menjalankan alur nyata melalui antarmuka (login, latih, simpan, uji, benchmark,
 * estimasi) memakai data contoh di scripts/manual-sample. Database sebaiknya kosong karena
 * nama model yang disimpan harus unik dan daftar model pada tangkapan layar tidak boleh
 * bercampur data lain.
 *
 * Gambar dibagi menjadi formulir dan hasil agar tiap bagian dapat tampil cukup besar pada
 * halaman A4 buku manual.
 *
 * Pemakaian:
 *   bun run manual:capture
 *
 * Variabel lingkungan opsional:
 *   ARIA_BASE_URL        alamat frontend            (default http://localhost:3000)
 *   ARIA_ADMIN_USER      username admin             (default admin)
 *   ARIA_ADMIN_PASSWORD  password admin             (default admin123)
 *   ARIA_OUT_DIR         folder keluaran gambar     (default public/manual)
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = process.env.ARIA_BASE_URL ?? "http://localhost:3000";
const ADMIN_USER = process.env.ARIA_ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ARIA_ADMIN_PASSWORD ?? "admin123";
const OUT_DIR = path.resolve(ROOT, process.env.ARIA_OUT_DIR ?? "public/manual");
const SAMPLE_DIR = path.join(ROOT, "scripts", "manual-sample");

const TRAIN_FILE = path.join(SAMPLE_DIR, "data_latih_contoh.csv");
const TEST_FILE = path.join(SAMPLE_DIR, "data_uji_contoh.csv");
const ESTIMATE_FILE = path.join(SAMPLE_DIR, "data_estimasi_contoh.csv");

const VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_TIMEOUT = 60_000;
/** Padding kartu (p-6) pada antarmuka, dipakai untuk memotong bagian dalam kartu. */
const CARD_PADDING = 24;

const out = (name) => path.join(OUT_DIR, `${name}.png`);

/** Menyembunyikan indikator dev Next.js dan toast agar tidak menutupi antarmuka. */
async function hideOverlays(context) {
  await context.addInitScript(() => {
    const css = "nextjs-portal,[data-sonner-toaster]{display:none !important}";
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    });
  });
}

async function settle(page, ms = 400) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(ms);
}

/** Posisi elemen terhadap halaman penuh (bukan viewport). */
function pageBox(locator) {
  return locator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height };
  });
}

/** Kartu (rounded-2xl) terdekat yang memuat teks tertentu. */
function cardWithText(page, text) {
  return page
    .getByText(text)
    .first()
    .locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
}

/** Kartu (rounded-2xl) terdekat di atas sebuah heading. */
function cardOfHeading(heading) {
  return heading.locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
}

async function clipShot(page, name, clip) {
  await page.screenshot({ path: out(name), fullPage: true, clip });
  console.log(`  ✓ ${name}`);
}

/** Tangkapan layar satu elemen tepat pada kotaknya. */
async function shotElement(page, locator, name) {
  await settle(page);
  await locator.screenshot({ path: out(name) });
  console.log(`  ✓ ${name}`);
}

/** Tangkapan layar area konten utama (tanpa sidebar), setinggi kontennya. */
async function shotMain(page, name) {
  await shotElement(page, page.locator("main"), name);
}

/** Tangkapan layar viewport penuh (sidebar ikut terlihat). */
async function shotViewport(page, name) {
  await settle(page);
  await page.screenshot({ path: out(name) });
  console.log(`  ✓ ${name}`);
}

/** Tangkapan layar gabungan beberapa kartu, dengan tinggi dibatasi. */
async function shotCards(page, name, locators, maxHeight = Infinity) {
  await settle(page);
  const boxes = await Promise.all(locators.map(pageBox));
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  const right = Math.max(...boxes.map((b) => b.x + b.width));
  const bottom = Math.max(...boxes.map((b) => b.y + b.height));
  await clipShot(page, name, { x, y, width: right - x, height: Math.min(bottom - y, maxHeight) });
}

/** Dari sebuah heading sampai dasar panel, tanpa tepi kartu. */
async function shotFromHeading(page, name, heading, panel, { maxHeight = Infinity } = {}) {
  await settle(page);
  const h = await pageBox(heading);
  const p = await pageBox(panel);
  const y = h.y - 4;
  await clipShot(page, name, {
    x: p.x + CARD_PADDING,
    y,
    width: p.width - CARD_PADDING * 2,
    height: Math.min(p.y + p.height - CARD_PADDING - y, maxHeight),
  });
}

/** Bagian dalam sebuah kartu, dari satu penanda sampai penanda berikutnya (atau dasar kartu). */
async function shotCardSection(page, name, card, from, to = null) {
  await settle(page);
  const c = await pageBox(card);
  const f = await pageBox(from);
  const y = f.y - 6;
  const bottom = to ? (await pageBox(to)).y - 18 : c.y + c.height - CARD_PADDING;
  await clipShot(page, name, {
    x: c.x + CARD_PADDING,
    y,
    width: c.width - CARD_PADDING * 2,
    height: bottom - y,
  });
}

async function goto(page, route, readyText) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
  if (readyText) {
    await page.getByText(readyText, { exact: false }).first().waitFor({ timeout: DEFAULT_TIMEOUT });
  }
  await settle(page);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: "id-ID",
  });
  await hideOverlays(context);
  context.setDefaultTimeout(DEFAULT_TIMEOUT);
  const page = await context.newPage();

  // ---------------------------------------------------------------------------
  // 1. Tampilan pengguna umum (belum login)
  // ---------------------------------------------------------------------------
  console.log("Pengguna umum");
  await goto(page, "/home", "Estimasi Konsentrasi");
  await shotViewport(page, "01-beranda");
  await shotElement(page, page.locator("aside"), "01-sidebar-pengguna");

  await goto(page, "/help", "Bantuan & Informasi Teori");
  await shotMain(page, "02-bantuan-panduan");

  await goto(page, "/login", "Login Administrator");
  await shotElement(
    page,
    page.locator("form").first().locator('xpath=ancestor::div[contains(@class,"rounded-3xl")][1]'),
    "03-login",
  );

  // ---------------------------------------------------------------------------
  // 2. Login administrator
  // ---------------------------------------------------------------------------
  console.log("Login");
  await page.locator("#username").fill(ADMIN_USER);
  await page.locator("#password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /Masuk Administrator/ }).click();
  await page.waitForURL("**/home");
  await page.getByText("Admin Aria").first().waitFor();
  await settle(page);
  await shotElement(page, page.locator("aside"), "03-sidebar-admin");

  // ---------------------------------------------------------------------------
  // 3. Modul Latih dan Uji
  // ---------------------------------------------------------------------------
  console.log("Latih dan Uji");
  await goto(page, "/train-test", "Latih Dan Uji Model Regresi");
  const leftCard = cardWithText(page, "1. Konfigurasi Data Latih");
  const sectionOne = page.getByText("1. Konfigurasi Data Latih").first();
  const sectionTwo = page.getByText("2. Pengujian Terhadap Data Uji").first();

  await page.locator('input[type="file"]').nth(0).setInputFiles(TRAIN_FILE);
  await page.locator("select").nth(0).selectOption("MM-1.547");
  await settle(page);

  await page.getByRole("button", { name: /Deteksi Outlier/ }).click();
  const outlierHeading = page.getByRole("heading", { name: "Outlier pada data latih" });
  await outlierHeading.waitFor();
  await settle(page, 800);
  {
    const b = await pageBox(outlierHeading.locator("xpath=.."));
    await clipShot(page, "05-deteksi-outlier", {
      x: b.x - 8,
      y: b.y - 8,
      width: b.width + 16,
      height: b.height + 16,
    });
  }

  await page.getByRole("button", { name: /^Latih Model$/ }).click();
  const trainHeading = page.getByRole("heading", { name: /Hasil Pelatihan Model/ });
  await trainHeading.waitFor();
  await settle(page, 1200);
  await shotFromHeading(page, "06-hasil-latih", trainHeading, cardOfHeading(trainHeading));

  await page.getByPlaceholder("Ketik nama model...").fill("Model MM k=1,547 (data contoh)");
  await shotCardSection(page, "04-latih-form", leftCard, sectionOne, sectionTwo);
  await page.getByRole("button", { name: /^Simpan$/ }).click();
  await page.getByText(/1 model di database/).first().waitFor();
  await settle(page);

  await page.locator("select").nth(1).selectOption({ index: 2 });
  await page.locator('input[type="file"]').nth(1).setInputFiles(TEST_FILE);
  await settle(page);
  await shotCardSection(page, "07-uji-form", leftCard, sectionTwo);

  await page.getByRole("button", { name: /Uji Model Terhadap Data Baru/ }).click();
  const testHeading = page.getByRole("heading", { name: /Hasil Evaluasi Model terhadap Data Uji/ });
  await testHeading.waitFor();
  await settle(page, 1200);
  await shotFromHeading(page, "07-hasil-uji", testHeading, cardOfHeading(testHeading));

  // ---------------------------------------------------------------------------
  // 4. Modul Benchmark MCCV
  // ---------------------------------------------------------------------------
  console.log("Benchmark MCCV");
  await goto(page, "/benchmark", "Benchmark Evaluasi & Seleksi Model (MCCV)");
  await page.locator('input[type="file"]').first().setInputFiles(TRAIN_FILE);
  // Nilai bawaan formulir (200 iterasi, rasio 80:20, lima algoritma) dipakai apa adanya.
  await settle(page);
  await shotElement(page, cardWithText(page, "Unggah Berkas Dataset Latih & Uji"), "08-benchmark-formulir");

  await page.getByRole("button", { name: /Mulai Benchmark Model/ }).click();
  await page.getByText(/Estimator Rata-Rata Terbaik/).first().waitFor({ timeout: 300_000 });
  await settle(page, 1200);
  await shotCards(page, "09-benchmark-ringkasan", [
    cardWithText(page, "Estimator Rata-Rata Terbaik"),
    cardWithText(page, "Rangkuman Metrik Evaluasi Rata-Rata"),
  ]);
  await shotCards(page, "09-benchmark-iterasi", [cardWithText(page, "Detail Seluruh Iterasi Model")], 760);

  await page.getByRole("button", { name: /Simpan/ }).first().click();
  const promoteHeading = page.getByRole("heading", { name: "Simpan Model Produksi" });
  await promoteHeading.waitFor();
  await settle(page);
  await shotElement(page, cardOfHeading(promoteHeading), "10-benchmark-simpan-model");
  await page.getByRole("button", { name: /^Batal$/ }).click();

  // ---------------------------------------------------------------------------
  // 5. Modul Estimasi
  // ---------------------------------------------------------------------------
  console.log("Estimasi");
  await goto(page, "/estimate", "Estimasi Kualitas Udara (ISPU)");
  await page.getByText(/model tersedia/).first().waitFor();
  await page.locator("select").first().selectOption({ index: 1 });
  const formCard = cardWithText(page, "Pilih Jenis Input");

  // 5a. Estimasi dari berkas
  await page.locator('input[type="file"]').first().setInputFiles(ESTIMATE_FILE);
  await settle(page);
  await shotElement(page, formCard, "11-estimasi-berkas-form");
  await page.getByRole("button", { name: /Jalankan Estimasi/ }).click();
  const batchHeading = page.getByRole("heading", { name: /\(Batch File\)/ });
  await batchHeading.waitFor();
  await settle(page, 1400);
  await shotFromHeading(page, "11-estimasi-berkas-hasil", batchHeading, cardOfHeading(batchHeading), {
    maxHeight: 560,
  });

  // 5b. Input manual, satu titik
  await page.getByRole("button", { name: /Input Manual/ }).click();
  await page.getByPlaceholder("Contoh: 0.0332").fill("0.0332");
  await page.getByPlaceholder("Contoh: 0.000092").fill("0.000092");
  await page.getByRole("button", { name: /Jalankan Estimasi/ }).click();
  const singleHeading = page.getByRole("heading", { name: /Titik Tunggal/ });
  await singleHeading.waitFor();
  await settle(page, 800);
  await shotElement(page, formCard, "12-estimasi-manual-form");
  await shotFromHeading(page, "12-estimasi-manual-hasil", singleHeading, cardOfHeading(singleHeading), {
    maxHeight: 520,
  });

  // 5c. Input manual, multi-titik
  await page.getByPlaceholder("Contoh: 0.0332").fill("0.0369");
  await page.getByPlaceholder("Contoh: 0.000092").fill("0.000118");
  await page.getByRole("button", { name: /Tambah Titik Ke-2/ }).click();
  const multiHeading = page.getByRole("heading", { name: /Multi-titik Manual/ });
  await multiHeading.waitFor();
  await settle(page, 1200);
  await shotElement(page, formCard, "13-estimasi-multi-form");
  await shotFromHeading(page, "13-estimasi-multi-hasil", multiHeading, cardOfHeading(multiHeading), {
    maxHeight: 640,
  });

  await browser.close();
  console.log(`\nSelesai. Gambar tersimpan di ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
