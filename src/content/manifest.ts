// Server-only module: reads/writes the content-override manifest via node:fs.
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  site,
  type ImageSlot,
  type Project,
  type SiteData,
  type StorySection,
} from "@/data/site";

/**
 * The content manifest holds *overrides* on top of the defaults in site.ts.
 * - `text`  : keyed by a stable field path (e.g. "profile.shortBio",
 *             "project.study-deck.title", "home.hero.headline").
 * - `images`: keyed by an image-slot path (e.g. "project.study-deck.cover"),
 *             value is a public path like "/uploads/xyz.png".
 *
 * Editing writes here; rendering merges these over site.ts. Committing this
 * file (and /public/uploads) is what publishes edits.
 */
export type ContentManifest = {
  text: Record<string, string>;
  images: Record<string, string>;
};

const MANIFEST_PATH = path.join(process.cwd(), "content", "content.json");

/** Read the manifest fresh from disk (used by writers to avoid clobbering). */
export async function readManifestFresh(): Promise<ContentManifest> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<ContentManifest>;
    return { text: parsed.text ?? {}, images: parsed.images ?? {} };
  } catch {
    return { text: {}, images: {} };
  }
}

/** Cached per-request read for rendering. */
export const readManifest = cache(readManifestFresh);

/** Persist the manifest (pretty-printed so diffs are readable). */
export async function writeManifest(manifest: ContentManifest): Promise<void> {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

/** Apply an image-src override to a slot, keeping its alt/dimensions. */
function overrideImage(
  slot: ImageSlot,
  images: ContentManifest["images"],
  key: string,
): ImageSlot {
  const src = images[key];
  return src ? { ...slot, src } : slot;
}

/** Merge overrides onto one story section (text, text-image, or compare). */
function mergeStorySection(
  section: StorySection,
  m: ContentManifest,
  path: string,
): StorySection {
  const label = m.text[`${path}.label`] ?? section.label;
  const body = section.body?.map((p, j) => m.text[`${path}.body.${j}`] ?? p);

  if (section.type === "compare") {
    return {
      ...section,
      label,
      body,
      before: {
        image: overrideImage(section.before.image, m.images, `${path}.before.image`),
        caption: m.text[`${path}.before.caption`] ?? section.before.caption,
      },
      after: {
        image: overrideImage(section.after.image, m.images, `${path}.after.image`),
        caption: m.text[`${path}.after.caption`] ?? section.after.caption,
      },
    };
  }

  if (section.type === "text-image") {
    return {
      ...section,
      label,
      body: body ?? section.body,
      image: overrideImage(section.image, m.images, `${path}.image`),
    };
  }

  if (section.type === "output") {
    return {
      ...section,
      label,
      body: body ?? section.body,
      diagram: section.diagram
        ? {
            image: overrideImage(section.diagram.image, m.images, `${path}.diagram.image`),
            caption: m.text[`${path}.diagram.caption`] ?? section.diagram.caption,
          }
        : section.diagram,
    };
  }

  return { ...section, label, body: body ?? section.body };
}

/** Merge overrides onto a single project. */
function mergeProject(project: Project, m: ContentManifest): Project {
  const base = `project.${project.slug}`;
  return {
    ...project,
    title: m.text[`${base}.title`] ?? project.title,
    summary: m.text[`${base}.summary`] ?? project.summary,
    description: m.text[`${base}.description`] ?? project.description,
    highlights: project.highlights.map(
      (h, i) => m.text[`${base}.highlights.${i}`] ?? h,
    ),
    cover: overrideImage(project.cover, m.images, `${base}.cover`),
    gallery: project.gallery.map((img, i) =>
      overrideImage(img, m.images, `${base}.gallery.${i}`),
    ),
    story: project.story?.map((section, i) =>
      mergeStorySection(section, m, `${base}.story.${i}`),
    ),
  };
}

/** The site data with all text/image overrides applied. */
function mergeSite(m: ContentManifest): SiteData {
  return {
    profile: {
      ...site.profile,
      name: m.text["profile.name"] ?? site.profile.name,
      role: m.text["profile.role"] ?? site.profile.role,
      shortBio: m.text["profile.shortBio"] ?? site.profile.shortBio,
      longBio: site.profile.longBio.map(
        (p, i) => m.text[`profile.longBio.${i}`] ?? p,
      ),
      availability: {
        ...site.profile.availability,
        detail:
          m.text["profile.availability.detail"] ??
          site.profile.availability.detail,
      },
    },
    projects: site.projects.map((p) => mergeProject(p, m)),
    skills: site.skills,
  };
}

/**
 * Load resolved content for a request. `site` is fully merged; `text()` resolves
 * page-level fields (headings not stored in site.ts) against the manifest.
 */
export async function loadContent() {
  const manifest = await readManifest();
  const merged = mergeSite(manifest);
  return {
    site: merged,
    /** Resolve a free-form text field by path, falling back to a default. */
    text(pathKey: string, fallback = ""): string {
      return manifest.text[pathKey] ?? fallback;
    },
  };
}
