import {
  Callout,
  Chip,
  Col,
  Cols,
  H3,
  P,
  PageHead,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "1";
const CH = "Pengenalan Aria";

export const chapter01: PageDesc[] = [
  {
    kind: "page",
    id: "c1-ispu",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Teori singkat: ISPU dan kategorinya",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Teori Singkat: ISPU dan Kategorinya" />
        <P>
          Indeks Standar Pencemar Udara (ISPU) mengubah kadar suatu polutan
          menjadi satu angka tanpa satuan agar kualitas udara mudah dipahami
          masyarakat. Angka tersebut dikelompokkan ke dalam lima kategori yang
          diatur dalam Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor 14
          Tahun 2020. Semakin besar angkanya, semakin buruk mutu udara dan
          semakin besar risiko bagi kesehatan. Aria memperkirakan ISPU untuk
          polutan ozon permukaan (O3), yaitu gas yang terbentuk dari reaksi sinar
          matahari dengan gas prekursor seperti NO2 dan CO.
        </P>
        <Table
          head={["Kategori", "Rentang ISPU", "Arti mutu udara", "Saran bagi masyarakat"]}
          widths={["17%", "13%", "36%", "34%"]}
          rows={[
            [
              <Chip key="a" tone="baik">Baik</Chip>,
              "0 - 50",
              "Mutu udara sangat baik dan tidak memberikan efek negatif bagi manusia maupun lingkungan.",
              "Sangat aman untuk seluruh aktivitas luar ruangan.",
            ],
            [
              <Chip key="b" tone="sedang">Sedang</Chip>,
              "51 - 100",
              "Mutu udara masih dapat diterima, tetapi kelompok yang sangat sensitif perlu membatasi paparan.",
              "Aman bagi masyarakat umum, kelompok sensitif disarankan waspada.",
            ],
            [
              <Chip key="c" tone="tidak">Tidak Sehat</Chip>,
              "101 - 200",
              "Mutu udara bersifat merugikan bagi manusia ataupun kelompok hewan yang sensitif.",
              "Kurangi aktivitas berat di luar ruangan, terutama bagi anak-anak dan lansia.",
            ],
            [
              <Chip key="d" tone="sangat">Sangat Tidak Sehat</Chip>,
              "201 - 300",
              "Mutu udara dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi.",
              "Hindari aktivitas luar ruangan yang berkepanjangan.",
            ],
            [
              <Chip key="e" tone="bahaya">Berbahaya</Chip>,
              "lebih dari 300",
              "Mutu udara berbahaya dan secara umum dapat merugikan kesehatan serius pada seluruh populasi.",
              "Gunakan masker pelindung dan tetap berada di dalam ruangan.",
            ],
          ]}
        />
        <Callout label="Warna" kind="note">
          Warna lencana kategori pada tabel di atas sama dengan warna yang tampil
          pada hasil estimasi di aplikasi, sehingga kategori dapat dikenali
          dengan cepat.
        </Callout>
      </>
    ),
  },
  {
    kind: "page",
    id: "c1-robust",
    part: "B",
    chapterNo: "B1",
    chapter: "Persiapan Administrator",
    toc: "Teori singkat: regresi robust dan MM-estimator",
    body: (
      <>
        <PageHead kicker="Bab B1" title="Teori Singkat: Regresi Robust dan MM-Estimator" />
        <Cols template="1fr 1fr" gap="10mm">
          <Col>
            <H3>Apa itu regresi</H3>
            <P>
              Regresi mencari hubungan antara variabel masukan dan variabel yang
              diperkirakan. Pada Aria, masukannya adalah kadar CO dan NO2
              satelit, sedangkan yang diperkirakan adalah ISPU ozon. Hubungan
              yang ditemukan dari data latih disimpan sebagai model, lalu model
              dipakai untuk menghitung ISPU dari data satelit baru.
            </P>
            <H3>Apa itu regresi robust</H3>
            <P>
              Data satelit sering memuat nilai ekstrem akibat tutupan awan,
              gangguan sensor, atau kejadian pencemaran sesaat. Regresi klasik
              (OLS) sangat mudah tertarik oleh nilai ekstrem tersebut, sehingga
              hasilnya bergeser dari pola data yang sebenarnya. Regresi robust
              memberi bobot lebih kecil pada pengamatan yang menyimpang, sehingga
              model tetap mengikuti pola mayoritas data.
            </P>
            <H3>Apa itu MM-estimator</H3>
            <P>
              MM-estimator bekerja dalam tiga tahap. Tahap awal menentukan
              perkiraan kasar yang tahan terhadap hingga separuh data
              menyimpang. Tahap berikutnya mengunci ukuran sebaran data yang
              tangguh, lalu tahap akhir menyempurnakan model dengan pembobotan
              berulang agar hasilnya tetap akurat. Kombinasi tersebut membuat
              MM-estimator tahan terhadap outlier sekaligus efisien pada data
              yang berperilaku normal.
            </P>
          </Col>
          <Col>
            <H3>Metode yang tersedia di Aria</H3>
            <Table
              head={["Metode", "Sifat utama"]}
              widths={["28%", "72%"]}
              compact
              rows={[
                ["OLS", "Metode kuadrat terkecil standar. Menjadi pembanding, rentan terhadap outlier."],
                ["M-Estimator", "Tahan terhadap outlier pada nilai O3 (arah vertikal), tetapi kurang tahan bila outlier ada pada CO atau NO2."],
                ["S-Estimator", "Sangat tahan karena mampu menahan hingga 50% data menyimpang, dengan efisiensi lebih rendah."],
                ["MM-Estimator", "Menggabungkan ketahanan S-Estimator dengan efisiensi tinggi dan tahan terhadap outlier."],
              ]}
            />
            <H3>Ukuran ketepatan model</H3>
            <Table
              head={["Ukuran", "Cara membaca"]}
              widths={["28%", "72%"]}
              compact
              rows={[
                ["RMSE", "Rata-rata besar selisih antara nilai sebenarnya dan nilai estimasi, dengan selisih besar diberi penekanan lebih. Makin kecil makin baik."],
                ["MAE", "Rata-rata besar selisih secara langsung. Makin kecil makin baik, dan mudah dibaca sebagai selisih ISPU rata-rata."],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
];
