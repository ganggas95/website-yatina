import { Container } from "@/components/ui/container";
import { PPDBCTA } from "@/components/ui/ppdb-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { SchoolGallery } from "@/components/education/school-gallery";
import { getGalleryByCategory } from "@/data/gallery";
import { TODO_CONTENT } from "@/lib/utils";
import type { EducationUnit } from "@/types/education";
import { ArrowUpRight, MessageCircle, UserCircle } from "lucide-react";
import Link from "next/link";

export function SchoolPageTemplate({ unit }: { unit: EducationUnit }) {
  const unitGallery = getGalleryByCategory(unit.level).slice(0, 6);
  const contactWa =
    unit.whatsapp && unit.whatsapp !== TODO_CONTENT ? unit.whatsapp : undefined;
  const cpPlaceholder =
    !unit.contactPerson || unit.contactPerson === TODO_CONTENT;

  return (
    <div className="space-y-0">
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary-50/40">
        <Container>
          <SectionHeading
            eyebrow="Galeri Sekolah"
            title={`Momen & Suasana di ${unit.name}`}
            description="Dokumentasi visual kegiatan, lingkungan, dan kebersamaan peserta didik bersama guru."
          />
          {unitGallery.length > 0 ? (
            <SchoolGallery images={unitGallery} />
          ) : (
            <p className="mt-10 rounded-2xl bg-white ring-1 ring-primary-100 p-6 text-secondary-600 italic text-center">
              Foto kegiatan untuk {unit.shortName} akan ditambahkan segera.
            </p>
          )}
          <div className="mt-8 text-center">
            <Link
              href="/galeri"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1"
            >
              <span>Lihat galeri lengkap</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ppdb-sekolah-heading"
        className="py-20 sm:py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800 text-white relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,169,97,0.4) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,125,94,0.45) 0%, transparent 55%)",
          }}
        />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <SectionHeading
                eyebrow="Penerimaan Peserta Didik Baru"
                title={`Bergabung di ${unit.name}`}
                description={`Siapkan putra-putri Anda untuk menjadi generasi yang berilmu, berakhlak, dan bermanfaat bersama ${unit.name} Yayasan Titi Samaguna.`}
                titleClassName="!text-white"
                className="text-white [&_p]:!text-primary-100/90"
              />
              <div className="flex flex-wrap gap-3 pt-1">
                <PPDBCTA
                  label={`PPDB ${unit.shortName}`}
                  size="lg"
                  variant="outline"
                  className="!bg-white !text-primary-700 !border-white hover:!bg-primary-50"
                />
                {contactWa ? (
                  <WhatsAppCTA
                    label="Tanya via WhatsApp"
                    size="lg"
                    phoneNumber={contactWa}
                  />
                ) : (
                  <WhatsAppCTA label="Hubungi Panitia Pusat" size="lg" />
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-6 sm:p-8 space-y-5">
              <h3
                id="ppdb-sekolah-heading"
                className="font-heading text-xl font-bold text-white"
              >
                Kontak Pendaftaran {unit.shortName}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-accent-300">
                    <UserCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-200">
                      Contact Person
                    </p>
                    <p
                      className={`mt-0.5 font-semibold text-white ${
                        cpPlaceholder ? "italic opacity-75" : ""
                      }`}
                    >
                      {cpPlaceholder ? "Akan diumumkan" : unit.contactPerson}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-accent-300">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-200">
                      WhatsApp
                    </p>
                    <p
                      className={`mt-0.5 font-semibold text-white ${
                        !contactWa ? "italic opacity-75" : ""
                      }`}
                    >
                      {contactWa ? contactWa : "Nomor akan diumumkan"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-primary-100/70 italic">
                Informasi jadwal, persyaratan, dan biaya PPDB dapat dilihat pada
                halaman PPDB.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
