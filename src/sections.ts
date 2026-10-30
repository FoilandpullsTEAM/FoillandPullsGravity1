import type { ComponentType } from "react";
import { Hero } from "@/components/hero/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Manifesto } from "@/components/sections/Manifesto";
import { Classes } from "@/components/sections/Classes";
import { Instructors } from "@/components/sections/Instructors";
import { Gallery } from "@/components/sections/Gallery";
import { Community } from "@/components/sections/Community";
import { Membership } from "@/components/sections/Membership";
import { Join } from "@/components/sections/Join";
import { Footer } from "@/components/sections/Footer";

export type SectionEntry = {
  id: string;
  active: boolean;
  Component: ComponentType;
  /** Clave de `BACKGROUNDS` en content.ts, o null si no tiene fondo propio. */
  background: string | null;
  group?: "body";
};

export const SECTIONS: SectionEntry[] = [
  { id: "hero", active: true, Component: Hero, background: null },
  { id: "ticker", active: true, Component: Ticker, background: null, group: "body" },
  { id: "manifesto", active: true, Component: Manifesto, background: null, group: "body" },
  { id: "classes", active: true, Component: Classes, background: null, group: "body" },
  { id: "instructors", active: true, Component: Instructors, background: null, group: "body" },
  { id: "gallery", active: true, Component: Gallery, background: null, group: "body" },
  { id: "community", active: true, Component: Community, background: null, group: "body" },
  { id: "membership", active: true, Component: Membership, background: null, group: "body" },
  { id: "join", active: true, Component: Join, background: null, group: "body" },
  { id: "footer", active: true, Component: Footer, background: null, group: "body" },
];

/** Las secciones encendidas de un grupo, en orden. */
export const sectionsIn = (group?: "body") =>
  SECTIONS.filter((s) => s.active && s.group === group);
