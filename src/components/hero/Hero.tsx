import { HeroDesktop } from "@/components/hero/HeroDesktop";
import { HeroMobile } from "@/components/hero/HeroMobile";

export function Hero() {
  return (
    <section id="home" className="relative w-full">
      <HeroDesktop />
      <HeroMobile />
    </section>
  );
}
