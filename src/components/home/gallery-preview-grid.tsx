"use client";

import Image from "next/image";
import { Images } from "lucide-react";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/gallery";

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

interface GalleryPreviewGridProps {
  images: GalleryImage[];
}

export function GalleryPreviewGrid({ images }: GalleryPreviewGridProps) {
  return (
    <GalleryCarousel
      items={images.map((img) => ({
        src: img.src,
        alt: img.alt,
        badge: img.category,
      }))}
    >
      {(openAt) => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => openAt(idx)}
              aria-label={`Buka gambar: ${img.alt}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl ring-1 ring-primary-100 hover:ring-primary-300 hover:shadow-xl transition-all duration-500 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
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
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-950/95 via-primary-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:h-28" />
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
            </button>
          ))}
        </div>
      )}
    </GalleryCarousel>
  );
}
