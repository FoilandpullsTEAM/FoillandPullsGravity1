import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { mw, mpx, mpy } from "@/lib/frame";
import { EASE, stagger } from "@/lib/motion";
import { useCountUp } from "@/lib/hooks";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { ArrowElbowIcon } from "@/components/ui/Icons";
import { BACKGROUNDS, HERO as DEFAULT_HERO } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

const FIGMA_BLUR = 0.5;
const capTop = (y: number, size: number) => mw(y - 0.25 * size);

type HaloProps = {
  src: string;
  cx: string;
  top: number;
  w: number;
  h: number;
  bleedX: string;
  bleedY: string;
};

function HaloMobile({ src, cx, top, w, h, bleedX, bleedY }: HaloProps) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2"
      style={{ left: cx, top: mw(top), width: mw(w), height: mw(h) }}
    >
      <div className="absolute" style={{ inset: `${bleedY} ${bleedX}` }}>
        <img src={src} alt="" className="block h-full w-full" />
      </div>
    </div>
  );
}

export function HeroMobile() {
  const { content } = useContent();
  const HERO = content.hero;
  const MEDIA = content.media;
  const reduce = useReducedMotion() ?? false;
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-10%" });

  const rise = (delay = 0, y = 22) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.95, delay, ease: EASE },
    },
  });

  const classesCount = useCountUp(HERO.stats[0].value, inView, reduce, 1400);
  const membersCount = useCountUp(HERO.stats[1].value, inView, reduce, 1400);

  return (
    <div
      ref={inViewRef}
      className="relative isolate min-h-svh w-full overflow-hidden bg-sky md:hidden"
    >
      {/* 1. BACKDROP: fuera del frame para desbordar la escena */}
      <SectionBackdrop layers={BACKGROUNDS.heroMobile} className="-z-10" />

      <div className="relative flex min-h-svh items-center">
        <motion.div
          className="frame frame-mobile relative"
          variants={stagger(reduce, 0.07, 0.15)}
          initial="hidden"
          animate="show"
        >
          {/* 2. HALOS (4 en mobile) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 1.5, ease: EASE } },
            }}
          >
            <HaloMobile
              src={MEDIA.haloLeft}
              cx={mw(-319.52)}
              top={306.27}
              w={1061.566}
              h={717.457}
              bleedX="-55.75%"
              bleedY="-37.68%"
            />
            <HaloMobile
              src={MEDIA.haloRight}
              cx={mpx(100, 319.52)}
              top={336.27}
              w={1061.566}
              h={717.457}
              bleedX="-55.75%"
              bleedY="-37.68%"
            />
            <HaloMobile
              src={MEDIA.haloCenter}
              cx={mpx(37.5, 12.26)}
              top={475}
              w={1418.931}
              h={649.203}
              bleedX="-61.61%"
              bleedY="-28.19%"
            />
            <HaloMobile
              src={MEDIA.haloMobile}
              cx={mpx(50)}
              top={759.62}
              w={972.67}
              h={364.582}
              bleedX="-109.71%"
              bleedY="-41.12%"
            />
          </motion.div>

          {/* 3. GROUND */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 1.1, delay: 0.5, ease: EASE },
              },
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                left: mw(-139.86),
                top: mw(917.12),
                width: mw(590.357),
                height: mw(32.885),
              }}
            >
              <div className="absolute" style={{ inset: "-116.43% -6.49%" }}>
                <img src={MEDIA.ground1} alt="" className="block h-full w-full" />
              </div>
            </div>

            <div
              className="absolute pointer-events-none"
              style={{
                left: mw(41.68),
                top: mw(935.91),
                width: mw(211.404),
                height: mw(6.264),
              }}
            >
              <div className="absolute" style={{ inset: "-50% -1.48%" }}>
                <img src={MEDIA.ground2} alt="" className="block h-full w-full" />
              </div>
            </div>
          </motion.div>

          {/* 4. HEADLINE: Foil y landpulls */}
          <h1 className="sr-only">{HERO.srTitle}</h1>

          {/* Floating 30th Anniversary Logo (Upper Right) */}
          <motion.div
            className="pointer-events-auto absolute z-20"
            style={{
              right: mw(20),
              top: mw(80),
              width: mw(108),
            }}
            variants={rise(0.2, 18)}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : {
                      y: [-6, 6, -6],
                      rotate: [-2, 2, -2],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={MEDIA.pokemon30Logo}
                alt={HERO.pokemon30LogoAlt}
                className="w-full object-contain filter drop-shadow-[0_8px_16px_rgba(2,91,134,0.45)] drop-shadow-[0_0_20px_rgba(255,215,0,0.45)]"
              />
            </motion.div>
          </motion.div>

          <motion.span
            className="font-normalidad absolute uppercase text-white"
            style={{
              left: mw(20),
              top: capTop(139.4, 60),
              fontSize: mw(60),
              lineHeight: 1.2,
              letterSpacing: mw(-2.4),
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 26,
                filter: `blur(${mw(28 * FIGMA_BLUR)})`,
              },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1.3, ease: EASE },
              },
            }}
          >
            {HERO.brandParts.line1}
          </motion.span>

          <motion.span
            className="font-normalidad absolute uppercase text-white"
            style={{
              left: mw(20),
              top: capTop(195, 48),
              fontSize: mw(48),
              lineHeight: 1.2,
              letterSpacing: mw(-1.9),
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 26,
                filter: `blur(${mw(28 * FIGMA_BLUR)})`,
              },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1.3, delay: 0.08, ease: EASE },
              },
            }}
          >
            {HERO.brandParts.line2}
          </motion.span>

          {/* 5. TAGLINE */}
          <motion.div
            className="absolute flex items-center pointer-events-none"
            style={{
              left: mw(20),
              top: mw(272.27),
              width: mw(142.786),
              height: mw(28.465),
              gap: mw(9.91),
              fontSize: mw(12.867),
              lineHeight: 1.2,
            }}
            variants={rise(0.15)}
          >
            <p className="whitespace-nowrap font-semibold uppercase text-white">
              {HERO.tagline[0][0]}
              <br />
              {HERO.tagline[0][1]}
            </p>
            <span
              style={{ width: mw(8.231), height: mw(28.465) }}
              className="relative flex items-center justify-center shrink-0"
            >
              <span
                className="block bg-white"
                style={{
                  width: mw(29.631),
                  height: "1px",
                  transform: "rotate(-73.87deg)",
                }}
              />
            </span>
            <p className="whitespace-nowrap font-semibold uppercase text-white">
              {HERO.tagline[1][0]}
              <br />
              {HERO.tagline[1][1]}
            </p>
          </motion.div>

          {/* 6. PARAGRAPH */}
          <motion.p
            className="absolute text-white"
            style={{
              left: mpx(50, 8.74),
              top: mw(272.27),
              width: mw(192),
              fontSize: mw(12.5),
              lineHeight: 1.4,
            }}
            variants={rise(0.2)}
          >
            {HERO.body}
          </motion.p>

          {/* 7. DANCER */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: mpx(62.5, -38.25),
              top: mpy(50, 181.98),
              width: mw(424.657),
              height: mw(559.963),
            }}
            variants={{
              hidden: { opacity: 0, y: 46, scale: 1.05 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1.4, ease: EASE },
              },
            }}
          >
            <img
              src={MEDIA.dancer}
              alt={HERO.dancerAlt}
              className="h-full w-full object-contain object-bottom"
            />

            {/* Cartas Pokémon 30 Aniversario en Mobile */}
            <div
              className="pointer-events-auto absolute z-20 overflow-hidden rounded-lg border border-white/50 pokemon-card-shadow"
              style={{
                left: mw(-15),
                top: mw(40),
                width: mw(76),
                aspectRatio: "3 / 4",
                transform: "rotate(-12deg)",
              }}
            >
              <img
                src={MEDIA.pokemonCards[0].src}
                alt={MEDIA.pokemonCards[0].name}
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60" />
            </div>

            <div
              className="pointer-events-auto absolute z-20 overflow-hidden rounded-lg border border-white/50 pokemon-card-shadow"
              style={{
                right: mw(-15),
                top: mw(70),
                width: mw(78),
                aspectRatio: "3 / 4",
                transform: "rotate(14deg)",
              }}
            >
              <img
                src={MEDIA.pokemonCards[1].src}
                alt={MEDIA.pokemonCards[1].name}
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60" />
            </div>

            <div
              className="pointer-events-auto absolute z-20 overflow-hidden rounded-lg border border-white/50 pokemon-card-shadow"
              style={{
                left: mw(-20),
                top: mw(290),
                width: mw(72),
                aspectRatio: "3 / 4",
                transform: "rotate(10deg)",
              }}
            >
              <img
                src={MEDIA.pokemonCards[2].src}
                alt={MEDIA.pokemonCards[2].name}
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60" />
            </div>
          </motion.div>

          {/* 8. CARD "Classes Monthly" */}
          <motion.div
            className="glass absolute"
            style={{
              left: mw(20),
              top: mw(545.11),
              width: mw(194),
              height: mw(125),
              borderRadius: mw(20),
            }}
            variants={rise(0.28, 26)}
          >
            <p
              className="font-normalidad absolute whitespace-nowrap uppercase text-white"
              style={{
                left: mw(22.97),
                top: capTop(23.12, 40),
                fontSize: mw(40),
                letterSpacing: mw(-1.6),
              }}
            >
              {classesCount}
              {HERO.stats[0].suffix}
            </p>
            <p
              className="absolute whitespace-nowrap text-white opacity-60"
              style={{
                left: mw(28.9),
                top: capTop(62.12, 16),
                fontSize: mw(16),
              }}
            >
              {HERO.stats[0].label}
            </p>
            <div
              className="absolute flex items-center justify-center rounded-full border border-white/29"
              style={{
                right: mw(5),
                bottom: mw(5),
                width: mw(26.934),
                height: mw(26.934),
                borderWidth: mw(0.709),
              }}
            >
              <ArrowElbowIcon style={{ width: mw(14.176), height: mw(14.176) }} />
            </div>
          </motion.div>

          {/* 9. CARD "Active Members" */}
          <motion.div
            className="glass absolute"
            style={{
              left: mpx(50, 9),
              top: mw(618),
              width: mw(187),
              height: mw(125),
              borderRadius: mw(20),
            }}
            variants={rise(0.36, 26)}
          >
            {/* Overlapping avatar row */}
            <div
              className="absolute flex items-center"
              style={{ left: mw(22.71), top: mw(19.18) }}
            >
              {[
                { src: MEDIA.avatars[0], op: 1 },
                { src: MEDIA.avatars[9], op: 1 },
                { src: MEDIA.avatars[12], op: 0.7 },
                { src: MEDIA.avatars[13], op: 0.5 },
                { src: MEDIA.avatars[10], op: 0.4 },
                { src: MEDIA.avatars[11], op: 0.2 },
              ].map((av, i) => (
                <img
                  key={`m-av-${i}`}
                  src={av.src}
                  alt=""
                  className="rounded-full object-cover shrink-0"
                  style={{
                    width: mw(18.865),
                    height: mw(18.865),
                    marginRight: mw(-2.572),
                    opacity: av.op,
                  }}
                />
              ))}
            </div>

            <p
              className="font-normalidad absolute whitespace-nowrap uppercase text-white"
              style={{
                left: mw(22.71),
                top: capTop(55, 40),
                fontSize: mw(40),
                letterSpacing: mw(-1.6),
              }}
            >
              {membersCount}
              {HERO.stats[1].suffix}
            </p>
            <p
              className="absolute whitespace-nowrap text-white opacity-60"
              style={{
                left: mw(28.63),
                top: capTop(94, 16),
                fontSize: mw(16),
              }}
            >
              {HERO.stats[1].label}
            </p>
          </motion.div>

          {/* 10. CTA BUTTON (plain motion.a, NOT <CTA>) */}
          <motion.a
            href={HERO.buttons[0].href}
            variants={rise(0.44, 26)}
            className="group absolute flex -translate-x-1/2 items-center justify-between overflow-hidden bg-white"
            style={{
              left: "50%",
              top: mw(810),
              width: mw(400),
              borderRadius: "9999px",
              paddingLeft: mw(32),
              paddingRight: mw(20),
              paddingTop: mw(20),
              paddingBottom: mw(20),
            }}
          >
            <span
              className="font-bold text-deep"
              style={{ fontSize: mw(24) }}
            >
              {HERO.buttons[0].label}
            </span>
            <span
              className="flex items-center justify-center rounded-full bg-deep text-white group-active:scale-90 transition-transform duration-300"
              style={{ width: mw(51.57), height: mw(51.57) }}
            >
              <ArrowElbowIcon
                style={{ width: mw(27.142), height: mw(27.142) }}
              />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
