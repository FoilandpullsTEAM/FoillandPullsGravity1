import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/ui/Icons";

export type LightboxItem = {
  id: string;
  title: string;
  src: string;
};

type LightboxProps = {
  items: readonly LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const reduce = useReducedMotion() ?? false;
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  useLockBodyScroll(true);
  useEscape(true, onClose);

  const total = items.length;
  const current = items[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((currentIndex - 1 + total) % total);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((currentIndex + 1) % total);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, total, onNavigate]);

  if (!current) return null;

  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");

  return (
    <div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-[var(--color-lightbox)]/94 p-6 md:p-10 backdrop-blur-xl"
    >
      {/* Top bar with counter and close button */}
      <div className="flex items-center justify-between text-white">
        <span className="font-mono text-[13px] tracking-wider text-white/60">
          {currentFormatted} / {totalFormatted}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-white hover:text-deep"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>

      {/* Main image container */}
      <div className="relative mx-auto flex h-[70vh] w-full max-w-5xl items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.title}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Bottom bar with caption and navigation */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-white/15 pt-5 text-white">
        <p className="text-[14px] md:text-[15px] font-medium tracking-[0.05em] uppercase text-white/90">
          {current.title}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + total) % total)}
            aria-label="Imagen anterior"
            className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-white hover:text-deep"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % total)}
            aria-label="Imagen siguiente"
            className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-white hover:text-deep"
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
