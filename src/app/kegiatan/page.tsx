import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { activities } from "@/data/activities";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Kegiatan", description: "Dokumentasi kegiatan belajar mengajar, keagamaan, ekstrakurikuler, prestasi, dan pengabdian masyarakat Yayasan Titi Samaguna.", path: "/kegiatan", keywords: ["Kegiatan Yatina", "Kegiatan Madrasah Penjor", "Ekstrakurikuler Lombok Utara"] });

export default function KegiatanPage() {
  return (
    <ActivityListPage
      eyebrow="Cerita Yatina"
      title="Kegiatan Yayasan & Madrasah"
      description="Jelajahi berbagai cerita kegiatan, mulai dari proses belajar mengajar, kegiatan keagamaan, ekstrakurikuler, prestasi, hingga pengabdian kepada masyarakat sekitar."
      activities={activities}
      showFilters
    />
  );
}
