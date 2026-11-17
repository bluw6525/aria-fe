import {
  Callout,
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

const NO = "6";
const CH = "Latih dan Uji";

export const chapter04: PageDesc[] = [
  {
    kind: "page",
    part: "B",
    id: "c4-halaman",
    chapterNo: NO,
    chapter: CH,
    toc: "Mengenal halaman Latih dan Uji",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Mengenal Halaman Latih dan Uji" />
        <Cols template="160mm 1fr" gap="9mm">
          <Shot
            name="05-latih-hero"
            width="160mm"
            n="4.1"
            caption="Halaman Latih dan Uji Model Regresi setelah model dilatih."
            marks={[
              { n: 1, x: 24, y: 25.8 },
              { n: 2, x: 24, y: 39.3 },
              { n: 3, x: 24, y: 45.1 },
              { n: 4, x: 24, y: 50.4 },
              { n: 5, x: 24, y: 60 },
              { n: 6, x: 24, y: 75.1 },
              { n: 7, x: 24, y: 83 },
              { n: 8, x: 24, y: 92.6 },
              { n: 9, x: 52.6, y: 18.5 },
              { n: 10, x: 52.6, y: 38.9 },
              { n: 11, x: 53.8, y: 81.7 },
            ]}
          />
          <Col>
            <MarkList
              items={[
                ["Unggah Berkas Data Latih.", ""],
                ["Metode Regresi Robust.", "MM, M, S, atau OLS."],
                ["Deteksi Outlier (optional).", "Memeriksa titik data yang menyimpang."],
                ["Latih Model.", "Membuat model dari data latih."],
                ["Simpan Parameter Model.", "Nama model dan tombol Simpan."],
                ["Pilih Model Pengujian.", "Model tersimpan atau model baru dilatih."],
                ["Unggah Berkas Data Uji.", ""],
                ["Uji Model Terhadap Data Baru.", ""],
                ["Outlier pada data latih.", "Hasil deteksi outlier."],
                ["Hasil Pelatihan Model.", "Persamaan, RMSE, dan MAE."],
                ["Grafik Data Latih.", "Perbandingan O3 sebenarnya dan estimasi."],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    part: "B",
    id: "c4-latih",
    chapterNo: NO,
    chapter: CH,
    toc: "Melatih model",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Melatih Model" />
        <Cols template="1fr 62mm" gap="10mm">
          <Col>
            <P>
              Pelatihan membentuk model dari data yang memuat kadar CO, NO2, dan
              nilai O3 hasil pengukuran stasiun SPKU. Model yang sudah dilatih
              dapat langsung dilihat hasilnya, diuji, dan disimpan sebagai model
              aktif yang dipakai peta Estimasi ISPU. Proses pelatihan dimulai dari panel
              Konfigurasi Data Latih di sisi kiri.
            </P>
            <Steps>
              <li>
                Tekan kolom <Ui>Unggah Berkas Data Latih</Ui> dan pilih berkas
                dengan kolom CO satelit, NO2 satelit, dan O3 SPKU.
              </li>
              <li>
                Pilih <Ui>Metode Regresi Robust</Ui>. MM-Estimator menjadi
                pilihan utama penelitian.
              </li>
              <li>
                Tekan <Ui>Latih Model</Ui>. Notifikasi Pelatihan Model Berhasil
                muncul dan hasil tampil di panel kanan.
              </li>
              <li>
                Isi nama pada kolom di bawah <Ui>Simpan Parameter Model ke
                Database</Ui>, lalu tekan <Ui>Simpan</Ui>.
              </li>
            </Steps>
            <H3>Pilihan metode</H3>
            <Table
              head={["Pilihan", "Keterangan"]}
              widths={["32%", "68%"]}
              compact
              rows={[
                ["MM-Estimator", "Tahan outlier dan efisien. Cocok sebagai model utama."],
                ["M-Estimator", "Tahan terhadap outlier pada nilai O3."],
                ["S-Estimator", "Sangat tahan outlier, efisiensi lebih rendah."],
                ["OLS", "Metode standar sebagai pembanding."],
              ]}
            />
            <Callout label="Berkas" kind="note">
              Hanya kolom CO satelit, NO2 satelit, dan O3 SPKU yang diproses. Nilai
              O3 yang kosong diisi otomatis dengan interpolasi spline kubik alami,
              dan kotak kuning Pemberitahuan Data Interpolasi menyebutkan jumlah
              baris yang dilengkapi.
            </Callout>
          </Col>
          <Shot
            name="05-form-latih"
            width="62mm"
            n="4.2"
            caption="Panel Konfigurasi Data Latih."
            marks={[
              { n: 1, x: 4, y: 18.6 },
              { n: 2, x: 4, y: 46 },
              { n: 3, x: 4, y: 58 },
              { n: 4, x: 4, y: 68.7 },
              { n: 5, x: 4, y: 88.3 },
            ]}
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    part: "B",
    id: "c4-outlier",
    chapterNo: NO,
    chapter: CH,
    toc: "Mendeteksi outlier",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Mendeteksi Outlier" />
        <Cols template="1fr 124mm" gap="10mm">
          <Col>
            <P>
              Outlier adalah data yang pola atau nilainya menyimpang jauh dari
              mayoritas data. Pada data satelit, outlier dapat muncul karena awan,
              gangguan sensor, atau kejadian pencemaran sesaat. Tombol{" "}
              <Ui>Deteksi Outlier (optional)</Ui> membantu administrator
              mengetahui baris mana yang menyimpang sebelum atau sesudah melatih
              model.
            </P>
            <Steps>
              <li>
                Unggah berkas data latih pada panel kiri.
              </li>
              <li>
                Tekan <Ui>Deteksi Outlier (optional)</Ui>.
              </li>
              <li>
                Baca kotak <Ui>Outlier pada data latih</Ui> di panel kanan.
              </li>
            </Steps>
            <H3>Cara membaca hasil</H3>
            <Table
              head={["Penanda", "Arti"]}
              widths={["30%", "70%"]}
              compact
              rows={[
                ["Leverage Value", "Baris dengan kombinasi CO dan NO2 yang jauh dari kebiasaan data lain, sehingga berpengaruh besar pada garis model."],
                ["DFFITS", "Baris yang bila dikeluarkan akan mengubah hasil estimasi cukup besar."],
                ["data ke N", "Nomor baris data pada berkas, dihitung dari baris data pertama setelah judul kolom."],
              ]}
            />
            <Callout label="Opsional" kind="tip">
              Deteksi tidak mengubah berkas. Hasilnya menjadi bahan pertimbangan,
              dan model robust tetap dapat dilatih pada data yang sama.
            </Callout>
          </Col>
          <Col>
            <Shot
              name="05-outlier"
              width="124mm"
              box={[0, 0, 100, 60]}
              n="4.3"
              caption="Kotak hasil deteksi outlier pada data latih."
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    part: "B",
    id: "c4-hasil",
    chapterNo: NO,
    chapter: CH,
    toc: "Membaca hasil pelatihan dan menyimpan model",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Membaca Hasil Pelatihan dan Menyimpan Model" />
        <Cols template="116mm 1fr" gap="10mm">
          <Shot
            name="05-hasil-latih"
            width="116mm"
            box={[0, 0, 100, 96]}
            n="4.4"
            caption="Panel Hasil Pelatihan Model."
            marks={[
              { n: 1, x: 80, y: 4.7 },
              { n: 2, x: 2.4, y: 17.5 },
              { n: 3, x: 2, y: 34.8 },
              { n: 4, x: 7, y: 55.4 },
              { n: 5, x: 65, y: 55.4 },
              { n: 6, x: 3.4, y: 72 },
            ]}
          />
          <Col>
            <MarkList
              items={[
                ["Jumlah data latih.", "Banyak baris yang dipakai untuk membentuk model."],
                ["Pemberitahuan Data Interpolasi.", "Tampil bila ada nilai O3 yang kosong dan dilengkapi otomatis, lengkap dengan jumlah barisnya."],
                ["Hasil Estimasi Parameter.", "Persamaan model sebagai catatan."],
                ["RMSE.", "Rata-rata selisih nilai sebenarnya dan estimasi pada data latih, dengan selisih besar diberi penekanan. Makin kecil makin baik."],
                ["MAE.", "Rata-rata selisih langsung dalam satuan ISPU. Makin kecil makin baik."],
                ["Grafik Data Latih.", "Garis biru adalah O3 sebenarnya dan garis merah putus-putus adalah O3 estimasi. Makin berimpit kedua garis, makin baik model."],
              ]}
            />
            <H3>Menyimpan model</H3>
            <P>
              Ketik nama pada kolom Simpan Parameter Model ke Database, lalu
              tekan Simpan. Notifikasi Model Berhasil Disimpan menandakan model
              tersimpan dan menjadi model aktif yang menggantikan model aktif
              sebelumnya. Model aktif dipakai peta Estimasi ISPU untuk semua
              pengguna dan ditandai ● [Aktif] pada daftar model pengujian. Kolom nama yang kosong memunculkan notifikasi
              Nama Model Kosong, dan Simpan sebelum Latih Model memunculkan
              notifikasi Model Belum Dilatih.
            </P>
            <P muted>
              Di bawah grafik tersedia tabel Daftar Data Hasil Pelatihan yang
              memuat nilai aktual, nilai estimasi, dan selisihnya (residual) untuk
              setiap baris.
            </P>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    part: "B",
    id: "c4-uji",
    chapterNo: NO,
    chapter: CH,
    toc: "Menguji model dengan data uji",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Menguji Model dengan Data Uji" />
        <Cols template="1fr 62mm 98mm" gap="8mm">
          <Col>
            <P>
              Pengujian mengukur ketepatan model pada data yang tidak dipakai
              saat pelatihan. Data uji memuat kolom yang sama dengan data latih,
              termasuk O3 SPKU sebagai nilai pembanding. Hasil pengujian lebih
              menggambarkan kinerja model pada data baru dibandingkan hasil
              pelatihan.
            </P>
            <Steps>
              <li>
                Pada bagian <Ui>2. Pengujian Terhadap Data Uji</Ui>, pilih model
                di <Ui>Pilih Model Pengujian</Ui>. Model yang baru dilatih
                bertanda bintang dan berlabel Belum Disimpan.
              </li>
              <li>
                Unggah berkas pada <Ui>Unggah Berkas Data Uji</Ui>.
              </li>
              <li>
                Tekan <Ui>Uji Model Terhadap Data Baru</Ui>.
              </li>
              <li>
                Baca RMSE Uji, MAE Uji, grafik, dan tabel residual pada panel
                kanan.
              </li>
            </Steps>
            <Callout label="Membaca hasil" kind="tip">
              RMSE Uji yang mendekati RMSE data latih menandakan model stabil.
              Selisih yang jauh lebih besar pada data uji menandakan model kurang
              baik pada data baru.
            </Callout>
          </Col>
          <Shot
            name="05-form-uji"
            width="62mm"
            n="4.5"
            caption="Bagian pengujian."
            marks={[
              { n: 1, x: 4, y: 29.4 },
              { n: 2, x: 4, y: 55.3 },
              { n: 3, x: 4, y: 86.9 },
            ]}
          />
          <Shot
            name="05-hasil-uji"
            width="98mm"
            box={[0, 0, 100, 90]}
            n="4.6"
            caption="Hasil evaluasi terhadap data uji."
            marks={[
              { n: 4, x: 1.8, y: 25.2 },
              { n: 5, x: 3.4, y: 40.3 },
            ]}
          />
        </Cols>
      </>
    ),
  },
];
