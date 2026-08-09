import Link from "next/link";
import type { Project } from "@/data/site";

/**
 * Compact, title + one-line-summary rows for linking into project detail
 * pages without the weight of a full ProjectCard. Used both for the "More
 * projects" list on a project detail page and for surfacing a couple of
 * projects inline elsewhere on the site.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group flex items-baseline justify-between gap-4 py-5"
          >
            <span className="text-xl font-semibold text-ink transition-colors group-hover:text-starlight">
              {project.title}
            </span>
            <span className="hidden font-mono text-sm text-muted sm:block">
              {project.summary}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
