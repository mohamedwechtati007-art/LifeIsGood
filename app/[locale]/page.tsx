import { preload } from "react-dom";
import Hero from "@/components/Hero";
import QuoteSection from "@/components/QuoteSection";
import { picSrc, sitePics } from "@/lib/site-pics";
import ServicePromises from "@/components/ServicePromises";
import Services3D from "@/components/Services3D";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import MapSection from "@/components/MapSection";
import StickyOfferBar from "@/components/StickyOfferBar";

export default function HomePage() {
  if (sitePics[0]) {
    preload(picSrc(sitePics[0]), { as: "image", fetchPriority: "high" });
  }

  return (
    <>
      <Hero />
      <QuoteSection />
      <ServicePromises />
      <Services3D />
      <Timeline />
      <Testimonials />
      <FAQ />
      <MapSection />
      <StickyOfferBar />
    </>
  );
}
