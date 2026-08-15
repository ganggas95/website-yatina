import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, School } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { EDUCATION_LEVEL_ORDER } from "@/types/education";
import { siteConfig } from "@/data/site";

const heroBg =
  "/images/main.jpg";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50/80 via-background to-background"
    >
      <div className="absolute inset-0 -z-10 opacity-90">
        <Image
          src={heroBg}
          alt="Suasana lingkungan pendidikan Yayasan Titi Samaguna yang asri dan penuh semangat belajar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <Container className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-28 md:pb-40">
        <div className="grid lg:grid-cols-12 gap-10 items-center min-h-[60vh]">
          <div className="lg:col-span-8 xl:col-span-7 space-y-7 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50/90 border border-primary-100 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-700 shadow-sm backdrop-blur">
              <School className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{siteConfig.name}</span>
              <span className="h-1 w-1 rounded-full bg-accent-500" aria-hidden="true" />
              <span>Penjor • Lombok Utara</span>
            </div>

            <h1
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.05] tracking-tight text-primary-800 text-balance"
            >
              Mendidik Generasi{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Berilmu, Berakhlak</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 -skew-y-1 bg-accent-200/70" aria-hidden="true" />
              </span>{" "}
              dan Bermanfaat
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-secondary-700 text-pretty">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button
                href="/tentang"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="shadow-md shadow-primary-800/10"
              >
                Kenali Yatina
              </Button>
              <Button
                href="/unit-pendidikan"
                variant="outline"
                size="lg"
                leftIcon={<GraduationCap className="h-4 w-4" />}
              >
                Lihat Unit Pendidikan
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                Jenjang pendidikan
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {EDUCATION_LEVEL_ORDER.map((level, idx) => (
                  <span key={level} className="flex items-center gap-1.5">
                    {idx > 0 && (
                      <span className="h-1 w-1 rounded-full bg-secondary-300" aria-hidden="true" />
                    )}
                    <span className="inline-flex items-center justify-center rounded-full bg-white/90 border border-primary-100 px-3 py-1 text-xs sm:text-sm font-bold text-primary-700 shadow-sm">
                      {level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 xl:col-span-5">
            <div className="relative mx-auto max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20 ring-1 ring-white">
              <Image
                src={
                  "/images/mi/mi-1.png"
                }
                alt="Guru membimbing peserta didik dalam suasana belajar yang hangat"
                fill
                sizes="(min-width: 1024px) 28rem, 0vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-primary-50">
                <p className="text-xs font-semibold text-accent-600 uppercase tracking-wider">
                  Bergabung sejak usia dini
                </p>
                <p className="mt-1 text-sm font-semibold text-primary-800">
                  Lingkungan belajar yang ramah, penuh kasih sayang, dan Islami.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <Link
            href="#intro-yayasan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1"
          >
            <span>Pelajari selengkapnya</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
