import {
  Bullets,
  Callout,
  Code,
  Col,
  Cols,
  Crop,
  Eq,
  Fig,
  Frac,
  H3,
  Ic,
  Legend,
  P,
  PageHead,
  Sqrt,
  Steps,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "04 Melatih dan Menguji Model";

export const chapter04: PageDesc[] = [
  {
    kind: "opener",
    id: "c4",
    number: "04",
    title: "Melatih dan Menguji Model",
    lead: "Modul untuk administrator: menyiapkan berkas data, mendeteksi pencilan, melatih estimator robust, menyimpan koefisien ke basis data, lalu mengujinya pada data baru.",
    items: [
      { label: "Menyiapkan berkas data", id: "c4-data" },
      { label: "Melatih model", id: "c4-latih" },
      { label: "Deteksi outlier", id: "c4-outlier" },
      { label: "Rumus estimator dan metrik", id: "c4-rumus" },
      { label: "Membaca hasil pelatihan", id: "c4-hasil" },
      { label: "Menguji model", id: "c4-uji" },
    ],
  },
  {
    kind: "page",
    id: "c4-data",
    chapter: CH,
    toc: "Menyiapkan berkas data",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Menyiapkan Berkas Data" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <P>
              Aria menerima berkas <Ic>.csv</Ic>, <Ic>.xls</Ic>, dan{" "}
              <Ic>.xlsx</Ic>. Setiap berkas berisi satu baris per pengamatan
              dengan kolom CO, NO2, dan O3. Sistem mencari kolom yang sesuai
              dari namanya, sehingga urutan kolom bebas dan kolom lain diabaikan.
              Kolom penanda waktu, bila ada, dipakai sebagai label pada grafik.
            </P>
            <Table
              head={["Peran kolom", "Contoh nama yang dikenali"]}
              widths={["30%", "70%"]}
              rows={[
                ["CO satelit", "CO, CO satelit, Carbon Monoxide, Karbon Monoksida"],
                ["NO2 satelit", "NO2, NO2 satelit, Nitrogen Dioxide, Nitrogen Dioksida"],
                ["O3 (target)", "O3, O3 SPKU, Ozon, Ozone, SPKU"],
                ["Label waktu", "Tanggal, Date, Waktu, Time, Tahun, Year, Timestamp"],
              ]}
            />
            <Code>{`Tanggal,CO satelit,NO2 satelit,O3 SPKU
2023-01-01,0.03741,6.965e-05,52.3
2023-01-02,0.039739,9.994e-05,72.1
2023-01-03,0.037858,7.607e-05,47.4`}</Code>
          </Col>
          <Col>
            <H3>Aturan data</H3>
            <Bullets>
              <li>
                Kolom O3 wajib ada pada data latih, data uji, dan data
                benchmark. Berkas untuk estimasi tidak memerlukannya.
              </li>
              <li>
                Nilai O3 yang kosong diisi dengan interpolasi natural cubic
                spline. Syaratnya, minimal 5 baris memiliki CO, NO2, dan O3
                yang lengkap.
              </li>
              <li>
                Satuan CO dan NO2 adalah mol/m², sebagaimana keluaran produk
                kolom vertikal Sentinel-5P.
              </li>
              <li>
                Berkas estimasi diperiksa lebih ketat. Nilai CO atau NO2 yang
                kosong pada satu baris membuat seluruh berkas ditolak.
              </li>
            </Bullets>
            <Callout label="Contoh" kind="tip">
              Tiga berkas contoh tersedia pada folder{" "}
              <Ic>scripts/manual-sample</Ic>. Berkas latih berisi 180 baris,
              berkas uji 60 baris, dan berkas estimasi 60 baris tanpa kolom O3.
            </Callout>
            <Callout label="Batasan" kind="warn">
              Berkas dengan format lain ditolak dengan pesan{" "}
              <Ic>Format berkas ... tidak didukung</Ic>. Berkas yang kolom
              CO, NO2, atau O3-nya tidak ditemukan juga ditolak, dan pesan
              galat menyebut kolom yang hilang.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c4-latih",
    chapter: CH,
    toc: "Melatih model",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Melatih Model" />
        <Cols template="80mm 1fr" gap="10mm">
          <Fig
            name="04-latih-form"
            width="80mm"
            n="4.1"
            caption="Kartu Konfigurasi Data Latih pada halaman Latih dan Uji."
          />
          <Col>
            <P>
              Halaman Latih dan Uji terbuka dari menu sidebar dan terbagi atas
              dua bagian. Bagian pertama melatih model, bagian kedua mengujinya.
              Pelatihan selalu memakai intercept dan menghasilkan satu garis
              regresi dengan koefisien untuk CO dan NO2.
            </P>
            <Steps>
              <li>
                <b>Unggah berkas data latih.</b> Seret berkas ke kotak unggah
                atau pilih dari komputer. Nama dan ukuran berkas tampil setelah
                unggahan diterima.
              </li>
              <li>
                <b>Pilih metode regresi robust.</b> Daftar pilihan memuat OLS,
                M-Estimator, S-Estimator, MM-Estimator (k=4.685), dan
                MM-Estimator (k=1.547).
              </li>
              <li>
                <b>Jalankan Deteksi Outlier</b> bila ingin melihat observasi
                yang berpengaruh. Langkah tersebut opsional dan tidak mengubah data.
              </li>
              <li>
                <b>Tekan Latih Model.</b> Server mengestimasi koefisien,
                menghitung metrik, lalu menampilkan grafik dan persamaan.
              </li>
              <li>
                <b>Simpan model.</b> Isi nama yang belum pernah dipakai pada
                kolom <b>Simpan Parameter Model ke Database</b> dan tekan{" "}
                <b>Simpan</b>. Nama yang sama ditolak oleh server.
              </li>
            </Steps>
            <Callout label="Saran" kind="tip">
              Beri nama yang memuat estimator, rentang data, dan tanggal latih,
              misalnya <Ic>MM k=1,547 Jakarta 2023</Ic>. Nama tersebut muncul
              pada daftar model di halaman Estimasi.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c4-outlier",
    chapter: CH,
    toc: "Deteksi outlier",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Deteksi Outlier" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <P>
              Tombol <b>Deteksi Outlier</b> memeriksa data latih dengan dua
              ukuran pengaruh. Leverage menandai baris yang letak CO dan NO2-nya
              jauh dari pusat data. DFFITS menandai baris yang menggeser nilai
              prediksi cukup besar bila dikeluarkan dari data. Baris dinomori
              sesuai urutan pada berkas, dimulai dari 1.
            </P>
            <H3>Leverage</H3>
            <Eq>
              <i>h</i>
              <sub><i>ii</i></sub> = <i>x</i>
              <sub><i>i</i></sub>
              <sup>T</sup> (<i>X</i>
              <sup>T</sup>
              <i>X</i>)<sup>−1</sup> <i>x</i>
              <sub><i>i</i></sub>
,&nbsp;&nbsp; ditandai bila <i>h</i>
              <sub><i>ii</i></sub> &gt;{" "}
              <Frac n={<>2<i>p</i></>} d={<i>n</i>} />
            </Eq>
            <H3>DFFITS</H3>
            <Eq>
              DFFITS
              <sub><i>i</i></sub> = <i>t</i>
              <sub><i>i</i></sub>{" "}
              <Sqrt>
                <Frac
                  n={<><i>h</i><sub><i>ii</i></sub></>}
                  d={<>1 − <i>h</i><sub><i>ii</i></sub></>}
                />
              </Sqrt>
            </Eq>
            <Eq>
              ditandai bila |DFFITS
              <sub><i>i</i></sub>| &gt; 2{" "}
              <Sqrt>
                <Frac n={<i>p</i>} d={<i>n</i>} />
              </Sqrt>
            </Eq>
            <Legend
              items={[
                [<i key="p">p</i>, "jumlah parameter model, yaitu 3 (intercept, CO, NO2)"],
                [<i key="n">n</i>, "jumlah baris data latih"],
                [<i key="t">t<sub>i</sub></i>, "residual terstudentisasi eksternal pada baris ke-i"],
              ]}
            />
          </Col>
          <Col>
            <Crop
              name="05-deteksi-outlier"
              width="124mm"
              height="29mm"
              n="4.2"
              caption="Hasil Deteksi Outlier pada data latih contoh (180 baris)."
            />
            <P>
              Hasil muncul sebagai dua baris. Baris <b>Leverage Value</b>{" "}
              mendaftar nomor data yang melewati ambang 2p/n, dan baris{" "}
              <b>DFFITS</b> mendaftar nomor data yang melewati ambang kedua.
              Pada data contoh, DFFITS menandai baris 10, 18, 64, dan 122.
            </P>
            <P>
              Daftar tersebut menjadi dasar untuk memeriksa kembali pengamatan
              sebelum model dilatih. Pencilan yang berasal dari galat
              pengukuran dapat dibuang dari berkas. Pencilan yang mencerminkan
              kejadian polusi nyata sebaiknya dipertahankan, dan estimator
              robust akan membatasi pengaruhnya pada koefisien.
            </P>
            <Callout label="Catatan" kind="note">
              Deteksi outlier hanya melaporkan nomor baris. Aplikasi tidak
              menghapus data secara otomatis, dan tombol Latih Model tetap
              memakai seluruh baris pada berkas.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c4-rumus",
    chapter: CH,
    toc: "Rumus estimator dan metrik",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Rumus Estimator dan Metrik" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <H3>Model regresi</H3>
            <Eq tag="(1)">
              <i>O</i>
              <sub>3,<i>i</i></sub> = <i>β</i>
              <sub>0</sub> + <i>β</i>
              <sub>1</sub> <i>CO</i>
              <sub><i>i</i></sub> + <i>β</i>
              <sub>2</sub> <i>NO</i>
              <sub>2,<i>i</i></sub> + <i>e</i>
              <sub><i>i</i></sub>
            </Eq>
            <P>
              Koefisien <i>β</i> diestimasi dari data latih. Residual{" "}
              <i>e</i>
              <sub>i</sub> adalah selisih antara O3 pengamatan dan O3 hasil
              garis regresi. OLS meminimumkan jumlah kuadrat residual, sedangkan
              estimator robust meminimumkan fungsi yang menekan residual besar.
            </P>
            <H3>Pembobot Tukey bisquare pada MM-Estimator</H3>
            <Eq tag="(2)">
              <i>w</i>(<i>u</i>) = (1 − (<Frac n={<i>u</i>} d={<i>k</i>} />)
              <sup>2</sup>)<sup>2</sup> untuk |<i>u</i>| ≤ <i>k</i>, selain itu{" "}
              <i>w</i>(<i>u</i>) = 0
            </Eq>
            <Legend
              items={[
                [<i key="u">u</i>, <>residual terskala, <i>u</i><sub>i</sub> = <i>e</i><sub>i</sub> / <i>s</i>, dengan <i>s</i> skala robust dari tahap S</>],
                [<i key="k">k</i>, "konstanta penala: 4,685 untuk efisiensi sekitar 95%, 1,547 untuk ketahanan ekstrem"],
              ]}
            />
            <P>
              MM-Estimator bekerja dalam tiga tahap. Tahap pertama menghitung
              estimasi awal dan skala residual dengan S-Estimator. Tahap kedua
              mengunci skala tersebut. Tahap ketiga memperbarui koefisien dengan
              iterasi kuadrat terkecil terboboti sampai koefisien konvergen.
            </P>
          </Col>
          <Col>
            <H3>Metrik evaluasi</H3>
            <Eq tag="(3)">
              RMSE ={" "}
              <Sqrt>
                <Frac n="1" d={<i>n</i>} /> Σ (<i>ŷ</i>
                <sub><i>i</i></sub> − <i>y</i>
                <sub><i>i</i></sub>)<sup>2</sup>
              </Sqrt>
            </Eq>
            <Eq tag="(4)">
              MAE = <Frac n="1" d={<i>n</i>} /> Σ |<i>ŷ</i>
              <sub><i>i</i></sub> − <i>y</i>
              <sub><i>i</i></sub>|
            </Eq>
            <Eq tag="(5)">
              <i>R</i>
              <sup>2</sup> ={" "}
              <Frac
                n={<>SS<sub>reg</sub></>}
                d={<>SS<sub>reg</sub> + SS<sub>res</sub></>}
              />
            </Eq>
            <Legend
              items={[
                [<i key="y">y<sub>i</sub></i>, "O3 hasil pengamatan stasiun SPKU"],
                [<i key="yh">ŷ<sub>i</sub></i>, "O3 hasil garis regresi"],
                [<>SS<sub>reg</sub></>, <>Σ (<i>ŷ</i><sub>i</sub> − <i>ȳ</i>)², variasi yang dijelaskan model</>],
                [<>SS<sub>res</sub></>, <>Σ (<i>y</i><sub>i</sub> − <i>ŷ</i><sub>i</sub>)², variasi yang tidak dijelaskan</>],
              ]}
            />
            <Callout label="Cara baca" kind="tip">
              RMSE dan MAE memakai satuan yang sama dengan O3, sehingga nilai
              yang kecil berarti selisih estimasi yang kecil. R² berada antara 0
              dan 1 dan ditampilkan dalam persen. Aria menghitung R² sebagai
              rasio variasi terjelaskan terhadap total variasi
              terjelaskan dan residual, seperti pada persamaan (5).
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c4-hasil",
    chapter: CH,
    toc: "Membaca hasil pelatihan",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Membaca Hasil Pelatihan" />
        <Cols template="1fr 132mm" gap="9mm">
          <Col>
            <P>
              Setelah pelatihan selesai, panel hasil menampilkan jumlah data
              latih, persamaan regresi, tiga kartu metrik, dan grafik. Persamaan
              ditulis dalam bentuk O3 = β0 + β1(CO) + β2(NO2) dengan empat angka
              di belakang koma. Tiga kartu metrik memuat RMSE, MAE, dan R²
              untuk data latih.
            </P>
            <P>
              Grafik data latih menumpuk dua garis. Garis biru merupakan O3
              sebenarnya dan garis merah putus-putus merupakan O3 estimasi
              untuk setiap baris. Selisih yang lebar pada satu titik menandakan
              observasi yang tidak dijelaskan baik oleh CO dan NO2.
            </P>
            <Table
              head={["Keluaran", "Nilai pada data contoh"]}
              widths={["50%", "50%"]}
              rows={[
                ["Jumlah data latih", "180"],
                ["RMSE", "12.4387"],
                ["MAE", "7.362"],
                ["R² Score", "68.1%"],
                [
                  "Persamaan",
                  <span key="eq">O3 = −109.1022 + 3171.9463(CO) + 635334.3901(NO2)</span>,
                ],
              ]}
            />
            <Callout label="Koefisien" kind="note">
              Koefisien NO2 tampak besar karena kolom vertikal NO2 bernilai
              sangat kecil, yaitu sekitar 10⁻⁵ mol/m². Besar koefisien harus
              dibaca bersama skala variabelnya.
            </Callout>
          </Col>
          <Fig
            name="06-hasil-latih"
            width="132mm"
            n="4.3"
            caption="Panel Hasil Pelatihan Model untuk estimator MM (k=1.547)."
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c4-uji",
    chapter: CH,
    toc: "Menguji model",
    body: (
      <>
        <PageHead kicker="Bab 04" title="Menguji Model" />
        <Cols template="80mm 1fr" gap="10mm">
          <Col>
            <Fig
              name="07-uji-form"
              width="80mm"
              n="4.4"
              caption="Kartu Pengujian Terhadap Data Uji."
            />
            <Steps>
              <li>
                Pilih model pada daftar <b>Pilih Model Pengujian</b>. Jumlah
                model di basis data tampil di sisi kanan judul.
              </li>
              <li>
                Unggah berkas data uji yang memuat kolom O3 dan tekan{" "}
                <b>Uji Model Terhadap Data Baru</b>.
              </li>
            </Steps>
          </Col>
          <Col>
            <Fig
              name="07-hasil-uji"
              width="140mm"
              n="4.5"
              caption="Hasil evaluasi model terhadap 60 data uji."
            />
            <P>
              Pengujian memakai koefisien yang sudah tersimpan dan tidak
              melatih ulang model. Kartu RMSE Uji, MAE Uji, dan R² Uji
              dihitung dari data yang belum pernah dilihat model. Selisih besar
              antara R² latih dan R² uji menandakan model terlalu menyesuaikan
              diri pada data latih.
            </P>
          </Col>
        </Cols>
      </>
    ),
  },
];
