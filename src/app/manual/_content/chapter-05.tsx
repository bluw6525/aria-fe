import {
  Callout,
  Col,
  Cols,
  Crop,
  Eq,
  Fig,
  Frac,
  H3,
  Legend,
  P,
  PageHead,
  Steps,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "05 Benchmark MCCV";

export const chapter05: PageDesc[] = [
  {
    kind: "opener",
    id: "c5",
    number: "05",
    title: "Benchmark MCCV",
    lead: "Membandingkan kelima estimator pada ratusan pembagian data acak, membaca ringkasan metrik, lalu menyimpan iterasi terbaik sebagai model produksi.",
    items: [
      { label: "Konsep dan parameter", id: "c5-konsep" },
      { label: "Membaca ringkasan sesi", id: "c5-ringkasan" },
      { label: "Membaca metrik benchmark", id: "c5-metrik" },
      { label: "Detail iterasi dan menyimpan model", id: "c5-iterasi" },
    ],
  },
  {
    kind: "page",
    id: "c5-konsep",
    chapter: CH,
    toc: "Konsep dan parameter",
    body: (
      <>
        <PageHead kicker="Bab 05" title="Konsep dan Parameter" />
        <Cols template="1fr 128mm" gap="9mm">
          <Col>
            <P>
              Monte Carlo Cross-Validation (MCCV) mengulang pembagian data latih
              dan data uji secara acak sebanyak N kali. Setiap pembagian
              dikendalikan oleh satu seed, sehingga hasilnya dapat diulang pada
              kesempatan lain. Kelima estimator dilatih pada bagian latih dan
              dinilai pada bagian uji untuk setiap seed. Rata-rata dan simpangan
              baku metrik dari seluruh seed menunjukkan estimator yang paling
              stabil.
            </P>
            <Steps>
              <li>
                Unggah dataset dan atur parameter pada tab{" "}
                <b>Jalankan Baru</b>.
              </li>
              <li>
                Tekan <b>Mulai Benchmark Model</b>. Server menjalankan seluruh
                iterasi dan menyimpan sesinya.
              </li>
              <li>
                Tunggu sampai ringkasan sesi tampil. Waktu proses bertambah
                seiring jumlah iterasi dan jumlah estimator.
              </li>
            </Steps>
          </Col>
          <Fig
            name="08-benchmark-formulir"
            width="128mm"
            n="5.1"
            caption="Tab Jalankan Baru pada halaman Benchmark MCCV."
          />
        </Cols>
        <Table
          head={["Parameter", "Pilihan", "Bawaan", "Keterangan"]}
          widths={["20%", "22%", "11%", "47%"]}
          rows={[
            ["Berkas dataset", ".csv, .xls, .xlsx", "Tidak ada", "Berisi kolom CO, NO2, dan O3 seperti data latih"],
            ["Nama sesi", "Teks bebas", "Kosong", "Opsional. Bila kosong, sesi diberi nomor"],
            ["Algoritma model", "OLS, M, S, MM (k=4.685), MM (k=1.547)", "Kelimanya", "Tombol Batal Semua dan Pilih Semua mempercepat pemilihan"],
            ["Jumlah iterasi", "1 sampai 1000", "200", "Jumlah seed yang dipakai"],
            ["Rasio data latih dan uji", "80:20, 70:30, 60:40", "80:20", "Proporsi data uji 0,2; 0,3; atau 0,4"],
            ["Seed acak kustom", "Angka, dipisah koma atau spasi", "Kosong", "Kekurangan seed dilengkapi acak, kelebihannya dipotong"],
          ]}
        />
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-ringkasan",
    chapter: CH,
    toc: "Membaca ringkasan sesi",
    body: (
      <>
        <PageHead kicker="Bab 05" title="Membaca Ringkasan Sesi" />
        <Fig
          name="09-benchmark-ringkasan"
          width="240mm"
          n="5.2"
          caption="Ringkasan sesi benchmark dan tabel metrik rata-rata untuk lima estimator."
          center
        />
        <Cols template="1fr 1fr 1fr" gap="8mm">
          <Col>
            <H3>Judul sesi</H3>
            <P>
              Bagian atas memuat nomor sesi, nama, dataset, jumlah sampel,
              jumlah percobaan seed, dan rasio uji. Kartu di sisi kanan
              menunjuk estimator dengan R² uji rata-rata tertinggi.
            </P>
          </Col>
          <Col>
            <H3>Daftar seed</H3>
            <P>
              Menu <b>Lihat Seed yang Digunakan</b> membuka seluruh seed sesi.
              Tombol <b>Salin Seed</b> menyalin daftar itu untuk ditempel pada
              kolom seed kustom dan mengulang percobaan yang sama.
            </P>
          </Col>
          <Col>
            <H3>Sesi lama</H3>
            <P>
              Tab <b>Muat Sesi Lalu</b> menampilkan sesi yang pernah dijalankan.
              Satu klik membuka ringkasan dan tabel iterasinya tanpa
              menjalankan benchmark ulang.
            </P>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-metrik",
    chapter: CH,
    toc: "Membaca metrik benchmark",
    body: (
      <>
        <PageHead kicker="Bab 05" title="Membaca Metrik Benchmark" />
        <Cols template="1fr 1.25fr" gap="9mm">
          <Col>
            <H3>Rata-rata lintas seed</H3>
            <Eq tag="(6)">
              <i>R̄</i>
              <sup>2</sup> = <Frac n="1" d={<i>N</i>} /> Σ <i>R</i>
              <sup>2</sup>
              <sub>
                <i>s</i>
              </sub>
            </Eq>
            <Legend
              items={[
                [<i key="N">N</i>, "jumlah seed atau iterasi"],
                [<>R<sup>2</sup><sub>s</sub></>, "R² data uji pada pembagian dengan seed ke-s"],
              ]}
            />
            <P>
              RMSE dan MAE dirata-ratakan dengan cara yang sama. Simpangan baku
              dihitung dari nilai metrik pada seluruh seed dan ditampilkan
              setelah tanda ±. Simpangan yang kecil berarti hasil estimator
              stabil terhadap cara data dibagi.
            </P>
            <Callout label="Pilihan" kind="note">
              Satu baris dengan R² uji tertinggi belum tentu paling cocok. Baris
              dari estimator yang simpangan bakunya kecil lebih dapat
              diandalkan pada data baru.
            </Callout>
          </Col>
          <Col>
            <H3>Kolom pada tabel ringkasan</H3>
            <Table
              head={["Kolom", "Arti"]}
              widths={["30%", "70%"]}
              rows={[
                ["Estimator", "Metode regresi yang dibandingkan. Baris terbaik disorot dengan latar biru muda"],
                ["Test R² (Mean ± Std)", "Rata-rata dan simpangan baku R² pada data uji"],
                ["Test RMSE", "Galat kuadratik rata-rata pada data uji, satuan O3"],
                ["Test MAE", "Galat absolut rata-rata pada data uji, satuan O3"],
                ["Train R², RMSE, MAE", "Metrik yang sama pada bagian latih untuk memeriksa kesenjangan dengan data uji"],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-iterasi",
    chapter: CH,
    toc: "Detail iterasi dan menyimpan model",
    body: (
      <>
        <PageHead kicker="Bab 05" title="Detail Iterasi dan Menyimpan Model" />
        <Crop
          name="09-benchmark-iterasi"
          width="249mm"
          height="70mm"
          n="5.3"
          caption="Tabel detail iterasi diurutkan dari Test R² tertinggi."
        />
        <Cols template="1fr 92mm" gap="9mm">
          <Col>
            <P>
              Tabel detail memuat satu baris untuk setiap pasangan seed dan
              estimator. Dengan 200 seed dan 5 estimator, tabel berisi 1000
              baris. Baris teratas ditandai piala dan berisi hasil terbaik,
              sedangkan kolom koefisien menampilkan β0, CO, dan NO2 baris
              tersebut. Menu <b>Filter</b> membatasi baris pada satu estimator
              dan menu <b>Baris</b> mengatur jumlah baris per halaman.
            </P>
            <Steps>
              <li>
                Tekan <b>Simpan</b> pada baris yang dipilih.
              </li>
              <li>
                Ubah <b>Nama Model di Database</b> bila perlu. Nama awal memuat
                estimator, seed, dan R².
              </li>
              <li>
                Tekan <b>Simpan ke Database</b>. Model muncul pada daftar di
                halaman Uji dan Estimasi.
              </li>
            </Steps>
          </Col>
          <Fig
            name="10-benchmark-simpan-model"
            width="92mm"
            n="5.4"
            caption="Jendela Simpan Model Produksi."
          />
        </Cols>
      </>
    ),
  },
];
