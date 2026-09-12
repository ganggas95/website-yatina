import { HeroSection } from "@/components/home/hero-section";
import { IntroFoundation } from "@/components/home/intro-foundation";
import { EducationUnitsSection } from "@/components/home/education-units-section";
import { ValuesSection } from "@/components/home/values-section";
import { NWIdentitySection } from "@/components/home/nw-identity-section";
import { LatestActivities } from "@/components/home/latest-activities";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { PPDBSection } from "@/components/home/ppdb-section";
import { LocationSection } from "@/components/home/location-section";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Pendidikan Islam di Penjor, Lombok Utara",
  description: "Mengenal Yatina, lembaga pendidikan Islam di Penjor, Lombok Utara yang menaungi TK hingga Madrasah Aliyah dengan pendidikan berakhlak, terampil, dan berprestasi.",
  path: "/",
  keywords: ["Yatina Penjor", "Pendidikan Islam Lombok Utara", "Sekolah Penjor"],
});

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <IntroFoundation />
      <EducationUnitsSection />
      <ValuesSection />
      <NWIdentitySection />
      <LatestActivities />
      <GalleryPreview />
      <PPDBSection />
      <LocationSection />
    </div>
  );
}
