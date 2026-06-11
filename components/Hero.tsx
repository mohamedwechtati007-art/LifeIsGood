import HeroLcpImage from "@/components/HeroLcpImage";
import HeroClient from "@/components/HeroClient";

export default function Hero() {
  return (
    <section
      id="offre"
      className="relative min-h-dvh flex flex-col overflow-hidden"
    >
      <HeroLcpImage />
      <HeroClient />
    </section>
  );
}
