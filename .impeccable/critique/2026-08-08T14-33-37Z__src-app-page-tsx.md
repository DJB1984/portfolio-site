---
target: home page (mobile focus)
total_score: 18
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-08T14-33-37Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a3c8985ae4e7ad28d · B: aca07217a6b4cf640)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hover/glow states are consistent; status pills and glow-dots communicate state well. |
| 2 | Match System / Real World | 3 | Copy is specific and human; undercut by "Storybook" reading as a real project and dead-ending. |
| 3 | User Control and Freedom | 3 | Standard nav, nothing traps the user; no real "undo" needs on a static portfolio. |
| 4 | Consistency and Standards | 2 | Same project (Regression Reader) shown 3 different ways; primary buttons drift below DESIGN.md's own spec. |
| 5 | Error Prevention | 2 | Nothing stopped a zero-content project from shipping a live-looking link at full weight. |
| 6 | Recognition Rather Than Recall | 3 | Mono "coordinate" labels and consistent iconography aid scanning. |
| 7 | Flexibility and Efficiency | n/a | Not applicable to a Persuade/Experience portfolio surface. |
| 8 | Aesthetic and Minimalist Design | 2 | Token discipline is strong, but a broken-looking placeholder card and uncompressed mobile spacing hurt the "every element earns its place" bar. |
| 9 | Error Recovery | n/a | No error/input states exist on this static page. |
| 10 | Help and Documentation | n/a | Not applicable to a Persuade/Experience portfolio surface. |
| **Total** | | **18/28** | **Acceptable (64%)** |

## Design Specificity Verdict

**LLM assessment:** The token system does not read as generic-AI-portfolio — Void is a genuine space-blue (never `#000`), Starlight is used sparingly, the mono "coordinate" labels tie the availability badge, status pills, and "Currently live" list into one consistent visual language, and the copy is specific ("a dual focus in cybersecurity and AI with a minor in the Bible," the Tektonux regression-testing origin story). That specificity lives almost entirely in **tokens and copy**, though — the page *structure* (hero+CTA → narrative → project grid → skill chips → status list → CTA band) is a standard dev-portfolio skeleton with nothing bespoke in the arrangement itself. And the biggest specificity failure works directly against the brand: a flat gray placeholder box on the flagship project card is the most template-y, unfinished-looking thing on the page, sitting exactly where the design system is supposed to be proving "real work, not done alone."

**Deterministic scan:** `detect.mjs` ran clean against `page.tsx` and every directly-used component (exit code 2, one finding): `project-card.tsx:28` — the status-pill font-size (`0.7rem`) is off the DESIGN.md type ramp. No other rule violations across page.tsx, project-list.tsx, image-slot.tsx, button-link.tsx, section-label.tsx, tag.tsx, availability-badge.tsx, skill-list.tsx, or site.ts. A manual grep pass for hardcoded hex/rgb/pixel values that bypass the token system also came back clean — the token discipline CLAUDE.md requires is actually being followed.

**Visual overlays:** Not available. No browser automation tool is exposed in this session, so no live-page injection or overlay was attempted — this is a code-level review, not a rendered-screenshot review. Treat the mobile findings below as reasoned from the actual Tailwind classes/breakpoints rather than observed pixels.

## Overall Impression

The bones are good — the deep-space token system is disciplined and specific, and the detector/grep passes confirm it's implemented cleanly, not just described in DESIGN.md. The mobile-readiness problem isn't the design language; it's two data/content gaps that undercut it: a real screenshot sitting unused in `public/uploads/` while its card shows a broken-looking gray box, and a zero-content "Storybook" entry linked at full weight next to real work. Both are inexpensive to fix and both directly damage the "proof over claims" positioning on a mobile scroll, where there's no second card in view to balance the first bad impression.

## What's Working

1. **The card's whole-card-click pattern is correctly built.** `project-card.tsx`'s stretched-title link with independently `z-10`-lifted footer links is a non-trivial pattern most portfolio templates get wrong — DESIGN.md's "the whole card is the target" spec is genuinely implemented, not just claimed.
2. **Mobile hero restraint.** `md:min-h-[78vh]` is correctly scoped to desktop only (`page.tsx:26`) — nothing forces an oversized hero on a short mobile viewport.
3. **Token fidelity holds up under a mechanical scan.** Zero hardcoded colors, one minor font-scale drift across nine files — the "reference tokens, don't hardcode" rule in CLAUDE.md is actually being followed in practice.

## Priority Issues

