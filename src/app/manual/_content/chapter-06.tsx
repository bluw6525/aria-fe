import {
  Col,
  Cols,
  H3,
  P,
  PageHead,
  Shot,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "6";
const CH = "Bantuan dan Informasi";

const BOX: [number, number, number, number] = [27, 13.5, 66, 52];

export const chapter06: PageDesc[] = [
  {
    kind: "page",
    id: "c6-bantuan",
    chapterNo: NO,
    chapter: CH,
    toc: "Halaman Bantuan",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Halaman Bantuan" />
        <P>
          Halaman Bantuan memuat empat tab informasi yang dapat dibuka tanpa
          masuk sebagai administrator. Tab dipilih dengan menekan namanya pada
          deretan tab di bagian atas. Isi setiap tab selaras dengan teori singkat
          pada Bab 1, sehingga pengguna dapat membacanya langsung di dalam
          aplikasi.
        </P>
        <Cols template="1fr 1fr" gap="9mm" style={{ rowGap: "4mm", justifyItems: "center" }}>
          <Shot
            name="07-bantuan-1"
            width="98mm"
            box={BOX}
            n="6.1"
            caption="Tab Cara Penggunaan: tiga langkah memilih model, memasukkan data, dan membaca hasil."
          />
          <Shot
            name="07-bantuan-2"
            width="98mm"
            box={BOX}
            n="6.2"
            caption="Tab Dasar Teori MM-Estimator: perbandingan M, S, dan MM-Estimator."
          />
          <Shot
            name="07-bantuan-3"
            width="98mm"
            box={BOX}
            n="6.3"
            caption="Tab Dampak Polusi dan Prekursor: peran CO, NO2, dan ozon permukaan."
          />
          <Shot
            name="07-bantuan-4"
            width="98mm"
            box={BOX}
            n="6.4"
            caption="Tab Kategori Standar ISPU: tabel rentang, arti, dan saran."
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-riwayat",
    chapterNo: NO,
    chapter: CH,
    toc: "Riwayat Perancang",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Riwayat Perancang" />
        <Cols template="150mm 1fr" gap="10mm">
          <Shot
            name="08-riwayat"
            width="150mm"
            box={[27, 13.5, 66, 56]}
            n="6.5"
            caption="Halaman Riwayat Perancang."
          />
          <Col>
            <P>
              Halaman Riwayat Perancang memperkenalkan perancang sistem Aria,
              yaitu mahasiswa Teknik Informatika Universitas Tarumanagara.
              Halaman memuat nama, nomor induk mahasiswa, uraian latar belakang
              pengembangan, dan daftar dosen pembimbing. Halaman bersifat
              informasi dan tidak memiliki isian yang perlu diisi.
            </P>
            <H3>Informasi yang tersedia</H3>
            <Table
              head={["Bagian", "Isi"]}
              widths={["38%", "62%"]}
              compact
              rows={[
                ["Identitas", "Nama perancang, NIM, dan institusi"],
                ["Latar belakang", "Alasan Aria dikembangkan dan manfaat yang dituju"],
                ["Dosen Pembimbing", "Dua dosen pembimbing penelitian"],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-pesan",
    chapterNo: NO,
    chapter: CH,
    toc: "Pesan pada layar dan penanganannya",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Pesan pada Layar dan Penanganannya" />
        <P>
          Aria menampilkan notifikasi singkat di sudut layar setelah sebuah aksi
          berhasil atau gagal. Tabel berikut mencantumkan pesan yang paling
          sering muncul beserta cara menanganinya. Semua penanganan dilakukan
          dari layar tanpa mengubah pengaturan apa pun.
        </P>
        <Table
          head={["Pesan atau kondisi", "Penyebab", "Yang dilakukan"]}
          widths={["27%", "35%", "38%"]}
          rows={[
            ["Tombol Jalankan Estimasi tidak dapat ditekan", "Berkas atau nilai CO dan NO2 belum terisi, atau model belum dipilih", "Lengkapi isian dan pilih model pada Pilih Model Estimasi"],
            ["Pilihan model tertulis Belum ada model tersimpan", "Administrator belum menyimpan model", "Minta administrator melatih dan menyimpan model"],
            ["Berkas Diperlukan", "Tombol aksi ditekan tanpa berkas", "Unggah berkas .xlsx, .csv, atau .xls"],
            ["Input Tidak Valid", "Kolom CO atau NO2 berisi huruf atau kosong", "Ketik bilangan dengan tanda titik sebagai desimal"],
            ["Estimasi Gagal atau Pelatihan Model Gagal", "Kolom berkas tidak sesuai atau isi berkas tidak terbaca", "Periksa nama kolom CO satelit, NO2 satelit, dan O3 SPKU, lalu unggah ulang"],
            ["Hasil Estimasi Direset", "Model diganti saat titik manual sudah tercatat", "Isi ulang titik dengan model yang dipilih"],
            ["Menu Latih dan Uji tidak tampil", "Belum masuk sebagai administrator", "Masuk melalui halaman Login Administrator"],
            ["Model Belum Dilatih", "Tombol Simpan ditekan sebelum Latih Model", "Tekan Latih Model terlebih dahulu"],
            ["Nama Model Kosong", "Kolom nama kosong saat menyimpan", "Isi nama model, lalu simpan lagi"],
            ["Algoritma Belum Dipilih atau Input Tidak Valid (Massal)", "Tidak ada algoritma tercentang atau iterasi di luar 1 sampai 1000", "Centang minimal satu algoritma dan atur iterasi"],
            ["Sesi Belum Dipilih", "Tampilkan Data Sesi Terpilih ditekan tanpa memilih sesi", "Pilih satu sesi pada daftar, lalu tekan tombol"],
          ]}
        />
      </>
    ),
  },
];
