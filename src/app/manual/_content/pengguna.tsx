import {
  Callout,
  Card,
  Cards,
  Col,
  Cols,
  H3,
  P,
  PageHead,
  Shot,
  Table,
  Ui,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "1";
const CH = "Pengenalan Aria";

export const penggunaIntro: PageDesc[] = [
  {
    kind: "page",
    id: "u1-tentang",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Tentang Aria dan menu yang tersedia",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Tentang Aria dan Menu yang Tersedia" />
        <Cols template="1fr 62mm" gap="12mm">
          <Col>
            <P>
              Aria (Atmospheric Regression ISPU Application) adalah aplikasi web
              untuk memperkirakan Indeks Standar Pencemar Udara (ISPU) ozon
              permukaan di DKI Jakarta. Masukannya berupa kadar karbon monoksida
              (CO) dan nitrogen dioksida (NO2) hasil pengamatan satelit
              Sentinel-5P dengan satuan mol/m². Aria mengubah kedua nilai
              tersebut menjadi angka ISPU beserta kategori kualitas udaranya.
              Lima wilayah administrasi Jakarta ditampilkan pada satu peta,
              sehingga gambaran mutu udara dapat dibaca tanpa stasiun pemantau
              darat di setiap wilayah.
            </P>
            <P>
              Aplikasi dibuka melalui browser di komputer, tablet, atau ponsel
              tanpa instalasi tambahan. Data satelit dan model estimasi sudah
              tersimpan di aplikasi, sehingga pengguna cukup memilih tanggal dan
              wilayah. Tidak ada berkas yang perlu disiapkan dan tidak ada nilai
              yang perlu diketik.
            </P>
            <H3>Menu untuk pengguna umum</H3>
            <Table
              head={["Menu", "Fungsi"]}
              widths={["26%", "74%"]}
              compact
              rows={[
                ["Beranda", "Ringkasan tujuan dan fitur aplikasi, serta tombol pintas ke menu lain"],
                ["Estimasi ISPU", "Peta ISPU lima wilayah, rincian tren harian, dan proyeksi dua hari ke depan"],
                ["Bantuan", "Cara penggunaan, teori singkat, dampak polusi, dan tabel kategori ISPU"],
                ["Riwayat Perancang", "Profil perancang aplikasi dan dosen pembimbing"],
              ]}
            />
          </Col>
          <Shot
            name="02-sidebar-pengguna"
            width="58mm"
            box={[0, 0, 100, 50]}
            n="1.1"
            caption="Menu di sisi kiri layar."
            center
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "u1-alur",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Alur penggunaan",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Alur Penggunaan" />
        <Cards cols={4}>
          <Card n="1" title="Buka aplikasi">
            <p>
              Kunjungi alamat Aria pada browser. Halaman Beranda tampil lebih
              dahulu dan menu tersedia di sisi kiri.
            </p>
          </Card>
          <Card n="2" title="Buka peta">
            <p>
              Tekan <Ui>Estimasi ISPU</Ui>. Peta lima wilayah Jakarta muncul
              dengan nilai ISPU pada tanggal hari ini.
            </p>
          </Card>
          <Card n="3" title="Pilih wilayah">
            <p>
              Atur <Ui>Basis Tanggal</Ui> bila perlu, lalu klik wilayah pada
              peta atau pada kartu wilayah di bawah peta.
            </p>
          </Card>
          <Card n="4" title="Baca rincian">
            <p>
              Panel rincian memuat proyeksi dua hari, grafik tren, dan tabel
              observasi harian wilayah terpilih.
            </p>
          </Card>
        </Cards>
        <H3>Data yang dipakai aplikasi</H3>
        <Table
          head={["Bahan", "Isi", "Sumber"]}
          widths={["20%", "50%", "30%"]}
          rows={[
            [
              "Data satelit",
              "Kadar CO dan NO2 harian pada setiap wilayah, dalam mol/m²",
              "Produk Sentinel-5P yang disimpan di basis data Aria",
            ],
            [
              "Model estimasi",
              "Persamaan regresi robust yang mengubah kadar CO dan NO2 menjadi ISPU ozon",
              "Model aktif yang disimpan administrator",
            ],
            [
              "Hasil",
              "Nilai ISPU, kategori mutu udara, dan proyeksi dua hari ke depan",
              "Dihitung Aria saat wilayah dipilih",
            ],
          ]}
        />
        <Cols template="1fr 1fr" gap="8mm">
          <Callout label="Satuan" kind="note">
            CO dan NO2 ditulis dalam mol/m² sesuai produk Sentinel-5P. Nilai ISPU
            tidak bersatuan dan dibaca bersama kategorinya.
          </Callout>
          <Callout label="Hari tanpa data" kind="tip">
            Tutupan awan atau tidak adanya orbit membuat sebagian tanggal tanpa
            data valid. Aria lalu menampilkan pengamatan valid terdekat dan
            menuliskan tanggalnya pada peta.
          </Callout>
        </Cols>
        <P muted>
          Seluruh tangkapan layar pada buku manual diambil pada 17 November 2026.
          Angka pada layar pengguna dapat berbeda sesuai tanggal, data satelit
          yang tersedia, dan model aktif.
        </P>
      </>
    ),
  },
];