**[P0] Flagship project card renders as a broken-looking placeholder, and the real screenshot is already in the repo unused**
**Why it matters**: `src/data/site.ts:230` sets Regression Reader's `cover.src` to `null`, and because the mobile grid is single-column (`page.tsx:114`), this card renders first, full-width, ~210px of gray `bg-surface` + broken-image glyph (`image-slot.tsx:33-57`). This is the first "proof of work" a recruiter scrolls to on the flagship, most-real-world-grounded project — and it looks unfinished. `public/uploads/project-regression-reader-cover-43411b24.png` (a real, on-brand screenshot with a note bubble open) already exists in the repo and simply isn't wired in.
**Fix**: Point `cover.src` at the existing screenshot. This is a one-line data change, not new content work.
**Suggested command**: `/impeccable harden` (or just the direct data edit — no design work needed).

**[P1] Primary CTA buttons sit under the ~44px minimum touch target**
**Why it matters**: `.ds-btn` in `globals.css:192-196` computes to ~37.4px tall (`padding: 0.7rem 1.35rem` + `font-size: 0.9375rem` at `line-height: 1`) — below Apple's 44pt / Material's 48dp guidance. This hits "View the projects," "Get in touch," and the Contact CTA band buttons: the most consequential taps on the page. DESIGN.md's own component spec (`padding: "12px 22px"` on a 1rem/1.6-line-height body) would produce a compliant ~48px button — the implementation drifted from the written spec via a hard-pinned `line-height: 1`.
**Fix**: Restore `line-height` to something closer to the body token (or add explicit `min-height: 44px`) on `.ds-btn`.
**Suggested command**: `/impeccable audit` or `/impeccable polish`.

