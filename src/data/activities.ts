import type { Activity } from "@/types/activity";
import { TODO_CONTENT } from "@/lib/utils";

const activityImage = (seed: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    `kegiatan ${seed} di madrasah islam indonesia, dokumenter alami, pencahayaan hangat, suasana akrab, anak-anak dan guru muslim, nuansa lokal lombok`
  )}&image_size=landscape_4_3`;

export const activities: Activity[] = [
  {
    slug: "kegiatan-belajar-mengajar-rutin",
    title: "Kegiatan Belajar Mengajar Rutin",
    excerpt:
      "Proses pembelajaran tatap muka yang dilaksanakan setiap hari dengan menerapkan kurikulum nasional berlandaskan nilai-nilai keislaman.",
    content: TODO_CONTENT,
    image: activityImage("belajar-mengajar-kelas-rutin"),
    category: "Kegiatan Madrasah",
    date: "2025-01-12",
    educationUnit: "Yayasan",
    featured: true,
  },
  {
    slug: "sholat-jumat-berjamaah",
    title: "Shalat Jumat Berjamaah dan Kultum",
    excerpt:
      "Kegiatan keagamaan rutin shalat Jumat berjamaah yang diikuti oleh siswa, guru, dan warga madrasah untuk memperkuat ukhuwah Islamiyah.",
    content: TODO_CONTENT,
    image: activityImage("sholat-jumat-berjamaah-masjid"),
    category: "Keagamaan",
    date: "2025-01-10",
    educationUnit: "Yayasan",
    featured: true,
  },
  {
    slug: "ekstrakurikuler-pramuka",
    title: "Ekstrakurikuler Pramuka dan Kepemimpinan",
    excerpt:
      "Kegiatan ekstrakurikuler pramuka untuk melatih kedisiplinan, kemandirian, jiwa kepemimpinan, dan cinta alam pada peserta didik.",
    content: TODO_CONTENT,
    image: activityImage("pramuka-ekstrakurikuler-outdoor"),
    category: "Ekstrakurikuler",
    date: "2025-01-08",
    educationUnit: "MI",
    featured: true,
  },
  {
    slug: "kunjungan-sosial-desa",
    title: "Kunjungan Sosial ke Masyarakat Sekitar",
    excerpt:
      "Program pengabdian peserta didik melalui kunjungan sosial ke warga sekitar sebagai wujud implementasi nilai kepedulian sosial.",
    content: TODO_CONTENT,
    image: activityImage("kunjungan-sosial-masyarakat-desa"),
    category: "Sosial",
    date: "2025-01-05",
    educationUnit: "MA",
  },
  {
    slug: "lomba-adzan-dan-tilawah",
    title: "Lomba Adzan dan Tilawah Al-Qur'an",
    excerpt:
      "Peserta didik mengikuti lomba adzan dan tilawah untuk mengembangkan bakat keagamaan serta memperdalam bacaan Al-Qur'an yang baik dan benar.",
    content: TODO_CONTENT,
    image: activityImage("lomba-adzan-tilawah-quran-anak"),
    category: "Keagamaan",
    date: "2025-01-02",
    educationUnit: "MTs",
  },
  {
    slug: "upacara-bendera-senin",
    title: "Upacara Bendera Setiap Hari Senin",
    excerpt:
      "Upacara bendera rutin hari Senin untuk menanamkan nilai-nilai nasionalisme, kedisiplinan, dan cinta tanah air.",
    content: TODO_CONTENT,
    image: activityImage("upacara-bendera-senin-sekolah"),
    category: "Kegiatan Madrasah",
    date: "2024-12-30",
    educationUnit: "TK",
  },
];

export function getLatestActivities(count = 4) {
  return [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getActivity(slug: string) {
  return activities.find((a) => a.slug === slug);
}

export function getRelatedActivities(slug: string, count = 3) {
  const current = getActivity(slug);
  if (!current) return [];
  return activities
    .filter((a) => a.slug !== slug && a.educationUnit === current.educationUnit)
    .slice(0, count);
}
