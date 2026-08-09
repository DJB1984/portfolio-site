import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projectSlugs, site, type Project } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Tag } from "@/components/ui/tag";
import { CopyText } from "@/components/copy-text";
import { ImageSlot } from "@/components/image-slot";
import { ProjectList } from "@/components/project-list";
import { ProjectStory } from "@/components/project-story";

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
  const project = getProject(slug);
  if (!project) notFound();

  const others = site.projects.filter((p) => p.slug !== project.slug).slice(0, 2);

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

        <CopyText
          value={project.title}
          as="h1"
          className="mt-5 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
        />
        <CopyText
          value={project.summary}
          as="p"
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
          <ImageSlot
            image={project.cover}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      </Reveal>

      {/* Story */}
      <ProjectStory project={project} />

      {/* More projects */}
      {others.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <SectionLabel>More projects</SectionLabel>
          <div className="mt-6">
            <ProjectList projects={others} />
          </div>
        </section>
      )}
    </article>
  );
}
