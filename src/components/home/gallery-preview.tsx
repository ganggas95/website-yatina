import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/gallery";
import { cn } from "@/lib/utils";

function aspectClass(aspect?: string) {
  switch (aspect) {
    case "portrait":
      return "aspect-[3/4]";
    case "square":
      return "aspect-square";
    default:
      return "aspect-[4/3]";
  }
}

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {preview.map((img, idx) => (
            <Link
              key={img.id}
              href="/galeri"
              aria-label={`Buka galeri: ${img.alt}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl ring-1 ring-primary-100 hover:ring-primary-300 hover:shadow-xl transition-all duration-500",
                idx === 0 && "md:col-span-2 md:row-span-2 aspect-video md:aspect-auto",
                idx === 1 && "aspect-[3/4]",
                idx === 4 && "col-span-2 md:col-span-1 md:row-span-2 aspect-square md:aspect-auto"
              )}
            >
              <div className={cn("w-full h-full", idx !== 0 && idx !== 4 && aspectClass(img.aspectRatio))}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    idx === 0
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 768px) 25vw, 50vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-end justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                      {img.alt}
                    </p>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow">
                      <Images className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <Button href="/galeri" size="lg" variant="outline" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Lihat Galeri Lengkap
          </Button>
        </div>
      </Container>
    </section>
  );
}
