import {
  Callout,
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

const NO = "5";
const CH = "Persiapan Administrator";

export const administratorAkses: PageDesc[] = [
  {
    kind: "page",
    id: "b1-akses",
    part: "B",
    chapterNo: NO,
    chapter: CH,
    toc: "Hak akses dan persiapan data",
    body: (
      <>
        <PageHead kicker="Bab 5" title="Hak Akses dan Persiapan Data" />
        <Cols template="1fr 54mm" gap="10mm">
          <Col>
            <P>
              Administrator memakai Aria untuk membuat model yang mengubah kadar
              CO dan NO2 satelit menjadi ISPU ozon. Setelah masuk dengan akun
              khusus, dua menu tambahan terbuka, yaitu <Ui>Latih dan Uji</Ui>{" "}
              serta <Ui>Pelatihan Massal</Ui>. Model yang disimpan administrator
              menjadi model aktif, dan model aktif itulah yang dipakai peta
              Estimasi ISPU bagi seluruh pengguna. Model baru yang disimpan
              menggantikan model aktif sebelumnya.
            </P>
            <Table
              head={["Menu", "Fungsi", "Pengguna", "Admin"]}
              widths={["24%", "52%", "12%", "12%"]}
              compact
              rows={[
                ["Beranda", "Ringkasan tujuan dan fitur aplikasi", "Ya", "Ya"],
                ["Estimasi ISPU", "Peta ISPU, rincian wilayah, dan proyeksi dua hari", "Ya", "Ya"],
                ["Latih dan Uji", "Melatih satu model, mendeteksi outlier, dan mengujinya", "Tidak", "Ya"],
                ["Pelatihan Massal", "Membandingkan beberapa metode pada banyak pembagian data", "Tidak", "Ya"],
                ["Bantuan", "Cara penggunaan, teori, dan kategori ISPU", "Ya", "Ya"],
                ["Riwayat Perancang", "Profil perancang dan dosen pembimbing", "Ya", "Ya"],
              ]}
            />
            <H3>Format berkas data</H3>
            <Table
              head={["Berkas", "Kolom yang dibaca", "Dipakai pada", "Ketentuan"]}
              widths={["14%", "32%", "26%", "28%"]}
              compact
              rows={[
                [
                  "Data latih",
                  "CO satelit, NO2 satelit, dan O3 SPKU",
                  "Latih dan Uji, Pelatihan Massal",
                  "Pelatihan Massal membutuhkan minimal 20 baris data valid",
                ],
                [
                  "Data uji",
                  "CO satelit, NO2 satelit, dan O3 SPKU",
                  "Latih dan Uji",
                  "Hanya baris dengan ketiga nilai lengkap yang diproses",
                ],
              ]}
            />
            <Cols template="1fr 1fr" gap="8mm">
              <Callout label="Satuan" kind="note">
                CO dan NO2 ditulis dalam mol/m² sesuai produk Sentinel-5P. Nilai
                O3 SPKU adalah ISPU ozon hasil pengukuran stasiun pemantau darat.
              </Callout>
              <Callout label="Data kosong" kind="tip">
                Nilai O3 yang kosong pada data latih diisi otomatis dengan
                interpolasi spline kubik alami. Kotak kuning Pemberitahuan Data
                Interpolasi menyebutkan jumlah barisnya.
              </Callout>
            </Cols>
          </Col>
          <Shot
            name="02-sidebar-admin"
            width="50mm"
            box={[0, 0, 100, 50]}
            n="5.1"
            caption="Menu administrator."
            center
          />
        </Cols>
      </>
    ),
  },
];
