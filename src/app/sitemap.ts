import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { educationUnits } from "@/data/education-units";
import { activities } from "@/data/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/tentang", "/unit-pendidikan", "/kegiatan", "/ppdb", "/galeri", "/kontak"].map(
    (path) => ({
      url: `${baseUrl}${path === "" ? "/" : path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/ppdb" || path === "/unit-pendidikan" ? 0.9 : 0.8,
    })
  );

  const unitRoutes = educationUnits.map((unit) => ({
    url: `${baseUrl}/unit-pendidikan/${unit.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const activityRoutes = activities.map((activity) => ({
    url: `${baseUrl}/kegiatan/${activity.slug}`,
    lastModified: new Date(activity.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...unitRoutes, ...activityRoutes];
}
