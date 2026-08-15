import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { foundationInfo } from "@/data/values";
import { cn, TODO_CONTENT } from "@/lib/utils";

export function IntroFoundation() {
  const isPlaceholder = foundationInfo.history === TODO_CONTENT;
  return (
    <section
      id="intro-yayasan"
      aria-labelledby="intro-heading"
      className="py-20 sm:py-28 bg-surface"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow="Sekilas Yayasan"
              title={foundationInfo.introHeading}
            />
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <article
              className={cn(
                "prose prose-slate max-w-none prose-p:text-secondary-700 prose-p:leading-8 prose-headings:text-primary-800 prose-headings:font-heading",
                isPlaceholder && "opacity-75"
              )}
            >
              <p className="text-lg sm:text-xl leading-8 text-secondary-700 text-pretty">
                Yayasan Titi Samaguna hadir di tengah masyarakat Dusun Penjor, Desa Genggelang,
                sebagai rumah pendidikan yang memadukan nilai-nilai keislaman, ilmu pengetahuan,
                dan kearifan lokal Lombok untuk membentuk generasi yang shalih, cerdas, dan peduli lingkungan.
              </p>
              <p className="leading-8 text-secondary-700">
                Di bawah naungan organisasi Nahdlatul Wathan, yayasan mengelola empat unit pendidikan
                berjenjang mulai dari Taman Kanak-kanak hingga Madrasah Aliyah, memberikan kesempatan
                seluas-luasnya kepada anak-anak di Penjor dan sekitarnya untuk mengenyam pendidikan berkualitas
                tanpa meninggalkan identitas keislaman dan kekhasan budaya lokal.
              </p>
              <div className="mt-8 rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  Informasi Sejarah Resmi
                </p>
                <p className="mt-2 text-sm leading-7 text-primary-800 italic">
                  {isPlaceholder
                    ? "Sejarah resmi pendirian yayasan, tahun berdiri, serta nama-nama pendiri akan ditambahkan setelah dokumen diterima dari pengurus yayasan."
                    : foundationInfo.history}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
