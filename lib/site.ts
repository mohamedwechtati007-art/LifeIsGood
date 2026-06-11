/** URL publique du site (pour sitemap). Définir NEXT_PUBLIC_SITE_URL en production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://lifeisgoodconstruction.ca";
