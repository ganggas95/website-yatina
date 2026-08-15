import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Goal, TentTree } from "lucide-react";
import { ActivityListPage } from "@/components/activity/activity-list-page";
import { getActivitiesBySection } from "@/data/activities";

export const metadata: Metadata = {
  title: "Ekstrakurikuler",
  description:
    "Informasi program ekstrakurikuler di Yayasan Titi Samaguna, termasuk Pramuka dan Sepak Bola, untuk membangun karakter, disiplin, dan kerja sama.",
  keywords: [
    "Ekstrakurikuler Yatina",
    "Pramuka madrasah",
    "Sepak bola siswa Lombok Utara",
  ],
};

const programs = [
  {
    href: "/ekstrakurikuler/pramuka",
    title: "Pramuka",
    description:
      "Pembinaan kemandirian, kepemimpinan, kedisiplinan, dan kepedulian terhadap lingkungan melalui kegiatan lapangan.",
    icon: TentTree,
  },
  {
    href: "/ekstrakurikuler/sepak-bola",
    title: "Sepak Bola",
    description:
      "Latihan rutin untuk membangun kebugaran, sportivitas, strategi bermain, dan kekompakan tim peserta didik.",
    icon: Goal,
  },
];

export default function EkstrakurikulerPage() {
  return (
    <ActivityListPage
      eyebrow="Program Pendamping"
      title="Ekstrakurikuler untuk Bakat, Karakter, dan Kebersamaan"
      description="Program ekstrakurikuler Yatina dirancang untuk memberi ruang tumbuh di luar kelas melalui kegiatan yang terarah, sehat, dan mendukung pembentukan karakter peserta didik."
      activities={getActivitiesBySection("ekstrakurikuler")}
      breadcrumbItems={[{ label: "Ekstrakurikuler" }]}
      sectionLabel="Daftar kegiatan ekstrakurikuler"
      emptyTitle="Belum ada kegiatan ekstrakurikuler"
      emptyDescription="Dokumentasi kegiatan ekstrakurikuler akan ditambahkan secara berkala sesuai program yang berjalan di madrasah."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {programs.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl border border-primary-100 bg-white p-6 shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50/40"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-bold text-primary-700">{title}</h2>
              <p className="leading-7 text-secondary-600">{description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                Lihat halaman program
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </ActivityListPage>
  );
}
