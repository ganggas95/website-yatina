"use client";

import * as React from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
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

interface SchoolGalleryProps {
  images: GalleryImage[];
}

export function SchoolGallery({ images }: SchoolGalleryProps) {
  const breakpointColumns = React.useMemo(
    () => ({
      default: 3,
      768: 2,
    }),
    []
  );

  return (
    <GalleryCarousel
      items={images.map((img) => ({
        src: img.src,
        alt: img.alt,
        badge: img.category,
      }))}
    >
      {(openAt) => (
        <Masonry
          breakpointCols={breakpointColumns}
          className="mt-10 flex -ml-3 sm:-ml-4"
          columnClassName="pl-3 sm:pl-4 bg-clip-padding space-y-3 sm:space-y-4"
        >
          {images.map((img, idx) => (
            <figure
              key={img.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl ring-1 ring-primary-100 bg-primary-50 shadow-sm shadow-primary-900/5"
              )}
            >
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-label={`Buka gambar: ${img.alt}`}
              >
                <div className={aspectClass(img.aspectRatio)}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-700/90 via-primary-700/45 to-transparent sm:h-28" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white leading-snug">
                    {img.alt}
                  </p>
                </div>
              </button>
            </figure>
          ))}
        </Masonry>
      )}
    </GalleryCarousel>
  );
}
