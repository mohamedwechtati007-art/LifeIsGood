import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteUrl } from "@/lib/site";

const pages = ["/", "/services", "/galerie", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const href of pages) {
      const path = getPathname({ locale, href });
      const url =
        path === "/"
          ? `${siteUrl}/${locale}`
          : `${siteUrl}/${locale}${path}`;

      entries.push({
        url,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => {
              const altPath = getPathname({ locale: loc, href });
              const altUrl =
                altPath === "/"
                  ? `${siteUrl}/${loc}`
                  : `${siteUrl}/${loc}${altPath}`;
              return [loc, altUrl];
            })
          ),
        },
      });
    }
  }

  return entries;
}
