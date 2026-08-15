import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Galeri foto dokumentasi kegiatan belajar mengajar, keagamaan, ekstrakurikuler, dan suasana lingkungan Yayasan Titi Samaguna, Penjor Lombok Utara.",
  keywords: [
    "Galeri Yatina",
    "Foto Madrasah Penjor",
    "Dokumentasi Kegiatan Yatina",
  ],
};

export default function GaleriPage() {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-5 animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-white border border-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-sm">
              Dokumentasi Visual
            </span>
            <SectionHeading
              eyebrow="Momen Yatina"
              title="Galeri Foto Yayasan Titi Samaguna"
              description="Abadikan momen-momen belajar, kebersamaan, dan suasana sekolah yang asri di seluruh jenjang pendidikan Yayasan Titi Samaguna."
            />
            <p className="text-sm leading-6 text-secondary-500 max-w-2xl">
              Gunakan filter di bawah ini untuk menampilkan foto berdasarkan unit pendidikan atau yayasan.
              Foto bersifat dokumentasi dan akan diperbarui secara berkala.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Galeri foto" className="pb-24 sm:pb-32">
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>
    </div>
  );
}
