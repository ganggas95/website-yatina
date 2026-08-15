import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { getActivitiesBySection } from "@/data/activities";

export const metadata: Metadata = {
  title: "Prestasi",
  description:
    "Daftar prestasi peserta didik dan capaian Yayasan Titi Samaguna dalam bidang akademik, keagamaan, dan pengembangan karakter.",
  keywords: [
    "Prestasi Yatina",
    "Prestasi siswa Lombok Utara",
    "Prestasi madrasah Penjor",
  ],
};

export default function PrestasiPage() {
  return (
    <ActivityListPage
      eyebrow="Prestasi Yatina"
      title="Capaian Peserta Didik dan Madrasah"
      description="Halaman ini merangkum capaian peserta didik dan madrasah dalam berbagai ajang sebagai bagian dari pembinaan akademik, keagamaan, dan karakter di lingkungan Yatina."
      activities={getActivitiesBySection("prestasi")}
      breadcrumbItems={[{ label: "Prestasi" }]}
      sectionLabel="Daftar prestasi"
      emptyTitle="Belum ada data prestasi"
      emptyDescription="Data prestasi terbaru akan ditambahkan secara berkala seiring dokumentasi kegiatan dan pencapaian peserta didik."
    />
  );
}
