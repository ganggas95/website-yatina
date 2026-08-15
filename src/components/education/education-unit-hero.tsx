import Image from "next/image";
import { MapPin, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { EducationUnit } from "@/types/education";
import { TODO_CONTENT } from "@/lib/utils";

export function EducationUnitHero({ unit }: { unit: EducationUnit }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-900 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={unit.image}
          alt={`Suasana ${unit.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-700/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,169,97,0.25) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,125,94,0.25) 0%, transparent 55%)",
          }}
        />
      </div>
      <Container className="relative pt-20 pb-24 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3.5 py-1.5 text-xs font-bold text-accent-200">
              <BookOpen className="h-3.5 w-3.5" />
              {unit.category}
            </span>
            <span className="inline-flex h-8 w-16 items-center justify-center rounded-xl bg-white text-primary-700 font-heading text-xs font-bold shadow-sm">
              {unit.level}
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance text-accent-50 ">
            {unit.name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-8 text-primary-100/90 text-pretty max-w-2xl">
            {unit.description}
          </p>
          <div className="flex items-start gap-2.5 pt-2 text-sm text-primary-100/80">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent-300" />
            <span className="leading-6">
              {unit.address ?? "Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Kabupaten Lombok Utara, Nusa Tenggara Barat"}
            </span>
          </div>
          {(unit.headmaster && unit.headmaster !== TODO_CONTENT) ||
          (unit.contactPerson && unit.contactPerson !== TODO_CONTENT) ? (
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {unit.headmaster && unit.headmaster !== TODO_CONTENT && (
                <span className="rounded-full bg-white/10 border border-white/15 px-4 py-1.5">
                  Kepala {unit.shortName}: <strong>{unit.headmaster}</strong>
                </span>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
