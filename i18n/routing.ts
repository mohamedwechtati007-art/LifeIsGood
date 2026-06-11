import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/services": {
      fr: "/services",
      en: "/services",
    },
    "/galerie": {
      fr: "/galerie",
      en: "/gallery",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
  },
});
