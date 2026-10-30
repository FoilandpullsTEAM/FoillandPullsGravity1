import { motion, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { riseIn } from "@/lib/motion";

type SectionHeadProps = {
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
};

export function SectionHead({
  kicker,
  title,
  lead,
  align = "left",
  className = "",
  children,
}: SectionHeadProps) {
  const reduce = useReducedMotion() ?? false;
  const isCenter = align === "center";

  return (
    <div
      className={`relative mb-12 md:mb-16 ${
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
      } ${className}`}
    >
      <motion.p
        variants={riseIn(reduce, 16, 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="text-[12px] uppercase tracking-[0.2em] text-white/50 mb-3 font-semibold"
      >
        {kicker}
      </motion.p>

      <SplitText
        text={title}
        as="h2"
        by="letter"
        each={0.024}
        className="font-normalidad text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] uppercase leading-[1.05] tracking-[-0.03em] text-white"
      />

      {lead ? (
        <motion.p
          variants={riseIn(reduce, 20, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="mt-5 text-[15px] md:text-[17px] leading-[1.6] text-white/70"
        >
          {lead}
        </motion.p>
      ) : null}

      {children}
    </div>
  );
}
