import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { curtain, curtainMedia } from "@/lib/motion";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  parallax?: number;
  tint?: string;
  caption?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function MediaFrame({
  src,
  alt,
  className = "",
  ratio = "4 / 5",
  parallax = 12,
  tint = "linear-gradient(160deg, rgba(2,91,134,0.55), rgba(255,120,60,0.35))",
  caption,
  priority = false,
  children,
}: MediaFrameProps) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const y = useSpring(raw, { stiffness: 110, damping: 30, mass: 0.4 });

  return (
    <motion.figure
      ref={ref}
      className={`group relative isolate overflow-hidden grain ${className}`}
      style={{ aspectRatio: ratio }}
      variants={curtain(reduce)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[14%]"
        style={reduce ? undefined : { y }}
        variants={curtainMedia(reduce)}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.07] group-focus-within:scale-[1.07] saturate-[1.05] group-hover:saturate-[1.25]"
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-color transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-within:opacity-0"
        style={{ backgroundImage: tint }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
      />

      {caption ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
          />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-[11px] uppercase tracking-[0.18em] text-white/0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:text-white group-focus-within:translate-y-0 group-focus-within:text-white">
            {caption}
          </figcaption>
        </>
      ) : null}

      {children}
    </motion.figure>
  );
}
