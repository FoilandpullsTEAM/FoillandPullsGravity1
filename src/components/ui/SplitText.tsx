import { motion, useReducedMotion } from "framer-motion";
import { letterIn, stagger } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  by?: "letter" | "word";
  each?: number;
  as?: "h2" | "h3" | "p" | "span";
};

export function SplitText({
  text,
  className,
  by = "letter",
  each = 0.03,
  as = "h2",
}: SplitTextProps) {
  const reduce = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={stagger(reduce, each, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
            {by === "letter" ? (
              Array.from(word).map((letter, i) => (
                <span key={`${letter}-${i}`} className="inline-block overflow-hidden align-bottom">
                  <motion.span className="inline-block" variants={letterIn(reduce)}>
                    {letter}
                  </motion.span>
                </span>
              ))
            ) : (
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span className="inline-block" variants={letterIn(reduce)}>
                  {word}
                </motion.span>
              </span>
            )}
            {w < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
