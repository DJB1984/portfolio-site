# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: internship recruiters and engineering hiring managers.** They arrive from a resume, LinkedIn, or a referral, scanning quickly to decide whether Davis Brooks is worth advancing — currently for a summer 2027 internship, not a full-time new-grad role. They judge on evidence of real work, real teamwork, and clear thinking — not buzzwords.

**Secondary: everyday ("lay") users of the actual apps.** Most of Davis's projects are live products, not demos — Study Deck and Regression Reader are live apps regular people can actually use. His most recent project, a circuit simulator built with a team for a class, is presented honestly as source-only proof of collaborative engineering rather than another live app. The portfolio should send this audience into the working apps, and let recruiters see that real people can use what he builds.

These two audiences are complementary: recruiters are more impressed *because* the projects work for real users.

## Product Purpose

A personal portfolio for Davis Brooks that does two jobs at once: (1) get recruiters to notice, understand, and appreciate his work and how he works with others quickly enough to reach out, and (2) route real visitors into his live apps so the work proves itself in use. Success = a recruiter leaves able to describe what he builds, how he works with others, and how to contact him, and a lay visitor leaves having tried (or bookmarked) one of his apps.

## Positioning

**Real work, not done alone.** The throughline isn't just "I can code" or even "I ship products" by itself — it's proof of real, working software (Study Deck, Regression Reader) paired with proof he works well with others: a coursework circuit simulator built with classmates, a current internship at Tektonux doing real engineering work on a professional team, and leadership roles outside of class (Scout troop, church tech team). The differentiator a resume-only candidate can't copy isn't just shipped software — it's evidence he can do the work, and do it with other people.

## Operating Context

- Recruiters typically skim on desktop or mobile between many candidates; first impression and scannability matter, and every project claim should be one click from proof (live app + source, or source alone where there's no live deploy).
- The live apps are hosted under the `brookslanding.com` domain family; the portfolio is a hub that links out to them.
- Davis is currently interning at Tektonux (government UI software) — treat this as current, real-world engineering evidence alongside the shipped projects, not just a resume line.
- Deployment target for this site: Vercel.

## Capabilities and Constraints

- Content the site presents: an introduction to Davis; a showcase of his projects (three today — two live apps, one team coursework build — extensible to more); paths to contact and to his professional profiles; and clear links into the live apps and their source.
- Tech: Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel.
- Extensible: the projects section must accommodate additional projects over time without redesign.
- **Site structure (confirmed):** single long-scroll home (hero, work, about, contact) plus dedicated per-project detail pages at `/projects/[slug]`. Project cards on the home page link into those detail pages; live-app and source links are the primary/secondary actions (source-only for projects with no live deploy).
- **Resume (confirmed):** include a "Download resume" affordance wired to a placeholder file for now — Davis will supply the actual PDF later. Do not fabricate resume content.
- **Open / undecided:** class standing (rising sophomore, fall 2026) is confirmed; exact graduation year is intentionally not stated on the site — do not fabricate dates or credentials.

## Brand Commitments

- **Name:** Davis Brooks.
- **Role:** Computer Science, Cedarville University — rising sophomore.
- **Canonical links (confirmed, must be preserved and correct):**
  - LinkedIn — https://www.linkedin.com/in/davisbrooks-cs
  - GitHub — https://github.com/DJB1984
  - Personal domain — https://brookslanding.com
- **Voice:** to be confirmed in the design phase; keep it honest and free of inflated claims.

## Evidence on Hand

Real projects with public source — most are live apps, one is a team coursework build:

- **Study Deck** — "Use any AI to turn your notes into interactive study tools."
  - Live: https://studydeck.brookslanding.com
  - Source: https://github.com/DJB1984/StudyDeck
  - Reference screenshots on hand: `intial references/StudyDeckHero.png`, `StudyDeckEquationShowcase.png`, `StudyDeckGraphShowCase.png`.
- **Regression Reader** — "Regression testing tool that improves efficiency and locks in your focus." Built after Davis ran into friction doing regression testing during his Tektonux internship — the real origin story, not a hypothetical one.
  - Live: https://regression.brookslanding.com
  - Source: https://github.com/DJB1984/regression-reader
  - Reference screenshot on hand: `intial references/RegressionReaderHero.png`.
- **Logic Gate Circuit Simulator ("HW8")** — a C++, event-driven digital logic simulator (NOT/AND/OR/NAND/NOR/XOR/XNOR gates; Wire/Gate/Event architecture; a "DEFAULTED" wire state that prevents feedback-loop circuits from looping forever), built with a team for Object-Oriented Design (Spring 2026, Cedarville). Source-only, no live deploy — evidence of CS fundamentals and teamwork, not another live product.
  - Source: https://github.com/DJB1984/HW8

**Other real-world evidence (not a project with a public repo, but relevant):**
- **Current internship — Tektonux** (tektonux.com, builds UI software for government clients). Regression testing, bug fixes, and merge-request review, summer 2026. Real, current, professional engineering experience.
- Boy Scouts of America Troop 7008 — Senior Patrol Leader, Troop Guide, Patrol Leader (before college). Church tech team — ran sound/slides, helped teach elementary kids on Sunday mornings (before college). Two summers on staff at a Bible camp for inner-city kids in Memphis (before college). Available as supporting color for the About page bio; not a dedicated site section.

No testimonials, metrics, press, or user counts have been provided — future work must not invent them.

## Product Principles

1. **Proof over claims.** Every statement about his ability is one click from a working app or its source code.
2. **Two audiences, one page.** Serve recruiters (scan, understand, contact) and lay users (go use the app) without making either feel like an afterthought.
3. **Real work, not demos.** Present shipped work as live software people use, because it is — and be equally direct when something (like a coursework project) is real, working code without a live deploy, rather than dressing it up as a product it isn't.
4. **Honest signal.** No inflated titles, fake metrics, or borrowed credibility — the work carries the weight.
5. **Built to grow.** New projects slot in cleanly as his body of work expands.
