import type { Metadata } from "next";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { getActivitiesByProgram } from "@/data/activities";
import { createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = createMetadata({ title: "Ekstrakurikuler Pramuka", description: "Dokumentasi kegiatan Pramuka di Yayasan Titi Samaguna untuk membina kepemimpinan, kemandirian, dan kedisiplinan peserta didik.", path: "/ekstrakurikuler/pramuka", keywords: ["Pramuka Yatina", "Ekstrakurikuler Pramuka", "Kegiatan Pramuka madrasah"] });

export default function PramukaPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: "https://yatinapenjor.sch.id/" }, { "@type": "ListItem", position: 2, name: "Ekstrakurikuler", item: "https://yatinapenjor.sch.id/ekstrakurikuler" }, { "@type": "ListItem", position: 3, name: "Pramuka" }] }} />
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
    </>
  );
}
