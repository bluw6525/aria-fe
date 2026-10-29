import {
  Bullets,
  Callout,
  Col,
  Cols,
  Crop,
  Fig,
  H3,
  Ic,
  P,
  PageHead,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "03 Mengenal Antarmuka";

export const chapter03: PageDesc[] = [
  {
    kind: "opener",
    id: "c3",
    number: "03",
    title: "Mengenal Antarmuka",
    lead: "Tata letak sidebar, perbedaan tampilan untuk pengguna umum dan administrator, serta isi halaman Bantuan dan Riwayat Perancang.",
    items: [
      { label: "Sidebar dan navigasi", id: "c3-sidebar" },
      { label: "Halaman Bantuan dan Riwayat Perancang", id: "c3-bantuan" },
    ],
  },
  {
    kind: "page",
    id: "c3-sidebar",
    chapter: CH,
    toc: "Sidebar dan navigasi",
    body: (
      <>
        <PageHead kicker="Bab 03" title="Sidebar dan Navigasi" />
        <Cols template="46mm 46mm 1fr" gap="9mm">
          <Crop
            name="01-sidebar-pengguna"
            width="46mm"
            height="78mm"
            n="3.1"
            caption="Sidebar pengguna umum."
          />
          <Crop
            name="03-sidebar-admin"
            width="46mm"
            height="78mm"
            n="3.2"
            caption="Sidebar administrator."
          />
          <Col>
            <P>
              Sidebar berada di sisi kiri dan tampil pada setiap halaman.
              Kepala sidebar memuat logo, nama aplikasi, dan deskripsi
              singkat. Menu yang sedang dibuka ditandai dengan latar putih
              sehingga posisi pengguna selalu terlihat.
            </P>
            <P>
              Pengguna umum melihat empat menu, yaitu Home, Estimasi, Bantuan,
              dan Riwayat Perancang. Setelah masuk, nama pada kepala sidebar
              berubah menjadi <b>Admin Aria</b>, ikon keluar muncul, dan menu{" "}
              <b>Latih dan Uji</b> serta <b>Benchmark MCCV</b> ditambahkan di
              antara Estimasi dan Bantuan.
            </P>
            <Table
              head={["Menu", "Alamat", "Dipakai untuk"]}
              widths={["30%", "26%", "44%"]}
              rows={[
                ["Home", <Ic key="1">/home</Ic>, "Tujuan, modul, dan ringkasan sistem"],
                ["Estimasi", <Ic key="2">/estimate</Ic>, "Menghitung ISPU dari model tersimpan"],
                ["Latih dan Uji", <Ic key="3">/train-test</Ic>, "Membuat dan menguji model"],
                ["Benchmark MCCV", <Ic key="4">/benchmark</Ic>, "Membandingkan estimator"],
                ["Bantuan", <Ic key="5">/help</Ic>, "Panduan dan dasar teori"],
                ["Riwayat Perancang", <Ic key="6">/history</Ic>, "Profil penyusun"],
              ]}
            />
          </Col>
        </Cols>
        <Callout label="Akses" kind="note">
          Membuka <Ic>/train-test</Ic> atau <Ic>/benchmark</Ic> tanpa sesi
          administrator mengembalikan peramban ke halaman Home. Endpoint API
          untuk deteksi outlier, pelatihan, penyimpanan, pengujian, penghapusan
          model, dan benchmark juga menolak permintaan tanpa token
          administrator.
        </Callout>
      </>
    ),
  },
  {
    kind: "page",
    id: "c3-bantuan",
    chapter: CH,
    toc: "Halaman Bantuan dan Riwayat Perancang",
    body: (
      <>
        <PageHead kicker="Bab 03" title="Halaman Bantuan dan Riwayat Perancang" />
        <Cols template="1fr 104mm" gap="9mm">
          <Col>
            <P>
              Halaman Bantuan merangkum cara pemakaian dan landasan teori dalam
              empat tab. Tab pertama memuat alur kerja modul Latih dan Uji
              serta modul Estimasi. Tab lainnya menjelaskan metode, gas
              prekursor, dan kategori ISPU yang dipakai pada perhitungan.
            </P>
            <Table
              head={["Tab", "Isi"]}
              widths={["34%", "66%"]}
              rows={[
                ["Cara Penggunaan", "Alur kerja pelatihan, penyimpanan, pengujian, dan estimasi"],
                [
                  "Dasar Teori MM-Estimator",
                  "Keterbatasan OLS, perkembangan estimator M, S, dan MM, serta tiga tahap komputasi MM",
                ],
                [
                  "Dampak Polusi dan Prekursor",
                  "Peran CO dan NO2 pada pembentukan ozon permukaan dan dampaknya bagi kesehatan",
                ],
                ["Kategori Standar ISPU", "Rentang nilai, kategori, dan dampak kesehatan menurut Permen LHK No. 14/2020"],
              ]}
            />
            <H3>Riwayat Perancang</H3>
            <P>
              Halaman Riwayat Perancang memperkenalkan penyusun sistem, yaitu
              Christopher Wijaya, mahasiswa Teknik Informatika Universitas
              Tarumanagara dengan NIM 535230158. Dosen pembimbing yang tercatat
              adalah Dyah Erny Herwindiati dan Lely Hiryanto. Riwayat Perancang
              hanya berisi informasi dan tidak memiliki formulir.
            </P>
            <Bullets>
              <li>Tab dapat dipindah kapan saja tanpa memuat ulang halaman.</li>
              <li>Teks bantuan tidak bergantung pada status masuk.</li>
            </Bullets>
          </Col>
          <Fig
            name="02-bantuan-panduan"
            width="104mm"
            n="3.3"
            caption="Halaman Bantuan pada tab Cara Penggunaan."
          />
        </Cols>
      </>
    ),
  },
];
