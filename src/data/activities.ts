import type { Activity, ActivityProgram, ActivitySection } from "@/types/activity";
import { TODO_CONTENT } from "@/lib/utils";

export const activities: Activity[] = [
  {
    slug: "kegiatan-belajar-mengajar-rutin",
    title: "Kegiatan Belajar Mengajar Rutin",
    excerpt:
      "Proses pembelajaran tatap muka yang dilaksanakan setiap hari dengan menerapkan kurikulum nasional berlandaskan nilai-nilai keislaman.",
    content: TODO_CONTENT,
    image: '/images/belajar-1.jpg',
    category: "Kegiatan Madrasah",
    date: "2025-01-12",
    educationUnit: "Yayasan",
    featured: true,
    gallery: [
      {
        image: "/images/belajar-1.jpg",
        title: "Suasana belajar di kelas",
        description:
          "Guru dan peserta didik menjalankan pembelajaran tatap muka dengan suasana yang tertib dan fokus.",
        alt: "Kegiatan belajar mengajar rutin di dalam kelas Yatina",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Pendampingan pembelajaran harian",
        description:
          "Proses belajar didampingi secara terarah agar materi akademik dan pembinaan karakter berjalan seimbang.",
        alt: "Pendampingan pembelajaran harian peserta didik di lingkungan madrasah",
      },
    ],
  },
  {
    slug: "sholat-dhuha-berjamaah",
    title: "Shalat Dhuha Berjamaah dan Kultum",
    excerpt:
      "Kegiatan keagamaan rutin shalat dhuha berjamaah yang diikuti oleh siswa, guru, dan warga madrasah untuk memperkuat ukhuwah Islamiyah.",
    content: TODO_CONTENT,
    image: '/images/dhuha-1.jpg',
    category: "Keagamaan",
    date: "2025-01-10",
    educationUnit: "MI",
    featured: true,
    gallery: [
      {
        image: "/images/dhuha-1.jpg",
        title: "Shalat dhuha bersama",
        description:
          "Peserta didik, guru, dan warga madrasah mengikuti shalat dhuha berjamaah sebagai pembiasaan ibadah harian.",
        alt: "Shalat dhuha berjamaah bersama siswa dan guru madrasah",
      },
      {
        image: "/images/hero-3.jpg",
        title: "Kultum setelah ibadah",
        description:
          "Setelah shalat, kegiatan dilanjutkan dengan kultum singkat untuk memperkuat adab dan nilai keislaman.",
        alt: "Suasana pembinaan keagamaan setelah shalat dhuha berjamaah",
      },
    ],
  },
  {
    slug: "ekstrakurikuler-pramuka",
    title: "Ekstrakurikuler Pramuka dan Kepemimpinan",
    excerpt:
      "Kegiatan ekstrakurikuler pramuka untuk melatih kedisiplinan, kemandirian, jiwa kepemimpinan, dan cinta alam pada peserta didik.",
    content: `
      <p>
        Kegiatan Pramuka di madrasah ini jadi ruang belajar yang lebih santai, tapi tetap penuh makna.
        Anak-anak diajak untuk berani tampil, kompak dengan regu, dan terbiasa bertanggung jawab dalam setiap kegiatan.
      </p>
      <p>
        Lewat latihan rutin, kegiatan lapangan, dan momen seperti persiapan jambore, peserta didik belajar bahwa
        disiplin dan kerja sama itu bukan cuma teori, tapi kebiasaan yang dibangun pelan-pelan bersama teman dan pembina.
      </p>
      <p>
        Suasana kegiatannya dibuat hangat dan menyenangkan supaya siswa bisa berkembang dengan percaya diri,
        punya jiwa kepemimpinan, dan lebih siap saat diberi tanggung jawab di sekolah maupun di luar sekolah.
      </p>
    `,
    image: '/images/pramuka/pramuka-1.jpg',
    category: "Ekstrakurikuler",
    date: "2025-01-08",
    educationUnit: "Yayasan",
    featured: true,
    section: "ekstrakurikuler",
    program: "pramuka",
    gallery: [
      {
        image: "/images/pramuka/pramuka-1.jpg",
        title: "Kebersamaan Siswi Pramuka MTs",
        description:
          "Dokumentasi kebersamaan siswi Pramuka MTs dalam kegiatan lapangan yang menumbuhkan kekompakan, disiplin, dan semangat kebersamaan.",
        alt: "Siswi Pramuka MTs berfoto bersama saat kegiatan lapangan",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Pembinaan karakter lapangan",
        description:
          "Kegiatan lapangan mendorong kemandirian, kerja sama tim, dan kepedulian antaranggota regu.",
        alt: "Pembinaan karakter siswa melalui kegiatan lapangan Pramuka",
      },
      {
        image: "/images/pramuka/siswa-mts-ke-jambore.jpeg",
        title: "Peserta MTs menuju jambore",
        description:
          "Peserta Pramuka MTs bersiap berangkat mengikuti Jambore Nasional tahun 2026 sebagai bagian dari pembinaan kemandirian dan pengalaman lapangan.",
        alt: "Siswa MTs Pramuka bersiap berangkat mengikuti jambore",
      },
      {
        image: "/images/pramuka/pelepasan-jambore.jpeg",
        title: "Pelepasan kontingen jambore MTs",
        description:
          "Momen pelepasan Kontingen Pramuka Lombok Utara menuju Jambore Nasional tahun 2026 Di kantor Bupati Lombok Utara dengan suasana penuh semangat.",
        alt: "Suasana pelepasan peserta Pramuka MTs menuju jambore",
      },
      {
        image: "/images/pramuka/kepsek-mts-melepas-jambore.jpeg",
        title: "Kepala sekolah melepas peserta jambore",
        description:
          "Kepala sekolah MTs memberikan pelepasan kepada peserta Pramuka yang akan mengikuti Jambore Nasional tahun 2026 sebagai bentuk dukungan madrasah.",
        alt: "Kepala sekolah MTs melepas peserta Pramuka untuk mengikuti jambore",
      },
    ],
  },
  {
    slug: "tim-sepak-bola-persahabatan-antar-madrasah",
    title: "Tim Sepak Bola Ikuti Laga Persahabatan Antar Madrasah",
    excerpt:
      "Program sepak bola membina kebugaran, sportivitas, dan kerja sama tim melalui latihan rutin serta pertandingan persahabatan antar madrasah.",
    content: TODO_CONTENT,
    image: '/images/bola/bola-1.jpg',
    category: "Ekstrakurikuler",
    date: "2025-01-07",
    educationUnit: "MTs",
    section: "ekstrakurikuler",
    program: "sepak-bola",
    gallery: [
      {
        image: "/images/bola/bola-1.jpg",
        title: "Latihan teknik dasar tim",
        description:
          "Program latihan rutin difokuskan pada teknik dasar, kebugaran, dan koordinasi antarpemain.",
        alt: "Latihan teknik dasar tim sepak bola siswa madrasah",
      },
      {
        image: "/images/main.jpg",
        title: "Semangat kerja sama tim",
        description:
          "Pembinaan sepak bola menanamkan sportivitas, tanggung jawab, dan kekompakan sebelum laga persahabatan.",
        alt: "Pembinaan kerja sama tim dalam kegiatan sepak bola madrasah",
      },
    ],
  },
  {
    slug: "kunjungan-sosial-desa",
    title: "Kunjungan Sosial ke Masyarakat Sekitar",
    excerpt:
      "Program pengabdian peserta didik melalui kunjungan sosial ke warga sekitar sebagai wujud implementasi nilai kepedulian sosial.",
    content: TODO_CONTENT,
    image: '/images/sosial/sosial-masyarakat-1.jpg',
    category: "Sosial",
    date: "2025-01-05",
    educationUnit: "MI",
    gallery: [
      {
        image: "/images/sosial/sosial-masyarakat-1.jpg",
        title: "Kunjungan ke warga sekitar",
        description:
          "Peserta didik belajar hadir langsung di tengah masyarakat dengan membawa semangat kepedulian sosial.",
        alt: "Kegiatan kunjungan sosial peserta didik ke masyarakat sekitar",
      },
      {
        image: "/images/hero-3.jpg",
        title: "Pembelajaran empati bersama",
        description:
          "Guru mendampingi siswa agar kegiatan sosial menjadi sarana pembentukan empati dan akhlak terpuji.",
        alt: "Pendampingan guru dalam kegiatan sosial bersama siswa",
      },
    ],
  },
  // {
  //   slug: "lomba-adzan-dan-tilawah",
  //   title: "Lomba Adzan dan Tilawah Al-Qur'an",
  //   excerpt:
  //     "Peserta didik mengikuti lomba adzan dan tilawah untuk mengembangkan bakat keagamaan serta memperdalam bacaan Al-Qur'an yang baik dan benar.",
  //   content: TODO_CONTENT,
  //   image: activityImage("lomba-adzan-tilawah-quran-anak"),
  //   category: "Keagamaan",
  //   date: "2025-01-02",
  //   educationUnit: "MTs",
  // },
  // {
  //   slug: "prestasi-juara-umum-festival-anak-saleh",
  //   title: "Prestasi Juara Umum pada Festival Anak Saleh",
  //   excerpt:
  //     "Peserta didik Yatina meraih juara umum pada ajang Festival Anak Saleh tingkat kecamatan sebagai hasil pembinaan akademik dan karakter yang berkelanjutan.",
  //   content: TODO_CONTENT,
  //   image: activityImage("prestasi-piala-festival-anak-saleh"),
  //   category: "Prestasi",
  //   date: "2025-01-01",
  //   educationUnit: "Yayasan",
  //   featured: true,
  //   section: "prestasi",
  // },
  {
    slug: "upacara-bendera-senin",
    title: "Upacara Bendera Setiap Hari Senin",
    excerpt:
      "Upacara bendera rutin hari Senin untuk menanamkan nilai-nilai nasionalisme, kedisiplinan, dan cinta tanah air.",
    content: TODO_CONTENT,
    image: '/images/upacara/upacara-bendera-1.jpg',
    category: "Kegiatan Madrasah",
    date: "2024-12-30",
    educationUnit: "MTs",
    gallery: [
      {
        image: "/images/upacara/upacara-bendera-1.jpg",
        title: "Barisan upacara Senin pagi",
        description:
          "Seluruh peserta didik mengikuti upacara dengan tertib sebagai pembiasaan disiplin dan cinta tanah air.",
        alt: "Barisan siswa saat upacara bendera hari Senin di madrasah",
      },
      {
        image: "/images/hero-2.jpg",
        title: "Pembinaan kedisiplinan bersama",
        description:
          "Rangkaian upacara menjadi momen pembinaan sikap, tanggung jawab, dan penghormatan kepada simbol negara.",
        alt: "Pembinaan kedisiplinan siswa dalam kegiatan upacara bendera",
      },
    ],
  },
];

export function getLatestActivities(count = 4) {
  return [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getActivitiesBySection(section: ActivitySection) {
  return activities.filter((activity) => activity.section === section);
}

export function getActivitiesByProgram(program: ActivityProgram) {
  return activities.filter((activity) => activity.program === program);
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
