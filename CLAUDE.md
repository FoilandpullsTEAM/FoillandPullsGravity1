# Architectural Contract for AI Agents

This repository implements a high-fidelity, pixel-exact landing site for ProGravity. Follow these architectural and maintenance rules strictly when working on this codebase.

## 1. Content & Asset Separation Rules (SETUP-CONTENT)

1. **No component may contain a visible string.**
   Every string displayed in the UI must be read directly from `src/lib/content.ts`. Never inline text, headings, button labels, descriptions, or copy into component templates. Render only keys defined in `content.ts`.

2. **No component may contain an asset URL or path.**
   All image and media URLs must be sourced through the exported `MEDIA` object in `src/lib/content.ts`. The single exception is the `PILL_MASK` data URI in `src/lib/assets.ts` (consumed via `mask-image`, as Chrome silently drops cross-origin SVG masks). Never inline URLs or hardcoded asset paths in components.

3. **`HeroDesktop` and `HeroMobile` share zero duplicated content.**
   The desktop and mobile hero variants remain two separate mounted trees (controlled via CSS breakpoints) to preserve design-pixel container queries without hydration mismatch. However, both components read all copy and asset references exclusively from `HERO` and `MEDIA`. Duplicating a string or asset across both files is prohibited.

4. **No hex colour outside the `@theme` block.**
   Never write hex color codes (`#xxxxxx`) directly in TSX files or component classNames. All palette tokens must be declared in `@theme` inside `src/index.css` (or `globals.css`) and consumed through standard Tailwind utility classes or `var(--color-*)`.

## 2. Backdrop Wiring Rules (SETUP-BACKDROP)

1. **Exactly one `<SectionBackdrop>` per section with a background.**
   `<SectionBackdrop>` is the single source of truth for section backdrops. It is the only place a `<video>`, full-bleed background `<img>`, veil `<div>`, `.grain`, or vignette may appear. In this build, exactly three instances exist:
   - `HeroDesktop` (`BACKGROUNDS.hero`)
   - `HeroMobile` (`BACKGROUNDS.heroMobile`)
   - The body sections wrapper in `src/App.tsx` (`BACKGROUNDS.body`)
   Each carries `className="-z-10"`.

2. **Hero artboard decorations are NOT backdrop layers.**
   The three halos and the two ground marks in the Hero are positioned artboard layers requiring negative-inset bleed containers and exact design-pixel (`dw`, `mw`, `dpx`, `dpy`) coordinates. They must remain in the SECTION-03 DOM skeleton, referencing only their URLs from `MEDIA`. Coordinates represent structural design, not interchangeable content.

3. **External components do not directly control `<video>`.**
   If a section ever syncs with video progress, it passes the `onProgress` callback; if it needs to seek or inspect duration, it passes the `control` ref. Logic must never attempt to inspect or manipulate background video elements directly.

Copy this file to CLAUDE.md as well.
