---
target: Regression Reader story page (/projects/regression-reader)
total_score: 17
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 3
timestamp: 2026-07-31T04-46-55Z
slug: src-app-projects-slug-page-tsx-regression-reader
---
Method: dual-agent (A: design-review sub-agent · B: detector + browser-evidence sub-agent), both isolated background sub-agents. Live copy changed mid-run (user actively editing via CMS); two time-sensitive findings were re-verified directly against current state before this report was written.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No scroll-progress cue across a 6-section, image-heavy narrative. |
| 2 | Match Between System & Real World | 3 | Voice is plain and specific where untouched; the live-edited intro has two spelling typos and one awkward unhyphenated phrase. |
| 3 | User Control and Freedom | 2 | No in-page way to jump between sections; "← All projects" only exists at the very top. |
| 4 | Consistency and Standards | 3 | Tokens/spacing/buttons are on-system throughout. |
| 5 | Error Prevention | 1 | The CMS override path has no diff/review step before going live — evidenced by a broken run-on sentence being live minutes before this critique, since fixed by the user. |
| 6 | Recognition Rather Than Recall | 3 | Consistent alternating layout, specific alt text throughout. |
| 7 | Flexibility and Efficiency | n/a | Not applicable to a linear narrative page. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong restraint; docked for the empty cover placeholder. |
| 9 | Error Recovery | n/a | No interactive error states on a static content page. |
| 10 | Help and Documentation | n/a | Not a need for this surface. |
| **Total** | | **17/28 (61%)** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment**: Passes cleanly. "Arrow Mode," "Summary Mode," GitLab's markdown viewer as the named villain, the orange/red/purple/green note colors, and the compare section's genuinely mundane real QA copy are unfakeable specifics. The closing line is a specific, checkable claim, not filler.

**Deterministic scan**: `detect.mjs --json` on `page.tsx` + `project-story.tsx` → exit 0, zero findings. Browser-injected overlay separately flagged `overused-font` (Inter, 54% of text — false positive in context, Inter is DESIGN.md's designated body font) and `em-dash-overuse` (10 em-dashes — real, worth a light pass).

**Visual overlays**: injection succeeded during Assessment B's run; the session and local server were already closed by the time it reported back, so no live tab is currently open.

## Overall Impression

Narrative structure and untouched sections are genuinely strong — specific, well-paced, and the before/after compare section is a legitimately excellent "proof over claims" moment. Held back right now by two structural gaps in the component (no landing CTA, no accessible section landmarks) plus rough edges in copy under active editing.

## What's Working

1. **The before/after compare section** — the same real test plan in GitLab's viewer vs. Regression Reader, captioned plainly. Needs no supporting argument.
2. **Alt text quality** — every story image has specific, non-generic alt text.
3. **Voice in the untouched sections** — reads as one specific person, not a template.

## Priority Issues

**[P1] No call-to-action after the story ends.**
Why it matters: the story closes on its strongest line, then drops straight into a plain "More projects" list with zero bridge. The reader most primed to click "Launch" has to scroll back roughly two story-lengths to find it.
Fix: add a compact CTA band mirroring the header's Launch/Source buttons between the closing text section and the "More projects" divider.
Suggested command: /impeccable layout

**[P1] Missing cover image.**
Why it matters: the largest element below the header is an empty placeholder box, on a page whose whole positioning is "real work, not done alone." Real screenshots already exist for this project.
Fix: promote one of the existing story images (or a crop) into the `cover` slot.
Suggested command: /impeccable polish

**[P1] Typos and one awkward phrase in the live intro paragraph.** (Downgraded from the sub-agent's original P0 — the paragraph was a broken run-on sentence when Assessment A/B ran; grammar was already fixed by the time of re-check.) Still live: "mentaly" (×2), "seperate", and "a user experienced focused software development company" (missing hyphens; also sits oddly next to the site's established framing of Tektonux as a "government-contracting company").
Fix: proofread pass on `content/content.json` → `project.regression-reader.story.0.body.0` and `.body.1`.
Suggested command: /impeccable clarify

**[P2] Zero accessible section landmarks.**
Why it matters: every story section renders body copy as a plain `<p>`, and `SectionLabel` itself renders a `<p>`, not a heading. Each section already carries a `label` in `site.ts` that is never rendered anywhere, visibly or otherwise. A screen-reader user navigating by heading sees exactly one heading on the whole page (the H1).
Fix: render each section's existing `label` as a visually-hidden (`sr-only`) `<h2>`.
Suggested command: /impeccable audit

**[P2] No in-page wayfinding on a long linear scroll.**
Why it matters: ironic given the product's pitch is "never lose your place in a long document" — the story page offers the reader none of that itself.
Fix: a slim scroll-progress rail, possibly styled after the product's own Arrow Mode indicator.
Suggested command: /impeccable delight

## Persona Red Flags

**Alex (impatient power user, recruiter proxy)**: Empty placeholder below the fold first. Hits two typos and one rough clause in the intro. Scrolls fast through real screenshots (works well). Hits the strong closing line, wants to click Launch immediately — no button there.

**Casey (distracted mobile user)**: Compare-section images stack cleanly at 390px. Zero progress indicator on a one-handed scroll through six sections; risk of abandoning before the payoff. Missing-CTA cost is worse here (more scroll distance).

**Sam (accessibility-dependent)**: Tabs past the H1 into a flat document — no further headings anywhere, so heading-list navigation offers nothing across six sections.

## Minor Observations

- Em-dash overuse (10, per detector) — worth a light pass, concentrated in earlier-drafted sections.
- Voice seam: the live-edited intro paragraphs read flatter/more enumerated than the rest of the page's voice.
- Testing-methodology note, not a page bug: a screenshot without an actual scroll-through can make the three lower story images appear blank (native image lazy-loading doesn't trigger on reduced-motion emulation alone). Confirmed via real scroll-through that all 5 images load correctly.
- `side` values set explicitly in `site.ts` always match what automatic alternation would compute anyway — harmless, redundant.

## Questions to Consider

1. The product's whole pitch is "never lose your place in a long document" — what if the story page demonstrated that with a slim progress rail, instead of just describing the feature in prose?
2. The teammate-adoption line is stated but not shown — is there a way to give it one more concrete detail without inventing a metric or testimonial?
3. The emotional peak (closing line) and functional peak (clicking Launch) are separated by a full scroll back to the top — what if they were the same beat?
