/**
 * Mengambil tangkapan layar aplikasi Aria untuk Buku Manual (halaman /manual).
 *
 * Prasyarat:
 *   1. Backend aria-be (branch new) berjalan di http://localhost:8000 dengan database kosong
 *      yang sudah dimigrasi dan memiliki akun admin (uv run python commands/seed_admin.py).
 *   2. Frontend aria-fe berjalan di http://localhost:3000 (bun run dev).
 *   3. Chromium untuk Playwright terpasang.
 *
 * Skrip menjalankan alur nyata melalui antarmuka memakai data contoh di scripts/manual-sample.
 * Ukuran setiap gambar ditulis ke src/app/manual/_content/shots.json agar halaman manual
 * dapat memesan ruang gambar sebelum gambar dimuat.
 *
 * Pemakaian:
 *   bun run manual:capture
 *
 * Variabel lingkungan opsional:
 *   ARIA_BASE_URL, ARIA_ADMIN_USER, ARIA_ADMIN_PASSWORD, ARIA_OUT_DIR
 */

import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = process.env.ARIA_BASE_URL ?? "http://localhost:3000";
const ADMIN_USER = process.env.ARIA_ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ARIA_ADMIN_PASSWORD ?? "admin123";
const OUT_DIR = path.resolve(ROOT, process.env.ARIA_OUT_DIR ?? "public/manual");
const SHOTS_JSON = path.join(ROOT, "src/app/manual/_content/shots.json");
const SAMPLE = path.join(ROOT, "scripts", "manual-sample");
const TRAIN_FILE = path.join(SAMPLE, "data_latih_contoh.csv");
const TEST_FILE = path.join(SAMPLE, "data_uji_contoh.csv");
const ESTIMATE_FILE = path.join(SAMPLE, "data_estimasi_contoh.csv");

/** Rasio 1,45 : 1 menyerupai jendela browser pada halaman manual. */
const VIEWPORT = { width: 1440, height: 990 };
const TIMEOUT = 120_000;
const MODEL_NAME = "Model MM data contoh";

const ONLY = process.env.ARIA_ONLY?.split(",");
const want = (name) => !ONLY || ONLY.includes(name);

const sizes = {};

const out = (name) => path.join(OUT_DIR, `${name}.png`);

async function settle(page, ms = 500) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(ms);
}

function pageBox(locator) {
  return locator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height };
  });
}

async function record(name) {
  const buf = await readFile(out(name));
  sizes[name] = [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  console.log(`  ✓ ${name} ${sizes[name].join("x")}`);
}

/** Tangkapan layar viewport penuh (sidebar ikut terlihat). */
async function viewport(page, name) {
  await settle(page);
  await page.screenshot({ path: out(name) });
  await record(name);
}

/** Tangkapan layar satu elemen tepat pada kotaknya. */
async function element(page, locator, name) {
  await settle(page);
  await locator.screenshot({ path: out(name) });
  await record(name);
}

/** Potongan halaman penuh dengan koordinat halaman. */
async function clip(page, name, box) {
  await settle(page);
  await page.screenshot({ path: out(name), fullPage: true, clip: box });
  await record(name);
}

/** Panel (kartu Mantine) terdekat di atas sebuah elemen. */
const paperOf = (locator) =>
  locator.locator('xpath=ancestor::div[contains(@class,"mantine-Paper-root")][1]');

/** Panel terluar (kartu Mantine) yang memuat sebuah elemen, misalnya seluruh panel hasil. */
const outerPaperOf = (locator) =>
  locator.locator('xpath=ancestor::div[contains(@class,"mantine-Paper-root")][last()]');

/** Bagian dalam kartu dari satu penanda sampai penanda berikutnya atau dasar kartu. */
async function section(page, name, card, from, to = null, pad = 32) {
  await settle(page);
  const c = await pageBox(card);
  const f = await pageBox(from);
  const y = f.y - 8;
  const bottom = to ? (await pageBox(to)).y - 14 : c.y + c.height - pad / 2;
  await clip(page, name, { x: c.x + pad, y, width: c.width - pad * 2, height: bottom - y });
}

async function go(page, route, readyText) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
  if (readyText) await page.getByText(readyText, { exact: false }).first().waitFor();
  await settle(page);
}