**[P1] "Storybook" placeholder is linked at full visual weight next to real work, and dead-ends**
**Why it matters**: `site.ts:331-349` is a zero-content entry (no summary, no tags, no image, no source link, "Details coming soon") surfaced via `ProjectList` (`page.tsx:90-95`) with identical typographic weight to Regression Reader. A recruiter or lay visitor taps expecting a second real story and lands on a page that also just says "Details coming soon" — a dead end that violates the site's own "honest signal" principle.
**Fix**: Either omit the Storybook row until it has real content, or visually demote it — muted/non-link title, an explicit "In progress" mono tag (the data already has `status: "in-progress"`; `ProjectList` just doesn't render it), no implied destination.
**Suggested command**: `/impeccable clarify`.

**[P2] Mobile vertical rhythm doesn't compress per DESIGN.md's own spec**
**Why it matters**: DESIGN.md's Layout section calls for "the same rhythm compressed one step" on mobile, but every section uses unconditional `py-20` (`page.tsx:59, 99, 124, 137, 165`) with no `sm:` step-down, and "Built along the way" adds another `mt-14 pt-10` on top. On a viewport that's often under 850px tall, two adjacent sections alone consume ~160px of near-empty space before the "Built along the way" content even starts — a distracted mobile visitor scrolls a lot relative to what they read.
**Fix**: Step vertical section padding down on mobile (e.g. `py-14 sm:py-20`) as DESIGN.md specifies.
**Suggested command**: `/impeccable layout`.

**[P2] The same project appears in three visually disconnected registers on one page**
**Why it matters**: Regression Reader appears as a bare text row in "Built along the way," a full illustrated card in "Selected projects," and a small dot+text link in "Currently live" (`page.tsx:90-95, 114-120, 145-160`) — nothing visually cross-references these as the same project. On mobile, where only one section is visible at a time, this reads as three separate things rather than one project told three ways (a Nielsen consistency/recognition issue).
**Fix**: Low-cost option: no change needed if this is intentional editorial variety, but consider a shared small visual tag (icon, dot color) that repeats across all three mentions so a returning eye recognizes it.
**Suggested command**: `/impeccable layout` (bundle with the rhythm fix above).

## Persona Red Flags

**Casey (Distracted Mobile User)**: The under-44px CTA buttons are exactly the kind of thing a thumb on the move mis-taps. The gray placeholder box on the first project card reads like a loading failure on a slow connection — Casey's default assumption for a broken-looking image is "this site is broken," not "the design is intentional," and she's gone before scrolling further. The uncompressed `py-20` rhythm also means more one-handed scrolling to reach the actual projects and contact CTA than the content volume justifies.

**Jordan (Confused First-Timer / recruiter unfamiliar with the celestial theme)**: Taps "Storybook" expecting a second real story (it's presented with identical weight to Regression Reader) and lands on "Details coming soon" — an unexplained dead end with no indication it was ever going to be different. The small dot+text "Currently live" list mid-scroll has little visual weight, so Jordan may not clock that these are real, working apps distinct from the cards above.

**Riley (Deliberate Stress Tester)**: The Storybook link is precisely the "feature that appears to work but silently fails" pattern Riley flags — it's a real, clickable, styled link that leads nowhere useful. The gray placeholder card is also an inconsistency Riley would document: the design system promises photographic proof of work, a real screenshot exists in the repo, and the card ships without it anyway.

## Minor Observations

- Card footer "Live"/"Source" links (`project-card.tsx:68-93`) are `text-xs`, no padding, `gap-5` apart, sitting at the card's bottom edge — a thin tap target for the single most important shortcut for lay-user visitors (jump straight into the live app).
- Mobile nav toggle is 36×36px (`site-nav.tsx:69`, `h-9 w-9`) — under the 44px guideline, low severity as an isolated target.
- `priority={i === 0}` on the first project card (`page.tsx:117`) is currently wasted — it targets Regression Reader, whose null-cover branch never renders a Next `<Image>` at all. Fixing the P0 image issue makes this prop meaningful again.
- "Currently live" list items (`page.tsx:148-157`) have minimal vertical padding on their tap targets; low risk since items wrap with generous `gap-y-3`, but worth a pass alongside the nav toggle.
- Detector: `project-card.tsx:28` status-pill font-size (`0.7rem`) is off the DESIGN.md type ramp — advisory severity, bundle with any other polish pass on that component.

## Card Design Options — "Selected Projects"

The current `ProjectCard` (status pill, 16:10 cover, title+year, summary, tags, dual Live/Source links, whole-card click) correctly implements DESIGN.md's card spec, and the whole-card-link pattern is genuinely well-built. **Verdict: keep the structure, fix the data gap first.** The single highest-leverage change is wiring in the already-existing Regression Reader screenshot — that alone resolves the worst mobile impression on the page. The card's real weakness isn't its design, it's that it has no graceful answer for a missing cover image, which matters because that will happen again as new projects get added before their screenshots are ready.

If you want to explore beyond "fix and keep," four distinct directions (not just visual polish on the same shape):

1. **Coordinate card (image-optional, mono-led).** Drop the photographic band for the compact home-page card entirely. Lead with a mono "catalog" header in the star-chart voice (e.g. `REG-01 · TypeScript · Live`), then title, summary, tags, links. Zero dependency on having a screenshot, and it leans harder into the "charted point of light" metaphor than a photo does. Reserve full-bleed imagery for the project detail page, where you have more room and more images to show.
2. **Corner-thumbnail card.** Shrink the image to a small pinned square (~96–120px) in one corner instead of a full-width band. When no real image exists, swap in an intentionally-abstract glow/starfield graphic sized to that thumbnail slot — visually distinct from a "missing image" icon, so absence reads as a deliberate choice instead of an error state.
3. **Terminal/output card.** Reuse the waveform/output-trace treatment already built for the Logic Gate Simulator's story content as a small mono panel in place of a photo. Every project has code, so every project can have an authentic "output" snippet — no project is ever without something to show.
4. **Mobile-only expand-on-tap row.** Collapse to `ProjectList`-style single-line rows by default on mobile (title, status dot, arrow), with tap-to-expand revealing summary/tags/links/image. Treats the image as a bonus reveal rather than mandatory first-paint content, which makes the placeholder problem moot since nothing renders full-width unprompted.

My honest read: don't rebuild the card. The current one is well-crafted and matches spec — the bug is a data gap, not a design gap. Direction 2 (corner-thumbnail with an intentional abstract fallback) is the only one worth doing proactively, specifically as insurance for the next project that ships before its screenshot is ready.

## "Built Along the Way": Should It Use Image Cards?

**No, not under the current content — it would make the placeholder problem worse, not better.** Storybook currently has zero content (no summary, tags, image, or links; `site.ts:331-349`). Switching to image cards would put a second empty placeholder panel directly next to Regression Reader's, right after the Tektonux narrative that's supposed to be establishing "real, current, professional engineering evidence." That's the opposite of the engagement bump you're after.

The plain text-row list (`ProjectList`) is the right call *while* Storybook is empty. To actually improve engagement here without adding a placeholder risk:
1. Fix the P1 issue above first — demote or hide Storybook until it has real content, so this section only ever shows things that are actually ready to be looked at.
2. Once Storybook has a real screenshot and summary, revisit with the corner-thumbnail direction (option 2 above) rather than a full `ProjectCard` — it's lighter-weight, fits a two-item list better than a full illustrated card would, and it's the same fallback-safe pattern recommended for the main grid, so you're not maintaining two different "no image yet" treatments.
