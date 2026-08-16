"use client";

import Image from "next/image";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/gallery";

interface SchoolGalleryProps {
  images: GalleryImage[];
}

export function SchoolGallery({ images }: SchoolGalleryProps) {
  return (
    <GalleryCarousel
      items={images.map((img) => ({
        src: img.src,
        alt: img.alt,
        badge: img.category,
      }))}
    >
      {(openAt) => (
        <div className="mt-10 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl ring-1 ring-primary-100",
                idx === 0 && "md:col-span-2 md:row-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-label={`Buka gambar: ${img.alt}`}
              >
                <div
                  className={
                    idx === 0
                      ? "aspect-video md:aspect-auto h-full"
                      : "aspect-[4/3]"
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={
                      idx === 0
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 33vw, 50vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white leading-snug">
                    {img.alt}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </GalleryCarousel>
  );
}
