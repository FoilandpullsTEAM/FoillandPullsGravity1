import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import {
  ArrowLeftIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
} from "@/components/ui/Icons";
import { useScrolled } from "@/lib/hooks";
import { riseIn, stagger } from "@/lib/motion";
import { FOOTER_LINKS as DEFAULT_FOOTER_LINKS, SOCIALS } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

export function Footer() {
  const { content } = useContent();
  const FOOTER_LINKS = {
    ...DEFAULT_FOOTER_LINKS,
    ...content.footer,
  };
  const reduce = useReducedMotion() ?? false;
  const showBackToTop = useScrolled(600);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative w-full pt-24 pb-12 px-6 lg:px-12 border-t border-white/15 overflow-hidden">
      {/* Giant Low-Opacity Wordmark Behind Content */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-normalidad text-white/12 select-none uppercase tracking-tighter"
        style={{ fontSize: "min(10.6vw, 13rem)", lineHeight: 1 }}
      >
        {FOOTER_LINKS.wordmark}
      </div>

      <div className="mx-auto max-w-[1440px] relative z-10">
        <motion.div
          variants={stagger(reduce, 0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16"
        >
          {/* Brand & Socials Column */}
          <motion.div
            variants={riseIn(reduce, 20, 0.8)}
            className="lg:col-span-4 flex flex-col items-start gap-4"
          >
            <Logo />
            <p className="text-[14px] leading-relaxed text-white/60 max-w-sm">
              {FOOTER_LINKS.description}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.name}
                  className="flex size-[38px] items-center justify-center rounded-full border border-white/29 text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-deep"
                >
                  {soc.name === "Instagram" && <InstagramIcon className="size-4" />}
                  {soc.name === "YouTube" && <YoutubeIcon className="size-4" />}
                  {soc.name === "X" && <XIcon className="size-4" />}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.columns.map((col) => (
              <motion.div
                key={col.title}
                variants={riseIn(reduce, 20, 0.8)}
                className="flex flex-col"
              >
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="link-underline text-[14px] text-white/80 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
          <p>{FOOTER_LINKS.copyright}</p>
          <p className="text-center md:text-right">{FOOTER_LINKS.credit}</p>
        </div>
      </div>

      {/* Back-to-Top Floating Button (EFFECT-19) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className={`fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full border border-white/30 bg-[rgba(2,91,134,0.6)] text-white backdrop-blur-md shadow-lg transition-all duration-500 hover:bg-white hover:text-deep ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <span className="rotate-90">
          <ArrowLeftIcon className="size-5" />
        </span>
      </button>
    </footer>
  );
}
