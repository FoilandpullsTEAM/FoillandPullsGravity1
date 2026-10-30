import { useEffect, useRef, type MutableRefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * El fondo de una sección, entero, en un solo lugar.
 *
 * Todo lo que pinta detrás del contenido —bitmaps, video, degradados, velos,
 * grano, viñeta— entra acá como una lista de capas. Fuera de este componente
 * no puede existir un `<video>` de fondo, un `<img>` a sangre, un velo de
 * gradiente ni la clase `.grain`: esa es la regla que evita que al cambiar un
 * fondo queden capas huérfanas pintando por debajo.
 *
 * El orden del array es el orden de pintado: la primera capa es la de más
 * atrás. Para sacar una capa se borra su línea en `BACKGROUNDS`.
 *
 * Solo se monta la rama del `type` activo. Cambiar `{ type: "video" }` por
 * `{ type: "image" }` no esconde el video: lo desmonta, y con él se va su
 * lógica de reproducción. No hay handlers sobrevivientes.
 */

type Common = {
  /** Opacidad de la capa, 0–1. */
  opacity?: number;
  /** `mix-blend-mode` CSS: "color-dodge", "overlay", "screen"… */
  blend?: string;
  /**
   * Recorrido vertical con el scroll, en píxeles, de 0 (sección arriba del
   * todo) al final de su salida. Positivo = la capa baja al scrollear.
   */
  parallax?: number;
};

export type Layer =
  | ({ type: "color"; value: string } & Common)
  | ({ type: "gradient"; value: string } & Common)
  | ({
      type: "image";
      src: string;
      /** `object-fit`. "fill" estira el bitmap; el diseño a veces lo pide. */
      fit?: "cover" | "contain" | "fill";
      /** `object-position`: "center", "bottom", "50% 20%"… */
      position?: string;
      /** Alto/ancho de la capa. Por defecto cubre el marco exacto. */
      height?: string;
      width?: string;
      /**
       * Sobremedida por cada borde, en %. `bleed: "8%"` deja la capa 8% más
       * afuera por lado (y 116% de tamaño), que es lo que da recorrido al
       * paralaje y evita bordes blancos al mover la capa.
       */
      bleed?: string;
    } & Common)
  | ({
      type: "video";
      src: string;
      poster: string;
      /**
       * "loop": reproduce en bucle · "once": una sola pasada ·
       * "scrub": el scroll de la sección maneja el `currentTime`.
       */
      mode: "loop" | "once" | "scrub";
      /** Escala del bitmap; 1.04 evita bordes al mover la capa. */
      scale?: number;
    } & Common)
  | ({
      type: "veil";
      /** Un color o un degradado CSS completo. */
      value: string;
      /** Aplica el velo solo desde este breakpoint hacia arriba. */
      from?: "sm" | "md" | "lg";
      /** Aplica el velo solo por debajo de este breakpoint. */
      until?: "sm" | "md" | "lg";
    } & Common)
  | { type: "grain"; opacity?: number }
  | { type: "vignette"; intensity?: number };

export type BackdropProgress = {
  time: number;
  duration: number;
  progress: number;
};

/**
 * Mando del video, para la sección que necesita moverlo (un rail de capítulos,
 * un botón de "saltar a…"). Queda en `null` mientras no haya capa de video: el
 * consumidor tiene que seguir funcionando con eso.
 */
export type BackdropControl = {
  seek: (time: number) => void;
  duration: number;
} | null;

type Props = {
  layers: Layer[];
  className?: string;
  /**
   * Puente de salida: lo usa una sección que sincroniza algo de su UI con el
   * video de fondo. Si no hay capa de video, no se llama nunca — el consumidor
   * tiene que funcionar igual con su valor por defecto.
   */
  onProgress?: (p: BackdropProgress) => void;
  /**
   * Puente de entrada. Es la contraparte de `onProgress`: deja mover el video
   * desde afuera sin sacar su lógica de acá.
   */
  control?: MutableRefObject<BackdropControl>;
};

/* Mismo encuadre de scroll que usaban los heroes antes de centralizarse:
   de "la sección toca el borde superior" a "la sección terminó de salir". */
const SCROLL_OFFSET = ["start start", "end start"] as const;

export function SectionBackdrop({ layers, className = "", onProgress, control }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: host,
    offset: SCROLL_OFFSET as unknown as ["start start", "end start"],
  });

  return (
    <div
      ref={host}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {layers.map((layer, i) => (
        <LayerNode
          key={`${layer.type}-${i}`}
          layer={layer}
          progress={scrollYProgress}
          reduce={reduce}
          onProgress={onProgress}
          control={control}
        />
      ))}
    </div>
  );
}

type NodeProps = {
  layer: Layer;
  progress: MotionValue<number>;
  reduce: boolean;
  onProgress?: (p: BackdropProgress) => void;
  control?: MutableRefObject<BackdropControl>;
};

function LayerNode({ layer, progress, reduce, onProgress, control }: NodeProps) {
  switch (layer.type) {
    case "color":
      return <FlatLayer layer={layer} progress={progress} reduce={reduce} background={layer.value} />;
    case "gradient":
      return <FlatLayer layer={layer} progress={progress} reduce={reduce} background={layer.value} />;
    case "image":
      return <ImageLayer layer={layer} progress={progress} reduce={reduce} />;
    case "video":
      return (
        <VideoLayer
          layer={layer}
          progress={progress}
          reduce={reduce}
          onProgress={onProgress}
          control={control}
        />
      );
    case "veil":
      return <VeilLayer layer={layer} progress={progress} reduce={reduce} />;
    case "grain":
      return <GrainLayer opacity={layer.opacity} />;
    case "vignette":
      return <VignetteLayer intensity={layer.intensity} />;
  }
}

