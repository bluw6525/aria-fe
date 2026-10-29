import {
  Bullets,
  Callout,
  Chip,
  Col,
  Cols,
  Eq,
  Fig,
  H3,
  Ic,
  Legend,
  P,
  PageHead,
  Steps,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "06 Estimasi ISPU";

export const chapter06: PageDesc[] = [
  {
    kind: "opener",
    id: "c6",
    number: "06",
    title: "Estimasi ISPU",
    lead: "Menghitung nilai dan kategori ISPU dari model tersimpan, baik untuk satu berkas satelit utuh maupun untuk titik yang dimasukkan sendiri. Halaman Estimasi terbuka bagi semua pengguna.",
    items: [
      { label: "Estimasi dari berkas satelit", id: "c6-berkas" },
      { label: "Estimasi titik tunggal", id: "c6-titik" },
      { label: "Estimasi multi-titik", id: "c6-multi" },
      { label: "Rumus dan kategori ISPU", id: "c6-ispu" },
    ],
  },
  {
    kind: "page",
    id: "c6-berkas",
    chapter: CH,
    toc: "Estimasi dari berkas satelit",
    body: (
      <>
        <PageHead kicker="Bab 06" title="Estimasi dari Berkas Satelit" />
        <Cols template="70mm 1fr" gap="10mm">
          <Col>
            <Fig
              name="11-estimasi-berkas-form"
              width="70mm"
              n="6.1"
              caption="Mode Upload Data Satelit."
            />
            <Steps>
              <li>
                Pilih <b>Upload Data Satelit</b> pada Pilih Jenis Input.
              </li>
              <li>
                Unggah berkas CSV atau Excel yang memuat kolom CO dan NO2.
              </li>
              <li>
                Pilih model pada <b>Pilih Model Estimasi</b>, lalu tekan{" "}
                <b>Jalankan Estimasi</b>.
              </li>
            </Steps>
          </Col>
          <Col>
            <Fig
              name="11-estimasi-berkas-hasil"
              width="124mm"
              n="6.2"
              caption="Hasil estimasi untuk 60 baris data satelit."
            />
            <P>
              Panel hasil memuat empat kartu: total sampel, rata-rata ISPU,
              rentang ISPU, dan kategori dominan. Persamaan model ditampilkan di
              bawah kartu, diikuti grafik tren nilai ISPU per observasi. Tombol{" "}
              <b>Estimasi Ulang</b> mengosongkan hasil agar berkas atau model
              lain dapat dipakai.
            </P>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-titik",
    chapter: CH,
    toc: "Estimasi titik tunggal",
    body: (
      <>
        <PageHead kicker="Bab 06" title="Estimasi Titik Tunggal" />
        <Cols template="64mm 1fr" gap="10mm">
          <Col>
            <Fig
              name="12-estimasi-manual-form"
              width="64mm"
              n="6.3"
              caption="Mode Input Manual dengan satu titik tercatat."
            />
            <P>
              Hasil titik tunggal berbentuk kartu besar berisi nilai ISPU dan
              kategorinya. Panel di sebelah kartu menguraikan dampak kesehatan
              menurut Permen LHK No. 14/2020. Persamaan model dan nama model
              tampil di bagian bawah.
            </P>
          </Col>
          <Col>
            <Steps>
              <li>
                Pilih <b>Input Manual</b>, lalu isi{" "}
                <b>Konsentrasi CO (mol/m²)</b> dan{" "}
                <b>Konsentrasi NO2 (mol/m²)</b>. Kolom menerima angka desimal
                dan notasi ilmiah, misalnya <Ic>9.2e-5</Ic>.
              </li>
              <li>
                Pilih model, lalu tekan <b>Jalankan Estimasi</b>. Tombol aktif
                setelah model dipilih dan kedua kolom terisi. Kartu{" "}
                <b>Tercatat: 1 titik manual</b> menandakan titik sudah masuk.
              </li>
              <li>
                Tekan <b>Reset Titik</b> untuk menghapus titik dan memulai lagi.
              </li>
            </Steps>
            <Fig
              name="12-estimasi-manual-hasil"
              width="116mm"
              n="6.4"
              caption="Hasil titik tunggal: nilai ISPU 54.7 dengan kategori Sedang."
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-multi",
    chapter: CH,
    toc: "Estimasi multi-titik",
    body: (
      <>
        <PageHead kicker="Bab 06" title="Estimasi Multi-titik" />
        <Cols template="64mm 1fr" gap="10mm">
          <Col>
            <Fig
              name="13-estimasi-multi-form"
              width="64mm"
              n="6.5"
              caption="Mode Input Manual dengan dua titik tercatat."
            />
            <Bullets>
              <li>
                Kartu ringkasan memuat total sampel, rata-rata, rentang, dan
                kategori dominan.
              </li>
              <li>
                <b>Reset Riwayat</b> menghapus seluruh titik yang sudah
                tercatat.
              </li>
            </Bullets>
          </Col>
          <Col>
            <P>
              Mode manual menyimpan titik secara berurutan. Setelah satu titik
              dihitung, tombol di bawah formulir berganti nama menjadi{" "}
              <b>Tambah Titik Ke-2</b>. Tombol itu aktif kembali ketika kolom CO
              dan NO2 terisi dengan nilai baru. Setiap penambahan menaikkan
              nomor titik dan menambah satu observasi pada grafik, dan
              ringkasan berubah menjadi tampilan multi-titik begitu titik
              kedua masuk.
            </P>
            <Fig
              name="13-estimasi-multi-hasil"
              width="92mm"
              n="6.6"
              caption="Hasil multi-titik untuk dua observasi manual."
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-ispu",
    chapter: CH,
    toc: "Rumus dan kategori ISPU",
    body: (
      <>
        <PageHead kicker="Bab 06" title="Rumus dan Kategori ISPU" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <P>
              Nilai ISPU dihitung dari koefisien model yang dipilih. Hasil
              dipotong pada angka 0 agar tidak pernah negatif, lalu dibulatkan
              ke satu angka desimal. Nilai yang sudah dibulatkan itulah yang
              menentukan kategori.
            </P>
            <Eq tag="(7)">
              ISPU = maks(0,&nbsp;<i>β</i>
              <sub>0</sub> + <i>β</i>
              <sub>1</sub> <i>CO</i> + <i>β</i>
              <sub>2</sub> <i>NO</i>
              <sub>2</sub>)
            </Eq>
            <Legend
              items={[
                [<>β<sub>0</sub></>, "intercept model"],
                [<>β<sub>1</sub>, β<sub>2</sub></>, "koefisien CO dan NO2 dari model tersimpan"],
                [<i key="c">CO, NO<sub>2</sub></i>, "kolom vertikal Sentinel-5P dalam mol/m²"],
              ]}
            />
            <H3>Contoh perhitungan</H3>
            <P>
              Model pada Gambar 4.3 dengan CO = 0,0332 mol/m² dan NO2 =
              0,000092 mol/m² menghasilkan nilai berikut. Hasil 54.7 masuk
              rentang 51 sampai 100 sehingga kategorinya Sedang, sama dengan
              Gambar 6.4.
            </P>
            <Eq>
              ISPU = maks(0, −109.1022 + 3171.9463 × 0.0332 + 635334.3901 ×
              0.000092) = 54.7
            </Eq>
            <Callout label="Kategori dominan" kind="note">
              Pada estimasi berkas, kategori dominan adalah kategori dengan
              jumlah baris terbanyak. Jumlah baris untuk kelima kategori dihitung
              sendiri oleh server dan dikirim bersama hasil.
            </Callout>
          </Col>
          <Col>
            <H3>Kategori menurut Permen LHK No. 14/2020</H3>
            <Table
              head={["Kategori", "Rentang", "Saran"]}
              widths={["30%", "22%", "48%"]}
              rows={[
                [<Chip key="a" tone="baik">Baik</Chip>, "0 – 50", "Aman untuk seluruh aktivitas luar ruangan"],
                [<Chip key="b" tone="sedang">Sedang</Chip>, "51 – 100", "Kelompok sangat sensitif membatasi paparan lama"],
                [<Chip key="c" tone="tidak">Tidak Sehat</Chip>, "101 – 200", "Kurangi aktivitas fisik berat di luar ruangan"],
                [<Chip key="d" tone="sangat">Sangat Tidak Sehat</Chip>, "201 – 300", "Hindari aktivitas luar ruangan yang lama dan pakai masker"],
                [<Chip key="e" tone="bahaya">Berbahaya</Chip>, "> 300", "Tetap di dalam ruangan dan tutup ventilasi udara luar"],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
];
