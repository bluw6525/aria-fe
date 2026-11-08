import {
  Callout,
  Chip,
  Col,
  Cols,
  H3,
  MarkList,
  P,
  PageHead,
  Shot,
  type ShotName,
  Steps,
  Table,
  Ui,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "3";
const CH = "Estimasi ISPU";

/** hero: tangkapan layar halaman Estimasi ISPU yang dipakai pada halaman pertama bab. */
export function buildChapter03(hero: ShotName): PageDesc[] {
  return [
    {
      kind: "page",
      id: "c3-halaman",
      chapterNo: NO,
      chapter: CH,
      toc: "Mengenal halaman Estimasi ISPU",
      body: (
        <>
          <PageHead kicker="Bab 3" title="Mengenal Halaman Estimasi ISPU" />
          <Cols template="160mm 1fr" gap="9mm">
            <Shot
              name={hero}
              width="160mm"
              n="3.1"
              caption="Halaman Estimasi ISPU setelah estimasi dari berkas dijalankan."
              marks={[
                { n: 1, x: 22.3, y: 22.7 },
                { n: 2, x: 22.3, y: 32.7 },
                { n: 3, x: 22.3, y: 41.7 },
                { n: 4, x: 22.3, y: 48 },
                { n: 5, x: 50.8, y: 18 },
                { n: 6, x: 93, y: 19.1 },
                { n: 7, x: 50.8, y: 28.9 },
                { n: 8, x: 50.8, y: 39.6 },
                { n: 9, x: 51.4, y: 47 },
                { n: 10, x: 50.8, y: 82 },
              ]}
            />
            <Col>
              <MarkList
                items={[
                  [
                    "Pilih Jenis Input.",
                    "Beralih antara Upload Data Satelit dan Input Manual.",
                  ],
                  [
                    "Isian data.",
                    "Kolom unggah berkas, atau dua kolom nilai CO dan NO2 pada mode manual.",
                  ],
                  [
                    "Pilih Model Estimasi.",
                    "Daftar model yang sudah disimpan administrator.",
                  ],
                  [
                    "Jalankan Estimasi.",
                    "Tombol aksi. Tombol aktif setelah data dan model terisi.",
                  ],
                  [
                    "Hasil Estimasi ISPU.",
                    "Judul panel dan nama model yang dipakai.",
                  ],
                  ["Reset.", "Membersihkan hasil dan berkas yang dipilih."],
                  [
                    "Kartu ringkasan.",
                    "Total sampel, rata-rata ISPU, dan rentang ISPU.",
                  ],
                  ["Persamaan.", "Catatan persamaan model yang dipakai."],
                  ["Grafik tren.", "Nilai ISPU setiap observasi."],
                  [
                    "Daftar data hasil.",
                    "Tabel nilai, kategori, dan label setiap baris.",
                  ],
                ]}
              />
            </Col>
          </Cols>
        </>
      ),
    },
    {
      kind: "page",
      id: "c3-berkas",
      chapterNo: NO,
      chapter: CH,
      toc: "Estimasi dari berkas satelit",
      body: (
        <>
          <PageHead kicker="Bab 3" title="Estimasi dari Berkas Satelit" />
          <Cols template="1fr 90mm" gap="10mm">
            <Col>
              <P>
                Mode unggah berkas dipakai untuk menghitung ISPU banyak hari
                sekaligus. Berkas memuat satu baris untuk setiap pengamatan
                dengan kolom CO satelit dan NO2 satelit. Kolom Tanggal, bila
                ada, dipakai sebagai label pada grafik dan tabel. Hasil tampil
                pada panel kanan setelah proses selesai.
              </P>
              <Steps>
                <li>
                  Pastikan tab <Ui>Upload Data Satelit</Ui> aktif pada{" "}
                  <Ui>Pilih Jenis Input</Ui>.
                </li>
                <li>
                  Tekan kolom <Ui>Unggah Berkas Satelit Sentinel-5P</Ui>, lalu
                  pilih berkas .xlsx, .csv, atau .xls. Nama dan ukuran berkas
                  tampil pada kolom, dan tanda silang merah di ujung kanan
                  membatalkan pilihan.
                </li>
                <li>
                  Pilih model pada <Ui>Pilih Model Estimasi</Ui>. Model bawaan
                  terpilih otomatis, dan jumlah model tersedia tertulis di
                  samping judul pilihan.
                </li>
                <li>
                  Tekan <Ui>Jalankan Estimasi</Ui>. Tombol berubah menjadi
                  Memproses Estimasi selama perhitungan, lalu notifikasi
                  Estimasi Satelit Selesai muncul bersama jumlah sampel yang
                  dihitung.
                </li>
              </Steps>
              <Callout label="Model kosong" kind="warn">
                Bila pilihan model menampilkan tulisan Belum ada model
                tersimpan, hubungi administrator agar sebuah model disimpan
                terlebih dahulu.
              </Callout>
            </Col>
            <Shot
              name="04-form-berkas"
              width="90mm"
              n="3.2"
              caption="Isian estimasi dari berkas."
              marks={[
                { n: 1, x: 5, y: 21.5 },
                { n: 2, x: 5, y: 48 },
                { n: 3, x: 5, y: 68.4 },
                { n: 4, x: 5, y: 87.7 },
              ]}
            />
          </Cols>
        </>
      ),
    },
    {
      kind: "page",
      id: "c3-hasil-berkas",
      chapterNo: NO,
      chapter: CH,
      toc: "Membaca hasil estimasi dari berkas",
      body: (
        <>
          <PageHead kicker="Bab 3" title="Membaca Hasil Estimasi dari Berkas" />
          <Cols template="118mm 1fr" gap="10mm">
            <Shot
              name="04-hasil-berkas"
              width="118mm"
              n="3.3"
              caption="Panel hasil estimasi dari berkas, bagian atas."
              marks={[
                { n: 1, x: 90, y: 7.6 },
                { n: 2, x: 18.5, y: 23 },
                { n: 3, x: 3, y: 40.2 },
                { n: 4, x: 4.4, y: 52.3 },
              ]}
            />
            <Col>
              <MarkList
                items={[
                  [
                    "Reset.",
                    "Menghapus hasil dan berkas agar estimasi baru dapat dimulai.",
                  ],
                  [
                    "Kartu ringkasan.",
                    "Total sampel adalah jumlah baris yang dihitung. Rata-rata ISPU dan rentang ISPU menunjukkan nilai tengah serta nilai terendah sampai tertinggi.",
                  ],
                  [
                    "Persamaan estimasi.",
                    "Rumus model ditampilkan sebagai catatan dan tidak perlu dihitung manual.",
                  ],
                  [
                    "Grafik tren.",
                    "Sumbu mendatar berisi tanggal atau label baris, sumbu tegak berisi nilai ISPU dari 0 sampai 100 atau lebih.",
                  ],
                ]}
              />
              <H3>Tabel Daftar Data Hasil Estimasi ISPU</H3>
              <Table
                head={["Kolom", "Isi"]}
                widths={["32%", "68%"]}
                compact
                rows={[
                  ["#", "Nomor urut baris"],
                  ["Waktu / Label", "Tanggal dari berkas atau nomor baris"],
                  ["CO dan NO2 (mol/m²)", "Nilai masukan dari berkas"],
                  ["Estimasi ISPU", "Nilai ISPU hasil model"],
                  [
                    "Kategori ISPU",
                    <span
                      key="k"
                      style={{
                        display: "inline-flex",
                        gap: "1.4mm",
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip tone="baik">Baik</Chip>
                      <Chip tone="sedang">Sedang</Chip>
                      <Chip tone="tidak">Tidak Sehat</Chip>
                    </span>,
                  ],
                ]}
              />
              <P muted>
                Tabel menampilkan sampel baris pertama sebagai pratinjau,
                sedangkan kartu dan grafik mewakili seluruh baris berkas.
              </P>
            </Col>
          </Cols>
        </>
      ),
    },
    {
      kind: "page",
      id: "c3-manual",
      chapterNo: NO,
      chapter: CH,
      toc: "Input manual satu titik",
      body: (
        <>
          <PageHead kicker="Bab 3" title="Input Manual Satu Titik" />
          <Cols template="1fr 66mm 102mm" gap="8mm">
            <Col>
              <P>
                Mode manual cocok untuk menghitung ISPU satu pengamatan tanpa
                menyiapkan berkas. Pengguna cukup mengetik kadar CO dan NO2
                dalam mol/m² dengan tanda titik sebagai pemisah desimal. Hasil
                berupa satu angka ISPU, kategori, dan saran kesehatan.
              </P>
              <Steps>
                <li>
                  Pada <Ui>Pilih Jenis Input</Ui> tekan <Ui>Input Manual</Ui>.
                </li>
                <li>
                  Isi <Ui>Konsentrasi CO (mol/m²)</Ui>, misalnya 0.0332.
                </li>
                <li>
                  Isi <Ui>Konsentrasi NO2 (mol/m²)</Ui>, misalnya 0.000092.
                </li>
                <li>
                  Pilih model, lalu tekan <Ui>Jalankan Estimasi</Ui>.
                </li>
              </Steps>
              <Callout label="Nilai angka" kind="warn">
                Gunakan tanda titik sebagai pemisah desimal. Huruf pada kolom
                memunculkan notifikasi Input Tidak Valid, sedangkan tanda koma
                tidak dibaca sebagai desimal dan memotong nilai yang diketik.
              </Callout>
            </Col>
            <Shot
              name="04-form-manual"
              width="66mm"
              n="3.4"
              caption="Isian input manual."
              marks={[
                { n: 1, x: 6, y: 43.5 },
                { n: 2, x: 6, y: 59.3 },
                { n: 3, x: 6, y: 77.5 },
                { n: 4, x: 6, y: 90.2 },
              ]}
            />
            <Col>
              <Shot
                name="04-hasil-titik"
                width="102mm"
                n="3.5"
                caption="Hasil satu titik: nilai 54.7 berkategori Sedang."
                marks={[
                  { n: 5, x: 4, y: 33 },
                  { n: 6, x: 35, y: 42.9 },
                  { n: 7, x: 48, y: 26.8 },
                ]}
              />
              <MarkList
                start={5}
                items={[
                  ["Nilai ISPU.", "Angka hasil estimasi."],
                  [
                    "Lencana kategori.",
                    "Kategori mutu udara sesuai warna pada Bab 1.",
                  ],
                  ["Dampak kesehatan.", "Uraian dan saran sesuai kategori."],
                ]}
              />
            </Col>
          </Cols>
        </>
      ),
    },
    {
      kind: "page",
      id: "c3-multi",
      chapterNo: NO,
      chapter: CH,
      toc: "Menambah beberapa titik manual",
      body: (
        <>
          <PageHead kicker="Bab 3" title="Menambah Beberapa Titik Manual" />
          <Cols template="1fr 58mm 98mm" gap="8mm">
            <Col>
              <P>
                Setelah satu titik dihitung, kolom CO dan NO2 dikosongkan dan
                tombol aksi berubah menjadi tambah titik berikutnya. Setiap
                titik baru disimpan dalam daftar dengan nama Titik #1, Titik #2,
                dan seterusnya. Mulai titik kedua, panel hasil menampilkan kartu
                ringkasan dan grafik tren seperti pada estimasi dari berkas.
              </P>
              <Steps>
                <li>Isi CO dan NO2 untuk titik berikutnya.</li>
                <li>
                  Tekan tombol <Ui>+ Tambah Titik Ke-N</Ui>, dengan N adalah
                  nomor titik yang akan dihitung.
                </li>
                <li>Baca kartu ringkasan dan grafik pada panel kanan.</li>
                <li>
                  Tekan <Ui>Reset</Ui> pada kotak Tercatat untuk memulai dari
                  awal.
                </li>
              </Steps>
              <Callout label="Ganti model" kind="warn">
                Mengganti model saat titik sudah tercatat menghapus seluruh
                titik dan hasilnya. Notifikasi Hasil Estimasi Direset menandai
                hal tersebut, sehingga semua titik selalu berasal dari satu
                model.
              </Callout>
            </Col>
            <Shot
              name="04-form-multi"
              width="58mm"
              n="3.6"
              caption="Kotak Tercatat dan tombol tambah titik."
              marks={[
                { n: 1, x: 6, y: 63 },
                { n: 2, x: 73, y: 63 },
                { n: 3, x: 6, y: 91.3 },
              ]}
            />
            <Shot
              name="04-hasil-multi"
              width="98mm"
              n="3.7"
              caption="Hasil dua titik: ringkasan dan grafik tren."
              marks={[
                { n: 4, x: 18.5, y: 23 },
                { n: 5, x: 4.4, y: 49.1 },
              ]}
            />
          </Cols>
        </>
      ),
    },
  ];
}

export const chapter03 = buildChapter03("04-estimasi-hero");
