import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { dw, dpx, dpy } from "@/lib/frame";
import { EASE } from "@/lib/motion";
import { useCountUp } from "@/lib/hooks";
import { MEDIA as DEFAULT_MEDIA, HERO as DEFAULT_HERO } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

const capTop = (y: number, size: number) => dw(y - 0.25 * size);

const AVATAR_COORDS = [
  { x: -1.33, y: 32.65 },
  { x: 210, y: 111.15 },
  { x: 266.51, y: 100.15 },
  { x: 263.34, y: 24.49 },
  { x: 228.55, y: -14.84 },
  { x: 24.67, y: -6.68 },
  { x: 165.44, y: -14.84 },
  { x: -9.21, y: 100.15 },
  { x: 97.39, y: -4.84 },
  { x: 42.01, y: 57.15 },
  { x: 229.55, y: 50.65 },
  { x: 32.01, y: 105.99 },
  { x: 81.88, y: 105.99 },
  { x: 153.49, y: 91.32 },
];

export function StatCards() {
  const { content } = useContent();
  const HERO = content.hero;
  const MEDIA = content.media;
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const CARD_TOP = dpy(68.75, -5.88);

  const enter = (delay: number) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0.2 : 1, delay, ease: EASE },
    },
  });

  const classesCount = useCountUp(HERO.stats[0].value, inView, reduce, 1500);
  const membersCount = useCountUp(HERO.stats[1].value, inView, reduce, 1500);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* CARD 1: Classes Monthly */}
      <motion.div
        variants={enter(0.15)}
        className="glass group absolute overflow-hidden transition-[background-color] duration-500 hover:bg-white/25"
        style={{
          left: dpx(56.25, 4),
          top: CARD_TOP,
          width: dw(290),
          height: dw(125),
          borderRadius: dw(20),
        }}
      >
        <img
          src={MEDIA.flower}
          alt=""
          className="absolute transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
          style={{
            left: dw(8.43),
            top: dw(5.78),
            width: dw(113.444),
            height: dw(113.444),
          }}
        />
        <p
          className="font-normalidad absolute whitespace-nowrap uppercase text-white"
          style={{
            left: dw(128.79),
            top: capTop(37.32, 40),
            fontSize: dw(40),
            lineHeight: 1.2,
            letterSpacing: dw(-1.6),
          }}
        >
          {classesCount}
          {HERO.stats[0].suffix}
        </p>
        <p
          className="absolute whitespace-nowrap text-white opacity-60"
          style={{
            left: dw(134.72),
            top: capTop(76.32, 16),
            fontSize: dw(16),
            lineHeight: 1.4,
          }}
        >
          {HERO.stats[0].label}
        </p>
      </motion.div>

      {/* BADGE */}
      <motion.div
        variants={enter(0.3)}
        aria-hidden
        className="absolute flex items-center justify-center pointer-events-none"
        style={{
          left: dpx(56.25, 8.66),
          top: dpy(68.75, -1.38),
          width: dw(127.923),
          height: dw(127.923),
        }}
      >
        <motion.img
          src={MEDIA.badge}
          alt=""
          style={{
            width: dw(93.646),
            height: dw(93.646),
          }}
          animate={
            reduce ? { rotate: -30 } : { rotate: [-30, -22, -30] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* CARD 2: Active Members */}
      <motion.div
        variants={enter(0.25)}
        className="glass group absolute overflow-hidden transition-[background-color] duration-500 hover:bg-white/25"
        style={{
          left: dpx(77.08, 2),
          top: CARD_TOP,
          width: dw(290),
          height: dw(125),
          borderRadius: dw(20),
        }}
      >
        {AVATAR_COORDS.map((coord, i) => (
          <img
            key={`avatar-${i}`}
            src={MEDIA.avatars[i]}
            alt=""
            className="absolute rounded-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{
              left: dw(coord.x),
              top: dw(coord.y),
              width: dw(29.337),
              height: dw(29.337),
              transitionDelay: `${i * 22}ms`,
            }}
          />
        ))}

        <p
          className="font-normalidad absolute whitespace-nowrap uppercase text-white"
          style={{
            left: dw(80),
            top: capTop(37.32, 40),
            fontSize: dw(40),
            lineHeight: 1.2,
            letterSpacing: dw(-1.6),
          }}
        >
          {membersCount}
          {HERO.stats[1].suffix}
        </p>
        <p
          className="absolute whitespace-nowrap text-white opacity-60"
          style={{
            left: dw(85.93),
            top: capTop(76.32, 16),
            fontSize: dw(16),
            lineHeight: 1.4,
          }}
        >
          {HERO.stats[1].label}
        </p>
      </motion.div>
    </div>
  );
}
