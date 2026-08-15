import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowUpRight } from "lucide-react";
import type { Activity } from "@/types/activity";
import { cn, formatTanggal } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
  variant?: "default" | "horizontal";
  className?: string;
}

export function ActivityCard({ activity, variant = "default", className }: ActivityCardProps) {
  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group grid grid-cols-1 sm:grid-cols-5 gap-0 overflow-hidden rounded-2xl bg-white ring-1 ring-primary-100 hover:ring-primary-200 hover:shadow-lg transition-all duration-300",
          className
        )}
      >
        <Link
          href={`/kegiatan/${activity.slug}`}
          className="relative block sm:col-span-2 aspect-[16/10] sm:aspect-auto overflow-hidden"
        >
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="sm:col-span-3 p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700">
                <Tag className="h-3 w-3" />
                {activity.category}
              </span>
              {activity.educationUnit && (
                <span className="inline-flex items-center rounded-full bg-accent-50 px-2.5 py-1 font-semibold text-accent-700">
                  {activity.educationUnit}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-secondary-500">
                <Calendar className="h-3 w-3" />
                {formatTanggal(activity.date)}
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-primary-800 leading-snug group-hover:text-primary-700 transition-colors">
              <Link href={`/kegiatan/${activity.slug}`} className="after:absolute after:inset-0">
                {activity.title}
              </Link>
            </h3>
            <p className="text-sm leading-6 text-secondary-700 line-clamp-3">{activity.excerpt}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
            <span>Baca selengkapnya</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-primary-100 hover:ring-primary-200 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <Link
        href={`/kegiatan/${activity.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-primary-700 shadow-sm ring-1 ring-primary-100">
              {activity.category}
            </span>
            {activity.featured && (
              <span className="inline-flex items-center rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Terbaru
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-5 sm:p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs text-secondary-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatTanggal(activity.date)}
          </span>
          {activity.educationUnit && (
            <>
              <span className="h-1 w-1 rounded-full bg-secondary-300" />
              <span className="font-semibold text-secondary-600">{activity.educationUnit}</span>
            </>
          )}
        </div>
        <h3 className="font-heading text-lg font-bold text-primary-800 leading-snug group-hover:text-primary-700 transition-colors">
          <Link href={`/kegiatan/${activity.slug}`} className="after:absolute after:inset-0">
            {activity.title}
          </Link>
        </h3>
        <p className="text-sm leading-6 text-secondary-700 line-clamp-2">{activity.excerpt}</p>
        <div className="pt-2 mt-auto">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
            <span>Baca selengkapnya</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