export const penggunaTeori: PageDesc[] = [
  {
    kind: "page",
    id: "u1-teori",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Teori singkat: dari data satelit ke ISPU dan proyeksi",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Teori Singkat: dari Data Satelit ke ISPU dan Proyeksi" />
        <Cols template="1fr 1fr" gap="10mm">
          <Col>
            <H3>Data satelit Sentinel-5P</H3>
            <P>
              Sentinel-5P adalah satelit pemantau atmosfer milik Badan Antariksa
              Eropa. Instrumen di dalamnya mengukur jumlah gas CO dan NO2 pada
              kolom udara di atas permukaan, hampir setiap hari untuk wilayah
              yang sama. Aria menyimpan nilai rata-rata setiap wilayah
              administrasi Jakarta. Awan tebal dapat menutupi sensor, sehingga
              sebagian tanggal tidak memiliki nilai yang sah.
            </P>
            <H3>Dari kadar gas ke ISPU</H3>
            <P>
              Ozon permukaan terbentuk ketika sinar matahari memicu reaksi antara
              NO2, CO, dan gas lain di udara. Karena itu kadar CO dan NO2 dapat
              dipakai untuk memperkirakan ISPU ozon. Hubungan keduanya dipelajari
              dari data latih yang memuat pengukuran satelit dan pengukuran
              stasiun pemantau darat. Hubungan tersebut disimpan sebagai model
              regresi robust, yaitu model yang tidak mudah bergeser oleh
              pengamatan ekstrem.
            </P>
            <H3>Proyeksi dua hari</H3>
            <P>
              Proyeksi memakai rata-rata tiga pengamatan valid terakhir pada
              setiap gas. Rata-rata tersebut menjadi nilai CO dan NO2 untuk hari
              berikutnya, lalu proses diulang satu kali untuk hari lusa. Kedua
              nilai gas dimasukkan ke model sehingga muncul ISPU untuk Besok (H+1)
              dan Lusa (H+2). Metode tersebut dinamakan rata-rata bergerak.
            </P>
          </Col>
          <Col>
            <H3>Istilah yang muncul di layar</H3>
            <Table
              head={["Istilah", "Arti"]}
              widths={["30%", "70%"]}
              compact
              rows={[
                ["Estimasi ISPU", "Angka ISPU ozon hasil hitungan model dari data satelit, bukan hasil ukur stasiun darat."],
                ["Observasi Historis", "Nilai ISPU dari pengamatan satelit pada tanggal yang sudah lewat."],
                ["Proyeksi", "Perkiraan ISPU untuk Besok (H+1) dan Lusa (H+2) dari pola tiga pengamatan terakhir."],
                ["Observasi terdekat", "Pengamatan valid terbaru yang dipakai saat tanggal terpilih tidak punya data."],
                ["Tutupan awan", "Kondisi awan tebal yang membuat satelit tidak dapat menghasilkan nilai CO dan NO2."],
                ["Selisih (delta)", "Beda nilai proyeksi terhadap ISPU observasi terakhir. Tanda plus berarti naik."],
              ]}
            />
            <Callout label="Batas proyeksi" kind="note">
              Proyeksi hanya melanjutkan pola pengamatan terbaru. Perubahan cuaca,
              kebakaran, atau kejadian pencemaran mendadak tidak masuk ke dalam
              hitungan, sehingga angka proyeksi dibaca sebagai gambaran
              kecenderungan.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
];
