import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const stagger = (reduce: boolean, each = 0.08, delay = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: reduce
      ? { staggerChildren: 0, delayChildren: 0 }
      : { staggerChildren: each, delayChildren: delay },
  },
});

export const riseIn = (reduce: boolean, y = 24, duration = 0.9): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0.2 : duration, ease: EASE },
  },
});

export const slideIn = (reduce: boolean, x = 32, duration = 0.9): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, x },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduce ? 0.2 : duration, ease: EASE },
  },
});

export const zoomIn = (reduce: boolean, from = 1.08, duration = 1.4): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: from },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: reduce ? 0.2 : duration, ease: EASE },
  },
});

export const curtain = (reduce: boolean, duration = 1.2): Variants => ({
  hidden: reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: reduce ? 0.2 : duration, ease: EASE },
  },
});

export const curtainMedia = (reduce: boolean, duration = 1.4): Variants => ({
  hidden: reduce ? {} : { scale: 1.35 },
  show: {
    scale: 1,
    transition: { duration: reduce ? 0.2 : duration, ease: EASE },
  },
});

export const letterIn = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em", rotate: 6 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: reduce ? 0.2 : 0.7, ease: EASE },
  },
});

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE } },
};

export const passthrough: Variants = { hidden: {}, show: {} };
