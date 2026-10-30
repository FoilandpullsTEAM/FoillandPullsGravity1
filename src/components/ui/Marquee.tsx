import type { CSSProperties } from "react";

type MarqueeProps = {
  items: readonly string[];
  separator?: string;
  duration?: number;
  direction?: "left" | "right";
  className?: string;
  itemClassName?: string;
};

export function Marquee({
  items,
  separator = "✦",
  duration = 40,
  direction = "left",
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  // Duplicado exacto para costura perfecta en bucle
  const duplicated = [...items, ...items];

  return (
    <div className={`marquee overflow-hidden select-none ${className}`}>
      <div
        className="marquee-track"
        data-direction={direction}
        style={
          {
            "--marquee-duration": `${duration}s`,
          } as CSSProperties
        }
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center shrink-0 whitespace-nowrap"
          >
            <span className={itemClassName}>{item}</span>
            <span aria-hidden className="mx-6 text-white/30 shrink-0">
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
