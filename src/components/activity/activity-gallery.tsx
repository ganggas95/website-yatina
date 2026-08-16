"use client";

import Image from "next/image";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";
import type { ActivityGalleryItem } from "@/types/activity";

interface ActivityGalleryProps {
  activitySlug: string;
  items: ActivityGalleryItem[];
}

export function ActivityGallery({ activitySlug, items }: ActivityGalleryProps) {
  return (
    <GalleryCarousel
      items={items.map((item) => ({
        src: item.image,
        alt: item.alt ?? item.title,
        title: item.title,
        description: item.description,
      }))}
    >
      {(openAt) => (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <figure
              key={`${activitySlug}-${item.image}-${item.title}`}
              className="overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 shadow-sm shadow-primary-900/5"
            >
              <button
                type="button"
                onClick={() => openAt(index)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-label={`Buka gambar: ${item.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
                  <Image
                    src={item.image}
                    alt={item.alt ?? item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="space-y-2 p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-bold text-primary-800">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-secondary-700">
                    {item.description}
                  </p>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      )}
    </GalleryCarousel>
  );
}
