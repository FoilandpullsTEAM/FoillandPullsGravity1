import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { CTA } from "@/components/ui/CTA";
import { CheckIcon } from "@/components/ui/Icons";
import { EASE, riseIn, stagger } from "@/lib/motion";
import { PLANS as DEFAULT_PLANS } from "@/lib/content";
import { useContent } from "@/lib/ContentContext";

export function Membership() {
  const { content } = useContent();
  const PLANS = {
    ...DEFAULT_PLANS,
    kicker: content.membership.kicker,
    title: content.membership.title,
    lead: content.membership.lead,
  };
  const reduce = useReducedMotion() ?? false;
  const [yearly, setYearly] = useState(false);

  return (
    <section id="membership" className="relative w-full py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          kicker={PLANS.kicker}
          title={PLANS.title}
          lead={PLANS.lead}
          align="center"
        />

        {/* Monthly / Yearly Switch (EFFECT-15) */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-[14px] font-medium transition-colors ${
              !yearly ? "text-white" : "text-white/60"
            }`}
          >
            Mensual
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Cambiar entre pago mensual y anual"
            onClick={() => setYearly(!yearly)}
            className="hairline relative flex h-9 w-[76px] cursor-pointer items-center rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
          >
            <motion.span
              layout={!reduce}
              transition={{ duration: 0.4, ease: EASE }}
              className={`size-7 rounded-full bg-white shadow-md ${
                yearly ? "ml-auto" : ""
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-[14px] font-medium transition-colors ${
                yearly ? "text-white" : "text-white/60"
              }`}
            >
              Anual
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
              {PLANS.discountBadge}
            </span>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <motion.div
          variants={stagger(reduce, 0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {PLANS.items.map((plan) => {
            const isFeatured = plan.featured;
            const price = yearly ? plan.yearly : plan.monthly;
            const period = yearly ? PLANS.periodYearly : PLANS.periodMonthly;

            return (
              <motion.div
                key={plan.id}
                variants={riseIn(reduce, 28, 0.9)}
                className={`relative flex flex-col justify-between rounded-3xl p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1 ${
                  isFeatured
                    ? "bg-white text-ink shadow-2xl"
                    : "glass text-white border border-white/20"
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && "badge" in plan ? (
                  <div className="absolute -top-3.5 right-8 rounded-full bg-ink px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    {plan.badge}
                  </div>
                ) : null}

                <div>
                  <h3
                    className={`font-normalidad text-[24px] uppercase tracking-wide mb-2 ${
                      isFeatured ? "text-ink" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-[14px] leading-relaxed mb-6 ${
                      isFeatured ? "text-ink/70" : "text-white/70"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price with FLIP / Motion animation (EFFECT-15) */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-[20px] font-bold">€</span>
                    <motion.span
                      key={yearly ? "y" : "m"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="font-normalidad text-[48px] md:text-[56px] leading-none"
                    >
                      {price}
                    </motion.span>
                    <span
                      className={`text-[14px] font-mono ${
                        isFeatured ? "text-ink/60" : "text-white/60"
                      }`}
                    >
                      {period}
                    </span>
                  </div>

                  {/* Perks list */}
                  <ul className="flex flex-col gap-3.5 mb-8 border-t pt-6 border-current/15">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-3 text-[14px]">
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                            isFeatured ? "bg-ink/10 text-ink" : "bg-white/20 text-white"
                          }`}
                        >
                          <CheckIcon className="size-3" />
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <CTA
                    href="#join"
                    variant={isFeatured ? "dark" : "ghost"}
                    compact
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </CTA>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
