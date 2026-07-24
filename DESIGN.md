---
name: Davis Brooks — Portfolio
description: A calm, focused deep-space portfolio where shipped work is charted like stars.
colors:
  void: "oklch(0.16 0.02 260)"
  surface: "oklch(0.20 0.02 260)"
  raised: "oklch(0.24 0.02 260)"
  line: "oklch(1 0 0 / 0.08)"
  line-strong: "oklch(1 0 0 / 0.14)"
  ink: "oklch(0.92 0.01 260)"
  muted: "oklch(0.60 0.02 260)"
  starlight: "oklch(0.75 0.14 250)"
  starlight-core: "oklch(0.56 0.12 250)"
  starlight-deep: "oklch(0.46 0.13 255)"
  nebula: "oklch(0.60 0.20 340)"
  ember: "oklch(0.72 0.16 55)"
  signal: "oklch(0.75 0.15 150)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.starlight-core}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: Davis Brooks — Portfolio

## Overview

**Creative North Star: "Celestial Navigation"**

The site is a quiet star chart of shipped work. Not a neon dashboard and not a black void with a single glowing button — a deep, deliberate field of space-blue where each project is a charted point of light you can navigate to. The register is that of an observatory or a star atlas: precise, calm, meticulously labelled, and confident enough to leave large stretches empty. The negative space *is* the void, and it does real work — it makes the few bright things unmistakable.

This world exists to serve two travellers at once. A recruiter should be able to scan the chart and immediately find the brightest points (the projects, the way to make contact) without hunting. A lay visitor should be pulled toward a single point of light and launched straight into a live app. Wayfinding is the whole point of celestial navigation, so nothing here may bury the work: hierarchy is loud even when the surface is quiet.

The mood is **calm and focused, precise, technically credible, and human** — a real builder's chart, not a corporate template. Personality lives in restraint and in a few authored details (the mono labelling, a faint starfield, one nebula accent used almost never), never in effects for their own sake. This is a `Persuade`-leaning `Experience`: the work leads, but the path to *act* (open the app, get in touch) is always visible.

**Explicit rejections (confirmed by the user):**
- Not generic or "AI-generated portfolio"-looking — no near-black + single neon accent + glowing edges.
- Not corporate or sterile — it must read as a specific person.
- Never flashy or gimmicky — motion and effects stay subordinate to the work.
- Never buries the work — projects and contact are always fast to find and reach.

**Key Characteristics:**
- Deep space-blue field (not black), lit by sparse starlight-blue accents.
- Restrained color: one accent voice, warm accents reserved for near-nothing.
- Monospace labelling as connective tissue — coordinates, metadata, section tags.
- Generous void; large type; a strong, scannable hierarchy.
- Calm, orchestrated motion; a faint ambient starfield, nothing that competes with reading.

## Colors

A deep-space-blue field where nearly everything is a near-neutral navy, and color appears as rare, intentional light. Values are canonical in OKLCH (preserved from the pinned Starfield asset).

### Primary
- **Starlight** (`oklch(0.75 0.14 250)`): The single accent voice. Links, active states, the bright edge of the primary button, focus rings, the one word in a headline that should glow. This is the brightest thing on most screens.
- **Starlight Core / Deep** (`oklch(0.56 0.12 250)` → `oklch(0.46 0.13 255)`): The vertical gradient of the primary button and other filled accent surfaces.

### Secondary
- **Nebula** (`oklch(0.60 0.20 340)`): A rare rose-magenta reserved for a single moment per page at most — a soft radial bloom behind a hero artifact, or one emphasized metric. Presence, not decoration.
- **Ember** (`oklch(0.72 0.16 55)`): A warm amber used even more rarely than Nebula (a "now / live" pulse, an availability dot). If Nebula is rare, Ember is almost never.

### Tertiary
- **Signal** (`oklch(0.75 0.15 150)`): Positive/status green for the occasional "live", "shipped", or success chip. Functional, not brand.

