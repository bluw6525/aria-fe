import {
  Callout,
  Card,
  Cards,
  Chip,
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

export const chapter01: PageDesc[] = [
  {
    kind: "page",
    id: "c1-tentang",
    chapterNo: NO,
    chapter: CH,
    toc: "Tentang Aria dan hak akses",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Tentang Aria dan Hak Akses" />
        <Cols template="1fr 100mm" gap="10mm">
          <Col>
            <P>
              Aria adalah aplikasi web untuk memperkirakan Indeks Standar
              Pencemar Udara (ISPU) ozon permukaan di DKI Jakarta. Masukan
              aplikasi berupa kadar karbon monoksida (CO) dan nitrogen dioksida
              (NO2) hasil pengamatan satelit Sentinel-5P dengan satuan mol/m².
              Aria menghitung nilai ISPU ozon dari kedua gas tersebut memakai
              model regresi robust, lalu menampilkan kategori kualitas udara,
              grafik, dan tabel hasil. Dengan cara tersebut, wilayah yang belum
              terjangkau stasiun pemantau darat tetap memperoleh perkiraan
              kualitas udara.
            </P>
            <P>
              Aplikasi dibuka dalam browser tanpa instalasi tambahan. Pengguna
              umum langsung dapat memakai menu <Ui>Estimasi ISPU</Ui> setelah
              membuka alamat aplikasi. Administrator masuk dengan akun khusus
              untuk memperoleh dua menu tambahan, yaitu <Ui>Latih dan Uji</Ui>{" "}
              serta <Ui>Pelatihan Massal</Ui>, yang dipakai untuk membuat model.
              Model yang disimpan administrator muncul sebagai pilihan pada
              menu Estimasi ISPU bagi semua pengguna.
            </P>
            <Table
              head={["Menu", "Fungsi", "Pengguna", "Admin"]}
              widths={["24%", "52%", "12%", "12%"]}
              compact
              rows={[
                ["Beranda", "Ringkasan tujuan dan fitur aplikasi", "Ya", "Ya"],
                ["Estimasi ISPU", "Menghitung ISPU dari berkas satelit atau nilai manual", "Ya", "Ya"],
                ["Latih dan Uji", "Melatih satu model, mendeteksi outlier, dan mengujinya", "Tidak", "Ya"],
                ["Pelatihan Massal", "Membandingkan beberapa metode pada banyak pembagian data", "Tidak", "Ya"],
                ["Bantuan", "Cara penggunaan, teori, dan kategori ISPU", "Ya", "Ya"],
                ["Riwayat Perancang", "Profil perancang dan dosen pembimbing", "Ya", "Ya"],
              ]}
            />
          </Col>
          <div style={{ display: "flex", gap: "6mm", justifyContent: "center" }}>
            <Shot
              name="02-sidebar-pengguna"
              width="46mm"
              box={[0, 0, 100, 50]}
              n="1.1"
              caption="Menu pengguna umum."
            />
            <Shot
              name="02-sidebar-admin"
              width="46mm"
              box={[0, 0, 100, 50]}
              n="1.2"
              caption="Menu administrator."
            />
          </div>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c1-alur",
    chapterNo: NO,
    chapter: CH,
    toc: "Alur penggunaan dan persiapan data",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Alur Penggunaan dan Persiapan Data" />
        <Cards cols={4}>
          <Card n="1" title="Siapkan data">
            <p>
              Siapkan berkas satelit berformat .xlsx, .xls, atau .csv sesuai
              kebutuhan menu yang dipakai.
            </p>
          </Card>
          <Card n="2" title="Buka menu">
            <p>
              Pilih <Ui>Estimasi ISPU</Ui> untuk menghitung ISPU, atau masuk
              sebagai administrator untuk membuat model.
            </p>
          </Card>
          <Card n="3" title="Pilih model">
            <p>
              Pilih model pada menu pilihan, lalu tekan tombol aksi pada
              panel kiri.
            </p>
          </Card>
          <Card n="4" title="Baca hasil">
            <p>
              Lihat nilai, kategori, grafik, dan tabel pada panel hasil di sisi
              kanan.
            </p>
          </Card>
        </Cards>
        <H3>Format berkas data</H3>
        <Table
          head={["Kebutuhan", "Kolom yang dibaca", "Dipakai pada", "Ketentuan"]}
          widths={["17%", "30%", "23%", "30%"]}
          rows={[
            [
              "Data estimasi",
              "CO satelit dan NO2 satelit. Kolom Tanggal dipakai sebagai label sumbu grafik",
              "Estimasi ISPU",
              "Satu baris mewakili satu pengamatan satelit",
            ],
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
            CO dan NO2 ditulis dalam mol/m² sesuai produk Sentinel-5P. Nilai O3
            SPKU adalah ISPU ozon hasil pengukuran stasiun pemantau darat.
          </Callout>
          <Callout label="Data kosong" kind="tip">
            Nilai O3 yang kosong pada data latih diisi otomatis dengan
            interpolasi spline kubik alami, sehingga baris tersebut tetap
            terpakai.
          </Callout>
        </Cols>
        <P muted>
          Seluruh tangkapan layar pada buku manual memakai berkas contoh dan
          sebuah model contoh yang dilatih dari berkas tersebut. Angka pada
          layar pengguna akan berbeda sesuai data dan model yang dipilih.
        </P>
      </>
    ),
  },
  {
    kind: "page",
    id: "c1-ispu",
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
    chapterNo: NO,
    chapter: CH,
    toc: "Teori singkat: regresi robust dan MM-estimator",
    body: (
      <>
        <PageHead kicker="Bab 1" title="Teori Singkat: Regresi Robust dan MM-Estimator" />
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