/** Recorrido de paralaje de una capa, o `undefined` si no tiene. */
function useParallax(progress: MotionValue<number>, distance: number | undefined, reduce: boolean) {
  const y = useTransform(progress, [0, 1], [0, distance ?? 0]);
  return reduce || !distance ? undefined : y;
}

function FlatLayer({
  layer,
  progress,
  reduce,
  background,
}: {
  layer: Extract<Layer, { type: "color" | "gradient" }>;
  progress: MotionValue<number>;
  reduce: boolean;
  background: string;
}) {
  const y = useParallax(progress, layer.parallax, reduce);
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background,
        opacity: layer.opacity,
        mixBlendMode: layer.blend as never,
        ...(y ? { y } : null),
      }}
    />
  );
}

function ImageLayer({
  layer,
  progress,
  reduce,
}: {
  layer: Extract<Layer, { type: "image" }>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useParallax(progress, layer.parallax, reduce);

  /* `bleed: "8%"` = 8% afuera por lado, o sea 116% de tamaño. Se deriva acá
     para que la capa tenga una sola perilla y no tres que puedan discordar. */
  const bleed = layer.bleed ? parseFloat(layer.bleed) : 0;
  const spread = bleed ? `${100 + bleed * 2}%` : undefined;

  return (
    <motion.img
      src={layer.src}
      alt=""
      className="absolute"
      style={{
        inset: bleed ? `-${bleed}%` : 0,
        height: layer.height ?? spread ?? "100%",
        width: layer.width ?? spread ?? "100%",
        objectFit: layer.fit ?? "cover",
        objectPosition: layer.position,
        opacity: layer.opacity,
        mixBlendMode: layer.blend as never,
        ...(y ? { y } : null),
      }}
    />
  );
}

function VideoLayer({
  layer,
  progress,
  reduce,
  onProgress,
  control,
}: {
  layer: Extract<Layer, { type: "video" }>;
  progress: MotionValue<number>;
  reduce: boolean;
  onProgress?: (p: BackdropProgress) => void;
  control?: MutableRefObject<BackdropControl>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const y = useParallax(progress, layer.parallax, reduce);

  /* Toda la lógica del video vive acá adentro. Si esta capa deja de estar en
     `BACKGROUNDS`, el componente no se monta y esto no existe: no quedan
     listeners colgados ni un rAF girando sobre un elemento que ya no está. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduce) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    let frame = 0;

    const report = () => {
      if (!onProgress || !video.duration) return;
      onProgress({
        time: video.currentTime,
        duration: video.duration,
        progress: video.currentTime / video.duration,
      });
    };

    const tick = () => {
      report();
      frame = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      /* El mando solo existe mientras exista la capa de video. Si esta capa
         se saca de BACKGROUNDS, el consumidor ve `null` y sigue andando. */
      if (control) {
        control.current = {
          seek: (t: number) => {
            if (video.duration) video.currentTime = Math.max(0, Math.min(t, video.duration));
          },
          duration: video.duration,
        };
      }

      if (layer.mode === "scrub") {
        video.pause();
        seek();
      } else {
        void video.play().catch(() => {});
        frame = requestAnimationFrame(tick);
      }
    };

    /* Scrub: el progreso de scroll maneja el tiempo. La guarda `seeking` evita
       inundar el decoder con saltos que no llega a resolver. */
    const seek = () => {
      if (!video.duration || video.seeking) return;
      video.currentTime = progress.get() * video.duration;
      report();
    };

    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const stopScrub = layer.mode === "scrub" ? progress.on("change", seek) : undefined;

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      stopScrub?.();
      if (frame) cancelAnimationFrame(frame);
      if (control) control.current = null;
    };
  }, [layer.mode, progress, reduce, onProgress, control]);

  return (
    <motion.video
      ref={videoRef}
      src={layer.src}
      poster={layer.poster}
      muted
      playsInline
      preload="auto"
      autoPlay={layer.mode !== "scrub"}
      loop={layer.mode === "loop"}
      className="absolute inset-0 size-full object-cover"
      style={{
        scale: layer.scale,
        opacity: layer.opacity,
        mixBlendMode: layer.blend as never,
        ...(y ? { y } : null),
      }}
    />
  );
}

const FROM: Record<string, string> = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
};

const UNTIL: Record<string, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

function VeilLayer({
  layer,
  progress,
  reduce,
}: {
  layer: Extract<Layer, { type: "veil" }>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useParallax(progress, layer.parallax, reduce);
  return (
    <motion.div
      className={`absolute inset-0 ${layer.from ? FROM[layer.from] : ""} ${
        layer.until ? UNTIL[layer.until] : ""
      }`}
      style={{
        background: layer.value,
        opacity: layer.opacity,
        mixBlendMode: layer.blend as never,
        ...(y ? { y } : null),
      }}
    />
  );
}

/** Grano de película. Usa la utilidad `.grain` de `globals.css`. */
function GrainLayer({ opacity }: { opacity?: number }) {
  return <div className="grain absolute inset-0" style={{ opacity }} />;
}

function VignetteLayer({ intensity = 0.45 }: { intensity?: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${intensity}) 100%)`,
      }}
    />
  );
}
