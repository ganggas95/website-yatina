import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";
import { educationUnits } from "@/data/education-units";
import { activities } from "@/data/activities";

export default function sitemap(): MetadataRoute.Sitemap {

  const staticRoutes = [
    "",
    "/tentang",
    "/unit-pendidikan",
    "/kegiatan",
    "/prestasi",
    "/ekstrakurikuler",
    "/ekstrakurikuler/pramuka",
    "/ekstrakurikuler/sepak-bola",
    "/ppdb",
    "/galeri",
    "/kontak",
  ].map((path) => ({
    url: canonicalUrl(path || "/"),
    changeFrequency: "weekly" as const,
    priority:
      path === ""
        ? 1
        : path === "/ppdb" || path === "/unit-pendidikan"
          ? 0.9
          : path === "/prestasi" || path === "/ekstrakurikuler"
            ? 0.85
            : 0.8,
  }));

  const unitRoutes = educationUnits.map((unit) => ({
    url: canonicalUrl(`/unit-pendidikan/${unit.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const activityRoutes = activities.map((activity) => ({
    url: canonicalUrl(`/kegiatan/${activity.slug}`),
    lastModified: new Date(activity.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...unitRoutes, ...activityRoutes];
}
