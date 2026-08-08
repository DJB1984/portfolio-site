import type {
  ImageSlot as ImageSlotData,
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
import { ImageSlot } from "@/components/image-slot";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { ButtonLink } from "@/components/ui/button-link";

/** CSS aspect-ratio string from an image's own dimensions, with a fallback. */
function ratioOf(image: ImageSlotData, fallback = "16 / 10"): string {
  return image.width && image.height ? `${image.width} / ${image.height}` : fallback;
}

/**
 * Renders a project's detail-page body. If `project.story` is present, it
 * renders the alternating text/image narrative; otherwise it falls back to
 * the flat Overview/Highlights/Gallery treatment.
 */
export function ProjectStory({ project }: { project: Project }) {
  if (project.story && project.story.length > 0) {
    return <StorySections story={project.story} />;
  }

  return <OverviewFallback project={project} />;
}

function StorySections({ story }: { story: StorySection[] }) {
  // Positions of the text-image sections among themselves, so the compare
  // section (which has no side of its own) doesn't break the alternation.
  const textImagePositions = story
    .map((section, index) => (section.type === "text-image" ? index : -1))
    .filter((index) => index !== -1);

  return (
    <div className="mt-14 flex flex-col gap-16 sm:gap-20">
      {story.map((section, index) => {
        if (section.type === "text") {
          return <TextSection key={index} section={section} />;
        }

        if (section.type === "text-image") {
          const position = textImagePositions.indexOf(index);
          const auto = position % 2 === 0 ? "right" : "left";
          return (
            <TextImageSection
              key={index}
              section={section}
              imageRight={(section.side ?? auto) === "right"}
            />
          );
        }

        if (section.type === "output") {
          return <OutputSection key={index} section={section} />;
        }

        if (section.type === "cta") {
          return <CtaSection key={index} section={section} />;
        }

        return <CompareSection key={index} section={section} />;
      })}
    </div>
  );
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

function TextSection({ section }: { section: StoryTextSection }) {
  return (
    <Reveal>
      <section className="max-w-2xl">
        <StoryBody body={section.body} />
      </section>
    </Reveal>
  );
}

function CtaSection({ section }: { section: StoryCtaSection }) {
  return (
    <Reveal>
      <section className="max-w-2xl">
        <StoryBody body={section.body} />
        <ButtonLink href={section.href} variant="secondary" className="mt-8">
          {section.ctaLabel}
        </ButtonLink>
      </section>
    </Reveal>
  );
}

function TextImageSection({
  section,
  imageRight,
}: {
  section: StoryTextImageSection;
  imageRight: boolean;
}) {
  return (
    <Reveal>
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className={imageRight ? "md:order-1" : "md:order-2"}>
          <StoryBody body={section.body} />
        </div>
        <div
          className={`overflow-hidden rounded-lg border border-line ${
            imageRight ? "md:order-2" : "md:order-1"
          }`}
          style={{ aspectRatio: ratioOf(section.image) }}
        >
          <ZoomableImage image={section.image} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </section>
    </Reveal>
  );
}

function CompareSection({ section }: { section: StoryCompareSection }) {
  return (
    <Reveal>
      <section className="rounded-lg border border-line bg-surface p-6 sm:p-10">
        {section.body && <StoryBody body={section.body} className="max-w-2xl" />}
        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${section.body ? "mt-8" : ""}`}
        >
          {(["before", "after"] as const).map((side) => (
            <figure key={side}>
              <div
                className="overflow-hidden rounded-md border border-line"
                style={{ aspectRatio: ratioOf(section[side].image, "4 / 3") }}
              >
                <ZoomableImage image={section[side].image} sizes="(min-width: 640px) 50vw, 100vw" />
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
        </div>
      </section>
    </Reveal>
  );
}

function OutputSection({ section }: { section: StoryOutputSection }) {
  const hasBody = section.body.length > 0;

  return (
    <Reveal>
      <section>
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

/** The original flat Overview/Highlights/Gallery treatment, unchanged. */
function OverviewFallback({ project }: { project: Project }) {
  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_260px]">
        <div>
          <SectionLabel>Overview</SectionLabel>
          <CopyText
            value={project.description}
            as="p"
            className="mt-4 text-lg leading-relaxed text-ink"
          />
        </div>

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
      </div>

      {project.gallery.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Gallery</SectionLabel>
          <div
            className={`mt-6 grid grid-cols-1 gap-6 ${
              project.gallery.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {project.gallery.map((image, i) => (
              <Reveal key={i} delay={(i % 2) * 90}>
                <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line">
                  <ImageSlot image={image} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
