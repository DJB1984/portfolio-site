import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projectSlugs, type Project } from "@/data/site";
import { loadContent } from "@/content/manifest";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Tag } from "@/components/ui/tag";
import { EditableText } from "@/components/edit/editable-text";
import { EditableImage } from "@/components/edit/editable-image";

/** Prerender every project page at build time. */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return { title: project.title, description: project.summary };
}

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  completed: "Completed",
};

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const content = await loadContent();
  const project = content.site.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const base = `project.${project.slug}`;
  const others = content.site.projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <Link
        href="/projects"
        className="font-mono text-sm text-muted transition-colors hover:text-starlight"
      >
        ← All projects
      </Link>

      {/* Header */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-4">
          <SectionLabel>{project.role}</SectionLabel>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
            <span
              aria-hidden="true"
              className={
                project.status === "live" ? "glow-dot" : "glow-dot glow-dot--ember"
              }
            />
            {statusLabel[project.status]} · {project.year}
          </span>
        </div>

        <EditableText
          path={`${base}.title`}
          value={project.title}
          as="h1"
          className="mt-5 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
        />
        <EditableText
          path={`${base}.summary`}
          value={project.summary}
          as="p"
          multiline
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        />

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.sourceUrl) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} variant="primary">
                Launch {project.title} ↗
              </ButtonLink>
            )}
            {project.sourceUrl && (
              <ButtonLink href={project.sourceUrl} variant="secondary">
                View source ↗
              </ButtonLink>
            )}
          </div>
        )}
      </header>

      {/* Cover */}
      <Reveal className="mt-14">
        <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line">
          <EditableImage
            path={`${base}.cover`}
            image={project.cover}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      </Reveal>

      {/* Body */}
      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_260px]">
        <div>
          <SectionLabel>Overview</SectionLabel>
          <EditableText
            path={`${base}.description`}
            value={project.description}
            as="p"
            multiline
            className="mt-4 text-lg leading-relaxed text-ink"
          />
        </div>

        <aside>
          <SectionLabel>Highlights</SectionLabel>
          <ul className="mt-4 flex flex-col gap-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-1.5 glow-dot shrink-0" />
                <EditableText
                  path={`${base}.highlights.${i}`}
                  value={h}
                  as="span"
                  multiline
                />
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Gallery */}
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
                  <EditableImage path={`${base}.gallery.${i}`} image={image} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* More projects */}
      {others.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <SectionLabel>More projects</SectionLabel>
          <ul className="mt-6 flex flex-col divide-y divide-line">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="text-xl font-semibold text-ink transition-colors group-hover:text-starlight">
                    {p.title}
                  </span>
                  <span className="hidden font-mono text-sm text-muted sm:block">
                    {p.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
