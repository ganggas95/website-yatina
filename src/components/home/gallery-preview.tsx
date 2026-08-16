import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { GalleryPreviewGrid } from "@/components/home/gallery-preview-grid";
import { galleryImages } from "@/data/gallery";

export function GalleryPreview() {
  const preview = galleryImages.slice(0, 8);
  return (
    <section
      aria-labelledby="gallery-heading"
      className="py-20 sm:py-28 bg-gradient-to-b from-background via-primary-50/40 to-background"
    >
      <Container>
        <div className="mx-auto max-w-3xl mb-12 sm:mb-16 text-center">
          <SectionHeading
            eyebrow="Dokumentasi Visual"
            title="Galeri Kegiatan & Lingkungan Yatina"
            description="Abadikan momen-momen belajar, kebersamaan, dan suasana sekolah yang asri dan penuh semangat."
            align="center"
          />
        </div>

        <GalleryPreviewGrid images={preview} />

        <div className="mt-10 sm:mt-14 text-center">
          <Button href="/galeri" size="lg" variant="outline" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Lihat Galeri Lengkap
          </Button>
        </div>
      </Container>
    </section>
  );
}
