import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Lightbox } from "@/components/ui/Lightbox";
import { GALLERY } from "@/lib/content";

const SHAPE_CONFIG = {
  tall: { ratio: "3 / 5", drift: 16 },
  wide: { ratio: "16 / 10", drift: 8 },
  normal: { ratio: "1 / 1", drift: 12 },
};

export function Gallery() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          kicker={GALLERY.kicker}
          title={GALLERY.title}
          lead={GALLERY.lead}
          align="center"
        />

        {/* CSS Masonry Grid (EFFECT-14) */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.items.map((item, index) => {
            const config = SHAPE_CONFIG[item.shape];
            return (
              <div key={item.id} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MediaFrame
                    src={item.src}
                    alt={item.title}
                    ratio={config.ratio}
                    parallax={config.drift}
                    caption={item.title}
                    className="w-full"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activeLightboxIndex !== null ? (
        <Lightbox
          items={GALLERY.items}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onNavigate={(index) => setActiveLightboxIndex(index)}
        />
      ) : null}
    </section>
  );
}
