import Image from "next/image";
import { Calendar, Tag, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { ActivityCard } from "@/components/activity/activity-card";
import { ActivityGallery } from "@/components/activity/activity-gallery";
import type { Activity } from "@/types/activity";
import { TODO_CONTENT, formatTanggal } from "@/lib/utils";
import type { EducationLevel } from "@/types/education";

interface ActivityDetailProps {
  activity: Activity;
  related: Activity[];
}

export function ActivityDetail({ activity, related }: ActivityDetailProps) {
  const isContentPlaceholder = activity.content === TODO_CONTENT;
  const galleryItems = activity.gallery ?? [];
  const hasGallery = galleryItems.length > 0;

  return (
    <article className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
        <Container className="pt-10 pb-6 sm:pt-16 sm:pb-10">
          <Breadcrumb
            items={[
              { label: "Kegiatan", href: "/kegiatan" },
              { label: activity.category },
              { label: activity.title },
            ]}
          />
          <div className="mt-8 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                  <Tag className="h-3 w-3" />
                  {activity.category}
                </span>
                {activity.educationUnit && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 border border-accent-100 px-3 py-1 text-xs font-bold text-accent-700">
                    {activity.educationUnit as EducationLevel | "Yayasan"}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-500">
                  <Calendar className="h-3 w-3" />
                  {formatTanggal(activity.date)}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-primary-800 text-balance">
                {activity.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-secondary-700 text-pretty">
                {activity.excerpt}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 pb-20 sm:pb-24">
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-primary-100 shadow-lg shadow-primary-900/5">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>

            <div
              className={`prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-primary-800 prose-p:text-secondary-700 prose-p:leading-8 prose-li:text-secondary-700 prose-li:leading-8 prose-a:text-primary-600 ${
                isContentPlaceholder ? "opacity-85" : ""
              }`}
            >
              {isContentPlaceholder ? (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-6 sm:p-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                      Konten Artikel
                    </p>
                    <p className="text-base leading-8 text-primary-800 italic">
                      Isi detail kegiatan ini akan ditambahkan setelah menerima konten resmi dari pengelola yayasan.
                      Bagian di bawah adalah skeleton layout placeholder.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-1/3 rounded bg-primary-100" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-secondary-100" />
                      <div className="h-3 w-full rounded bg-secondary-100" />
                      <div className="h-3 w-5/6 rounded bg-secondary-100" />
                    </div>
                    <div className="h-3 w-1/4 rounded bg-primary-100 mt-6" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-secondary-100" />
                      <div className="h-3 w-4/5 rounded bg-secondary-100" />
                    </div>
                  </div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: activity.content }} />
              )}
            </div>

            {hasGallery && (
              <section className="space-y-6" aria-label="Galeri kegiatan">
                <SectionHeading
                  eyebrow="Dokumentasi"
                  title="Galeri Kegiatan"
                  description="Beberapa momen yang menggambarkan suasana dan pelaksanaan kegiatan ini."
                />
                <ActivityGallery activitySlug={activity.slug} items={galleryItems} />
              </section>
            )}

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/kegiatan"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke daftar kegiatan</span>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl bg-white ring-1 ring-primary-100 p-6 sm:p-7 space-y-5 lg:sticky lg:top-24">
              <h2 className="font-heading text-xl font-bold text-primary-800">
                Informasi Kegiatan
              </h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                      Tanggal
                    </p>
                    <p className="font-semibold text-secondary-800">{formatTanggal(activity.date)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Tag className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                      Kategori
                    </p>
                    <p className="font-semibold text-secondary-800">{activity.category}</p>
                  </div>
                </li>
                {activity.educationUnit && (
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                      <User className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                        Unit / Yayasan
                      </p>
                      <p className="font-semibold text-secondary-800">
                        {activity.educationUnit as EducationLevel | "Yayasan"}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="py-20 sm:py-24 bg-gradient-to-b from-background via-primary-50/40 to-background">
          <Container>
            <SectionHeading
              eyebrow="Baca Juga"
              title="Kegiatan Terkait"
              description="Kegiatan lain yang masih sejenis atau berasal dari unit pendidikan yang sama."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((r) => (
                <ActivityCard key={r.slug} activity={r} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
