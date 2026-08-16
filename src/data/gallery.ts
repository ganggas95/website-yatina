import type { GalleryImage } from "@/types/gallery";

const galleryImage = (seed: string, size: "landscape_4_3" | "landscape_16_9" | "portrait_4_3" | "portrait_16_9" | "square_hd" = "landscape_4_3") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    `dokumenter fotografi ${seed} di lingkungan madrasah islam lombok, natural, hangat, berkualitas tinggi, nuansa hijau dan coklat lembut`
  )}&image_size=${size}`;

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: galleryImage("kegiatan-belajar-kelas", "landscape_4_3"),
    alt: "Kegiatan belajar mengajar di kelas",
    category: "Yayasan",
    aspectRatio: "landscape",
  },
  {
    id: "g2",
    src: galleryImage("anak-tk-bermain-belajar", "portrait_4_3"),
    alt: "Anak-anak TK sedang bermain sambil belajar",
    category: "TK",
    aspectRatio: "portrait",
  },
  {
    id: "g3",
    src: galleryImage("siswa-mi-membaca-quran", "square_hd"),
    alt: "Siswa MI sedang membaca Al-Qur'an",
    category: "MI",
    aspectRatio: "square",
  },
  {
    id: "g4",
    src: galleryImage("kegiatan-sholat-duha-berjamaah", "landscape_16_9"),
    alt: "Kegiatan shalat dhuha berjamaah",
    category: "Yayasan",
    aspectRatio: "landscape",
  },
  {
    id: "g5",
    src: galleryImage("guru-membimbing-siswa", "portrait_4_3"),
    alt: "Guru sedang membimbing siswa MTs",
    category: "MA",
    aspectRatio: "portrait",
  },
  {
    id: "g6",
    src: galleryImage("lapangan-sekolah-dan-gedung", "landscape_4_3"),
    alt: "Pemandangan gedung dan halaman sekolah",
    category: "Yayasan",
    aspectRatio: "landscape",
  },
  {
    id: "g7",
    src: galleryImage("siswa-ma-diskusi-kelompok", "square_hd"),
    alt: "Siswa MA berdiskusi kelompok",
    category: "MA",
    aspectRatio: "square",
  },
  {
    id: "g8",
    src: galleryImage("kegiatan-ekstrakurikuler-outdoor", "landscape_4_3"),
    alt: "Kegiatan ekstrakurikuler outdoor bersama siswa",
    category: "Yayasan",
    aspectRatio: "landscape",
  },
  {
    id: "g9",
    src: galleryImage("taman-sekolah-hijau-asri", "portrait_4_3"),
    alt: "Taman sekolah yang hijau dan asri",
    category: "Yayasan",
    aspectRatio: "portrait",
  },
  {
    id: "g10",
    src: galleryImage("kegiatan-peringatan-isra-miraj", "landscape_16_9"),
    alt: "Peringatan Isra Mi'raj di madrasah",
    category: "Yayasan",
    aspectRatio: "landscape",
  },
  {
    id: "g11",
    src: galleryImage("makan-bersama-anak-tk", "square_hd"),
    alt: "Anak-anak TK makan bersama",
    category: "TK",
    aspectRatio: "square",
  },
  // {
  //   id: "g12",
  //   src: galleryImage("kegiatan-pramuka-penegak", "landscape_4_3"),
  //   alt: "Kegiatan pramuka penegak MA",
  //   category: "MA",
  //   aspectRatio: "landscape",
  // },
  {
    id: "g12",
    src: "/images/pramuka/siswa-mts-ke-jambore.jpeg",
    alt: "Siswa MTs Pramuka bersiap berangkat mengikuti jambore",
    category: "MTs",
    aspectRatio: "landscape",
  },
  {
    id: "g13",
    src: "/images/pramuka/pelepasan-jambore.jpeg",
    alt: "Suasana pelepasan peserta Pramuka MTs menuju jambore",
    category: "MTs",
    aspectRatio: "landscape",
  },
  {
    id: "g14",
    src: "/images/pramuka/kepsek-mts-melepas-jambore.jpeg",
    alt: "Kepala sekolah MTs melepas peserta Pramuka untuk mengikuti jambore",
    category: "MTs",
    aspectRatio: "landscape",
  },
];

export function getGalleryByCategory(category: GalleryImage["category"] | "Semua") {
  if (category === "Semua") return galleryImages;
  return galleryImages.filter((img) => img.category === category);
}
