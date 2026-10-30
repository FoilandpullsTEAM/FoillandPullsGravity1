const R2_BASE =
  "https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/43-progravity/public";
const BASE = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_ASSET_BASE) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ASSET_BASE) ||
  R2_BASE
).replace(/\/+$/, "");

export const asset = (path: string) => `${BASE}${path}`;

/**
 * Máscara vectorial en formato data: URI para la sombra interior del anillo "O".
 * No se aloja en R2 porque Chrome descarta máscaras SVG cross-origin por seguridad.
 */
export const PILL_MASK =
  "data:image/svg+xml,%3Csvg preserveAspectRatio='none' overflow='visible' width='548.604' height='115.93' viewBox='0 0 548.604 115.93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10.5' y='10.5' width='527.604' height='94.9297' rx='44.5' stroke='white' stroke-width='21'/%3E%3C/svg%3E";
