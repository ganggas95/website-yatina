import { MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";
import { TODO_CONTENT } from "@/lib/utils";

export function LocationSection() {
  const mapReady = siteConfig.maps.url !== TODO_CONTENT;

  return (
    <section
      aria-labelledby="location-heading"
      className="py-20 sm:py-28 bg-surface"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Lokasi Kami"
              title={`Temui kami di ${siteConfig.address.hamlet}, ${siteConfig.address.village}`}
              description="Yayasan Titi Samaguna berlokasi strategis di jantung Dusun Penjor, mudah dijangkau dari pusat Gangga dan wilayah Lombok Utara sekitarnya."
            />
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white ring-1 ring-primary-100 p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
                    Alamat Lengkap
                  </p>
                  <address className="not-italic leading-7 text-secondary-800">
                    <strong>{siteConfig.name}</strong>
                    <br />
                    {siteConfig.address.full}
                  </address>
                </div>
              </div>

              {mapReady ? (
                <a
                  href={siteConfig.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1"
                >
                  <span>Buka di Google Maps</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <p className="text-xs italic text-secondary-500">
                  Link Google Maps akan ditambahkan setelah data resmi diterima dari pengurus yayasan.
                </p>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl aspect-[4/3] lg:aspect-auto lg:h-full min-h-[24rem] bg-primary-100 ring-1 ring-primary-200">
            {mapReady ? (
              <iframe
                title="Peta lokasi Yayasan Titi Samaguna"
                src={siteConfig.maps.url}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="relative h-full w-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,81,50,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,81,50,0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow ring-1 ring-primary-100 mb-5">
                    <MapPin className="h-7 w-7 text-primary-600" />
                  </div>
                  <p className="font-heading text-xl font-bold text-primary-800 mb-2">
                    Lokasi Yayasan Titi Samaguna
                  </p>
                  <p className="text-sm leading-6 text-secondary-600 max-w-md">
                    Peta interaktif Google Maps akan ditampilkan di area ini setelah tautan resmi tersedia.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
