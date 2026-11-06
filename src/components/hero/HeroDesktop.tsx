import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { dw, dpx, dpy } from "@/lib/frame";
import { EASE, passthrough, stagger } from "@/lib/motion";
import { usePointerFine } from "@/lib/hooks";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { CTA } from "@/components/ui/CTA";
import { StatCards } from "@/components/hero/StatCards";
import { BACKGROUNDS } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

const FIGMA_BLUR = 0.5;
const capTop = (y: number, size: number) => dw(y - 0.25 * size);

type HaloProps = {
  src: string;
  cx: string;
  top: number;
  w: number;
  h: number;
  bleedX: string;
  bleedY: string;
};

function Halo({ src, cx, top, w, h, bleedX, bleedY }: HaloProps) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2"
      style={{ left: cx, top: dw(top), width: dw(w), height: dw(h) }}
    >
      <div className="absolute" style={{ inset: `${bleedY} ${bleedX}` }}>
        <img src={src} alt="" className="block h-full w-full" />
      </div>
    </div>
  );
}

export function HeroDesktop() {
  const { content } = useContent();
  const HERO = content.hero;
  const MEDIA = content.media;
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const pointerOn = fine && !reduce;

  // Scroll parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const haloY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const dancerY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const typeFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer drift
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const dancerPX = useTransform(smx, (v) => v * -14);
  const dancerPY = useTransform(smy, (v) => v * -8);
  const typePX = useTransform(smx, (v) => v * 9);
  const haloPX = useTransform(smx, (v) => v * 22);
  const logoScrollY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const logoPX = useTransform(smx, (v) => v * -16);
  const logoPY = useTransform(smy, (v) => v * -10);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerOn || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative isolate hidden min-h-svh w-full overflow-hidden bg-sky md:block"
    >
      {/* 1. BACKDROP: fuera del frame para desbordar la escena */}
      <SectionBackdrop layers={BACKGROUNDS.hero} className="-z-10" />

      <div className="relative flex min-h-svh items-center">
        <motion.div
          className="frame frame-desktop relative"
          variants={stagger(reduce, 0.075, 0.15)}
          initial="hidden"
          animate="show"
        >
          {/* 2. HALOS */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={passthrough}
            style={reduce ? undefined : { y: haloY, x: haloPX }}
          >
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 1.6, ease: EASE } },
              }}
            >
              <Halo
                src={MEDIA.haloLeft}
                cx={dpx(15.63, -1.78)}
                top={306.27}
                w={1061.566}
                h={717.457}
                bleedX="-55.75%"
                bleedY="-37.68%"
              />
              <Halo
                src={MEDIA.haloRight}
                cx={dpx(90.63, -2.75)}
                top={336.297}
                w={1061.566}
                h={717.457}
                bleedX="-55.75%"
                bleedY="-37.68%"
              />
              <Halo
                src={MEDIA.haloCenter}
                cx={dpx(50)}
                top={475.0}
                w={1418.931}
                h={649.203}
                bleedX="-61.61%"
                bleedY="-28.19%"
              />
            </motion.div>
          </motion.div>

          {/* 3. GROUND */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 1.2, delay: 0.5, ease: EASE },
              },
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                left: dpx(16.67, -1),
                top: dw(743.03),
                width: dw(754),
                height: dw(42),
              }}
            >
              <div className="absolute" style={{ inset: "-116.43% -6.49%" }}>
                <img src={MEDIA.ground1} alt="" className="block h-full w-full" />
              </div>
            </div>

            <div
              className="absolute pointer-events-none"
              style={{
                left: dpx(31.25, 20.85),
                top: dw(767.005),
                width: dw(270.004),
                height: dw(8),
              }}
            >
              <div className="absolute" style={{ inset: "-50% -1.48%" }}>
                <img src={MEDIA.ground2} alt="" className="block h-full w-full" />
              </div>
            </div>
          </motion.div>

          {/* 4. HEADLINE (HERO.brandParts) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={passthrough}
            style={reduce ? undefined : { y: typeY, x: typePX, opacity: typeFade }}
          >
            <h1 className="sr-only">{HERO.srTitle}</h1>
            <motion.span
              className="font-normalidad absolute uppercase text-white"
              style={{
                left: dpx(6.25, 8),
                top: capTop(226.118, 150),
                fontSize: dw(150),
                lineHeight: 1.1,
                letterSpacing: dw(-5),
              }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                  filter: `blur(${dw(40 * FIGMA_BLUR)})`,
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
                left: dpx(6.25, 8),
                top: capTop(357.005, 150),
                fontSize: dw(150),
                lineHeight: 1.1,
                letterSpacing: dw(-5),
              }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                  filter: `blur(${dw(40 * FIGMA_BLUR)})`,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.5, delay: 0.1, ease: EASE },
                },
              }}
            >
              {HERO.brandParts.line2}
            </motion.span>
          </motion.div>

          {/* 5. DANCER */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={passthrough}
            style={reduce ? undefined : { y: dancerY, x: dancerPX }}
          >
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: "50%",
                top: dpy(51.04, 1.15),
                width: dw(542.37),
                height: dw(715.18),
              }}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 1.06 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 1.5, ease: EASE },
                },
              }}
            >
              <motion.img
                src={MEDIA.dancer}
                alt={HERO.dancerAlt}
                className="h-full w-full object-contain object-bottom"
                variants={passthrough}
                style={reduce ? undefined : { y: dancerPY }}
              />

              {/* Cartas Pokémon 30 Aniversario rodeando al personaje */}
              {/* 1. Pikachu 30 Aniversario */}
              <motion.div
                className="pointer-events-auto group absolute z-20 cursor-pointer overflow-hidden rounded-xl border-2 border-white/50 pokemon-card-shadow transition-transform duration-500 hover:scale-125 hover:z-40 hover:rotate-0"
                style={{
                  left: dw(-48),
                  top: dw(60),
                  width: dw(122),
                  aspectRatio: "3 / 4",
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [-8, 8, -8],
                        rotate: [-14, -10, -14],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={MEDIA.pokemonCards[0].src}
                  alt={MEDIA.pokemonCards[0].name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              </motion.div>

              {/* 2. Charizard 30 Aniversario */}
              <motion.div
                className="pointer-events-auto group absolute z-20 cursor-pointer overflow-hidden rounded-xl border-2 border-white/50 pokemon-card-shadow transition-transform duration-500 hover:scale-125 hover:z-40 hover:rotate-0"
                style={{
                  right: dw(-52),
                  top: dw(90),
                  width: dw(126),
                  aspectRatio: "3 / 4",
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [8, -8, 8],
                        rotate: [13, 17, 13],
                      }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={MEDIA.pokemonCards[1].src}
                  alt={MEDIA.pokemonCards[1].name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              </motion.div>

              {/* 3. Mew Star 30 Aniversario */}
              <motion.div
                className="pointer-events-auto group absolute z-20 cursor-pointer overflow-hidden rounded-xl border-2 border-white/50 pokemon-card-shadow transition-transform duration-500 hover:scale-125 hover:z-40 hover:rotate-0"
                style={{
                  left: dw(-58),
                  top: dw(370),
                  width: dw(118),
                  aspectRatio: "3 / 4",
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [-6, 6, -6],
                        rotate: [8, 12, 8],
                      }
                }
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={MEDIA.pokemonCards[2].src}
                  alt={MEDIA.pokemonCards[2].name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              </motion.div>

              {/* 4. Rayquaza 30 Aniversario */}
              <motion.div
                className="pointer-events-auto group absolute z-20 cursor-pointer overflow-hidden rounded-xl border-2 border-white/50 pokemon-card-shadow transition-transform duration-500 hover:scale-125 hover:z-40 hover:rotate-0"
                style={{
                  right: dw(-42),
                  top: dw(410),
                  width: dw(120),
                  aspectRatio: "3 / 4",
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [7, -7, 7],
                        rotate: [-16, -12, -16],
                      }
                }
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={MEDIA.pokemonCards[3].src}
                  alt={MEDIA.pokemonCards[3].name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden className="pokemon-card-holo pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 8. TAGLINE */}
          <motion.div
            className="absolute flex items-center pointer-events-none"
            style={{
              left: dpx(66.67, -5),
              top: dpy(29.17, 11.9),
              gap: dw(24),
              fontSize: dw(24),
            }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.4] text-white">
              {HERO.tagline[0][0]}
              <br />
              {HERO.tagline[0][1]}
            </p>
            <span
              style={{ width: dw(17.901), height: dw(46.822) }}
              className="relative flex items-center justify-center shrink-0"
            >
              <span
                className="block bg-white"
                style={{
                  width: dw(50.127),
                  height: "1px",
                  transform: "rotate(-69.08deg)",
                }}
              />
            </span>
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.4] text-white">
              {HERO.tagline[1][0]}
              <br />
              {HERO.tagline[1][1]}
            </p>
          </motion.div>

          {/* 9. PARAGRAPH */}
          <motion.p
            className="absolute text-white"
            style={{
              left: dpx(6.25, 23.81),
              top: dpy(63.5, 1.88),
              width: dw(370),
              fontSize: dw(14.5),
              lineHeight: 1.5,
            }}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {HERO.body}
          </motion.p>

          {/* 10. BUTTONS */}
          <motion.div
            className="absolute flex items-center gap-3.5"
            style={{
              left: dpx(6.25, 20),
              top: dpy(77.08, 1.63),
            }}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            <CTA href={HERO.buttons[0].href} variant="solid">
              {HERO.buttons[0].label}
            </CTA>
            <CTA href={HERO.buttons[1].href} variant="ghost">
              {HERO.buttons[1].label}
            </CTA>
          </motion.div>

          {/* 12. STAT CARDS */}
          <motion.div
            className="absolute inset-0 pointer-events-none [&>*]:pointer-events-auto"
            variants={passthrough}
            style={reduce ? undefined : { y: cardsY }}
          >
            <StatCards />
          </motion.div>

          {/* 13. FLOATING 30TH CELEBRATION LOGO (Upper Right, under social icons) */}
          <motion.div
            className="pointer-events-auto absolute z-30"
            style={{
              right: dw(48),
              top: dw(94),
              width: dw(186),
            }}
            variants={{
              hidden: { opacity: 0, y: -25, scale: 0.92 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1.2, delay: 0.35, ease: EASE },
              },
            }}
          >
            <motion.div
              style={reduce ? undefined : { y: logoScrollY, x: logoPX }}
            >
              <motion.div
                className="group relative cursor-pointer"
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [-8, 8, -8],
                        rotate: [-2, 2, -2],
                      }
                }
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.08, rotate: 0 }}
              >
                <img
                  src={MEDIA.pokemon30Logo}
                  alt={HERO.pokemon30LogoAlt}
                  className="w-full object-contain filter drop-shadow-[0_12px_24px_rgba(2,91,134,0.45)] drop-shadow-[0_0_24px_rgba(255,215,0,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_16px_32px_rgba(2,91,134,0.6)] group-hover:drop-shadow-[0_0_36px_rgba(255,225,50,0.65)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
