import { useContent } from "@/lib/ContentContext";

type LogoProps = {
  compact?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Logo({ compact = false, className = "", onClick }: LogoProps) {
  const { content } = useContent();
  const brand = content.hero.brand;
  const logomark = content.media.logomark;

  return (
    <a href="#home" onClick={onClick} className={`group flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className="relative flex items-center justify-center shrink-0 size-8 sm:size-9 overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        <img
          src={logomark}
          alt=""
          className="size-full object-contain"
        />
      </span>
      {compact ? null : (
        <span className="font-normalidad text-[12px] uppercase leading-[1.4] tracking-[0.08em] text-white">
          {brand}
        </span>
      )}
      <span className="sr-only">{brand}</span>
    </a>
  );
}
