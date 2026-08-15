import { PPDBCard } from "@/components/ppdb/ppdb-card";
import { Container } from "@/components/ui/container";
import { PPDBCTA } from "@/components/ui/ppdb-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { ppdbInfo } from "@/data/ppdb";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPDB",
  description:
    "Informasi Penerimaan Peserta Didik Baru (PPDB) Yayasan Titi Samaguna untuk jenjang TK, MI, MTs, dan MA tahun ajaran terbaru.",
  keywords: [
    "PPDB Yatina",
    "Penerimaan Siswa Baru Lombok Utara",
    "PPDB TK MI MTs MA Penjor",
  ],
};

export default function PPDBPage() {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,169,97,0.4) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,125,94,0.45) 0%, transparent 55%)",
          }}
        />
        <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-200">
              <Sparkles className="h-3.5 w-3.5" />
              Tahun Ajaran Baru
            </span>
            <h1 className="font-heading text-accent-50 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
              Penerimaan Peserta Didik Baru
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-8 text-primary-100/90 max-w-2xl">
              Bergabung bersama keluarga besar Yayasan Titi Samaguna dan temukan
              lingkungan pendidikan yang mendukung perkembangan ilmu, akhlak,
              serta karakter peserta didik.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-2">
                <GraduationCap className="h-4 w-4 text-accent-300" />
                <span className="text-sm font-semibold">
                  4 jenjang tersedia
                </span>
              </div>
              {ppdbInfo.map((info) => (
                <a
                  key={info.level}
                  href={`#ppdb-${info.slug}`}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-white text-primary-700 px-4 text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {info.level}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="ppdb-list-heading" className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl mb-14 text-center">
            <SectionHeading
              eyebrow="Pilih Jenjang"
              title="Informasi PPDB per Unit Pendidikan"
              description="Pilih jenjang pendidikan yang sesuai, lalu lihat persyaratan, jadwal, dan cara mendaftar."
              align="center"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
            {ppdbInfo.map((info, idx) => (
              <div
                key={info.slug}
                id={`ppdb-${info.slug}`}
                className="scroll-mt-28"
              >
                <PPDBCard info={info} index={idx} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-background via-primary-50/40 to-background">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 shadow-xl shadow-primary-900/5 p-8 sm:p-12">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-100 blur-3xl opacity-60" />
            <div className="grid lg:grid-cols-5 gap-8 items-center relative">
              <div className="lg:col-span-3 space-y-4">
                <SectionHeading
                  eyebrow="Butuh bantuan?"
                  title="Tanyakan langsung ke panitia PPDB"
                  description="Tim panitia penerimaan peserta didik baru siap membantu informasi pendaftaran dari Senin hingga Jumat pukul 08.00–15.00 WITA."
                />
              </div>
              <div className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                <PPDBCTA size="lg" className="w-full" />
                <div className="w-full sm:hidden h-px bg-primary-100" />
                <a
                  href="/kontak"
                  className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-xl border border-primary-200 px-6 text-base font-semibold text-primary-700 bg-white hover:bg-primary-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  <span>Halaman Kontak</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
