import {
  Callout,
  Chip,
  Col,
  Cols,
  H3,
  MarkList,
  P,
  PageHead,
  Shot,
  Steps,
  Table,
  Ui,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "3";
const CH = "Estimasi ISPU";

export const estimasi: PageDesc[] = [
  {
    kind: "page",
    id: "e3-halaman",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Mengenal halaman Estimasi ISPU",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Mengenal Halaman Estimasi ISPU" />
        <Cols template="156mm 1fr" gap="9mm">
          <Shot
            name="04-peta-hero"
            width="156mm"
            n="3.1"
            caption="Halaman Estimasi ISPU pada tanggal hari ini."
            marks={[
              { n: 1, x: 3.6, y: 21 },
              { n: 2, x: 22.6, y: 16.6 },
              { n: 3, x: 67.4, y: 17.3 },
              { n: 4, x: 96.6, y: 14.4 },
              { n: 5, x: 77.2, y: 26.5 },
              { n: 6, x: 23.5, y: 33.3 },
              { n: 7, x: 48, y: 52 },
              { n: 8, x: 22.6, y: 92.6 },
            ]}
          />
          <Col>
            <P>
              Halaman Estimasi ISPU menampilkan peta lima wilayah administrasi
              DKI Jakarta. Setiap wilayah diwarnai menurut kategori ISPU dan
              diberi label nilai estimasinya. Halaman terbuka pada tanggal hari
              ini, sedangkan seluruh perhitungan berjalan otomatis tanpa
              tombol proses.
            </P>
            <MarkList
              items={[
                ["Menu Estimasi ISPU.", "Halaman aktif ditandai latar putih."],
                ["Panel kontrol.", "Judul peta dan keterangan data Sentinel-5P Level-3."],
                ["Basis Tanggal.", "Kolom kalender untuk memilih tanggal peta."],
                ["Tombol tanggal.", "Hari Ini (Aktif) atau Reset ke Hari Ini."],
                ["Tanggal Observasi Terakhir.", "Tanggal pengamatan satelit terbaru pada peta."],
                ["Banner informasi.", "Muncul bila data tanggal terpilih tidak lengkap."],
                ["Peta distribusi ISPU.", "Lima wilayah dengan label nilai ISPU."],
                ["Skala Kategori ISPU.", "Legenda warna, diikuti kartu lima wilayah."],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-tanggal",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Memilih tanggal dan membaca informasi data",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Memilih Tanggal dan Membaca Informasi Data" />
        <Shot
          name="04-kontrol-tanggal"
          width="250mm"
          n="3.2"
          caption="Panel kontrol tanggal pada bagian atas halaman."
        />
        <Cols template="1fr 1.35fr" gap="9mm">
          <Col>
            <H3>Mengganti tanggal peta</H3>
            <Steps>
              <li>
                Tekan kolom <Ui>Basis Tanggal</Ui>, lalu pilih tanggal pada
                kalender atau ketik tanggalnya.
              </li>
              <li>
                Peta langsung memuat ulang nilai ISPU seluruh wilayah untuk
                tanggal tersebut.
              </li>
              <li>
                Tekan <Ui>Reset ke Hari Ini</Ui> untuk kembali ke tanggal hari
                ini. Tanggal yang lebih baru dari hari ini otomatis dikembalikan
                ke hari ini.
              </li>
            </Steps>
            <P muted>
              Tanggal Observasi Terakhir pada kepala peta menunjukkan tanggal
              pengamatan satelit terbaru yang benar-benar dipakai peta.
            </P>
          </Col>
          <Col>
            <H3>Pesan informasi pada peta</H3>
            <Shot
              name="04-banner-awan"
              width="100%"
              n="3.3"
              caption="Banner biru saat seluruh wilayah memakai pengamatan terakhir."
            />
            <Table
              head={["Kondisi", "Yang tampil di peta"]}
              widths={["44%", "56%"]}
              compact
              rows={[
                [
                  "Seluruh wilayah tidak memiliki data satelit lengkap pada tanggal terpilih",
                  "Nilai observasi valid terakhir setiap wilayah, dengan tanggal pengamatan pada banner",
                ],
                [
                  "Sebagian wilayah (n dari 5) tidak memiliki data lengkap",
                  "Wilayah lain tetap memakai tanggal terpilih, sedangkan wilayah tersebut memakai observasi valid terdekat",
                ],
                [
                  "Citra satelit tidak memiliki data valid sama sekali",
                  "Wilayah berwarna abu-abu dengan tulisan ISPU: --. Wilayah tetap dapat diklik untuk riwayat dan proyeksi",
                ],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-peta",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Membaca peta, tooltip, dan kartu wilayah",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Membaca Peta, Tooltip, dan Kartu Wilayah" />
        <Cols template="112mm 1fr" gap="9mm">
          <Shot
            name="04-peta"
            width="112mm"
            n="3.4"
            caption="Peta distribusi ISPU dengan banner dan legenda."
            marks={[
              { n: 1, x: 1.5, y: 2.6 },
              { n: 2, x: 33.8, y: 41.2 },
              { n: 3, x: 52, y: 62 },
              { n: 4, x: 2.8, y: 91.7 },
            ]}
          />
          <Col>
            <MarkList
              items={[
                ["Judul peta.", "Peta Distribusi ISPU DKI Jakarta beserta petunjuk untuk mengklik wilayah."],
                ["Label wilayah.", "Nama wilayah dan nilai ISPU estimasi. Tanggal kecil di bawah nilai muncul bila wilayah memakai observasi terdekat."],
                ["Warna wilayah.", "Mengikuti kategori ISPU. Wilayah abu-abu berarti tidak ada data."],
                ["Skala Kategori ISPU.", "Legenda warna sesuai Permen LHK Nomor 14 Tahun 2020."],
              ]}
            />
            <H3>Tooltip saat kursor di atas wilayah</H3>
            <Cols template="1fr 66mm" gap="6mm" style={{ alignItems: "center" }}>
              <P>
                Arahkan kursor ke sebuah wilayah. Wilayah menebal dan kartu
                kecil muncul di sudut kanan atas peta. Kartu memuat nama
                wilayah, kategori, nilai Estimasi ISPU, serta tanggal observasi
                satelit.
              </P>
              <Shot
                name="04-tooltip"
                width="66mm"
                box={[75, 23, 21, 13]}
                n="3.5"
                caption="Tooltip wilayah."
              />
            </Cols>
          </Col>
        </Cols>
        <Shot
          name="04-legenda-kartu"
          width="175mm"
          n="3.6"
          caption="Legenda dan lima kartu wilayah. Mengklik kartu sama dengan mengklik wilayah pada peta."
          center
        />
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-rincian",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Membuka rincian wilayah",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Membuka Rincian Wilayah" />
        <Cols template="156mm 1fr" gap="9mm">
          <Shot
            name="04-drawer"
            width="156mm"
            n="3.7"
            caption="Panel rincian Jakarta Selatan terbuka di sisi kanan."
            marks={[
              { n: 1, x: 46.4, y: 3.2 },
              { n: 2, x: 46.4, y: 11.3 },
              { n: 3, x: 46.4, y: 19.6 },
              { n: 4, x: 46.4, y: 38 },
              { n: 5, x: 46.4, y: 57 },
              { n: 6, x: 46.4, y: 66.8 },
              { n: 7, x: 95.4, y: 4.1 },
            ]}
          />
          <Col>
            <P>
              Klik salah satu wilayah pada peta atau pada kartu di bawah peta.
              Panel rincian terbuka dari sisi kanan layar dan memuat data wilayah
              tersebut. Latar halaman meredup selama panel terbuka. Seluruh
              isi panel dihitung ulang setiap kali wilayah atau rentang waktu
              berganti.
            </P>
            <MarkList
              items={[
                ["Nama wilayah.", "Disertai lencana kategori dan keterangan sumber data."],
                ["Banner kuning.", "Muncul bila acuan peta memakai observasi terdekat. Tanggal pengamatannya disebutkan."],
                ["Proyeksi 2 Hari Kedepan.", "Kartu ISPU Besok (H+1) dan Lusa (H+2)."],
                ["Rentang Waktu Observasi.", "Tanggal Awal, Tanggal Akhir, dan tombol Terapkan."],
                ["Kartu ringkasan.", "Total Sampel, Rata-rata ISPU, dan Rentang ISPU."],
                ["Grafik tren.", "Garis nilai harian dan garis proyeksi."],
                ["Tombol tutup.", "Ikon X di pojok kanan atas, atau tombol Esc."],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-proyeksi",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Membaca proyeksi kualitas udara dua hari",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Membaca Proyeksi Kualitas Udara Dua Hari" />
        <Shot
          name="04-proyeksi"
          width="165mm"
          n="3.8"
          caption="Kartu proyeksi untuk Besok (H+1) dan Lusa (H+2)."
          center
        />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <P>
              Kartu proyeksi berada paling atas pada panel rincian. Setiap kartu
              menampilkan hari, tanggal, nilai ISPU, dan lencana kategorinya.
              Lencana di sudut kanan bawah menunjukkan selisih terhadap nilai
              ISPU pengamatan terakhir. Kartu selalu dihitung dari tiga
              pengamatan valid terakhir hingga hari ini, berapa pun rentang
              waktu yang dipilih.
            </P>
            <Table
              head={["Bagian kartu", "Cara membaca"]}
              widths={["34%", "66%"]}
              compact
              rows={[
                ["Besok (H+1)", "Perkiraan ISPU satu hari setelah hari ini"],
                ["Lusa (H+2)", "Perkiraan ISPU dua hari setelah hari ini"],
                ["Nilai ISPU", "Angka hasil model dari CO dan NO2 hasil rata-rata bergerak"],
                ["Lencana oranye +", "Proyeksi lebih tinggi daripada observasi terakhir"],
                ["Lencana hijau -", "Proyeksi lebih rendah daripada observasi terakhir"],
              ]}
            />
          </Col>
          <Col>
            <H3>Kategori yang mungkin muncul</H3>
            <Table
              head={["Kategori", "Rentang", "Arti singkat"]}
              widths={["38%", "22%", "40%"]}
              compact
              rows={[
                [<Chip key="a" tone="baik">Baik</Chip>, "0 - 50", "Aman untuk aktivitas luar ruangan"],
                [<Chip key="b" tone="sedang">Sedang</Chip>, "51 - 100", "Kelompok sensitif perlu waspada"],
                [<Chip key="c" tone="tidak">Tidak Sehat</Chip>, "101 - 200", "Kurangi aktivitas berat di luar ruangan"],
                [<Chip key="d" tone="sangat">Sangat Tidak Sehat</Chip>, "201 - 300", "Hindari aktivitas luar ruangan"],
                [<Chip key="e" tone="bahaya">Berbahaya</Chip>, "lebih dari 300", "Tetap di dalam ruangan"],
              ]}
            />
            <Callout label="Kegunaan" kind="tip">
              Bandingkan kartu H+1 dan H+2 dengan kategori hari ini untuk
              mengetahui apakah mutu udara cenderung membaik atau memburuk.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-rentang",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Mengatur rentang waktu observasi",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Mengatur Rentang Waktu Observasi" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <Shot
              name="04-rentang"
              width="100%"
              n="3.9"
              caption="Isian Rentang Waktu Observasi Wilayah."
            />
            <Steps>
              <li>
                Ubah <Ui>Tanggal Awal</Ui> dan <Ui>Tanggal Akhir</Ui> melalui
                kalender di masing-masing kolom.
              </li>
              <li>
                Tekan <Ui>Terapkan Rentang Waktu</Ui>. Pelapis pemuatan tampil
                sebentar di atas panel.
              </li>
              <li>
                Kartu ringkasan, grafik, dan tabel berganti sesuai rentang baru.
              </li>
            </Steps>
            <P muted>
              Rentang awal mencakup 30 hari yang berakhir pada tanggal peta.
              Tanggal Akhir hari ini menampilkan garis proyeksi pada grafik.
            </P>
          </Col>
          <Col>
            <Shot
              name="04-validasi"
              width="100%"
              n="3.10"
              caption="Pesan merah saat rentang melebihi 31 hari."
            />
            <H3>Pesan validasi tanggal</H3>
            <Table
              head={["Pesan", "Penyebab"]}
              widths={["50%", "50%"]}
              compact
              rows={[
                ["Tanggal awal dan tanggal akhir harus diisi.", "Salah satu kolom tanggal kosong."],
                ["Tanggal observasi tidak boleh melebihi hari ini.", "Tanggal yang dipilih lebih baru dari hari ini."],
                ["Tanggal awal tidak boleh melebihi tanggal akhir.", "Urutan tanggal terbalik."],
                ["Rentang tanggal observasi saat ini N hari. Batas maksimal adalah 31 hari.", "Selisih kedua tanggal lebih dari 31 hari."],
              ]}
            />
            <Callout label="Data tidak ada" kind="note">
              Bila seluruh tanggal pada rentang tidak memiliki data valid, panel
              menampilkan kotak oranye Data Satelit Tidak Tersedia. Pilih rentang
              yang lebih panjang atau tanggal lain untuk memunculkan data.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "e3-grafik",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Membaca ringkasan, grafik, dan tabel observasi",
    body: (
      <>
        <PageHead kicker="Bab 3" title="Membaca Ringkasan, Grafik, dan Tabel Observasi" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <Shot
              name="04-metrik"
              width="100%"
              n="3.11"
              caption="Kartu ringkasan observasi."
            />
            <Shot
              name="04-grafik"
              width="100%"
              n="3.12"
              caption="Grafik tren harian ISPU dan proyeksi."
            />
          </Col>
          <Col>
            <Table
              head={["Unsur", "Cara membaca"]}
              widths={["32%", "68%"]}
              compact
              rows={[
                ["Total Sampel", "Jumlah tanggal berdata valid pada rentang terpilih"],
                ["Rata-rata ISPU", "Rata-rata nilai ISPU seluruh sampel"],
                ["Rentang ISPU", "Nilai terendah sampai tertinggi pada rentang"],
                ["Garis biru", "Observasi historis hasil estimasi dari data satelit"],
                ["Garis hijau putus-putus", "Proyeksi dua hari, muncul bila Tanggal Akhir hari ini"],
              ]}
            />
            <Shot
              name="04-tabel"
              width="100%"
              n="3.13"
              caption="Daftar data observasi satelit dan proyeksi."
            />
          </Col>
        </Cols>
        <P>
          Tabel memuat tanggal, kadar CO dan NO2 dalam mol/m², nilai Estimasi
          ISPU, dan kategori setiap observasi. Baris proyeksi berlatar
          abu muda dengan lencana hijau Proyeksi di samping tanggalnya, dan tabel
          dapat digulir untuk melihat seluruh baris. Tanggal tanpa data valid tidak
          menjadi baris, sehingga jumlah baris dapat lebih sedikit daripada
          jumlah hari pada rentang.
        </P>
      </>
    ),
  },
];
