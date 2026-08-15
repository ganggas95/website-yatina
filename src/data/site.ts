import {TODO_CONTENT} from "@/lib/utils";

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
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1130.4003776170273!2d116.22830793161819!3d-8.33378177008887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdd92bdfa72d49%3A0xdb0f613ce74086e0!2sPonpes%20Riadlul%20Jannah%20NW%20Penjor!5e0!3m2!1sen!2sid!4v1786754183962!5m2!1sen!2sid',
        latitude: '-8.3337818',
        longitude: '116.2283079',
    },
    copyright: {
        holder: "Yayasan Titi Samaguna",
    },
} as const;

export type SiteConfig = typeof siteConfig;
