import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ValuesSection } from "@/components/home/values-section";
import { NWIdentitySection } from "@/components/home/nw-identity-section";
import { LocationSection } from "@/components/home/location-section";
import { coreValues, foundationInfo, nwIdentity } from "@/data/values";
import { TODO_CONTENT, cn } from "@/lib/utils";
import { BookOpen, Target, Flag, Users, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Mengenal lebih dekat Yayasan Titi Samaguna (Yatina): sejarah, visi, misi, nilai pendidikan, struktur organisasi, dan identitas Nahdlatul Wathan di Penjor, Lombok Utara.",
  keywords: [
    "Tentang Yayasan Titi Samaguna",
    "Sejarah Yatina",
    "Visi Misi Yatina",
    "Struktur Yayasan",
    "Nahdlatul Wathan Penjor",
  ],
  openGraph: {
    title: "Tentang Kami | Yayasan Titi Samaguna",
    description:
      "Sejarah, visi, misi, dan nilai pendidikan Yayasan Titi Samaguna, Penjor, Lombok Utara.",
  },
};

const aboutImage =
  "/images/main.jpg";

const sectionClass = "py-20 sm:py-24";

export default function TentangPage() {
  const isSejarahPlaceholder = foundationInfo.history === TODO_CONTENT;
  const isVisiPlaceholder = foundationInfo.vision === TODO_CONTENT;
  const isMisiPlaceholder = foundationInfo.mission.every((m) => m === TODO_CONTENT);
  const isOrganizationEmpty = foundationInfo.organization.length === 0;
  void nwIdentity;

  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, rgba(201,169,97,0.4) 0%, transparent 55%), radial-gradient(circle at 90% 90%, rgba(63,125,94,0.4) 0%, transparent 55%)",
          }}
        />
        <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-200">
              <BookOpen className="h-3.5 w-3.5" />
              Profil Yayasan
            </span>
            <h1 className="text-accent-50 font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
              Tentang Yayasan Titi Samaguna
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-8 text-primary-100/90 max-w-2xl">
              Rumah pendidikan yang menaungi TK hingga Madrasah Aliyah di Dusun Penjor, Desa Genggelang,
              Kecamatan Gangga, Lombok Utara — berikhtiar melahirkan generasi berilmu, berakhlak, dan bermanfaat.
            </p>
          </div>
        </Container>
      </section>

      <section className={`${sectionClass} bg-surface`}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5">
              <SectionHeading
                eyebrow="Sekilas"
                title="Sekilas Yatina"
                description="Yayasan Titi Samaguna berkomitmen menghadirkan pendidikan Islam yang berkualitas dan terjangkau bagi masyarakat Penjor dan sekitarnya."
              />
              <div className="prose prose-slate max-w-none prose-p:text-secondary-700 prose-p:leading-8">
                <p>
                  Yayasan Titik Samaguna (atau Titi Samaguna) adalah lembaga sosial keagamaan dan pendidikan Islam yang berlokasi di Jalan Jurusan Selelos Km 7, Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Kabupaten Lombok Utara, Nusa Tenggara Barat. Yayasan ini menaungi Pondok Pesantren Riadlul Jannah NWDI.
                </p>
                <p>
                  Melalui tenaga pendidik yang penuh dedikasi dan lingkungan belajar yang asri,
                  Yatina ingin menjadi tempat pertama di mana anak-anak menumbuhkan cinta ilmu,
                  akhlakul karimah, dan semangat mengabdi kepada masyarakat.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[28rem] rounded-3xl overflow-hidden shadow-xl shadow-primary-900/10 ring-1 ring-primary-100">
              <Image
                src={aboutImage}
                alt="Lingkungan Yayasan Titi Samaguna yang asri dan penuh semangat belajar"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section className={`${sectionClass} bg-gradient-to-b from-background via-primary-50/40 to-background`}>
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionHeading
                eyebrow="Perjalanan"
                title="Sejarah Yayasan"
                description="Catatan perjalanan pendirian dan perkembangan Yayasan Titi Samaguna."
              />
            </div>
            <div className="lg:col-span-7">
              <div
                className={cn(
                  "rounded-2xl border border-dashed p-6 sm:p-8 space-y-3",
                  isSejarahPlaceholder
                    ? "border-primary-200 bg-primary-50/60"
                    : "border-primary-100 bg-white ring-1 ring-primary-50"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  Sejarah Resmi
                </p>
                {isSejarahPlaceholder ? (
                  <div className="space-y-3">
                    <p className="text-base leading-8 text-primary-800 italic">
                      Sejarah resmi yayasan, tahun pendirian, nama pendiri, dan latar belakang pendirian
                      akan ditambahkan setelah menerima dokumen dari pengurus yayasan.
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="h-3 w-3/4 rounded bg-primary-100 animate-pulse" />
                      <div className="h-3 w-full rounded bg-primary-100 animate-pulse" />
                      <div className="h-3 w-5/6 rounded bg-primary-100 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none prose-p:text-secondary-700 prose-p:leading-8">
                    <p>{foundationInfo.history}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container>
          <div className="mb-12 sm:mb-16 text-center">
            <SectionHeading
              eyebrow="Arah & Tujuan"
              title="Visi & Misi"
              description="Komitmen Yayasan Titi Samaguna dalam menyelenggarakan pendidikan yang bermartabat."
              align="center"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 text-white p-8 sm:p-10 shadow-xl shadow-primary-900/10">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-700 shadow">
                    <Flag className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-accent-50 ">Visi</h3>
                </div>
                <p
                  className={`text-lg leading-8 ${
                    isVisiPlaceholder ? "italic text-primary-100/80" : "text-white"
                  }`}
                >
                  {isVisiPlaceholder
                    ? "Visi resmi Yayasan Titi Samaguna akan ditambahkan setelah mendapatkan data resmi dari pengurus."
                    : foundationInfo.vision}
                </p>
              </div>
            </article>
            <article className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 p-8 sm:p-10 shadow-sm">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent-100 blur-3xl opacity-70"
              />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-white shadow">
                    <Target className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-primary-800">Misi</h3>
                </div>
                <ul className="space-y-3">
                  {(isMisiPlaceholder ? [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT] : foundationInfo.mission).map(
                    (item, idx) => {
                      const ph = item === TODO_CONTENT;
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                          <p
                            className={`leading-7 text-secondary-700 ${
                              ph ? "italic text-secondary-500" : ""
                            }`}
                          >
                            {ph
                              ? `Poin misi ke-${idx + 1} akan ditambahkan setelah data resmi diterima.`
                              : item}
                          </p>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <ValuesSection />

      <section className={`${sectionClass} bg-gradient-to-b from-background via-primary-50/30 to-background`}>
        <Container>
          <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="Pengurus"
              title="Struktur Yayasan"
              description="Jajaran pengurus dan kepala unit pendidikan Yayasan Titi Samaguna."
            />
            {!isOrganizationEmpty && (
              <p className="text-sm text-secondary-600">
                {foundationInfo.organization.length} orang terdaftar
              </p>
            )}
          </div>
          {isOrganizationEmpty ? (
            <div className="rounded-3xl border-2 border-dashed border-primary-200 bg-white p-10 sm:p-14 text-center space-y-4">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mx-auto">
                <Users className="h-7 w-7" />
              </span>
              <h3 className="font-heading text-xl font-bold text-primary-800">
                Struktur organisasi akan ditambahkan
              </h3>
              <p className="max-w-xl mx-auto leading-7 text-secondary-600">
                Daftar nama dan jabatan pengurus yayasan beserta kepala unit pendidikan akan ditampilkan di sini
                setelah menerima data resmi dari pengurus.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {foundationInfo.organization.map((person, idx) => (
                <article
                  key={`${person.name}-${idx}`}
                  className="rounded-2xl bg-white ring-1 ring-primary-100 p-5 sm:p-6 text-center space-y-3"
                >
                  <div className="mx-auto h-20 w-20 rounded-2xl bg-primary-50 overflow-hidden ring-1 ring-primary-100">
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-primary-500">
                        <Users className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-heading text-base font-bold text-primary-800">{person.name}</p>
                    <p className="text-sm text-secondary-600">{person.role}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <NWIdentitySection />

      <section className="hidden">
        {/* Keep coreValues import usage */}
        {coreValues.length} nilai dasar Yatina
      </section>

      <LocationSection />
    </div>
  );
}
