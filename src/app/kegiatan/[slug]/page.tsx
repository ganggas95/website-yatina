import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityDetail } from "@/components/activity/activity-detail";
import { activities, getActivity, getRelatedActivities } from "@/data/activities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return { title: "Kegiatan tidak ditemukan" };
  return {
    title: activity.title,
    description: activity.excerpt,
    keywords: [activity.title, activity.category, "Kegiatan Yatina"],
    openGraph: {
      title: `${activity.title} | Yayasan Titi Samaguna`,
      description: activity.excerpt,
      type: "article",
      publishedTime: activity.date,
      images: [{ url: activity.image, alt: activity.title }],
    },
  };
}

export default async function KegiatanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();
  const related = getRelatedActivities(slug, 3);
  return <ActivityDetail activity={activity} related={related} />;
}
