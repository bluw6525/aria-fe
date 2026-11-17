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
  Ui,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "2";
const CH = "Memulai";

export const chapter02: PageDesc[] = [
  {
    kind: "page",
    id: "c2-beranda",
    part: "A",
    chapterNo: NO,
    chapter: CH,
    toc: "Membuka aplikasi dan halaman Beranda",
    body: (
      <>
        <PageHead kicker="Bab 2" title="Membuka Aplikasi dan Halaman Beranda" />
        <Cols template="156mm 1fr" gap="9mm">
          <Shot
            name="01-beranda"
            width="156mm"
            n="2.1"
            caption="Halaman Beranda Aria pada pengguna umum."
            marks={[
              { n: 1, x: 1.8, y: 14.9 },
              { n: 2, x: 24, y: 44.5 },
              { n: 3, x: 37.3, y: 44.5 },
              { n: 4, x: 26, y: 55.9 },
              { n: 5, x: 26, y: 90.5 },
            ]}
          />
          <Col>
            <P>
              Buka alamat aplikasi Aria pada browser di komputer, tablet, atau
              ponsel. Halaman pertama yang tampil adalah Beranda, berisi ringkasan
              tujuan dan fitur aplikasi. Menu di sisi kiri selalu tersedia untuk
              berpindah antarhalaman.
            </P>
            <MarkList
              items={[
                ["Menu navigasi.", "Daftar halaman. Halaman yang sedang dibuka ditandai latar putih."],
                ["Mulai Estimasi.", "Tombol pintas menuju halaman Estimasi ISPU."],
                ["Panduan Sistem.", "Tombol pintas menuju halaman Bantuan."],
                ["Tujuan Aplikasi.", "Tiga sasaran aplikasi: Perluasan Jangkauan Pemantauan, Integrasi Data Satelit dan Sensor Darat, serta Estimasi Nilai ISPU Ozon Permukaan."],
                ["Fitur dan Modul Aplikasi.", "Ringkasan setiap menu. Gulir ke bawah untuk membacanya."],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c2-masuk",
    part: "B",
    chapterNo: "5",
    chapter: "Persiapan Administrator",
    toc: "Masuk dan keluar sebagai administrator",
    body: (
      <>
        <PageHead kicker="Bab 5" title="Masuk dan Keluar sebagai Administrator" />
        <Cols template="1fr 84mm 64mm" gap="9mm">
          <Col>
            <P>
              Akun administrator diperlukan untuk menu Latih dan Uji serta
              Pelatihan Massal. Halaman Login Administrator dibuka lewat alamat
              aplikasi dengan akhiran <Ui>/login</Ui>. Setelah masuk, seluruh
              menu pengguna umum tetap tersedia dan dua menu administrator
              bertambah di bawahnya.
            </P>
            <Steps>
              <li>
                Ketik nama akun pada kolom <Ui>Username</Ui>.
              </li>
              <li>
                Ketik kata sandi pada kolom <Ui>Password</Ui>. Ikon mata di ujung
                kolom menampilkan atau menyembunyikan karakter yang diketik.
              </li>
              <li>
                Tekan <Ui>Masuk Administrator</Ui>.
              </li>
              <li>
                Setelah berhasil, nama pada kiri atas berubah menjadi{" "}
                <Ui>Admin Aria</Ui> dan menu Latih dan Uji serta Pelatihan Massal
                muncul.
              </li>
            </Steps>
            <Callout label="Keluar" kind="note">
              Tekan ikon panah keluar di samping nama Admin Aria. Notifikasi
              Logout Berhasil muncul dan layar kembali ke Beranda.
            </Callout>
          </Col>
          <Shot
            name="03-login"
            width="84mm"
            n="2.2"
            caption="Halaman Login Administrator."
            marks={[
              { n: 1, x: 8, y: 31.8 },
              { n: 2, x: 8, y: 51.7 },
              { n: 3, x: 8, y: 68.3 },
            ]}
          />
          <Shot
            name="02-sidebar-admin"
            width="64mm"
            box={[0, 0, 100, 10]}
            n="2.3"
            caption="Tombol keluar di samping nama akun."
            marks={[{ n: 4, x: 86, y: 35 }]}
          />
        </Cols>
        <H3>Cara memilih halaman</H3>
        <P>
          Tekan salah satu nama pada menu kiri untuk membuka halamannya. Judul
          dan penjelasan singkat halaman tampil di tengah bagian atas. Pada
          halaman Latih dan Uji serta Pelatihan Massal, kolom kiri berisi isian
          dan kolom kanan berisi hasil. Hasil muncul setelah tombol aksi
          ditekan dan hilang setelah tombol Reset ditekan.
        </P>
      </>
    ),
  },
];
