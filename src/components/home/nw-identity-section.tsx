import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { nwIdentity } from "@/data/values";
import { cn, TODO_CONTENT } from "@/lib/utils";

const nwImage =
  "/images/hero-3.jpg";

export function NWIdentitySection() {
  const isPlaceholder = nwIdentity.description === TODO_CONTENT;
  return (
    <section
      aria-labelledby="nw-heading"
      className="relative isolate py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800 text-white"
    >
      <div className="absolute inset-0 -z-10 opacity-15">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(201,169,97,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(63,125,94,0.45) 0%, transparent 50%)",
          }}
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/10">
              <Image
                src={nwImage}
                alt="Masjid dan suasana pendidikan yang mencerminkan tradisi Nahdlatul Wathan"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 right-4 sm:-bottom-8 sm:-right-8 max-w-[18rem] rounded-2xl bg-white text-primary-800 px-5 py-4 shadow-xl ring-1 ring-primary-50">
              <p className="font-heading text-base font-bold leading-tight">
                Menggabungkan pendidikan Islam tradisional dan modern
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-secondary-600">
                sesuai semangat Nahdlatul Wathan dalam membangun umat.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <SectionHeading
              eyebrow="Identitas Kami"
              title={nwIdentity.title}
              titleClassName="!text-white"
              className="text-white [&_p]:!text-primary-100"
            />
            <div
              className={cn(
                "rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 sm:p-7",
                isPlaceholder && "opacity-85"
              )}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">
                Keterangan Resmi
              </p>
              <p className="mt-3 text-base sm:text-lg leading-8 text-primary-50">
                {isPlaceholder
                  ? "Deskripsi resmi mengenai hubungan dan identitas yayasan dalam lingkungan Nahdlatul Wathan akan ditambahkan setelah menerima dokumen resmi dari pengurus."
                  : nwIdentity.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
