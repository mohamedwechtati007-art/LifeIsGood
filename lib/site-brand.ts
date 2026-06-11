export const siteBrand = {
  name: "Life is Good",
  subtitle: "Construction",
  logoSrc: "/pics/logo.png",
} as const;

export function siteBrandFullName() {
  return `${siteBrand.name} ${siteBrand.subtitle}`;
}
