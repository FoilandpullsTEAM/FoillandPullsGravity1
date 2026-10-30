import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEscape, useFocusTrap, useLockBodyScroll, usePointerFine } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import {
  CloseIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
} from "@/components/ui/Icons";
import { NAV, SOCIALS } from "@/lib/content";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  useLockBodyScroll(open);
  useEscape(open, onClose);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // EFFECT-05 cursor follow
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 22, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 22, mass: 0.5 });
  const activePointer = fine && !reduce;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointer) return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const currentPreview = NAV.links.find((l) => l.id === hoveredId)?.preview;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          onPointerMove={handlePointerMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-[var(--color-overlay)]/92 p-6 md:p-12 backdrop-blur-2xl overflow-y-auto"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13px] uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-deep"
            >
              <span>{NAV.closeLabel}</span>
              <CloseIcon className="size-4" />
            </button>
          </div>

          {/* Floating Thumbnail Preview (EFFECT-05) */}
          {activePointer && hoveredId && currentPreview ? (
            <motion.div
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-10 -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden rounded-[18px] shadow-2xl"
              style={{ x: springX, y: springY }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={hoveredId}
                  src={currentPreview}
                  alt=""
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: EASE },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </motion.div>
          ) : null}

          {/* Navigation Links */}
          <motion.ul
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.06,
                  delayChildren: 0.12,
                },
              },
              exit: { transition: { staggerChildren: 0 } },
            }}
            initial="hidden"
            animate="show"
            exit="exit"
            className="my-auto py-10 flex flex-col gap-3 md:gap-5"
          >
            {NAV.links.map((link, index) => {
              const paddedIdx = String(index + 1).padStart(2, "0");
              return (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                  onPointerEnter={() => setHoveredId(link.id)}
                  onPointerLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(link.id)}
                  onBlur={() => setHoveredId(null)}
                  className="menu-row group relative"
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="inline-flex items-baseline gap-4 md:gap-8"
                  >
                    <span className="font-mono text-[14px] md:text-[18px] text-white/40 transition-colors duration-300 group-hover:text-white">
                      {paddedIdx}
                    </span>

                    {/* Double-line label swap (EFFECT-11) */}
                    <span className="relative inline-block overflow-hidden font-normalidad text-[min(4.5rem,5.8cqi)] uppercase leading-[1.05] tracking-tight text-white">
                      <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full text-white/60 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                      >
                        {link.label}
                      </span>
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Footer Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/15 pt-6 text-[13px] text-white/60">
            <p>{NAV.address}</p>

            <a
              href={`mailto:${NAV.email}`}
              className="link-underline text-white hover:text-white/80"
            >
              {NAV.email}
            </a>

            <div className="flex items-center gap-4">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.name}
                  className="flex size-[38px] items-center justify-center rounded-full border border-white/29 text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-deep"
                >
                  {soc.name === "Instagram" && <InstagramIcon className="size-4" />}
                  {soc.name === "YouTube" && <YoutubeIcon className="size-4" />}
                  {soc.name === "X" && <XIcon className="size-4" />}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