async function pickModel(page, placeholder, index = 0) {
  await page.getByPlaceholder(placeholder).click();
  await page.getByRole("option").nth(index).click();
  await page.waitForTimeout(300);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, locale: "id-ID" });
  await context.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const s = document.createElement("style");
      s.textContent = "nextjs-portal{display:none!important}";
      document.head.appendChild(s);
    });
  });
  context.setDefaultTimeout(TIMEOUT);
  const page = await context.newPage();

  // ---------------------------------------------------------------- pengguna umum
  console.log("Pengguna umum");
  if (want("public")) {
  await go(page, "/home", "Estimasi Konsentrasi");
  await viewport(page, "01-beranda");
  await element(page, page.locator("aside"), "02-sidebar-pengguna");

  await go(page, "/help", "Bantuan & Informasi Teori");
  const tabs = ["Cara Penggunaan", "Dasar Teori MM-Estimator", "Dampak Polusi & Prekursor", "Kategori Standar ISPU"];
  for (const [i, t] of tabs.entries()) {
    await page.getByRole("tab", { name: t }).or(page.getByText(t, { exact: true })).first().click();
    await page.waitForTimeout(500);
    await viewport(page, `07-bantuan-${i + 1}`);
  }

  await go(page, "/history", "Riwayat Perancang");
  await viewport(page, "08-riwayat");

  }
  await go(page, "/login", "Login Administrator");
  if (want("public")) await element(page, paperOf(page.getByText("Login Administrator").first()), "03-login");

  // ---------------------------------------------------------------- login
  console.log("Login");
  await page.locator("#username").fill(ADMIN_USER);
  await page.locator("#password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /Masuk Administrator/ }).click();
  await page.waitForURL("**/home");
  await page.locator("aside").getByText("Admin Aria").first().waitFor();
  await settle(page, 1500);
  await element(page, page.locator("aside"), "02-sidebar-admin");
  // Notifikasi Mantine ditutup agar tidak menutupi antarmuka pada tangkapan berikutnya.
  await context.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const s = document.createElement("style");
      s.textContent = ".mantine-Notifications-root{display:none!important}";
      document.head.appendChild(s);
    });
  });

  // ---------------------------------------------------------------- latih dan uji
  if (want("train")) {
  console.log("Latih dan Uji");
  await go(page, "/train-test", "Latih Dan Uji Model Regresi");
  const h1 = page.getByText("1. Konfigurasi Data Latih").first();
  const h2 = page.getByText("2. Pengujian Terhadap Data Uji").first();
  const left = paperOf(h1);

  await page.locator('input[type="file"]').nth(0).setInputFiles(TRAIN_FILE);
  await settle(page);
  await viewport(page, "05-latih-kosong");

  await page.getByRole("button", { name: /Deteksi Outlier/ }).click();
  const outlierTitle = page.getByText("Outlier pada data latih").first();
  await outlierTitle.waitFor();
  await settle(page, 800);
  {
    const box = await pageBox(paperOf(outlierTitle));
    // Hanya kartu Outlier, tanpa panel hasil lain.
    const t = await pageBox(outlierTitle);
    const table = await pageBox(page.getByText("Leverage Value").first().locator("xpath=ancestor::div[2]"));
    await clip(page, "05-outlier", {
      x: t.x - 4,
      y: t.y - 6,
      width: box.width - (t.x - box.x) - 28,
      height: table.y + table.height * 2 - t.y + 6,
    });
  }

  await page.getByRole("button", { name: /^Latih Model$/ }).click();
  const trainTitle = page.getByText("Hasil Pelatihan Model").first();
  await trainTitle.waitFor();
  await settle(page, 1500);
  await page.getByPlaceholder("Ketik nama model...").fill(MODEL_NAME);
  await viewport(page, "05-latih-hero");
  {
    const t = await pageBox(trainTitle);
    const right = await pageBox(paperOf(trainTitle));
    await clip(page, "05-hasil-latih", {
      x: t.x - 4,
      y: t.y - 8,
      width: right.width - (t.x - right.x) - 28,
      height: 640,
    });
  }
  await section(page, "05-form-latih", left, h1, h2);
  await page.getByRole("button", { name: /^Simpan$/ }).click();
  await page.getByText(/1 model di database/).first().waitFor();
  await settle(page);

  await pickModel(page, /Pilih Model Pengujian/, 1).catch(async () => pickModel(page, /Pilih Model Pengujian/, 0));
  await page.locator('input[type="file"]').nth(1).setInputFiles(TEST_FILE);
  await settle(page);
  await section(page, "05-form-uji", left, h2);

  await page.getByRole("button", { name: /Uji Model Terhadap Data Baru/ }).click();
  const testTitle = page.getByText(/Hasil Evaluasi|Hasil Pengujian/).first();
  await testTitle.waitFor();
  await settle(page, 1500);
  await viewport(page, "05-uji-hero");
  {
    const t = await pageBox(testTitle);
    const right = await pageBox(paperOf(testTitle));
    await clip(page, "05-hasil-uji", {
      x: t.x - 4,
      y: t.y - 8,
      width: right.width - (t.x - right.x) - 28,
      height: 640,
    });
  }

  }
  // ---------------------------------------------------------------- pelatihan massal
  if (want("batch")) {
  console.log("Pelatihan Massal");
  await go(page, "/batch", "Pelatihan & Pengujian Massal");
  await page.locator('input[type="file"]').first().setInputFiles(TRAIN_FILE);
  await settle(page);
  await viewport(page, "06-batch-hero");
  await element(
    page,
    paperOf(page.getByText("Unggah Berkas Dataset Latih & Uji").first()),
    "06-batch-form",
  );

  await page.getByRole("button", { name: /Mulai Pelatihan Massal/ }).click();
  const bestLabel = page.getByText(/Estimator Terbaik|Model Terbaik/).first();
  await bestLabel.waitFor({ timeout: 300_000 });
  await settle(page, 2000);
  {
    const first = paperOf(bestLabel);
    const table = paperOf(page.getByText("Test RMSE (Mean ± Std)").first());
    const a = await pageBox(first);
    const b = await pageBox(table);
    await clip(page, "06-batch-ringkasan", {
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y),
      width: Math.max(a.x + a.width, b.x + b.width) - Math.min(a.x, b.x),
      height: Math.max(a.y + a.height, b.y + b.height) - Math.min(a.y, b.y),
    });
  }
  await page.getByRole("button", { name: /Seed yang Digunakan/ }).click();
  await settle(page, 600);
  {
    const btn = page.getByRole("button", { name: /Seed yang Digunakan/ });
    const card = paperOf(btn);
    await element(page, card, "06-batch-seed");
  }
  {
    const iter = paperOf(page.getByText(/Detail Seluruh Iterasi Model/).first());
    const b = await pageBox(iter);
    await clip(page, "06-batch-iterasi", { x: b.x, y: b.y, width: b.width, height: Math.min(b.height, 560) });
  }
  await page.getByRole("button", { name: /Simpan Model/ }).first().click();
  const modalTitle = page.getByText("Simpan Model Produksi").first();
  await modalTitle.waitFor();
  await settle(page);
  await element(page, page.locator(".mantine-Modal-content").first(), "06-batch-simpan");
  await page.getByRole("button", { name: /^Batal$/ }).click().catch(() => page.keyboard.press("Escape"));

  await page.getByText("Muat Sesi Lalu").first().click();
  await settle(page, 800);
  await element(
    page,
    paperOf(page.getByText("Pilih Sesi Pelatihan Massal Sebelumnya").first()),
    "06-batch-sesi-lalu",
  );

  }
  // ---------------------------------------------------------------- estimasi
  if (want("estimate")) {
  console.log("Estimasi");
  await go(page, "/estimate", "Estimasi Kualitas Udara (ISPU)");
  await page.getByText(/model tersedia/).first().waitFor();
  const formTitle = page.getByText("Pilih Jenis Input").first();
  const form = paperOf(formTitle);

  await page.locator('input[type="file"]').first().setInputFiles(ESTIMATE_FILE);
  // Model pertama terpilih otomatis; memilih ulang opsi yang sama akan membatalkan pilihan.
  await page.waitForFunction(() => document.querySelector('input[placeholder*="Model Estimasi"]')?.value);
  await settle(page);
  await element(page, form, "04-form-berkas");

  await page.getByRole("button", { name: /Jalankan Estimasi/ }).click();
  const batchTitle = page.getByText(/Grafik Tren Nilai ISPU/).first();
  await batchTitle.waitFor();
  await settle(page, 1500);
  await viewport(page, "04-estimasi-hero");
  {
    const panel = await pageBox(outerPaperOf(batchTitle));
    await clip(page, "04-hasil-berkas", { x: panel.x, y: panel.y, width: panel.width, height: Math.min(panel.height, 620) });
  }

  await page.getByRole("button", { name: /Input Manual/ }).click();
  await page.getByPlaceholder("Contoh: 0.0332").fill("0.0332");
  await page.getByPlaceholder("Contoh: 0.000092").fill("0.000092");
  await settle(page);
  await element(page, form, "04-form-manual");
  await page.getByRole("button", { name: /Jalankan Estimasi/ }).click();
  await page.getByText(/Dampak Kesehatan/).first().waitFor();
  await settle(page, 1000);
  {
    const t = page.getByText(/Dampak Kesehatan/).first();
    const panel = await pageBox(outerPaperOf(t));
    await clip(page, "04-hasil-titik", { x: panel.x, y: panel.y, width: panel.width, height: Math.min(panel.height, 560) });
  }

  await page.getByPlaceholder("Contoh: 0.0332").fill("0.0369");
  await page.getByPlaceholder("Contoh: 0.000092").fill("0.000118");
  await page.getByRole("button", { name: /Tambah Titik Ke-2/ }).click();
  await page.getByText(/Grafik Tren Nilai ISPU/).first().waitFor();
  await settle(page, 1200);
  await element(page, form, "04-form-multi");
  {
    const t = page.getByText(/Grafik Tren Nilai ISPU/).first();
    const panel = await pageBox(outerPaperOf(t));
    await clip(page, "04-hasil-multi", { x: panel.x, y: panel.y, width: panel.width, height: Math.min(panel.height, 660) });
  }

  }

  await browser.close();
  const prev = await readFile(SHOTS_JSON, "utf8").then(JSON.parse).catch(() => ({}));
  await writeFile(SHOTS_JSON, JSON.stringify({ ...prev, ...sizes }, null, 2) + "\n");
  console.log(`\nSelesai. ${Object.keys(sizes).length} gambar di ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
