import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { PlusIcon } from "@/components/ui/Icons";
import { usePointerFine } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { INSTRUCTORS as DEFAULT_INSTRUCTORS } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

export function Instructors() {
  const { content } = useContent();
  const INSTRUCTORS = content.instructors;
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // EFFECT-05 Cursor-follow preview
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 160, damping: 24, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 160, damping: 24, mass: 0.5 });
  const activePointer = fine && !reduce;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointer) return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const activeThumbnailId = hoveredId || openId;
  const activeInstructor = INSTRUCTORS.items.find((i) => i.id === activeThumbnailId);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="instructors"
      onPointerMove={handlePointerMove}
      className="relative w-full py-24 md:py-32 px-6 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          kicker={INSTRUCTORS.kicker}
          title={INSTRUCTORS.title}
          lead={INSTRUCTORS.lead}
        />

        {/* Floating Cursor-Follow Preview Thumbnail (EFFECT-05) */}
        {activePointer && activeInstructor ? (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-40 -ml-[110px] -mt-[140px] h-[280px] w-[220px] overflow-hidden rounded-[16px] shadow-2xl"
            style={{ x: springX, y: springY }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeInstructor.id}
                src={activeInstructor.image}
                alt=""
                initial={{ opacity: 0, scale: 1.15, rotate: -3 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { duration: 0.45, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Accordion Rows */}
        <div className="border-t border-white/20">
          {INSTRUCTORS.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                onPointerEnter={() => setHoveredId(item.id)}
                onPointerLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                className="group border-b border-white/15 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-6 md:py-8 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    {/* Years badge */}
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/60">
                      {item.years}
                    </span>

                    {/* Mobile-only round thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-10 rounded-full object-cover md:hidden border border-white/20"
                    />

                    {/* Name: translates right on hover (EFFECT-19) */}
                    <span className="font-normalidad text-[24px] sm:text-[32px] md:text-[40px] uppercase text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:group-hover:translate-x-4">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Desktop-only Role */}
                    <span className="hidden md:block text-[14px] uppercase tracking-wider text-white/60">
                      {item.role}
                    </span>

                    {/* Rotating +/× toggle (EFFECT-19) */}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-white text-deep"
                          : "bg-transparent text-white group-hover:border-white"
                      }`}
                    >
                      <PlusIcon className="size-5" />
                    </div>
                  </div>
                </button>

                {/* Animated Bio Panel */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: { duration: 0.45, ease: EASE },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: { duration: 0.3, ease: EASE },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row gap-8 pb-8 pt-2 pl-0 md:pl-28">
                        {/* Desktop portrait */}
                        <div className="hidden md:block w-48 shrink-0 overflow-hidden rounded-xl border border-white/20">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-56 w-full object-cover"
                          />
                        </div>

                        <div className="max-w-xl">
                          <p className="md:hidden text-[13px] uppercase tracking-wider text-white/60 mb-2">
                            {item.role}
                          </p>
                          <p className="text-[16px] md:text-[18px] leading-relaxed text-white/80">
                            {item.bio}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