### Neutral
- **Void** (`void`, `oklch(0.16 0.02 260)`): The page ground — a deep, slightly-blue navy, never pure black.
- **Surface** (`surface`, `oklch(0.20 0.02 260)`): Cards, panels, inputs — one step up from the void.
- **Raised** (`raised`, `oklch(0.24 0.02 260)`): Hover/elevated surfaces, secondary buttons.
- **Ink** (`ink`, `oklch(0.92 0.01 260)`): Primary reading text — soft white, never `#fff` for body.
- **Muted** (`muted`, `oklch(0.60 0.02 260)`): Secondary text, captions, mono metadata.
- **Line** (`line`, `oklch(1 0 0 / 0.08)`) / **Line Strong** (`line-strong`, `oklch(1 0 0 / 0.14)`): Hairline separations built from low-alpha white, so edges read as caught light rather than drawn lines.

> Token keys above are the exact names used in `src/app/globals.css` (Tailwind v4 `@theme`) and as Tailwind utilities (`bg-void`, `text-ink`, `border-line`, `text-starlight`, …). Components reference these tokens only — never raw hex.

### Named Rules
**The One Voice Rule.** Starlight is the only accent that appears freely, and even it covers ≤10% of any screen. Its rarity is what makes it read as light.
**The Two-Sparks Rule.** Nebula and Ember never appear together in the same viewport, and each appears at most once. A page with two warm sparks has overspent.
**The Deep-Blue-Not-Black Rule.** The ground is always Void (space-blue), never `#000`. Pure black is the generic-dark-UI tell we are avoiding.

## Typography

**Display Font:** Schibsted Grotesk (fallback: ui-sans-serif, system-ui)
**Body Font:** Inter (fallback: ui-sans-serif, system-ui)
**Label / Mono Font:** JetBrains Mono (fallback: ui-monospace, monospace)

