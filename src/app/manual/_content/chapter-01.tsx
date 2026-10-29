import {
  Bullets,
  Callout,
  Col,
  Cols,
  Diagram,
  Fig,
  Ic,
  P,
  PageHead,
  Table,
  H3,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "01 Pengenalan Sistem";

export const chapter01: PageDesc[] = [
  {
    kind: "opener",
    id: "c1",
    number: "01",
    title: "Pengenalan Sistem",
    lead: "Gambaran umum Aria, alur kerja dari data satelit sampai nilai ISPU, serta pembagian peran antara pengguna umum dan administrator.",
    items: [
      { label: "Tentang Aria", id: "c1-tentang" },
      { label: "Alur kerja sistem", id: "c1-alur" },
      { label: "Arsitektur dan peran pengguna", id: "c1-arsitektur" },
    ],
  },
  {
    kind: "page",
    id: "c1-tentang",
    chapter: CH,
    toc: "Tentang Aria",
    body: (
      <>
        <PageHead kicker="Bab 01" title="Tentang Aria" />
        <Cols template="1fr 128mm" gap="9mm">
          <Col>
            <P>
              Aria adalah aplikasi web yang menaksir Indeks Standar Pencemar
              Udara (ISPU) ozon permukaan dari kadar gas prekursor hasil
              pengamatan satelit Sentinel-5P. Masukan model berupa kolom
              vertikal karbon monoksida (CO) dan nitrogen dioksida (NO2) dengan
              satuan mol/m². Keluarannya berupa nilai ISPU O3 beserta kategori
              menurut Permen LHK No. 14 Tahun 2020. Data contoh pada buku
              manual mengambil wilayah DKI Jakarta.
            </P>
            <P>
              Hubungan antara gas satelit dan ISPU dimodelkan dengan regresi
              linear berganda. Lima estimator tersedia, yaitu OLS, M, S, MM
              dengan konstanta k = 4,685, dan MM dengan konstanta k = 1,547.
              Estimator robust membatasi pengaruh pencilan yang biasanya
              menarik garis OLS menjauhi pola mayoritas data. Pengguna dapat
              melatih, menguji, membandingkan, dan menyimpan model tanpa menulis
              kode.
            </P>
            <H3>Kemampuan utama</H3>
            <Bullets>
              <li>Deteksi pencilan dengan nilai leverage dan DFFITS.</li>
              <li>Pelatihan model dengan metrik RMSE, MAE, dan R².</li>
              <li>
                Benchmark Monte Carlo Cross-Validation hingga 1000 iterasi
                untuk kelima estimator.
              </li>
              <li>
                Estimasi ISPU dari berkas satelit, satu titik, atau beberapa
                titik manual.
              </li>
            </Bullets>
          </Col>
          <Fig
            name="01-beranda"
            width="128mm"
            n="1.1"
            caption="Halaman Beranda Aria dengan tombol menuju Estimasi dan Panduan Sistem."
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c1-alur",
    chapter: CH,
    toc: "Alur kerja sistem",
    body: (
      <>
        <PageHead kicker="Bab 01" title="Alur Kerja Sistem" />
        <P>
          Pekerjaan di Aria berjalan dalam dua jalur. Jalur administrator
          menyiapkan model, mulai dari data latih sampai model tersimpan. Jalur
          estimasi memakai model tersimpan untuk mengubah kadar CO dan NO2
          satelit menjadi nilai ISPU. Benchmark MCCV menghubungkan keduanya
          karena iterasi terbaiknya dapat disimpan sebagai model produksi.
        </P>
        <Diagram
          src="/manual/diagram-alur.svg"
          width="249mm"
          ratio={[1562, 199]}
          n="1.2"
          caption="Alur kerja Aria dari data latih sampai nilai dan kategori ISPU."
        />
        <Table
          head={["Tahap", "Halaman", "Masukan", "Keluaran"]}
          widths={["20%", "18%", "30%", "32%"]}
          rows={[
            ["Deteksi outlier", "Latih dan Uji", "Data latih", "Nomor baris yang berpengaruh"],
            ["Melatih model", "Latih dan Uji", "Data latih dan estimator", "Koefisien, RMSE, MAE, dan R²"],
            ["Menyimpan model", "Latih dan Uji", "Nama model", "Model pada basis data"],
            ["Menguji model", "Latih dan Uji", "Model dan data uji", "RMSE, MAE, dan R² data uji"],
            ["Benchmark", "Benchmark MCCV", "Dataset, jumlah iterasi, seed", "Ringkasan sesi dan iterasi terbaik"],
            ["Estimasi", "Estimasi", "Model dan data CO serta NO2", "Nilai dan kategori ISPU"],
          ]}
        />
      </>
    ),
  },
  {
    kind: "page",
    id: "c1-arsitektur",
    chapter: CH,
    toc: "Arsitektur dan peran pengguna",
    body: (
      <>
        <PageHead kicker="Bab 01" title="Arsitektur dan Peran Pengguna" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <H3>Komponen sistem</H3>
            <P>
              Aria terdiri atas dua aplikasi yang berjalan terpisah. Antarmuka
              pada repositori <Ic>aria-fe</Ic> memanggil API pada repositori{" "}
              <Ic>aria-be</Ic> melalui HTTP. Seluruh model, sesi benchmark, dan
              akun tersimpan pada satu basis data SQLite. Perhitungan numerik
              dijalankan di sisi server sehingga peramban hanya menampilkan
              hasil.
            </P>
            <Table
              head={["Komponen", "Teknologi", "Keterangan"]}
              widths={["24%", "40%", "36%"]}
              rows={[
                ["Antarmuka", "Next.js 16, React 19, Tailwind 4", "Port 3000"],
                ["API", "FastAPI, Python 3.14 atau lebih baru", "Port 8000, awalan /api/v1"],
                ["Basis data", "SQLite, SQLAlchemy async, Alembic", "Berkas aria.db"],
                ["Komputasi", "NumPy, SciPy, pandas", "Estimator, metrik, spline"],
                ["Otentikasi", "JWT, bcrypt", "Token berlaku 7 hari"],
              ]}
            />
          </Col>
          <Col>
            <H3>Peran dan hak akses</H3>
            <P>
              Pengguna umum membuka Beranda, Estimasi, Bantuan, dan Riwayat
              Perancang tanpa masuk. Administrator mendapat dua menu tambahan
              untuk membuat dan mengevaluasi model. Masuk sebagai administrator
              menerbitkan token JWT yang disimpan di peramban dan dikirim pada
              setiap permintaan ke API.
            </P>
            <Table
              head={["Menu", "Fungsi", "Akses"]}
              widths={["32%", "48%", "20%"]}
              rows={[
                ["Home", "Tujuan dan ringkasan aplikasi", "Semua"],
                ["Estimasi", "Menghitung nilai dan kategori ISPU", "Semua"],
                ["Latih dan Uji", "Melatih, menyimpan, dan menguji model", "Admin"],
                ["Benchmark MCCV", "Membandingkan estimator berulang kali", "Admin"],
                ["Bantuan", "Panduan, teori, dan kategori ISPU", "Semua"],
                ["Riwayat Perancang", "Profil penyusun dan pembimbing", "Semua"],
              ]}
            />
            <Callout label="Data contoh" kind="note">
              Seluruh tangkapan layar memakai data sintetis{" "}
              <Ic>data_latih_contoh.csv</Ic> (180 baris),{" "}
              <Ic>data_uji_contoh.csv</Ic> (60 baris), dan{" "}
              <Ic>data_estimasi_contoh.csv</Ic> (60 baris) pada folder{" "}
              <Ic>scripts/manual-sample</Ic>. Angka pada gambar karena itu
              tidak mewakili kondisi udara yang sebenarnya.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
];
