import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ActivityGrid } from "@/components/activity/activity-grid";
import { activities } from "@/data/activities";

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Dokumentasi kegiatan belajar mengajar, keagamaan, ekstrakurikuler, prestasi, dan pengabdian masyarakat Yayasan Titi Samaguna.",
  keywords: [
    "Kegiatan Yatina",
    "Kegiatan Madrasah Penjor",
    "Ekstrakurikuler Lombok Utara",
    "Prestasi Yatina",
  ],
};

export default function KegiatanPage() {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-5 animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-white border border-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-sm">
              Dokumentasi & Berita
            </span>
            <SectionHeading
              eyebrow="Cerita Yatina"
              title="Kegiatan Yayasan & Madrasah"
              description="Jelajahi berbagai cerita kegiatan, mulai dari proses belajar mengajar, kegiatan keagamaan, ekstrakurikuler, prestasi, hingga pengabdian kepada masyarakat sekitar."
            />
          </div>
        </Container>
      </section>

      <section aria-label="Daftar kegiatan" className="pb-24 sm:pb-32">
        <Container>
          <ActivityGrid activities={activities} />
        </Container>
      </section>
    </div>
  );
}
