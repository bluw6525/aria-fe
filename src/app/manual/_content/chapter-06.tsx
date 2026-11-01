import {
  Col,
  Cols,
  H3,
  P,
  PageHead,
  Shot,
  Table,
} from "../_components/primitives";
import type { PageDesc } from "./types";

const NO = "6";
const CH = "Bantuan dan Informasi";

const BOX: [number, number, number, number] = [27, 13.5, 66, 52];

export const chapter06: PageDesc[] = [
  {
    kind: "page",
    id: "c6-bantuan",
    chapterNo: NO,
    chapter: CH,
    toc: "Halaman Bantuan",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Halaman Bantuan" />
        <P>
          Halaman Bantuan memuat empat tab informasi yang dapat dibuka tanpa
          masuk sebagai administrator. Tab dipilih dengan menekan namanya pada
          deretan tab di bagian atas. Isi setiap tab selaras dengan teori singkat
          pada Bab 1, sehingga pengguna dapat membacanya langsung di dalam
          aplikasi.
        </P>
        <Cols template="1fr 1fr" gap="9mm" style={{ rowGap: "4mm", justifyItems: "center" }}>
          <Shot
            name="07-bantuan-1"
            width="98mm"
            box={BOX}
            n="6.1"
            caption="Tab Cara Penggunaan: tiga langkah memilih model, memasukkan data, dan membaca hasil."
          />
          <Shot
            name="07-bantuan-2"
            width="98mm"
            box={BOX}
            n="6.2"
            caption="Tab Dasar Teori MM-Estimator: perbandingan M, S, dan MM-Estimator."
          />
          <Shot
            name="07-bantuan-3"
            width="98mm"
            box={BOX}
            n="6.3"
            caption="Tab Dampak Polusi dan Prekursor: peran CO, NO2, dan ozon permukaan."
          />
          <Shot
            name="07-bantuan-4"
            width="98mm"
            box={BOX}
            n="6.4"
            caption="Tab Kategori Standar ISPU: tabel rentang, arti, dan saran."
          />
        </Cols>
      </>
    ),
  },
  {
    kind: "page",
    id: "c6-riwayat",
    chapterNo: NO,
    chapter: CH,
    toc: "Riwayat Perancang",
    body: (
      <>
        <PageHead kicker="Bab 6" title="Riwayat Perancang" />
        <Cols template="150mm 1fr" gap="10mm">
          <Shot
            name="08-riwayat"
            width="150mm"
            box={[27, 13.5, 66, 56]}
            n="6.5"
            caption="Halaman Riwayat Perancang."
          />
          <Col>
            <P>
              Halaman Riwayat Perancang memperkenalkan perancang sistem Aria,
              yaitu mahasiswa Teknik Informatika Universitas Tarumanagara.
              Halaman memuat nama, nomor induk mahasiswa, uraian latar belakang
              pengembangan, dan daftar dosen pembimbing. Halaman bersifat
              informasi dan tidak memiliki isian yang perlu diisi.
            </P>
            <H3>Informasi yang tersedia</H3>
            <Table
              head={["Bagian", "Isi"]}
              widths={["38%", "62%"]}
              compact
              rows={[
                ["Identitas", "Nama perancang, NIM, dan institusi"],
                ["Latar belakang", "Alasan Aria dikembangkan dan manfaat yang dituju"],
                ["Dosen Pembimbing", "Dua dosen pembimbing penelitian"],
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
];
