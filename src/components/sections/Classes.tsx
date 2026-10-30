import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CTA } from "@/components/ui/CTA";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { LEVELS } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

export function Classes() {
  const { content } = useContent();
  const CLASSES = content.classes;
  const reduce = useReducedMotion() ?? false;
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const filteredClasses = useMemo(() => {
    if (selectedLevel === "All") return CLASSES.items;
    return CLASSES.items.filter((c) => c.level === selectedLevel);
  }, [selectedLevel, CLASSES.items]);

  return (
    <section id="classes" className="relative w-full py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        {/* Top: Header + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
          <SectionHead
            kicker={CLASSES.kicker}
            title={CLASSES.title}
            lead={CLASSES.lead}
            className="mb-0"
          />

          {/* Level Filter Pills (EFFECT-12) */}
          <div
            role="group"
            aria-label="Filtro de niveles"
            className="flex flex-wrap items-center gap-2"
          >
            {LEVELS.map((level) => {
              const active = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-300 border ${
                    active
                      ? "border-white bg-white text-deep"
                      : "hairline bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aria-live polite announcer for screen readers */}
        <p aria-live="polite" className="sr-only">
          {`${filteredClasses.length} clases visibles en el nivel ${selectedLevel}.`}
        </p>

        {/* Classes Grid with FLIP layout animation (EFFECT-12) */}
        <motion.div
          layout={!reduce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((item) => (
              <motion.div
                key={item.id}
                layout={!reduce}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group flex flex-col rounded-2xl glass p-4 transition-[background-color] duration-500 hover:bg-white/25"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <MediaFrame
                    src={item.image}
                    alt={item.title}
                    ratio="4 / 5"
                    parallax={10}
                    className="w-full"
                  >
                    {/* Level Badge Top-Left */}
                    <div className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wider text-white backdrop-blur-md">
                      {item.level}
                    </div>

                    {/* Hover-revealed Arrow Chip Top-Right (EFFECT-19) */}
                    <div className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-deep opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5">
                      <ArrowUpRightIcon className="size-4" />
                    </div>
                  </MediaFrame>
                </div>

                <div className="flex flex-col pt-5 pb-2 px-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-normalidad text-[20px] md:text-[22px] uppercase text-white">
                      {item.title}
                    </h3>
                    <span className="text-[13px] font-mono text-white/60">
                      {item.duration}
                    </span>
                  </div>

                  {/* Five-dot Intensity Meter */}
                  <div className="flex items-center gap-1.5 mb-3" aria-label={`Intensidad: ${item.intensity} de 5`}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={`size-2 rounded-full ${
                          dot <= item.intensity
                            ? "bg-white"
                            : "border border-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[14px] leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA to Membership */}
        <div className="flex justify-center">
          <CTA href="#membership" variant="ghost">
            {CLASSES.cta}
          </CTA>
        </div>
      </div>
    </section>
  );
}
