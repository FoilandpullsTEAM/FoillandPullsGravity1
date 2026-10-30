import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { useCountUp } from "@/lib/hooks";
import { riseIn } from "@/lib/motion";
import { MANIFESTO as DEFAULT_MANIFESTO, MEDIA as DEFAULT_MEDIA } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

function ParallaxItem({
  distance,
  children,
  className = "",
}: {
  distance: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 25 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

function CounterStat({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const count = useCountUp(value, inView, reduce, 1400);

  return (
    <div className="flex flex-col">
      <p className="font-normalidad text-[36px] md:text-[44px] leading-tight uppercase text-white">
        {count}
        {suffix}
      </p>
      <p className="text-[13px] md:text-[14px] text-white/60 mt-1">{label}</p>
    </div>
  );
}


export function Manifesto() {
  const { content } = useContent();
  const MANIFESTO = content.manifesto;
  const MEDIA = content.media;
  const reduce = useReducedMotion() ?? false;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });

  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-16 lg:gap-24 items-center">
        {/* Left Column: Head, Pillars, Stats */}
        <div className="flex flex-col">
          <SectionHead
            kicker={MANIFESTO.kicker}
            title={MANIFESTO.title}
            lead={MANIFESTO.lead}
            className="mb-8"
          />

          {/* Pillars List */}
          <ol className="flex flex-col divide-y divide-white/12 border-b border-white/12 mb-12">
            {MANIFESTO.pillars.map((pillar, idx) => (
              <motion.li
                key={pillar.number}
                variants={riseIn(reduce, 20, 0.7)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ delay: idx * 0.1 }}
                className="group py-6 transition-colors duration-300 hover:text-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="font-mono text-[14px] text-white/40 group-hover:text-white transition-colors duration-300">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-normalidad text-[22px] md:text-[24px] uppercase tracking-wide text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300 mt-1">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Stats Row */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 pt-2 border-t border-white/12"
          >
            {MANIFESTO.figures.map((fig) => (
              <CounterStat
                key={fig.label}
                value={fig.value}
                suffix={fig.suffix}
                label={fig.label}
                inView={statsInView}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Two overlapping MediaFrames + Spinning flower */}
        <div className="relative isolate flex justify-center lg:justify-end">
          {/* Main Top Frame */}
          <ParallaxItem distance={40} className="w-[80%] max-w-[440px]">
            <MediaFrame
              src={MANIFESTO.images.top.src}
              alt={MANIFESTO.images.top.alt}
              ratio="3 / 4"
              parallax={14}
              caption={MANIFESTO.images.top.caption}
              className="rounded-2xl"
            />
          </ParallaxItem>

          {/* Overlapping Bottom Frame */}
          <ParallaxItem
            distance={-70}
            className="absolute -bottom-10 sm:-bottom-12 -left-4 sm:left-4 w-[52%] max-w-[280px] z-10"
          >
            <MediaFrame
              src={MANIFESTO.images.bottom.src}
              alt={MANIFESTO.images.bottom.alt}
              ratio="1 / 1"
              parallax={8}
              tint="linear-gradient(160deg, rgba(230,100,40,0.55), rgba(2,91,134,0.35))"
              caption={MANIFESTO.images.bottom.caption}
              className="rounded-2xl shadow-2xl border border-white/20"
            />
          </ParallaxItem>

          {/* Rotating Flower Mark (EFFECT-19) */}
          <motion.img
            src={MEDIA.flower}
            alt=""
            aria-hidden
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-6 md:-right-10 size-24 md:size-32 pointer-events-none opacity-40 z-20"
          />
        </div>
      </div>
    </section>
  );
}
