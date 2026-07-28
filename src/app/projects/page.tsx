import type { Metadata } from "next";
import { loadContent } from "@/content/manifest";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { EditableText } from "@/components/edit/editable-text";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Davis Brooks — real code, live apps, and a team project, with source for all three.",
};

export default async function ProjectsPage() {
  const content = await loadContent();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <header className="max-w-2xl">
        <SectionLabel>Projects</SectionLabel>
        <EditableText
          path="projects.heading"
          value={content.text("projects.heading", "Things I've built.")}
          as="h1"
          className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
        />
        <EditableText
          path="projects.intro"
          value={content.text(
            "projects.intro",
            "Real code behind everything here — two are live products you can try right now, and one's a team project built for a class. Open one to read the story, launch it if it's live, or dig into the source.",
          )}
          as="p"
          multiline
          className="mt-5 text-lg leading-relaxed text-muted"
        />
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.site.projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
