import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityDetail } from "@/components/activity/activity-detail";
import { activities, getActivity, getRelatedActivities } from "@/data/activities";
import { createMetadata, absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return createMetadata({ title: "Kegiatan tidak ditemukan", description: "Kegiatan yang diminta tidak ditemukan.", path: `/kegiatan/${slug}` });
  return createMetadata({ title: activity.title, description: activity.excerpt, path: `/kegiatan/${slug}`, keywords: [activity.title, activity.category, "Kegiatan Yatina"], image: activity.image, imageAlt: activity.title, type: "article", publishedTime: activity.date });
}

export default async function KegiatanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();
  const related = getRelatedActivities(slug, 3);
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: activity.title, description: activity.excerpt, image: absoluteUrl(activity.image), datePublished: activity.date, author: { "@type": "Organization", name: "Yayasan Titi Samaguna" }, publisher: { "@type": "Organization", name: "Yayasan Titi Samaguna", logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png") } }, mainEntityOfPage: absoluteUrl(`/kegiatan/${slug}`) }} /><JsonLd data={{ "@context": "https://schema.org", ...breadcrumbSchema([{ name: "Beranda", path: "/" }, { name: "Kegiatan", path: "/kegiatan" }, { name: activity.title }]) }} /><ActivityDetail activity={activity} related={related} /></>;
}
