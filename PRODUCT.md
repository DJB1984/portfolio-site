# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: new-grad / full-time software-engineering recruiters and hiring managers.** They arrive from a resume, LinkedIn, or a referral, scanning quickly to decide whether Davis Brooks is worth advancing. They judge on evidence of shipped, real work and clear thinking — not buzzwords.

**Secondary: everyday ("lay") users of the actual apps.** Davis's projects are live products, not demos. Regular people should be able to land on Study Deck or Regression Reader and actually use them. The portfolio should send this audience into the working apps, and let recruiters see that real people can use what he builds.

These two audiences are complementary: recruiters are more impressed *because* the projects work for real users.

## Product Purpose

A personal portfolio for Davis Brooks that does two jobs at once: (1) get recruiters to notice, understand, and appreciate his work quickly enough to reach out, and (2) route real visitors into his live apps so the work proves itself in use. Success = a recruiter leaves able to describe what he builds and how to contact him, and a lay visitor leaves having tried (or bookmarked) one of his apps.

## Positioning

**Product-minded builder.** The throughline is not "I can code" but "I build useful, real products people actually use." His projects solve concrete problems (turning notes into study tools; making regression testing more efficient and focused) and ship to real domains. The differentiator a resume-only candidate can't copy: working, publicly usable products with live URLs, presented by someone who cares about the user's experience end to end.

## Operating Context

- Recruiters typically skim on desktop or mobile between many candidates; first impression and scannability matter, and every project claim should be one click from proof (live app + source).
- The live apps are hosted under the `brookslanding.com` domain family; the portfolio is a hub that links out to them.
- Deployment target for this site: Vercel.

## Capabilities and Constraints

- Content the site presents: an introduction to Davis; a showcase of his projects (initially two, extensible to more); paths to contact and to his professional profiles; and clear links into the live apps and their source.
- Tech: Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel.
- Extensible: the projects section must accommodate additional projects over time without redesign.
- **Site structure (confirmed):** single long-scroll home (hero, work, about, contact) plus dedicated per-project detail pages at `/projects/[slug]`. Project cards on the home page link into those detail pages; live-app and source links are the primary/secondary actions.
- **Resume (confirmed):** include a "Download resume" affordance wired to a placeholder file for now — Davis will supply the actual PDF later. Do not fabricate resume content.
- **Open / undecided:** graduation timeline is not yet confirmed — do not fabricate dates or credentials.

## Brand Commitments

- **Name:** Davis Brooks.
- **Role:** Computer Science, Cedarville University.
- **Canonical links (confirmed, must be preserved and correct):**
  - LinkedIn — https://www.linkedin.com/in/davisbrooks-cs
  - GitHub — https://github.com/DJB1984
  - Personal domain — https://brookslanding.com
- **Voice:** to be confirmed in the design phase; keep it honest and free of inflated claims.

## Evidence on Hand

Real, shipped projects with live URLs and public source:

- **Study Deck** — "Use any AI to turn your notes into interactive study tools."
  - Live: https://studydeck.brookslanding.com
  - Source: https://github.com/DJB1984/StudyDeck
  - Reference screenshots on hand: `intial references/StudyDeckHero.png`, `StudyDeckEquationShowcase.png`, `StudyDeckGraphShowCase.png`.
- **Regression Reader** — "Regression testing tool that improves efficiency and locks in your focus."
  - Live: https://regression.brookslanding.com
  - Source: https://github.com/DJB1984/regression-reader
  - Reference screenshot on hand: `intial references/RegressionReaderHero.png`.

No testimonials, metrics, press, or user counts have been provided — future work must not invent them.

## Product Principles

1. **Proof over claims.** Every statement about his ability is one click from a working app or its source code.
2. **Two audiences, one page.** Serve recruiters (scan, understand, contact) and lay users (go use the app) without making either feel like an afterthought.
3. **Real products, not demos.** Present the work as live software people use, because it is.
4. **Honest signal.** No inflated titles, fake metrics, or borrowed credibility — the work carries the weight.
5. **Built to grow.** New projects slot in cleanly as his body of work expands.
