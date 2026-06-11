import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteBrandFullName } from "@/lib/site-brand";

export async function buildSiteMetadata(
  locale: string,
  namespace: "specialOfferHero" | "services" | "gallery" | "contact"
): Promise<Metadata> {
  const brand = siteBrandFullName();
  const t = await getTranslations({ locale, namespace });

  let title: string;
  let description: string;

  if (namespace === "specialOfferHero") {
    title = `${brand} — ${t("titleLine1")} ${t("titleLine2")}`;
    description = t("subtitle");
  } else {
    title = `${t("title")} | ${brand}`;
    description = t("subtitle");
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
  };
}
