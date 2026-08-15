import type { EducationLevel } from "./education";

export type ActivityCategory =
  | "Kegiatan Madrasah"
  | "Keagamaan"
  | "Prestasi"
  | "Ekstrakurikuler"
  | "Yayasan"
  | "Sosial";

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
}
