/** Lien vers le formulaire de devis selon la page courante */
export function getQuoteHref(locale: string, pathname: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const homePaths = [`/${locale}`, "/"];
  if (homePaths.includes(normalized)) return "#devis";
  return `/${locale}/contact`;
}
