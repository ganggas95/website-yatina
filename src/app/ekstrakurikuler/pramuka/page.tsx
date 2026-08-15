import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { getActivitiesByProgram } from "@/data/activities";

export const metadata: Metadata = {
  title: "Ekstrakurikuler Pramuka",
  description:
    "Dokumentasi kegiatan Pramuka di Yayasan Titi Samaguna untuk membina kepemimpinan, kemandirian, dan kedisiplinan peserta didik.",
  keywords: ["Pramuka Yatina", "Ekstrakurikuler Pramuka", "Kegiatan Pramuka madrasah"],
};

export default function PramukaPage() {
  return (
    <ActivityListPage
      eyebrow="Program Ekstrakurikuler"
      title="Pramuka"
      description="Program Pramuka membantu peserta didik mengasah kepemimpinan, kemandirian, kerja sama, dan kepedulian sosial melalui kegiatan yang terstruktur."
      activities={getActivitiesByProgram("pramuka")}
      breadcrumbItems={[
        { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
        { label: "Pramuka" },
      ]}
      sectionLabel="Daftar kegiatan Pramuka"
      emptyTitle="Belum ada dokumentasi Pramuka"
      emptyDescription="Dokumentasi program Pramuka akan ditambahkan setelah kegiatan terbaru dipublikasikan."
    />
  );
}
