import type { ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowElbowIcon } from "@/components/ui/Icons";

type CTAVariant = "solid" | "ghost" | "dark";

type CTAProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: CTAVariant;
  className?: string;
  compact?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function CTA({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  compact = false,
  type = "button",
  disabled = false,
}: CTAProps) {
  const isSolid = variant === "solid";
  const isGhost = variant === "ghost";
  const isDark = variant === "dark";

  const basePadding = compact
    ? "px-5 py-2.5 text-[13px]"
    : isGhost
    ? "pl-6 pr-2 py-2 text-[14px]"
    : "px-7 py-3.5 text-[14px]";

  const variantStyles = isSolid
    ? "bg-white text-deep hover:text-white"
    : isGhost
    ? "hairline bg-transparent text-white hover:text-white"
    : "bg-ink text-white hover:text-ink";

  const fillBg = isDark ? "bg-white" : "bg-deep";

  const content = (
    <span
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-[0.02em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${basePadding} ${variantStyles} ${className}`}
    >
      {/* Fill span that rises from bottom on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${fillBg}`}
      />

      <span className="relative z-10">{children}</span>

      {isGhost ? (
        <span
          aria-hidden
          className="relative z-10 flex size-[38px] shrink-0 items-center justify-center rounded-full border border-white/29 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 -rotate-90"
        >
          <ArrowElbowIcon className="size-4" />
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <Magnetic className="inline-block" strength={0.18}>
        <a href={href} className="inline-block" onClick={onClick}>
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic className="inline-block" strength={0.18}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-block disabled:opacity-50 disabled:pointer-events-none"
      >
        {content}
      </button>
    </Magnetic>
  );
}
