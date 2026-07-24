/**
 * site.ts — the single source of truth for all portfolio content.
 *
 * Every page renders from this object. To update the site's content, edit here
 * only; no copy lives in components.
 *
 * STATUS (2026): profile identity, links, and the two real projects
 * (title / summary / URLs) are seeded from confirmed facts. Longer prose
 * (bios, project write-ups, highlights) is PLACEHOLDER and marked with
 * `[placeholder]` — replace before launch. All image slots are intentionally
 * empty (`src: null`); each carries `alt` text describing the image that belongs
 * there so the layout is self-documenting.
 */

export type SocialLink = {
  /** Display name, e.g. "GitHub" */
  label: string;
  href: string;
  /** Optional handle shown alongside, e.g. "@DJB1984" */
  handle?: string;
};

export type ImageSlot = {
  /** null = empty slot; a placeholder panel renders in its place. */
  src: string | null;
  /** Describes the image that belongs here. Required, even while empty. */
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectStatus = "live" | "in-progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  /** One-line summary used on cards and lists. */
  summary: string;
  /** Longer description for the detail page. */
  description: string;
  role: string;
  year: string;
  status: ProjectStatus;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  /** Primary hero image for the project. */
  cover: ImageSlot;
  /** Additional screenshots for the detail page. */
  gallery: ImageSlot[];
  /** Short "what makes it interesting" bullets for the detail page. */
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Availability = {
  open: boolean;
  /** Short badge label, e.g. "Open to new-grad SWE roles". */
  label: string;
  /** Longer detail, e.g. availability window. */
  detail: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  /** One or two sentences; used in nav meta and page intros. */
  shortBio: string;
  /** Multi-paragraph about copy. */
  longBio: string[];
  availability: Availability;
  email: string;
  links: SocialLink[];
  /** null until a resume PDF is dropped into /public. */
  resumeUrl: string | null;
};

export type SiteData = {
  profile: Profile;
  projects: Project[];
  skills: SkillGroup[];
};

export const site: SiteData = {
  profile: {
    name: "Davis Brooks",
    role: "Product-minded Software Engineer",
    location: "Cedarville University · Computer Science",
    shortBio:
      "[placeholder] I build real, usable products — not demos. Short one-to-two sentence positioning line goes here, framing what you make and who it's for.",
    longBio: [
      "[placeholder] Opening paragraph — who you are, what you care about as a builder, and the thread that connects your work. Keep it human and specific.",
      "[placeholder] Second paragraph — how you work: product thinking, shipping to real users, the kinds of problems you like. Mention Cedarville CS and where you're headed.",
      "[placeholder] Third paragraph — a closing line about what you're looking for next and how to reach you.",
    ],
    availability: {
      open: true,
      label: "Open to new-grad SWE roles",
      // TODO: set the real graduation / availability window.
      detail: "[placeholder] Available starting [Month Year] — full-time.",
    },
    email: "hello@brookslanding.com", // [placeholder] confirm preferred contact email
    links: [
      { label: "GitHub", href: "https://github.com/DJB1984", handle: "@DJB1984" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/davisbrooks-cs",
        handle: "davisbrooks-cs",
      },
      { label: "Website", href: "https://brookslanding.com", handle: "brookslanding.com" },
    ],
    resumeUrl: null, // drop /public/davis-brooks-resume.pdf and set to "/davis-brooks-resume.pdf"
  },

  projects: [
    {
      slug: "study-deck",
      title: "Study Deck",
      summary: "Use any AI to turn your notes into interactive study tools.",
      description:
        "[placeholder] A paragraph about Study Deck — the problem it solves, who it's for, and what it does. Real users paste notes and get back interactive study material. Expand with the story of why you built it.",
      role: "Solo — design & full-stack",
      year: "2025",
      status: "live",
      tags: ["Next.js", "TypeScript", "AI / LLM", "Full-stack"],
      liveUrl: "https://studydeck.brookslanding.com",
      sourceUrl: "https://github.com/DJB1984/StudyDeck",
      featured: true,
      cover: {
        src: null,
        alt: "Study Deck hero — the app's landing/dashboard where notes are turned into study tools.",
        width: 1600,
        height: 1000,
      },
      gallery: [
        {
          src: null,
          alt: "Study Deck equation showcase — rendered math / equation study cards.",
          width: 1600,
          height: 1000,
        },
        {
          src: null,
          alt: "Study Deck graph showcase — an interactive graph generated from notes.",
          width: 1600,
          height: 1000,
        },
      ],
      highlights: [
        "[placeholder] What's technically interesting (e.g. model-agnostic AI pipeline).",
        "[placeholder] A real outcome or usage detail.",
        "[placeholder] A product/UX decision you're proud of.",
      ],
    },
    {
      slug: "regression-reader",
      title: "Regression Reader",
      summary:
        "A regression-testing tool that improves efficiency and locks in your focus.",
      description:
        "[placeholder] A paragraph about Regression Reader — what regression reading is, the friction it removes, and how it keeps testers focused. Expand with the motivation and the core mechanic.",
      role: "Solo — design & full-stack",
      year: "2025",
      status: "live",
      tags: ["Next.js", "TypeScript", "Developer Tools", "Testing"],
      liveUrl: "https://regression.brookslanding.com",
      sourceUrl: "https://github.com/DJB1984/regression-reader",
      featured: true,
      cover: {
        src: null,
        alt: "Regression Reader hero — the app's main reading/testing view.",
        width: 1600,
        height: 1000,
      },
      gallery: [],
      highlights: [
        "[placeholder] The focus/efficiency mechanic that makes it different.",
        "[placeholder] A technical detail worth noting.",
        "[placeholder] Who uses it and why it helps.",
      ],
    },
    {
      slug: "project-three",
      title: "Next Project",
      summary: "[placeholder] One-line summary of a future project.",
      description:
        "[placeholder] This is a template slot showing how new projects slot in. Duplicate a project object in site.ts to add another — the grid, index, and detail pages all pick it up automatically.",
      role: "[placeholder] Your role",
      year: "2026",
      status: "in-progress",
      tags: ["[placeholder]", "Tags"],
      featured: false,
      cover: {
        src: null,
        alt: "Cover image for the next project.",
        width: 1600,
        height: 1000,
      },
      gallery: [],
      highlights: ["[placeholder] Highlight one.", "[placeholder] Highlight two."],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java", "C", "SQL"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Vercel", "PostgreSQL", "Docker"],
    },
    {
      category: "Focus Areas",
      items: ["Product engineering", "AI / LLM apps", "Developer tools", "UI/UX"],
    },
  ],
};

/** Projects marked `featured`, in data order. */
export const featuredProjects = site.projects.filter((p) => p.featured);

/** Look up a single project by slug. */
export function getProject(slug: string): Project | undefined {
  return site.projects.find((p) => p.slug === slug);
}

/** All project slugs — used for static generation. */
export const projectSlugs = site.projects.map((p) => p.slug);
