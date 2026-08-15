import { TODO_CONTENT } from "@/lib/utils";
import type { EducationUnit } from "@/types/education";
import { ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EducationUnitPreview({ unit }: { unit: EducationUnit }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-primary-100 hover:shadow-xl hover:ring-primary-200 transition-all duration-500">
      <Link
        href={`/unit-pendidikan/${unit.slug}`}
        aria-label={`Buka halaman ${unit.name}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={unit.image}
          alt={`Foto ${unit.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-primary-700 shadow-sm ring-1 ring-primary-100">
            <BookOpen className="h-3 w-3" />
            {unit.category}
          </span>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 font-heading text-sm font-bold shadow">
            {unit.shortName}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2">
            {unit.name}
          </h3>
        </div>
      </Link>

      <div className="p-6 sm:p-7 flex-1 space-y-5">
        <p className="leading-7 text-secondary-700 line-clamp-3 text-pretty">
          {unit.description}
        </p>
        <div className="flex items-start gap-2 text-xs text-secondary-500">
          <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary-500" />
          <span className="leading-5">
            {unit.address ??
              "Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Lombok Utara"}
          </span>
        </div>
        <div className="pt-1 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-800 transition-colors">
            <span>Lihat {unit.shortName}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {unit.headmaster && unit.headmaster !== TODO_CONTENT && (
            <span className="text-xs font-medium text-secondary-500">
              Kepala: {unit.headmaster}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
