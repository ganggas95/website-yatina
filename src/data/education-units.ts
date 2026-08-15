import type { EducationUnit } from "@/types/education";
import { TODO_CONTENT } from "@/lib/utils";

const placeholderImage = (seed: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    `suasana pendidikan islam ${seed} di madrasah indonesia, suasana hangat, dokumenter, fotografi natural, pencahayaan alami, anak-anak muslim belajar dengan gembira, bangunan sekolah tradisional modern, nuansa hijau dan emas lembut`
  )}&image_size=landscape_16_9`;

export const educationUnits: EducationUnit[] = [
  {
    slug: "tk-yatina",
    name: "TK Yatina",
    shortName: "TK",
    level: "TK",
    category: "Pendidikan Anak Usia Dini",
    description:
      "Lembaga pendidikan anak usia dini di bawah naungan Yayasan Titi Samaguna yang menanamkan nilai-nilai keislaman, akhlak mulia, dan kecintaan belajar sejak dini melalui pendekatan bermain yang menyenangkan.",
    image: placeholderImage("taman-kanak-kanak-islam"),
    vision: TODO_CONTENT,
    mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    slug: "mi-riadlul-jannah",
    name: "MI Riadlul Jannah NW Penjor",
    shortName: "MI",
    level: "MI",
    category: "Madrasah Ibtidaiyah",
    description:
      "Madrasah Ibtidaiyah yang menyelenggarakan pendidikan dasar jenjang MI dengan paduan kurikulum nasional dan pendidikan keagamaan yang kokoh, di bawah naungan Nahdlatul Wathan.",
    image: placeholderImage("madrasah-ibtidaiyah-murid-sekolah-dasar"),
    vision: TODO_CONTENT,
    mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    slug: "mts-riadlul-jannah",
    name: "MTs Riadlul Jannah NW Penjor",
    shortName: "MTs",
    level: "MTs",
    category: "Madrasah Tsanawiyah",
    description:
      "Madrasah Tsanawiyah untuk jenjang SMP yang mengembangkan potensi akademik, keagamaan, dan karakter siswa menuju remaja yang berilmu dan berakhlakul karimah.",
    image: placeholderImage("madrasah-tsanawiyah-smp-islam"),
    vision: TODO_CONTENT,
    mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
  {
    slug: "ma-riadlul-jannah",
    name: "MA Riadlul Jannah NW Penjor",
    shortName: "MA",
    level: "MA",
    category: "Madrasah Aliyah",
    description:
      "Madrasah Aliyah jenjang SMA yang mempersiapkan peserta didik menuju pendidikan tinggi dan kehidupan bermasyarakat dengan fondasi keilmuan serta keislaman yang kuat.",
    image: placeholderImage("madrasah-aliyah-sma-islam-belajar"),
    vision: TODO_CONTENT,
    mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
    contactPerson: TODO_CONTENT,
    whatsapp: TODO_CONTENT,
  },
];

export function getEducationUnit(slug: string) {
  return educationUnits.find((u) => u.slug === slug);
}
