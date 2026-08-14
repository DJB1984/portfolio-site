import type { Metadata } from "next";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Davis Brooks — real code, live apps, and a team project, with source for all three.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {site.projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
