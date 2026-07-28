/**
 * site.ts — the single source of truth for all portfolio content.
 *
 * Every page renders from this object. To update the site's content, edit here
 * only; no copy lives in components.
 *
 * STATUS (2026): profile identity, bios, and all three projects (two live
 * apps, one team coursework build) are real, written copy — no placeholders
 * remain. All image slots are intentionally empty (`src: null`); each carries
 * `alt` text describing the image that belongs there so the layout is
 * self-documenting.
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

export type ProjectStatus = "live" | "in-progress" | "archived" | "completed";

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
  /** Short badge label, e.g. "Open to Summer 2027 internships". */
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
    role: "Computer Science Student",
    location: "Cedarville University · Rising Sophomore",
    shortBio:
      "Computer Science sophomore at Cedarville University — I build real software, I've led in Scouts and my church, and I interned at Tektonux this past summer.",
    longBio: [
      "I'm a Computer Science sophomore at Cedarville University. I like solving real problems — in code, but not only in code — and I'd rather ship something that actually works for someone than build something impressive that nobody uses.",
      "This past summer I interned at Tektonux, where I did regression testing, fixed bugs, and reviewed merge requests on software built for government clients — my first real look at how a professional engineering team works day to day. Before college, I served as Senior Patrol Leader of my Boy Scout troop, ran sound and slides for my church's tech team, helped teach elementary kids on Sunday mornings, and spent two summers on staff at a Bible camp for kids in inner-city Memphis. Different rooms, same habit: show up, take responsibility, and make the thing work for the people counting on you.",
      "Right now I'm not on the job market — I'm a sophomore looking ahead to a summer 2027 internship, and always glad to talk with people building interesting things in the meantime. The projects page has the real code behind every project here; if you'd rather just talk, my email's on the contact page — or you'll find me reading, running, or losing a board game to my family.",
    ],
    availability: {
      open: true,
      label: "Open to Summer 2027 internships",
      detail:
        "Wrapped up an internship at Tektonux this summer — now back at Cedarville and looking ahead to a summer 2027 internship next. Always happy to talk shop or compare notes in the meantime.",
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
        "Study Deck turns raw notes into study material you'll actually use — paste in what you're studying and it generates interactive flashcards, worked equations, and graphs instead of a wall of text to re-read. It's model-agnostic, so it works with whichever AI you already have access to instead of locking you into one provider. I built it because re-reading my own notes before a test never worked as well as being quizzed on them.",
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
        "Model-agnostic AI pipeline — works with whatever AI you already have access to, not tied to one provider.",
        "Renders real math and interactive graphs from plain notes, not just flashcard text.",
        "Built the study workflow I actually wanted for my own classes, then made it usable for anyone.",
      ],
    },
    {
      slug: "regression-reader",
      title: "Regression Reader",
      summary:
        "A regression-testing tool that improves efficiency and locks in your focus.",
      description:
        "Regression Reader started as a fix for my own problem. Interning at Tektonux this summer — where I do regression testing, fix bugs, and review merge requests on software the team builds for government clients — I kept losing my place halfway through a long regression pass: which case I was on, what I'd already checked, where my focus had drifted. So I built a tool that keeps a regression run organized and keeps my attention on one case at a time instead of a wall of output. I use it for my own testing — it's not something Tektonux has adopted, just something that grew out of a real problem I was actually having.",
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
        "Built directly from a problem I hit doing real regression testing at my internship, not a hypothetical one.",
        "Keeps one test case in focus at a time instead of dumping a full regression log on you at once.",
        "Solo, full-stack Next.js/TypeScript build — from the idea to something I actually use every week.",
      ],
    },
    {
      slug: "logic-gate-simulator",
      title: "Logic Gate Circuit Simulator",
      summary:
        "A C++ event-driven simulator for digital logic circuits, built with a team for my Object-Oriented Design course.",
      description:
        "Logic Gate Circuit Simulator reads circuit and input files and simulates how a network of logic gates — NOT, AND, OR, NAND, NOR, XOR, XNOR — behaves over time. It's event-driven: a wire change is modeled as a timed event that ripples through Wire, Gate, and Event classes rather than recalculating the whole circuit at once, and a \"DEFAULTED\" wire state keeps circuits with feedback loops from spinning into an infinite loop. I built it with a team for Object-Oriented Design at Cedarville — my first project where the codebase, the architecture decisions, and the debugging were all genuinely shared.",
      role: "Team project — C++, object-oriented design",
      year: "2026",
      status: "completed",
      tags: ["C++", "OOP", "Digital Logic"],
      sourceUrl: "https://github.com/davisbrookscollege/HW8",
      featured: false,
      cover: {
        src: null,
        alt: "Timing diagram of the flip-flop circuit's real simulator output — the R, S, O, and Q' signals traced over time, generated by the simulator itself.",
        width: 1600,
        height: 1000,
      },
      gallery: [
        {
          src: null,
          alt: "How the simulator produced that trace: a schematic of Circuit 2's NOT, AND, and OR gates wired per its netlist, paired with the real waveform it generated — including the stretch where output E stays undefined while the signal ripples through all three gates.",
          width: 1600,
          height: 1000,
        },
      ],
      highlights: [
        "Event-driven simulation — wire changes propagate as timed events instead of a full circuit recalculation.",
        "A \"DEFAULTED\" wire state prevents circuits with feedback loops from looping forever.",
        "Built and debugged with a team, not solo — shared architecture decisions and a shared codebase.",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "C++", "Java", "C", "C#", "SQL"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Linux", "Vercel", "PostgreSQL", "Docker"],
    },
    {
      category: "Focus Areas",
      items: ["Product engineering", "AI / LLM apps", "Developer tools", "UI/UX"],
    },
    {
      category: "Coursework",
      items: [
        "Object-Oriented Design",
        "Digital Logic Design",
        "Cybersecurity Fundamentals",
      ],
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
