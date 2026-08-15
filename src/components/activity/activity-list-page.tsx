import type { ReactNode } from "react";
import type { Activity } from "@/types/activity";
import type { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { ActivityGrid } from "@/components/activity/activity-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface ActivityListPageProps {
  badge?: string;
  eyebrow: string;
  title: string;
  description: string;
  activities: Activity[];
  breadcrumbItems?: BreadcrumbItem[];
  children?: ReactNode;
  sectionLabel?: string;
  showFilters?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ActivityListPage({
  badge = "Dokumentasi & Berita",
  eyebrow,
  title,
  description,
  activities,
  breadcrumbItems,
  children,
  sectionLabel = "Daftar kegiatan",
  showFilters = false,
  emptyTitle,
  emptyDescription,
}: ActivityListPageProps) {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-5 animate-fade-in">
            {breadcrumbItems?.length ? <Breadcrumb items={breadcrumbItems} /> : null}
            <span className="inline-flex items-center rounded-full border border-primary-100 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-sm">
              {badge}
            </span>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          </div>
        </Container>
      </section>

      {children ? (
        <section className="pb-10 sm:pb-12">
          <Container>{children}</Container>
        </section>
      ) : null}

      <section aria-label={sectionLabel} className="pb-24 sm:pb-32">
        <Container>
          <ActivityGrid
            activities={activities}
            showFilters={showFilters}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          />
        </Container>
      </section>
    </div>
  );
}
