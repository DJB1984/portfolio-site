import type {
  Project,
  StoryCompareSection,
  StoryCtaSection,
  StoryOutputSection,
  StorySection,
  StoryTextImageSection,
  StoryTextSection,
  WaveformRow,
} from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { CopyText } from "@/components/copy-text";
import { ImageSlot, aspectRatioOf as ratioOf } from "@/components/image-slot";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { ButtonLink } from "@/components/ui/button-link";
import { StorySpine } from "@/components/story-spine";

/**
 * Renders a project's detail-page body. If `project.story` is present, it
 * renders the narrative story sections; otherwise it falls back to the flat
 * Overview/Highlights/Gallery treatment.
 */
export function ProjectStory({ project }: { project: Project }) {
  if (project.story && project.story.length > 0) {
    return <StorySections story={project.story} />;
  }

  return <OverviewFallback project={project} />;
}

type Beat = {
  section: StorySection;
  index: number;
  isFirst: boolean;
  /** True for the last text-image section — the one visual "breakout" beat. */
  isSpotlight: boolean;
  imageRight: boolean;
};

function StorySections({ story }: { story: StorySection[] }) {
  // Positions of the text-image sections among themselves, so the compare
  // section (which has no side of its own) doesn't break the alternation,
  // and so we can single out the *last* one as the spotlight beat.
  const textImagePositions = story
    .map((section, index) => (section.type === "text-image" ? index : -1))
    .filter((index) => index !== -1);
  const spotlightIndex = textImagePositions.at(-1) ?? -1;

  const beats: Beat[] = story.map((section, index) => {
    const position = textImagePositions.indexOf(index);
    const auto = position % 2 === 0 ? "right" : "left";
    return {
      section,
      index,
      isFirst: index === 0,
      isSpotlight: index === spotlightIndex && textImagePositions.length > 1,
      imageRight:
        (section.type === "text-image" ? (section.side ?? auto) : auto) === "right",
    };
  });

  return (
    <div className="story-track relative mt-14">
      <StorySpine count={beats.length} />
      <div className="flex flex-col gap-16 sm:gap-20 lg:pl-16">
        {beats.map((beat) => (
          <div data-story-section key={beat.index}>
            <StoryBeat beat={beat} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryBeat({ beat }: { beat: Beat }) {
  const { section } = beat;

  if (section.type === "text") {
    return <TextSection beat={beat} section={section} />;
  }
  if (section.type === "text-image") {
    return <TextImageSection beat={beat} section={section} />;
  }
  if (section.type === "output") {
    return <OutputSection beat={beat} section={section} />;
  }
  if (section.type === "cta") {
    return <CtaSection beat={beat} section={section} />;
  }
  return <CompareSection beat={beat} section={section} />;
}

function StoryCoordinate({ beat }: { beat: Beat }) {
  return <SectionLabel className="mb-4">{beat.section.label}</SectionLabel>;
}

function StoryBody({ body, className = "" }: { body: string[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 text-lg leading-relaxed text-ink ${className}`}>
      {body.map((paragraph, j) => (
        <CopyText key={j} value={paragraph} as="p" />
      ))}
    </div>
  );
}

function TextSection({ beat, section }: { beat: Beat; section: StoryTextSection }) {
  return (
    <Reveal>
      <section className="max-w-2xl">
        <StoryCoordinate beat={beat} />
        <StoryBody
          body={section.body}
          className={beat.isFirst ? "text-xl sm:text-2xl" : ""}
        />
      </section>
    </Reveal>
  );
}

function CtaSection({ beat, section }: { beat: Beat; section: StoryCtaSection }) {
  return (
    <Reveal>
      <section className="max-w-2xl">
        {section.label && <StoryCoordinate beat={beat} />}
        <StoryBody body={section.body} />
        <div className="mt-8 flex flex-wrap gap-4">
          {section.primaryHref && section.primaryLabel && (
            <ButtonLink href={section.primaryHref} variant="primary">
              {section.primaryLabel}
            </ButtonLink>
          )}
          <ButtonLink href={section.href} variant="secondary">
            {section.ctaLabel}
          </ButtonLink>
        </div>
      </section>
    </Reveal>
  );
}

function TextImageSection({
  beat,
  section,
}: {
  beat: Beat;
  section: StoryTextImageSection;
}) {
  const { imageRight } = beat;

  if (beat.isSpotlight) {
    return (
      <Reveal>
        <section>
          <StoryCoordinate beat={beat} />
          <div
            className="overflow-hidden rounded-lg border border-line"
            style={{ aspectRatio: ratioOf(section.image, "16 / 9") }}
          >
            <ZoomableImage image={section.image} sizes="100vw" />
          </div>
          <StoryBody body={section.body} className="mx-auto mt-8 max-w-2xl" />
        </section>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <section>
        <StoryCoordinate beat={beat} />
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* lg:pb-24 grows this column, which is what sets the row's track
              height (items-start doesn't stretch cells). Without it, the row
              is barely taller than the image, so the sticky image reaches
              its offset and immediately has to unstick again — a stutter
              instead of a pause. */}
          <div className={`lg:pb-24 ${imageRight ? "md:order-1" : "md:order-2"}`}>
            <StoryBody body={section.body} />
          </div>
          <div
            className={`overflow-hidden rounded-lg border border-line lg:sticky lg:top-24 ${
              imageRight ? "md:order-2" : "md:order-1"
            }`}
            style={{ aspectRatio: ratioOf(section.image) }}
          >
            <ZoomableImage image={section.image} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function CompareSection({
  beat,
  section,
}: {
  beat: Beat;
  section: StoryCompareSection;
}) {
  return (
    <Reveal>
      <section className="rounded-lg border border-line bg-surface p-6 sm:p-10">
        <StoryCoordinate beat={beat} />
        {section.body && <StoryBody body={section.body} className="mb-8 max-w-2xl" />}
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
          {(["before", "after"] as const).map((side) => (
            <figure key={side}>
              <div
                className="overflow-hidden rounded-md border border-line"
                style={{ aspectRatio: ratioOf(section[side].image, "4 / 3") }}
              >
                <ZoomableImage
                  image={section[side].image}
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              {section[side].caption && (
                <figcaption className="mt-3">
                  <CopyText
                    value={section[side].caption}
                    as="span"
                    className="font-mono text-xs text-muted"
                  />
                </figcaption>
              )}
            </figure>
          ))}
          {/* The connecting mark — reads "these two are the same moment,
              seen through different tools" without implying they're the
              same pixel grid (they aren't: different apps, different
              scale), which rules out a spatial wipe/slider here. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-void text-starlight shadow-[0_4px_14px_oklch(0.5_0.13_255/0.3)] sm:flex"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 5l6 7-6 7M4 12h14" />
            </svg>
          </span>
        </div>
      </section>
    </Reveal>
  );
}

function OutputSection({ beat, section }: { beat: Beat; section: StoryOutputSection }) {
  const hasBody = section.body.length > 0;

  return (
    <Reveal>
      <section>
        <StoryCoordinate beat={beat} />
        {section.diagram && (
          <figure className="mb-8">
            <div
              className="overflow-hidden rounded-lg border border-line bg-surface"
              style={{ aspectRatio: ratioOf(section.diagram.image, "4 / 3") }}
            >
              <ImageSlot image={section.diagram.image} sizes="100vw" />
            </div>
            {section.diagram.caption && (
              <figcaption className="mt-3">
                <CopyText
                  value={section.diagram.caption}
                  as="span"
                  className="font-mono text-xs text-muted"
                />
              </figcaption>
            )}
          </figure>
        )}
        {hasBody && <StoryBody body={section.body} className="max-w-2xl" />}
        <div className={hasBody ? "mt-8" : ""}>
          <OutputPanel label={section.label} rows={section.output} />
        </div>
      </section>
    </Reveal>
  );
}

/**
 * Renders literal program output — exact per-row traces preserved, never
 * wired through the edit system (see StoryOutputSection). Presented as a
 * single `role="img"` unit with a descriptive label, since a
 * character-by-character screen-reader read of ASCII waveform art isn't
 * usable content. Rows are colored by kind (input vs. output) rather than
 * left as one flat block, so the trace reads the way the circuit behaves.
 */
function OutputPanel({ label, rows }: { label: string; rows: WaveformRow[] }) {
  const inputs = rows.filter((row) => row.kind === "input").map((row) => row.label);
  const outputs = rows.filter((row) => row.kind === "output").map((row) => row.label);

  return (
    <div
      role="img"
      aria-label={`${label} — simulator output waveform. Inputs: ${inputs.join(", ")}. Outputs: ${outputs.join(", ")}.`}
      className="rounded-lg border border-line bg-surface p-6 sm:p-10"
    >
      <div
        aria-hidden="true"
        className="flex flex-col gap-3 overflow-x-auto font-mono text-xs leading-6 tracking-normal sm:text-sm"
      >
        {rows.map((row) => (
          <div key={row.label} className="flex gap-3">
            <span className="w-4 shrink-0 text-right text-muted">{row.label}</span>
            <span className="text-line-strong">|</span>
            <span className={row.kind === "output" ? "text-starlight" : "text-ink"}>
              {row.wave}
            </span>
          </div>
        ))}
      </div>
      <p
        aria-hidden="true"
        className="mt-6 border-t border-line pt-4 font-mono text-xs text-muted"
      >
        <span className="text-ink">-</span> high &nbsp;·&nbsp;{" "}
        <span className="text-ink">_</span> low &nbsp;·&nbsp;{" "}
        <span className="text-ink">x</span> undefined
      </p>
    </div>
  );
}

/** The flat Overview/Highlights/Gallery treatment used when a project has no story. */
function OverviewFallback({ project }: { project: Project }) {
  const hasHighlights = project.highlights.length > 0;

  return (
    <>
      <div
        className={`mt-14 grid grid-cols-1 gap-12 ${
          hasHighlights ? "md:grid-cols-[1fr_260px]" : ""
        }`}
      >
        <div className={hasHighlights ? "" : "max-w-2xl"}>
          <SectionLabel>Overview</SectionLabel>
          <CopyText
            value={project.description}
            as="p"
            className="mt-4 text-lg leading-relaxed text-ink"
          />
        </div>

        {hasHighlights && (
          <aside>
            <SectionLabel>Highlights</SectionLabel>
            <ul className="mt-4 flex flex-col gap-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1.5 glow-dot shrink-0" />
                  <CopyText value={h} as="span" />
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {project.gallery.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Gallery</SectionLabel>
          {/* One per row at full column width, each framed to its own native
              ratio. These are dense product screenshots: a 2-up grid halves
              them into illegibility, and a fixed frame would crop away the
              very UI they exist to show. */}
          <div className="mt-6 flex flex-col gap-10 sm:gap-14">
            {project.gallery.map((image, i) => (
              <Reveal key={i}>
                <div
                  className="overflow-hidden rounded-lg border border-line"
                  style={{ aspectRatio: ratioOf(image) }}
                >
                  <ZoomableImage
                    image={image}
                    sizes="(min-width: 1024px) 1024px, 100vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
