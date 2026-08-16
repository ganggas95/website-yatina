"use client";

import * as React from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/gallery";
import type { EducationLevel } from "@/types/education";
import { cn } from "@/lib/utils";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";

type FilterValue = EducationLevel | "Yayasan" | "Semua";

const filters: { label: string; value: FilterValue }[] = [
  { label: "Semua", value: "Semua" },
  { label: "Yayasan", value: "Yayasan" },
  { label: "TK", value: "TK" },
  { label: "MI", value: "MI" },
  { label: "MTs", value: "MTs" },
  { label: "MA", value: "MA" },
];

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

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [filter, setFilter] = React.useState<FilterValue>("Semua");

  const filtered = React.useMemo(
    () => (filter === "Semua" ? images : images.filter((i) => i.category === filter)),
    [images, filter]
  );

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Filter galeri berdasarkan unit pendidikan"
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const active = f.value === filter;
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.value)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
                active
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white text-secondary-700 ring-1 ring-primary-100 hover:bg-primary-50 hover:text-primary-700"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <GalleryCarousel
          items={filtered.map((img) => ({
            src: img.src,
            alt: img.alt,
            badge: img.category,
          }))}
        >
          {(openAt) => (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((img, idx) => (
                <figure
                  key={img.id}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl ring-1 ring-primary-100 bg-primary-50",
                    idx % 7 === 0 && "md:col-span-2 md:row-span-2"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => openAt(idx)}
                    className={cn(
                      "relative block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
                      idx % 7 !== 0 && aspectClass(img.aspectRatio)
                    )}
                    aria-label={`Buka gambar: ${img.alt}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        idx % 7 === 0
                          ? "(min-width: 768px) 50vw, 100vw"
                          : "(min-width: 768px) 25vw, 50vw"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <figcaption className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2">
                        {img.alt}
                      </p>
                    </figcaption>
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-primary-700 shadow-sm ring-1 ring-primary-100 -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {img.category}
                    </span>
                  </button>
                </figure>
              ))}
            </div>
          )}
        </GalleryCarousel>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-primary-200 bg-white p-10 sm:p-14 text-center space-y-3">
          <p className="font-heading text-xl font-bold text-primary-800">
            Belum ada foto pada kategori ini
          </p>
          <p className="max-w-md mx-auto leading-7 text-secondary-600">
            Foto dokumentasi untuk kategori ini akan ditambahkan secara bertahap.
            Silakan pilih kategori lain untuk melihat dokumentasi visual lainnya.
          </p>
        </div>
      )}
    </div>
  );
}