**Character:** A calm modern grotesque for headings gives the confident, precise voice; Inter keeps long-form reading effortless on a dark ground; JetBrains Mono carries the "instrument panel" texture — coordinates, section tags, and code — that makes a developer's chart feel authored rather than templated. (Schibsted Grotesk is a deliberate elevation of the pinned reference's Space Grotesk, chosen to avoid the over-shipped default; revertible on request.)

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 4.5rem)`, 1.05, `-0.02em`): The hero statement. One per page.
- **Headline** (600, `clamp(1.75rem, 3vw, 2.5rem)`, 1.1): Section openers.
- **Title** (600, `1.25rem`, 1.2): Card and project titles.
- **Body** (400, `1rem`, 1.6): Reading text; cap measure at 65–75ch.
- **Label** (500, `0.8125rem`, `+0.08em`, UPPERCASE, mono): Section tags, metadata, coordinates, eyebrow lines — the connective mono texture.

### Named Rules
**The Mono-Label Rule.** Every section is announced by a small uppercase mono label (a "coordinate"), not by a large word. The mono line orients; the display line states.

## Layout

A centered content column on a wide void. Max content width ~1100–1200px with generous gutters; the emptiness around the column is intentional, not wasted. Spacing follows the token scale (4 / 8 / 16 / 24 / 40 / 64 / 96), and vertical rhythm is loose — sections breathe with `2xl`–`3xl` gaps so the chart feels calm. More space sits above a heading than below it. Responsive: single column on mobile with the same rhythm compressed one step; project cards go full-width; the mono labels never wrap awkwardly. Density is low by default — this world would rather show less, larger.

## Elevation & Depth

Primarily **tonal layering**, not drop shadows: depth comes from stepping Void → Surface → Surface Raised and from low-alpha white borders reading as caught light. Shadows are used sparingly and only as *glow* (colored, diffuse) tied to accent elements, never as generic gray drop-shadows.

### Shadow Vocabulary
- **Accent Glow** (`box-shadow: 0 4px 14px oklch(0.5 0.13 255 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.15)`): Under the primary button and other Starlight-filled elements — makes them feel lit from within.
- **Nebula Bloom** (`radial-gradient(circle, oklch(0.60 0.20 340 / 0.15), transparent 70%)`): A soft background bloom behind at most one hero artifact per page. Atmosphere, not a component shadow.

### Named Rules
**The Flat-Until-Lit Rule.** Surfaces are flat and borderless-soft at rest. Depth appears as tonal step or accent glow, never as a gray box-shadow.

## Shapes

Rounded, calm geometry. Corners: `sm 8px` (chips, inputs, buttons), `lg 16px` (cards, panels), `full` (status dots, pills). Borders are hairline low-alpha white, not solid strokes. No hard edges, no heavy outlines; the silhouette language is "soft-cornered instrument panel." Recurring motif: the small glowing **dot** (a star / live indicator) — 6px, `full` radius, Starlight or Ember with a matching soft glow.

## Components

### Buttons
- **Shape:** Softly rounded (`md`, 12px).
- **Primary:** Vertical Starlight gradient (`starlight-core` → `starlight-deep`), white text, Accent Glow. The one clearly-lit action.
- **Secondary:** Surface Raised fill, soft text, Border Strong hairline.
- **Ghost / Link:** Transparent, Starlight text; underline-on-hover for inline links.
- **Hover / Focus:** Subtle lift (`translateY(-1px)`) and slightly intensified glow; focus-visible shows a Starlight ring (`0 0 0 3px oklch(0.55 0.18 255 / 0.25)`). Motion 150–200ms, standard easing.

### Cards / Containers (project cards are the signature surface)
- **Corner Style:** `lg` (16px).
- **Background:** Surface, on the Void ground.
- **Depth Strategy:** Tonal step + Border hairline at rest; on hover, border brightens to Border Strong and an optional faint Nebula/Starlight bloom appears in one corner. See Elevation.
- **Internal Padding:** `28px` (≈ `lg`+).
- **Behavior:** The whole card is the target; the live-app link is the primary action, source link secondary. A mono label carries the project's "coordinate" (e.g. tech tags / status).

### Inputs / Fields
- **Style:** Surface fill, Border hairline, `md` radius, Text color, mono or body as appropriate.
- **Focus:** Border shifts to Starlight and a soft Starlight ring appears (glow, not hard outline). Placeholder in Text Muted.

### Navigation
- **Style:** Minimal top bar over the Void — mono wordmark/name at left, a few text links at right in Body/Label. Default Text Muted, hover/active Starlight. Sticky and quiet; no heavy bar fill (subtle Void-to-transparent backdrop-blur allowed). Mobile collapses to a simple menu; contact stays reachable.

### Signature Component — The Starfield ("Living Star Chart")
A faint, low-density field of points behind the hero and page background — the literal "quiet trail of starlight." Progressive enhancement in two layers:
- **Base (always):** a static CSS field that works with no JS and under `prefers-reduced-motion` — extremely subtle, never distracting, always behind content.
- **Enhanced (motion welcome + canvas):** a Canvas 2D "Living Star Chart" — three depth layers with tiny cursor/scroll **parallax**, near-imperceptible **twinkle**, and a faint **constellation** whose bright anchor stars stand for the live projects (one anchor per featured project), set in the hero's upper-right negative space so it never sits under the hero text.

**The Calm-Enhancement Rule.** The living field must never read as flashy: parallax shift stays within a few pixels, twinkle amplitude stays low, it pauses when the tab is hidden, holds 60fps, and yields entirely to the static base under reduced motion. If it competes with reading, it has overstepped.

## Do's and Don'ts

### Do:
- **Do** keep the ground Void (`oklch(0.16 0.02 260)`), never `#000`.
- **Do** announce sections with a small uppercase mono label above the heading.
- **Do** keep Starlight to ≤10% of any screen and reserve Nebula/Ember for at most one moment per page.
- **Do** build depth from tonal steps and low-alpha white borders; use glow (colored) instead of gray drop-shadows.
- **Do** keep projects and contact reachable within one viewport-scan — the chart must guide, not hide.
- **Do** cap reading measure at 65–75ch and leave generous void between sections.
- **Do** disable the starfield and non-essential motion under `prefers-reduced-motion`, and keep AA contrast for all text on Void.

### Don't:
- **Don't** ship the near-black + single-neon-accent + glowing-edges look; that is the generic-AI tell we are avoiding.
- **Don't** let motion or the starfield compete with reading — no gratuitous parallax, autoplay, or hover fireworks.
- **Don't** use pure white (`#fff`) for body text; use Text (`oklch(0.92 0.01 260)`).
- **Don't** introduce a second free accent hue; Starlight is the only voice.
- **Don't** hardcode colors in components — reference these tokens (per CLAUDE.md).
- **Don't** crowd the surface; if a section feels dense, remove, don't shrink.
