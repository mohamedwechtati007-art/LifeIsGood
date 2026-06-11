import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import { buildSiteMetadata } from "@/lib/metadata";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SnowParticles from "@/components/SnowParticles";
import CursorBlob from "@/components/CursorBlob";
import SetHtmlLang from "@/components/SetHtmlLang";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildSiteMetadata(locale, "specialOfferHero");
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <SnowParticles />
      <CursorBlob />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
