import type { EducationLevel } from "./education";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: EducationLevel | "Yayasan";
  aspectRatio?: "landscape" | "portrait" | "square";
}
