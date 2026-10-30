export const DESKTOP_W = 1440;
export const DESKTOP_H = 810;
export const MOBILE_W = 440;
export const MOBILE_H = 956;

export const dw = (px: number) => `${(px / DESKTOP_W) * 100}cqw`;
export const mw = (px: number) => `${(px / MOBILE_W) * 100}cqw`;

export const dpx = (percent: number, offset = 0) =>
  dw((percent / 100) * DESKTOP_W + offset);
export const dpy = (percent: number, offset = 0) =>
  dw((percent / 100) * DESKTOP_H + offset);

export const mpx = (percent: number, offset = 0) =>
  mw((percent / 100) * MOBILE_W + offset);
export const mpy = (percent: number, offset = 0) =>
  mw((percent / 100) * MOBILE_H + offset);
