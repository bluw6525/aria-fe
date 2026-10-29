import {
  Callout,
  Code,
  Col,
  Cols,
  Fig,
  H3,
  Ic,
  P,
  PageHead,
  Steps,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const CH = "02 Instalasi dan Menjalankan";

export const chapter02: PageDesc[] = [
  {
    kind: "opener",
    id: "c2",
    number: "02",
    title: "Instalasi dan Menjalankan",
    lead: "Menyiapkan API dan antarmuka di komputer lokal, membuat akun administrator, lalu masuk ke aplikasi.",
    items: [
      { label: "Menjalankan API (aria-be)", id: "c2-be" },
      { label: "Menjalankan antarmuka dan masuk", id: "c2-fe" },
    ],
  },
  {
    kind: "page",
    id: "c2-be",
    chapter: CH,
    toc: "Menjalankan API (aria-be)",
    body: (
      <>
        <PageHead kicker="Bab 02" title="Menjalankan API (aria-be)" />
        <Cols template="1fr 1fr" gap="9mm">
          <Col>
            <P>
              API membutuhkan Python 3.14 atau lebih baru dan pengelola paket{" "}
              <Ic>uv</Ic>. Seluruh perintah dijalankan dari folder{" "}
              <Ic>aria-be</Ic>. Urutan langkahnya sama pada Linux, macOS, dan
              Windows.
            </P>
            <Steps>
              <li>
                <b>Pasang dependensi.</b> Perintah <Ic>uv sync</Ic> membuat
                lingkungan virtual dan memasang seluruh paket.
              </li>
              <li>
                <b>Siapkan konfigurasi.</b> Salin <Ic>.env.example</Ic> menjadi{" "}
                <Ic>.env</Ic>, lalu ganti nilai <Ic>SECRET_KEY</Ic>.
              </li>
              <li>
                <b>Buat tabel basis data.</b> Migrasi Alembic membentuk berkas{" "}
                <Ic>aria.db</Ic> beserta seluruh tabelnya.
              </li>
              <li>
                <b>Buat akun administrator.</b> Skrip seed membuat akun dengan
                nama <Ic>admin</Ic> dan kata sandi <Ic>admin123</Ic>. Opsi{" "}
                <Ic>--username</Ic>, <Ic>--password</Ic>, dan <Ic>--email</Ic>{" "}
                mengganti nilai bawaan.
              </li>
              <li>
                <b>Jalankan server.</b> API aktif pada{" "}
                <Ic>http://127.0.0.1:8000</Ic> dengan muat ulang otomatis.
                Dokumentasi interaktif tersedia pada alamat <Ic>/docs</Ic>.
              </li>
            </Steps>
          </Col>
          <Col>
            <Code>{`$ cd aria-be
$ uv sync
$ cp .env.example .env
$ uv run alembic upgrade head
$ uv run python commands/seed_admin.py
$ uv run python main.py`}</Code>
            <H3>Variabel pada berkas .env</H3>
            <Table
              head={["Variabel", "Fungsi", "Nilai contoh"]}
              widths={["36%", "34%", "30%"]}
              rows={[
                [<Ic key="a">PROJECT_NAME</Ic>, "Nama layanan", "Aria API"],
                [<Ic key="b">API_V1_STR</Ic>, "Awalan jalur API", "/api/v1"],
                [<Ic key="c">DATABASE_URL</Ic>, "Alamat basis data", "sqlite+aiosqlite:///./aria.db"],
                [<Ic key="d">SECRET_KEY</Ic>, "Kunci penanda token JWT", "Teks acak yang panjang"],
                [<Ic key="e">ACCESS_TOKEN_EXPIRE_MINUTES</Ic>, "Masa berlaku token", "10080 (7 hari)"],
              ]}
            />
            <Callout label="Keamanan" kind="warn">
              Kata sandi <Ic>admin123</Ic> hanya cocok untuk percobaan lokal.
              Gunakan opsi <Ic>--password</Ic> dan <Ic>SECRET_KEY</Ic> baru
              sebelum aplikasi dibuka untuk orang lain.
            </Callout>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c2-fe",
    chapter: CH,
    toc: "Menjalankan antarmuka dan masuk",
    body: (
      <>
        <PageHead kicker="Bab 02" title="Menjalankan Antarmuka dan Masuk" />
        <Cols template="1fr 74mm" gap="10mm">
          <Col>
            <P>
              Antarmuka dibangun dengan Next.js dan dijalankan memakai Bun.
              Alamat API dibaca dari variabel{" "}
              <Ic>NEXT_PUBLIC_API_BASE_URL</Ic>. Tanpa variabel itu aplikasi
              memakai <Ic>http://localhost:8000/api/v1</Ic>.
            </P>
            <Code>{`$ cd aria-fe
$ bun install
$ echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1" > .env.local
$ bun dev`}</Code>
            <Steps>
              <li>
                Buka <Ic>http://localhost:3000</Ic>. Alamat akar mengarahkan
                peramban ke halaman Home.
              </li>
              <li>
                Untuk masuk sebagai administrator, buka alamat{" "}
                <Ic>/login</Ic>. Isi kolom <b>Username</b> dan{" "}
                <b>Password</b>, lalu tekan <b>Masuk Administrator</b>.
              </li>
              <li>
                Setelah verifikasi berhasil, aplikasi membuka Home dan menu{" "}
                <b>Latih dan Uji</b> serta <b>Benchmark MCCV</b> muncul pada
                sidebar.
              </li>
              <li>
                Tombol keluar berada di sebelah nama <b>Admin Aria</b> pada
                kepala sidebar dan mengakhiri sesi.
              </li>
            </Steps>
            <Callout label="Catatan" kind="note">
              Token tersimpan di peramban dengan kunci{" "}
              <Ic>aria_auth_session</Ic>. Setelah 7 hari token kedaluwarsa dan
              aplikasi meminta masuk kembali.
            </Callout>
          </Col>
          <Fig
            name="03-login"
            width="74mm"
            n="2.1"
            caption="Halaman Login Administrator."
            center
          />
        </Cols>
      </>
    ),
  },
];
