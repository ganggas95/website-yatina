import { TODO_CONTENT } from "@/lib/utils";

export const siteConfig = {
  name: "Yayasan Titi Samaguna",
  shortName: "Yatina",
  tagline: "Mendidik Generasi Berilmu, Berakhlak dan Bermanfaat",
  description:
    "Yayasan pendidikan yang menaungi jenjang TK hingga Madrasah Aliyah di Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Kabupaten Lombok Utara, Nusa Tenggara Barat.",
  language: "id",
  locale: "id_ID",
  url: "https://yatinapenjor.sch.id",
  address: {
    hamlet: "Dusun Penjor",
    village: "Desa Genggelang",
    district: "Kecamatan Gangga",
    regency: "Kabupaten Lombok Utara",
    province: "Nusa Tenggara Barat",
    country: "Indonesia",
    full: `Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Kabupaten Lombok Utara, Nusa Tenggara Barat, Indonesia.`,
  },
  contact: {
    whatsapp: TODO_CONTENT,
    email: TODO_CONTENT,
    phone: TODO_CONTENT,
  },
  social: {
    instagram: TODO_CONTENT,
    facebook: TODO_CONTENT,
    youtube: TODO_CONTENT,
  },
  maps: {
    url: TODO_CONTENT,
    latitude: TODO_CONTENT,
    longitude: TODO_CONTENT,
  },
  copyright: {
    holder: "Yayasan Titi Samaguna",
  },
} as const;

export type SiteConfig = typeof siteConfig;
