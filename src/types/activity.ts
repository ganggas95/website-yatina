import type { EducationLevel } from "./education";

export type ActivityCategory =
  | "Kegiatan Madrasah"
  | "Keagamaan"
  | "Prestasi"
  | "Ekstrakurikuler"
  | "Yayasan"
  | "Sosial";

export type ActivitySection = "prestasi" | "ekstrakurikuler";

export type ActivityProgram = "pramuka" | "sepak-bola";

export interface ActivityGalleryItem {
  image: string;
  title: string;
  description: string;
  alt?: string;
}

export interface Activity {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: ActivityCategory;
  date: string;
  educationUnit?: EducationLevel | "Yayasan";
  featured?: boolean;
  section?: ActivitySection;
  program?: ActivityProgram;
  gallery?: ActivityGalleryItem[];
}
