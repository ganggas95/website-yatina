import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
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
    <ActivityListPage
      eyebrow="Cerita Yatina"
      title="Kegiatan Yayasan & Madrasah"
      description="Jelajahi berbagai cerita kegiatan, mulai dari proses belajar mengajar, kegiatan keagamaan, ekstrakurikuler, prestasi, hingga pengabdian kepada masyarakat sekitar."
      activities={activities}
      showFilters
    />
  );
}
