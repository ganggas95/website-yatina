import { HeroSection } from "@/components/home/hero-section";
import { IntroFoundation } from "@/components/home/intro-foundation";
import { EducationUnitsSection } from "@/components/home/education-units-section";
import { ValuesSection } from "@/components/home/values-section";
import { NWIdentitySection } from "@/components/home/nw-identity-section";
import { LatestActivities } from "@/components/home/latest-activities";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { PPDBSection } from "@/components/home/ppdb-section";
import { LocationSection } from "@/components/home/location-section";

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
