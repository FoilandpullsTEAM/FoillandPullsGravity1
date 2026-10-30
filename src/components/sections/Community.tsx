import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { TESTIMONIALS } from "@/lib/content";

export function Community() {
  const reduce = useReducedMotion() ?? false;
  const [[currentIndex, dir], setPage] = useState<[number, number]>([0, 1]);

  const total = TESTIMONIALS.items.length;
  const current = TESTIMONIALS.items[currentIndex];

  const step = (delta: number) => {
    setPage([(currentIndex + delta + total) % total, delta]);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) {
      step(1);
    } else if (info.offset.x > 60) {
      step(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  const shift = reduce ? 0 : 60;

  return (
    <section id="community" className="relative w-full py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          kicker={TESTIMONIALS.kicker}
          title={TESTIMONIALS.title}
          lead={TESTIMONIALS.lead}
        />

        {/* Screen Reader Live Announcer */}
        <p aria-live="polite" className="sr-only">
          {`Testimonio ${currentIndex + 1} de ${total}: ${current.name}.`}
        </p>

        {/* Testimonial Carousel Region (EFFECT-13) */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Carrusel de testimonios"
          className="relative mx-auto max-w-4xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-3xl"
        >
          <div className="overflow-hidden min-h-[340px] flex items-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={current.name}
                custom={dir}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: dir * shift }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -shift }}
                transition={{ duration: 0.55, ease: EASE }}
                className="w-full glass rounded-3xl p-8 md:p-14 cursor-grab active:cursor-grabbing"
              >
                <blockquote className="font-normalidad text-[24px] sm:text-[32px] md:text-[38px] leading-[1.2] uppercase text-white mb-8">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="size-14 rounded-full object-cover border border-white/25"
                  />
                  <div>
                    <p className="font-semibold text-[16px] text-white">
                      {current.name}
                    </p>
                    <p className="text-[13px] text-white/60">{current.since}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls: Dots + Arrows */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Ver testimonio ${idx + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-8 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Testimonio anterior"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white hover:text-deep"
              >
                <ArrowLeftIcon className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Testimonio siguiente"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white hover:text-deep"
              >
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
