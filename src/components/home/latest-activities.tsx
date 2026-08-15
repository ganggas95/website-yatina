import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/activity/activity-card";
import { getLatestActivities } from "@/data/activities";
import { ArrowUpRight } from "lucide-react";

export function LatestActivities() {
  const latest = getLatestActivities(4);
  return (
    <section
      aria-labelledby="latest-activities-heading"
      className="py-20 sm:py-28 bg-background"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Kegiatan Terbaru"
            title="Cerita Kegiatan di Lingkungan Yatina"
            description="Dokumentasi kegiatan belajar mengajar, keagamaan, ekstrakurikuler, prestasi, dan pengabdian masyarakat yang diadakan oleh Yayasan Titi Samaguna."
          />
          <Button href="/kegiatan" variant="outline" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Lihat Semua Kegiatan
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latest.map((activity) => (
            <ActivityCard key={activity.slug} activity={activity} />
          ))}
        </div>
      </Container>
    </section>
  );
}
