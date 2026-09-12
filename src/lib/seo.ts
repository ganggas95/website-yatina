import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export type SeoPageType = "website" | "article";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.startsWith("/") ? path : `/${path}`, siteConfig.url).toString();
}

export function canonicalUrl(path = "/") { return absoluteUrl(path); }

export function createMetadata({ title, description, path = "/", keywords, image = "/favicon.png", imageAlt = `${siteConfig.name} - ${siteConfig.tagline}`, type = "website", publishedTime }: {
  title: string; description: string; path?: string; keywords?: string[]; image?: string; imageAlt?: string; type?: SeoPageType; publishedTime?: string;
}): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title, description, ...(keywords?.length ? { keywords } : {}), alternates: { canonical: url },
    openGraph: { type, url, locale: siteConfig.locale, siteName: siteConfig.name, title, description, images: [{ url: imageUrl, alt: imageAlt }], ...(publishedTime ? { publishedTime } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return { "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.path ? { item: canonicalUrl(item.path) } : {}) })) };
}
