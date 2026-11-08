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

export const penggunaTentang: PageDesc[] = [
  {
    kind: "page",
    id: "u1-tentang",
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
              Wilayah yang belum terjangkau stasiun pemantau darat dengan
              demikian tetap memperoleh gambaran mutu udara.
            </P>
            <P>
              Aplikasi dibuka melalui browser tanpa instalasi tambahan. Seluruh
              menu pada buku manual terbuka langsung setelah alamat aplikasi
              dikunjungi. Model yang dipakai untuk menghitung ISPU
              sudah disiapkan sebelumnya dan muncul sebagai pilihan pada menu
              Estimasi ISPU.
            </P>
            <H3>Menu untuk pengguna umum</H3>
            <Table
              head={["Menu", "Fungsi"]}
              widths={["26%", "74%"]}
              compact
              rows={[
                ["Beranda", "Ringkasan tujuan dan fitur aplikasi, serta tombol pintas ke menu lain"],
                ["Estimasi ISPU", "Menghitung ISPU dari berkas data satelit atau dari nilai CO dan NO2 yang diketik"],
                ["Bantuan", "Cara penggunaan, teori singkat, dan tabel kategori ISPU"],
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
];

export const penggunaAlur: PageDesc[] = [
  {
    kind: "page",
    id: "u1-alur",
    chapterNo: NO,
    chapter: CH,
    toc: "Alur penggunaan dan persiapan data",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Alur Penggunaan dan Persiapan Data" />
        <Cards cols={4}>
          <Card n="1" title="Buka aplikasi">
            <p>
              Kunjungi alamat Aria pada browser di komputer, tablet, atau
              ponsel. Halaman Beranda tampil lebih dahulu.
            </p>
          </Card>
          <Card n="2" title="Pilih menu">
            <p>
              Tekan <Ui>Estimasi ISPU</Ui> pada menu di sisi kiri, lalu pilih
              jenis input yang diinginkan.
            </p>
          </Card>
          <Card n="3" title="Isi data dan model">
            <p>
              Unggah berkas atau ketik nilai CO dan NO2, kemudian pilih model
              estimasi pada daftar pilihan.
            </p>
          </Card>
          <Card n="4" title="Baca hasil">
            <p>
              Tekan <Ui>Jalankan Estimasi</Ui>. Nilai, kategori, grafik, dan
              tabel muncul pada panel hasil.
            </p>
          </Card>
        </Cards>
        <H3>Dua cara memasukkan data</H3>
        <Table
          head={["Jenis input", "Yang disiapkan", "Cocok untuk"]}
          widths={["22%", "46%", "32%"]}
          rows={[
            [
              "Upload Data Satelit",
              "Berkas .xlsx, .xls, atau .csv dengan kolom CO satelit dan NO2 satelit. Kolom Tanggal bersifat opsional dan dipakai sebagai label sumbu grafik",
              "Banyak pengamatan sekaligus; setiap baris mewakili satu pengamatan",
            ],
            [
              "Input Manual",
              "Dua angka: kadar CO dan kadar NO2 dalam mol/m². Titik dapat ditambah satu per satu",
              "Satu atau beberapa titik pengamatan",
            ],
          ]}
        />
        <Cols template="1fr 1fr" gap="8mm">
          <Callout label="Satuan" kind="note">
            CO dan NO2 ditulis dalam mol/m² sesuai produk Sentinel-5P. Gunakan
            titik sebagai pemisah desimal, misalnya 0.0345.
          </Callout>
          <Callout label="Model" kind="tip">
            Pilihan model berisi model yang sudah tersimpan di aplikasi. Bila
            daftar kosong, muat ulang halaman atau hubungi pengelola aplikasi.
          </Callout>
        </Cols>
        <P muted>
          Seluruh tangkapan layar pada buku manual memakai berkas contoh dan
          sebuah model contoh. Angka pada layar pengguna akan berbeda sesuai data
          dan model yang dipilih.
        </P>
      </>
    ),
  },
];
