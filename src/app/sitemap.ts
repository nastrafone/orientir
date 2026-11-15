import type { MetadataRoute } from "next";
import { OLYMPIADS } from "@/data/olympiads";
import { UNIVERSITIES } from "@/data/universities";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("/", 1),
    ...NAV.map((item) => page(item.href, 0.9)),
    ...UNIVERSITIES.map((u) => page(`/vuzy/${u.slug}`, 0.7)),
    ...OLYMPIADS.map((o) => page(`/olimpiady/${o.slug}`, 0.7)),
    page("/istochniki", 0.3),
  ];
}
