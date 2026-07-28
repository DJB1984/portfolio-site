"use client";

import Link from "next/link";
import type { Project } from "@/data/site";
import { Tag } from "@/components/ui/tag";
import { useEditMode } from "@/components/edit/edit-mode-provider";
import { EditableText } from "@/components/edit/editable-text";
import { EditableImage } from "@/components/edit/editable-image";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  completed: "Completed",
};

/**
 * A project card. In read mode the whole card links to the detail page via a
 * stretched title link. In edit mode the stretched link is dropped so the
 * title/summary become editable and the cover becomes an upload target.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const editMode = useEditMode();
  const base = `project.${project.slug}`;

  return (
    <article className="card-lift group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <EditableImage
          path={`${base}.cover`}
          image={project.cover}
          priority={priority}
        />
        <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-void/70 px-2.5 py-1 font-mono text-[0.7rem] text-muted backdrop-blur-sm">
          <span
            aria-hidden="true"
            className={
              project.status === "live" ? "glow-dot" : "glow-dot glow-dot--ember"
            }
          />
          {statusLabel[project.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold text-ink">
            {editMode ? (
              <EditableText path={`${base}.title`} value={project.title} as="span" />
            ) : (
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors after:absolute after:inset-0 group-hover:text-starlight"
              >
                {project.title}
              </Link>
            )}
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">
            {project.year}
          </span>
        </div>

        <EditableText
          path={`${base}.summary`}
          value={project.summary}
          as="p"
          multiline
          className="mt-2 flex-1 text-sm leading-relaxed text-muted"
        />

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.sourceUrl) && (
          <div className="relative z-10 mt-5 flex items-center gap-5 border-t border-line pt-4 font-mono text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-starlight hover:text-ink"
              >
                Live
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
              >
                Source
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
