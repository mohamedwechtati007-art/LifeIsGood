import GalerieClient from "@/components/GalerieClient";
import { buildSiteMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildSiteMetadata(locale, "gallery");
}

export default function GaleriePage() {
  return <GalerieClient />;
}
