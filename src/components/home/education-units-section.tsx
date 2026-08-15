import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { educationUnits } from "@/data/education-units";

export function EducationUnitsSection() {
  return (
    <section
      aria-labelledby="education-heading"
      className="py-20 sm:py-28 bg-gradient-to-b from-background via-primary-50/30 to-background"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Jenjang Pendidikan"
            title="Pendidikan dari Usia Dini hingga Madrasah Aliyah"
            description="Empat unit pendidikan berjenjang di bawah naungan Yayasan Titi Samaguna yang menyiapkan generasi berilmu, berakhlak, dan siap berkontribusi."
          />
          <Button href="/unit-pendidikan" variant="outline" size="md" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Lihat Semua Unit
          </Button>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {educationUnits.map((unit, idx) => (
            <article
              key={unit.slug}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-primary-100 hover:shadow-xl hover:ring-primary-200 transition-all duration-500 ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`grid gap-0 ${idx === 0 ? "lg:grid-cols-5" : "sm:grid-cols-5"}`}>
                <div className={`relative overflow-hidden ${idx === 0 ? "aspect-[16/10] lg:aspect-auto lg:col-span-3" : "aspect-[4/3] sm:col-span-2"}`}>
                  <Image
                    src={unit.image}
                    alt={`${unit.name} — ${unit.category}`}
                    fill
                    sizes={idx === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-primary-700 shadow-sm ring-1 ring-primary-100">
                    {unit.category}
                  </span>
                </div>
                <div className={`p-6 sm:p-8 space-y-4 flex flex-col justify-between ${idx === 0 ? "lg:col-span-2" : "sm:col-span-3"}`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-heading text-sm font-bold">
                        {unit.shortName}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                        {unit.level}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary-800 leading-tight">
                      <Link
                        href={`/unit-pendidikan/${unit.slug}`}
                        className="after:absolute after:inset-0 focus:outline-none"
                      >
                        {unit.name}
                      </Link>
                    </h3>
                    <p className="leading-7 text-secondary-700 text-pretty">
                      {unit.description}
                    </p>
                  </div>
                  <div className="pt-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-800 transition-colors">
                      <span>Lihat {unit.shortName}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
