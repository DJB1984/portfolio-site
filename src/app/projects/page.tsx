import type { Metadata } from "next";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Davis Brooks — real code, live apps, and a team project, with source for all three.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <header className="max-w-2xl">
        <SectionLabel>Projects</SectionLabel>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
          Things I&apos;ve built.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Real code behind everything here — two are live projects you can try right now, and
          one&apos;s a team assignment built for a class. Open one to read the story, launch it if
          it&apos;s live, or dig into the source.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {site.projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
