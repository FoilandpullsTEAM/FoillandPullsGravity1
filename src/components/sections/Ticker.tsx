import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE } from "@/lib/content";

export function Ticker() {
  return (
    <section className="relative w-full border-y border-white/15 py-6 md:py-8 overflow-hidden">
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Row 1: Large display text, moving left */}
        <Marquee
          items={MARQUEE.row1}
          separator={MARQUEE.separator1}
          duration={38}
          direction="left"
          itemClassName="font-normalidad text-[28px] md:text-[38px] uppercase tracking-[-0.01em] text-white"
        />

        {/* Row 2: Smaller reversed text, moving right */}
        <Marquee
          items={MARQUEE.row2}
          separator={MARQUEE.separator2}
          duration={52}
          direction="right"
          itemClassName="text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-medium text-white/60"
        />
      </div>
    </section>
  );
}
