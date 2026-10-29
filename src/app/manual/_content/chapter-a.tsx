import { Ic, P, PageHead, Table } from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "Lampiran";

export const chapterA: PageDesc[] = [
  {
    kind: "opener",
    id: "ca",
    number: "A",
    title: "Lampiran",
    lead: "Tabel pemecahan masalah untuk pesan galat yang paling sering muncul dan ringkasan endpoint API.",
    items: [
      { label: "Pemecahan masalah", id: "ca-masalah" },
      { label: "Ringkasan endpoint API", id: "ca-api" },
    ],
  },
  {
    kind: "page",
    id: "ca-masalah",
    chapter: CH,
    toc: "Pemecahan masalah",
    body: (
      <>
        <PageHead kicker="Lampiran A" title="Pemecahan Masalah" />
        <Table
          head={["Gejala atau pesan", "Penyebab", "Penanganan"]}
          widths={["32%", "30%", "38%"]}
          rows={[
            [
              <Ic key="1">Username atau password salah.</Ic>,
              "Akun belum dibuat atau kata sandi keliru",
              <>Jalankan <Ic key="a">uv run python commands/seed_admin.py</Ic>. Skrip memperbarui kata sandi akun yang sudah ada</>,
            ],
            [
              <Ic key="2">Token kedaluwarsa atau tidak valid.</Ic>,
              "Masa berlaku token 7 hari habis, atau SECRET_KEY berubah",
              "Masuk kembali pada halaman /login",
            ],
            [
              "Halaman Latih dan Uji atau Benchmark kembali ke Home",
              "Sesi bukan administrator",
              "Masuk sebagai administrator, lalu buka menu kembali",
            ],
            [
              "Data tidak termuat dan toast galat jaringan muncul",
              "API belum berjalan atau alamat API keliru",
              <>Jalankan API pada port 8000 dan periksa <Ic key="b">NEXT_PUBLIC_API_BASE_URL</Ic></>,
            ],
            [
              <Ic key="3">Format berkas ... tidak didukung.</Ic>,
              "Ekstensi berkas bukan CSV, XLS, atau XLSX",
              "Simpan ulang berkas dalam salah satu format tersebut",
            ],
            [
              <Ic key="4">Minimal 5 baris data ... lengkap.</Ic>,
              "Baris dengan CO, NO2, dan O3 lengkap kurang dari 5",
              "Lengkapi data atau tambah baris pengamatan",
            ],
            [
              <Ic key="5">Data uji harus memiliki kolom target O3.</Ic>,
              "Berkas uji tidak memuat kolom O3",
              "Tambahkan kolom O3 SPKU pada berkas uji",
            ],
            [
              <Ic key="6">Model dengan nama ... sudah ada.</Ic>,
              "Nama model harus unik",
              "Gunakan nama lain pada kolom simpan",
            ],
            [
              <Ic key="7">Belum ada model tersimpan di sistem.</Ic>,
              "Basis data belum memiliki model",
              "Latih lalu simpan model, atau simpan iterasi benchmark",
            ],
            [
              "Nilai ISPU menampilkan 0",
              "Persamaan menghasilkan angka negatif untuk CO dan NO2 yang kecil",
              "Periksa satuan mol/m² dan pilih model lain bila perlu",
            ],
          ]}
        />
      </>
    ),
  },
  {
    kind: "page",
    id: "ca-api",
    chapter: CH,
    toc: "Ringkasan endpoint API",
    body: (
      <>
        <PageHead kicker="Lampiran B" title="Ringkasan Endpoint API" />
        <P>
          Seluruh jalur diawali <Ic>/api/v1</Ic>. Dokumentasi interaktif
          tersedia pada <Ic>/docs</Ic> di server API, dan kolom Akses
          menunjukkan endpoint yang hanya melayani token administrator.
        </P>
        <Table
          head={["Metode", "Jalur", "Akses", "Fungsi"]}
          widths={["10%", "32%", "12%", "46%"]}
          rows={[
            ["POST", <Ic key="1">/auth/login</Ic>, "Publik", "Menukar username dan password dengan token JWT"],
            ["GET", <Ic key="2">/auth/me</Ic>, "Token", "Profil pengguna yang sedang masuk"],
            ["GET", <Ic key="3">/regression/models</Ic>, "Publik", "Daftar model tersimpan"],
            ["GET", <Ic key="4">/regression/models/{"{id}"}</Ic>, "Publik", "Detail satu model"],
            ["DELETE", <Ic key="5">/regression/models/{"{id}"}</Ic>, "Admin", "Menghapus model"],
            ["POST", <Ic key="6">/regression/detect-outliers</Ic>, "Admin", "Leverage dan DFFITS pada data latih"],
            ["POST", <Ic key="7">/regression/train</Ic>, "Admin", "Melatih model dan mengembalikan metrik serta grafik"],
            ["POST", <Ic key="8">/regression/save</Ic>, "Admin", "Menyimpan koefisien model"],
            ["POST", <Ic key="9">/regression/test/{"{id}"}</Ic>, "Admin", "Menguji model tersimpan pada data uji"],
            ["POST", <Ic key="10">/regression/estimate</Ic>, "Publik", "Estimasi satu titik dari CO dan NO2"],
            ["POST", <Ic key="11">/regression/estimate-file</Ic>, "Publik", "Estimasi seluruh baris pada berkas satelit"],
            ["POST", <Ic key="12">/regression/benchmark/run</Ic>, "Admin", "Menjalankan benchmark MCCV dan menyimpan sesi"],
            ["GET", <Ic key="13">/regression/benchmark/sessions</Ic>, "Publik", "Daftar sesi benchmark"],
            ["GET", <Ic key="14">/regression/benchmark/sessions/{"{id}"}/iterations</Ic>, "Publik", "Iterasi sesi dengan filter dan urutan"],
            ["POST", <Ic key="15">/regression/models/promote</Ic>, "Admin", "Menyimpan satu iterasi benchmark sebagai model"],
          ]}
        />
      </>
    ),
  },
];
