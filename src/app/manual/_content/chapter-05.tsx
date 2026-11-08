import {
  Callout,
  Col,
  Cols,
  MarkList,
  P,
  PageHead,
  Shot,
  Steps,
  Table,
  Ui,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "5";
const CH = "Pelatihan Massal";

export const chapter05: PageDesc[] = [
  {
    kind: "page",
    id: "c5-form",
    chapterNo: NO,
    chapter: CH,
    toc: "Mengatur sesi pelatihan massal",
    body: (
      <>
        <PageHead kicker="Bab 5 · Khusus administrator" title="Mengatur Sesi Pelatihan Massal" />
        <P>
          Pelatihan Massal membandingkan beberapa metode regresi pada banyak
          pembagian data latih dan data uji yang berbeda, sehingga metode yang
          paling stabil dapat dipilih. Setiap pembagian dikendalikan oleh satu
          angka seed agar hasilnya dapat diulang. Seluruh isian berada pada tab{" "}
          <Ui>Jalankan Pelatihan Massal Baru</Ui>, dan proses berjalan lebih lama
          bila jumlah iterasi dan jumlah algoritma bertambah.
        </P>
        <Cols template="120mm 1fr" gap="9mm">
          <Shot
            name="06-batch-form"
            width="112mm"
            n="5.1"
            caption="Tab Jalankan Pelatihan Massal Baru."
            marks={[
              { n: 1, x: 3.1, y: 23.4 },
              { n: 2, x: 3.1, y: 39.9 },
              { n: 3, x: 3.1, y: 54.2 },
              { n: 4, x: 3.1, y: 67.7 },
              { n: 5, x: 50.8, y: 67.7 },
              { n: 6, x: 3.1, y: 81.1 },
              { n: 7, x: 3.1, y: 91.5 },
            ]}
          />
          <Steps>
            <li>
              Unggah berkas dataset latih dan uji, lalu atur parameter.
            </li>
            <li>
              Tekan <Ui>Mulai Pelatihan Massal</Ui>.
            </li>
            <li>
              Tunggu hingga notifikasi Pelatihan Massal Selesai muncul dan
              ringkasan sesi tampil di bawah formulir.
            </li>
          </Steps>
        </Cols>
        <Table
          head={["No", "Isian", "Pilihan", "Keterangan"]}
          widths={["5%", "22%", "26%", "47%"]}
          compact
          rows={[
            ["1", "Unggah Berkas Dataset", ".csv, .xls, .xlsx", "Minimal 20 baris data valid dengan kolom CO satelit, NO2 satelit, dan O3 SPKU"],
            ["2", "Nama Sesi (opsional)", "Teks bebas", "Memudahkan mencari sesi di tab Muat Sesi Lalu"],
            ["3", "Pilih Algoritma Model", "OLS, M, S, MM", "Centang minimal satu. Batal Semua dan Pilih Semua mempercepat pemilihan"],
            ["4", "Jumlah Iterasi", "1 sampai 1000, bawaan 200", "Banyaknya pembagian data acak yang dicoba"],
            ["5", "Rasio Data Latih dan Uji", "80:20, 70:30, atau 60:40", "Porsi data latih dibanding data uji pada setiap iterasi"],
            ["6", "Seed Acak Kustom (opsional)", "Angka dipisah koma atau spasi", "Seed yang kurang dilengkapi otomatis, seed yang berlebih dipotong sesuai jumlah iterasi"],
          ]}
        />
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-ringkasan",
    chapterNo: NO,
    chapter: CH,
    toc: "Membaca ringkasan sesi",
    body: (
      <>
        <PageHead kicker="Bab 5 · Khusus administrator" title="Membaca Ringkasan Sesi" />
        <Cols template="160mm 1fr" gap="9mm">
          <Col>
            <Shot
              name="06-batch-ringkasan"
              width="160mm"
              n="5.2"
              caption="Judul sesi dan tabel rangkuman metrik rata-rata."
              marks={[
                { n: 1, x: 0.8, y: 3.8 },
                { n: 2, x: 71.5, y: 7 },
                { n: 3, x: 3.3, y: 25.5 },
                { n: 4, x: 90, y: 25.5 },
                { n: 5, x: 10, y: 54.2 },
              ]}
            />
            <Shot
              name="06-batch-seed"
              width="160mm"
              n="5.3"
              caption="Daftar seed yang terbuka setelah Lihat Seed ditekan."
              marks={[{ n: 3, x: 3, y: 39 }]}
            />
          </Col>
          <Col>
            <MarkList
              items={[
                ["Judul sesi.", "Nomor sesi, nama, berkas, jumlah sampel, jumlah percobaan seed, dan rasio uji."],
                ["Model Terbaik.", "Kombinasi metode dan seed dengan Test RMSE terendah pada seluruh iterasi."],
                ["Lihat Seed yang Digunakan.", "Membuka seluruh seed sesi."],
                ["Salin Seed.", "Menyalin daftar seed untuk ditempel pada kolom seed kustom agar percobaan dapat diulang."],
                ["Tabel rangkuman.", "Nilai rata-rata dan simpangan baku setiap metode, ditulis sebagai rata-rata (+/- simpangan baku)."],
              ]}
            />
            <Table
              head={["Kolom", "Arti"]}
              widths={["38%", "62%"]}
              compact
              rows={[
                ["Test RMSE dan Test MAE", "Selisih pada data uji. Dasar utama memilih metode"],
                ["Train RMSE dan Train MAE", "Selisih pada data latih sebagai pembanding"],
                ["Simpangan baku kecil", "Metode stabil terhadap cara data dibagi"],
              ]}
            />
            <Callout label="Interpolasi" kind="note">
              Bila ada nilai O3 yang kosong pada berkas, kotak kuning Pemberitahuan
              Data Interpolasi tampil di atas judul sesi dan menyebutkan jumlah
              baris yang dilengkapi otomatis.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-iterasi",
    chapterNo: NO,
    chapter: CH,
    toc: "Detail iterasi dan menyimpan model",
    body: (
      <>
        <PageHead kicker="Bab 5 · Khusus administrator" title="Detail Iterasi dan Menyimpan Model" />
        <Cols template="160mm 1fr" gap="9mm">
          <Shot
            name="06-batch-iterasi"
            width="160mm"
            box={[0, 0, 100, 70]}
            n="5.4"
            caption="Tabel detail seluruh iterasi diurutkan dari Test RMSE terendah."
            marks={[
              { n: 1, x: 44.5, y: 9.7 },
              { n: 2, x: 76.6, y: 7 },
              { n: 3, x: 2.8, y: 29.4 },
              { n: 4, x: 57.5, y: 18.5 },
              { n: 5, x: 92.8, y: 29.4 },
            ]}
          />
          <Col>
            <MarkList
              items={[
                ["Jumlah baris.", "Satu baris untuk setiap pasangan seed dan metode."],
                ["Filter dan Baris.", "Membatasi tabel pada satu metode dan mengatur jumlah baris per halaman."],
                ["Piala.", "Menandai hasil terbaik pada baris teratas."],
                ["Koefisien.", "Nilai persamaan model untuk baris tersebut."],
                ["Simpan Model.", "Menyimpan baris terpilih sebagai model produksi."],
              ]}
            />
          </Col>
        </Cols>
        <Cols template="1fr 82mm" gap="9mm" style={{ alignItems: "center" }}>
          <Col>
            <Steps>
              <li>
                Tekan <Ui>Simpan Model</Ui> pada baris yang dipilih, biasanya
                baris dengan piala.
              </li>
              <li>
                Ubah <Ui>Nama Model di Database</Ui> bila perlu. Nama awal memuat
                metode, seed, dan nilai RMSE.
              </li>
              <li>
                Tekan <Ui>Simpan ke Database</Ui>. Model muncul pada menu Estimasi
                ISPU dan Latih dan Uji bagi semua pengguna.
              </li>
            </Steps>
          </Col>
          <Shot
            name="06-batch-simpan"
            width="82mm"
            n="5.5"
            caption="Jendela Simpan Model Produksi."
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c5-sesi",
    chapterNo: NO,
    chapter: CH,
    toc: "Memuat sesi lama",
    body: (
      <>
        <PageHead kicker="Bab 5 · Khusus administrator" title="Memuat Sesi Lama" />
        <Cols template="112mm 1fr" gap="10mm">
          <Shot
            name="06-batch-hero"
            width="112mm"
            box={[19, 0, 81, 62]}
            n="5.6"
            caption="Halaman Pelatihan dan Pengujian Massal sebelum ada sesi aktif."
            marks={[
              { n: 1, x: 19.8, y: 32 },
              { n: 2, x: 71.6, y: 32 },
            ]}
          />
          <Col>
            <P>
              Setiap sesi yang selesai disimpan oleh sistem. Tab{" "}
              <Ui>Muat Sesi Lalu</Ui> memungkinkan administrator membuka kembali
              ringkasan dan tabel iterasi tanpa menjalankan pelatihan ulang.
              Hasil yang dibuka sama dengan hasil saat sesi pertama kali
              dijalankan.
            </P>
            <Steps>
              <li>
                Tekan tab <Ui>Muat Sesi Lalu</Ui>.
              </li>
              <li>
                Pilih satu sesi pada daftar <Ui>Pilih Sesi Pelatihan Massal Sebelumnya</Ui>.
                Setiap kartu memuat nama sesi, berkas, jumlah seed, rasio uji, dan
                tanggal.
              </li>
              <li>
                Tekan <Ui>Tampilkan Data Sesi Terpilih</Ui>.
              </li>
            </Steps>
            <Callout label="Daftar kosong" kind="note">
              Bila daftar belum menampilkan sesi, tekan ikon panah melingkar di
              kanan judul untuk memuat ulang. Menekan tombol tampilkan sebelum
              memilih sesi memunculkan notifikasi Sesi Belum Dipilih.
            </Callout>
          </Col>
        </Cols>
        <Shot
          name="06-batch-sesi-lalu"
          width="150mm"
          n="5.7"
          caption="Tab Muat Sesi Lalu dengan dua sesi tersimpan."
          center
          marks={[
            { n: 3, x: 3.1, y: 45 },
            { n: 4, x: 95.9, y: 31.2 },
            { n: 5, x: 3.1, y: 85.7 },
          ]}
        />
      </>
    ),
  },
];
