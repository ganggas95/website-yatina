import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PPDBCTA } from "@/components/ui/ppdb-cta";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { EDUCATION_LEVEL_ORDER } from "@/types/education";
import { CheckCircle2, Sparkles } from "lucide-react";

export function PPDBSection() {
  return (
    <section
      aria-labelledby="ppdb-heading"
      className="relative isolate py-20 sm:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-50 via-background to-primary-50" />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(15,81,50,0.08) 0%, transparent 55%), radial-gradient(circle at 90% 90%, rgba(201,169,97,0.18) 0%, transparent 55%)",
        }}
      />

      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 shadow-xl shadow-primary-900/5">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500" />
          <div className="grid lg:grid-cols-12 gap-10 p-6 sm:p-10 lg:p-14">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 border border-accent-100 px-4 py-1.5 text-xs font-bold text-accent-700">
                <Sparkles className="h-3.5 w-3.5" />
                Penerimaan Peserta Didik Baru
              </div>
              <SectionHeading
                eyebrow="PPDB"
                title="Bergabung bersama keluarga besar Yayasan Titi Samaguna"
                description="Temukan lingkungan pendidikan yang mendukung perkembangan ilmu, akhlak dan karakter peserta didik bersama Yayasan Titi Samaguna, Penjor — Lombok Utara."
              />
              <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Kurikulum nasional berlandaskan nilai-nilai Islam",
                  "Tenaga pendidik yang berpengalaman dan penuh dedikasi",
                  "Lingkungan belajar yang asri, nyaman, dan kondusif",
                  "Ekstrakurikuler untuk mengembangkan minat dan bakat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-secondary-700">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <PPDBCTA size="lg" />
                <WhatsAppCTA size="lg" label="Hubungi Panitia" />
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
                {EDUCATION_LEVEL_ORDER.map((level, idx) => (
                  <div
                    key={level}
                    className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${
                      idx % 2 === 0
                        ? "from-primary-50 to-white"
                        : "from-accent-50 to-white"
                    } ring-1 ${idx % 2 === 0 ? "ring-primary-100" : "ring-accent-100"} ${
                      idx % 2 === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-heading text-lg font-bold shadow-sm ${
                        idx % 2 === 0
                          ? "bg-primary-600 text-white"
                          : "bg-accent-500 text-white"
                      }`}
                    >
                      {level}
                    </span>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-secondary-500">
                      Pendaftaran dibuka
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-primary-800 leading-snug">
                      {level === "TK"
                        ? "Taman Kanak-kanak Yatina"
                        : level === "MI"
                        ? "Madrasah Ibtidaiyah"
                        : level === "MTs"
                        ? "Madrasah Tsanawiyah"
                        : "Madrasah Aliyah"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
