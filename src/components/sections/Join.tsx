import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { CTA } from "@/components/ui/CTA";
import { CheckIcon } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { JOIN as DEFAULT_JOIN, MEDIA as DEFAULT_MEDIA } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "error" | "sending" | "done";

export function Join() {
  const { content } = useContent();
  const JOIN = content.join;
  const MEDIA = content.media;
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Parallax silhouette on right edge (EFFECT-03 / media parallax)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const silhouetteRaw = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const silhouetteY = useSpring(silhouetteRaw, { stiffness: 90, damping: 25 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }

    setStatus("sending");
    setSubmittedEmail(trimmed);
    window.setTimeout(() => {
      setStatus("done");
    }, 700);
  };

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Dancer Silhouette on Desktop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 hidden md:block w-[550px] opacity-25"
        style={reduce ? undefined : { y: silhouetteY }}
      >
        <img
          src={MEDIA.dancer}
          alt=""
          className="w-full object-contain object-right-bottom dancer-silhouette"
        />
      </motion.div>

      <div className="mx-auto max-w-[1440px] relative z-10">
        <div className="max-w-2xl">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[12px] font-semibold uppercase tracking-wider text-white mb-6">
            <span>✦</span>
            <span>{JOIN.pill}</span>
          </div>

          {/* Two stacked SplitText headlines (EFFECT-04) */}
          <div className="mb-8">
            <SplitText
              text={JOIN.titlePart1}
              as="h2"
              by="letter"
              each={0.024}
              className="font-normalidad text-[3rem] sm:text-[4.2rem] md:text-[5.5rem] uppercase leading-[0.95] tracking-tight text-white"
            />
            <SplitText
              text={JOIN.titlePart2}
              as="h2"
              by="letter"
              each={0.024}
              className="font-normalidad text-[3rem] sm:text-[4.2rem] md:text-[5.5rem] uppercase leading-[0.95] tracking-tight text-white/45"
            />
          </div>

          {/* Form State Machine (EFFECT-16) */}
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="glass flex items-start gap-4 rounded-3xl p-6 md:p-8"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-deep shadow-md">
                    <CheckIcon className="size-5" />
                  </div>
                  <div className="text-white">
                    <p className="text-[16px] md:text-[18px] leading-relaxed">
                      {JOIN.successEcho}{" "}
                      <strong className="underline underline-offset-4 font-bold">
                        {submittedEmail}
                      </strong>{" "}
                      {JOIN.successSuffix}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3"
                  noValidate
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder={JOIN.inputPlaceholder}
                      aria-invalid={status === "error"}
                      aria-describedby="email-error"
                      disabled={status === "sending"}
                      className="hairline flex-1 rounded-full bg-white/10 px-6 py-3.5 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />

                    <CTA
                      type="submit"
                      disabled={status === "sending"}
                      variant="solid"
                    >
                      {status === "sending"
                        ? JOIN.buttonSending
                        : JOIN.buttonSubmit}
                    </CTA>
                  </div>

                  {/* Inline Validation Error: always in DOM to prevent layout shifts */}
                  <p
                    id="email-error"
                    role={status === "error" ? "alert" : undefined}
                    className={`text-[13px] text-white/90 pl-4 font-medium transition-opacity duration-300 ${
                      status === "error" ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {JOIN.errorValidation}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
