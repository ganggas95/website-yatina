import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { getActivitiesByProgram } from "@/data/activities";
import { createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = createMetadata({ title: "Ekstrakurikuler Sepak Bola", description: "Dokumentasi program sepak bola di Yayasan Titi Samaguna yang menumbuhkan kebugaran, sportivitas, disiplin, dan kerja sama tim.", path: "/ekstrakurikuler/sepak-bola", keywords: ["Sepak Bola Yatina", "Ekstrakurikuler Sepak Bola", "Latihan sepak bola siswa"] });

export default function SepakBolaPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: "https://yatinapenjor.sch.id/" }, { "@type": "ListItem", position: 2, name: "Ekstrakurikuler", item: "https://yatinapenjor.sch.id/ekstrakurikuler" }, { "@type": "ListItem", position: 3, name: "Sepak Bola" }] }} />
    <ActivityListPage
      eyebrow="Program Ekstrakurikuler"
      title="Sepak Bola"
      description="Program sepak bola memberi ruang bagi peserta didik untuk berlatih kebugaran, strategi bermain, disiplin latihan, dan semangat kerja sama tim."
      activities={getActivitiesByProgram("sepak-bola")}
      breadcrumbItems={[
        { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
        { label: "Sepak Bola" },
      ]}
      sectionLabel="Daftar kegiatan sepak bola"
      emptyTitle="Belum ada dokumentasi sepak bola"
      emptyDescription="Dokumentasi kegiatan sepak bola akan ditambahkan setelah agenda latihan dan pertandingan berikutnya dipublikasikan."
    />
    </>
  );
}
