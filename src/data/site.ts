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

export type StorySectionBase = {
  /** SectionLabel text, e.g. "The problem". */
  label: string;
  /** One string per paragraph — mirrors the profile.longBio convention.
   *  Not a single string with embedded "\n": nothing in the render path
   *  handles newlines, so they'd collapse to a space. */
  body: string[];
};

export type StoryTextSection = StorySectionBase & {
  type: "text";
};

export type StoryTextImageSection = StorySectionBase & {
  type: "text-image";
  image: ImageSlot;
  /** Overrides automatic left/right alternation for this section. */
  side?: "left" | "right";
};

export type StoryCompareImage = {
  image: ImageSlot;
  /** Omit to show the image without a caption line beneath it. */
  caption?: string;
};

export type StoryCompareSection = {
  type: "compare";
  label: string;
  /** Optional short intro copy above the two images. */
  body?: string[];
  before: StoryCompareImage;
  after: StoryCompareImage;
};

export type WaveformRow = {
  /** Wire label, e.g. "A" or "4". */
  label: string;
  /** Literal high/low/undefined trace — exact characters preserved. */
  wave: string;
  kind: "input" | "output";
};

export type StoryOutputSection = StorySectionBase & {
  type: "output";
  /** One row per wire, exact characters preserved, rendered in a monospace
   *  panel and colored by kind — never reflowed as prose. Deliberately NOT
   *  wired through the CMS edit system: it's historical/forensic output,
   *  not iterable copy, and contentEditable doesn't reliably preserve
   *  exact whitespace anyway. */
  output: WaveformRow[];
  /** Optional circuit diagram shown above the output — reuses the
   *  compare-image shape. Renders before `body`, since the prose refers
   *  back to it ("the above image"). */
  diagram?: StoryCompareImage;
};

export type StoryCtaSection = StorySectionBase & {
  type: "cta";
  ctaLabel: string;
  href: string;
};

export type StorySection =
  | StoryTextSection
  | StoryTextImageSection
  | StoryCompareSection
  | StoryOutputSection
  | StoryCtaSection;

export type Project = {
  slug: string;
  title: string;
  /** One-line summary used on cards and lists. */
  summary: string;
  /** Longer description for the detail page. Still used as the source for
   *  the Overview fallback when `story` is absent — keep accurate on its own. */
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
  /** Short "what makes it interesting" bullets — used by the Overview fallback. */
  highlights: string[];
  /** Scrolling narrative for the detail page. When present and non-empty,
   *  fully replaces the Overview/Highlights/Gallery fallback for this project. */
  story?: StorySection[];
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
      slug: "regression-reader",
      title: "Regression Reader",
      summary:
        "A regression-testing tool that improves efficiency and locks in your focus.",
      description:
        "Regression Reader started as a fix for my own problem. Interning at Tektonux — a government-contracting company — this past summer, I kept losing my place halfway through long regression passes: which case I was on, what I'd already checked, where my focus had drifted. So I built a tool that keeps a regression run organized and keeps my attention on one case at a time instead of a wall of output. I built it for myself, brought it to work, and a teammate has since started using it too — the hope is more of the team picks it up from here.",
      role: "Solo — design & full-stack",
      year: "2026",
      status: "live",
      tags: ["TypeScript", "Claude Code", "UI/UX", "Testing"],
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
      story: [
        {
          type: "text",
          label: "The first regression pass",
          body: [
            "Tektonux is a government-contracting company — the kind of place where the software has to be right before it ships. I was interning there this past summer, running regression tests, and my first real pass exposed a problem fast. The test plan lived in GitLab's markdown viewer: a long, unbroken wall of plain text with no state and no memory of where I'd been.",
            "Two things went wrong from there. After a few hours my eyes would lose the line — the page would start to blur together and I'd burn extra focus just re-finding my spot, on top of the actual testing. And I was running two documents at once: the test plan in one window, my notes in another, trying to keep track of which comment belonged to which step.",
          ],
        },
        {
          type: "compare",
          label: "Before / after",
          body: [
            "This is the same test plan, side by side. Same content, same steps — but only one of them you can actually stay locked into for eight hours straight.",
          ],
          before: {
            image: {
              src: "/uploads/project-regression-reader-story-3-before.png",
              alt: "A regression test plan rendered in GitLab's plain markdown viewer, with no way to mark which step is current.",
              width: 522,
              height: 407,
            },
            caption: "Before — GitLab's markdown viewer",
          },
          after: {
            image: {
              src: "/uploads/project-regression-reader-story-3-after.png",
              alt: "The same test plan open in Regression Reader, with the current step highlighted.",
              width: 506,
              height: 415,
            },
            caption: "After — Regression Reader",
          },
        },
        {
          type: "text-image",
          label: "One line at a time",
          side: "right",
          body: [
            "So I built Regression Reader to fix the first problem: never losing the line. Arrow Mode locks your attention to a single line at a time — blank lines skip automatically, the current line stays marked, and a running percentage tracks how far through the plan you are. Nothing else is competing for your eyes.",
            "Eight hours into a regression pass, that's the difference between staying sharp and starting to guess.",
          ],
          image: {
            src: "/uploads/project-regression-reader-story-1-hero-alt.png",
            alt: "Regression Reader in Arrow Mode — a test plan with the current line highlighted and colored dots marking annotated lines in the left margin.",
            width: 1200,
            height: 900,
          },
        },
        {
          type: "text-image",
          label: "Notes on the line",
          side: "left",
          body: [
            "The second problem was the two-document juggle. So in Regression Reader, notes live inside the test plan itself instead of a separate file. Press a key on any line and a color-coded note bubble opens right there — orange for a general note, red for a bug, purple and green for whatever else you want to track.",
            "The note is permanently tied to that exact line. There's no going back afterward trying to match a comment to the step it was about.",
          ],
          image: {
            src: "/uploads/project-regression-reader-story-2-note-bubble-open.png",
            alt: "An orange note bubble open on a line in Regression Reader, with color options for orange, bug, purple, and green notes.",
            width: 1200,
            height: 900,
          },
        },
        {
          type: "text-image",
          label: "Summary mode",
          side: "right",
          body: [
            "Once a pass is annotated, Summary Mode collapses the whole plan down to just the flagged lines, filterable by note color. It turns hours of scrolling into a short list of exactly what needs attention.",
            "Writing up results after a regression run takes a fraction of the time it used to.",
          ],
          image: {
            src: "/uploads/project-regression-reader-story-4-context-expanded.png",
            alt: "Regression Reader's Summary Mode, showing a test plan collapsed down to only the lines flagged with notes.",
            width: 1200,
            height: 900,
          },
        },
        {
          type: "text",
          label: "Where it landed",
          body: [
            "I built the first working version in one evening — about eight hours with Claude Code — then brought it to work the next day and ran my next regression pass on it. It held up.",
            "A teammate started using it not long after, and the plan going forward is for more of the team to pick it up and keep extending it. I went looking for a fix to my own problem and ended up with something my team at Tektonux is actually using.",
          ],
        },
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
      featured: true,
      cover: {
        src: "/uploads/project-logic-gate-simulator-story-flipflop-diagram.svg",
        alt: "Schematic of the flip-flop circuit — two cross-coupled NOR gates. Inputs R and S each feed one gate; each gate's output feeds the other gate's second input; outputs are O and wire 4.",
        width: 960,
        height: 600,
      },
      gallery: [],
      highlights: [
        "Event-driven simulation — wire changes propagate as timed events instead of a full circuit recalculation.",
        "A \"DEFAULTED\" wire state prevents circuits with feedback loops from looping forever.",
        "Built and debugged with a team, not solo — shared architecture decisions and a shared codebase.",
      ],
      story: [
        {
          type: "text",
          label: "The assignment",
          body: [
            "During my Object-Oriented Design course in my freshman year of college, our final project was for me and my partner, Mark St. Michelle, to build an command line program in C++ that could simulate digital logic. No help from generative ai was allowed on this project. This was the culmination of two C++ classes and a digital logic design course we had taken.",
            "The circuits for this project would be specified in two documents, one document outlining the logic gates, their delays, their input wires, how they were interconnected, and the output wires we would generate a wave form for. Gates were to have no more than two inputs but could be connected in any way, shape, or form, including where a gate's output feeds its own input (that was an especially hard problem to solve). The other document outlined when input wires would change value and whether those wires would be high (-), low (_), or undefined (X).",
          ],
        },
        {
          type: "output",
          label: "MultiGate, traced",
          body: [
            "The above image is a graphical example of a circuit we simulated. Each gate has its own delay we had to account for. Shown below is the waveform we generated for this circuit. Inputs are in white, outputs are in blue.",
          ],
          diagram: {
            image: {
              src: "/uploads/project-logic-gate-simulator-story-multigate-diagram.svg",
              alt: "Schematic of the MultiGate circuit — a NOT gate feeding an AND gate (with input B), feeding an OR gate (with input C), producing output E.",
              width: 820,
              height: 340,
            },
          },
          output: [
            { label: "A", kind: "input", wave: "______------" },
            { label: "B", kind: "input", wave: "---------___" },
            { label: "C", kind: "input", wave: "____--------" },
            { label: "E", kind: "output", wave: "xxxxxxx-----" },
          ],
        },
        {
          type: "text",
          label: "The flip-flop challenge",
          body: [
            "The above waveform was quite simple compared to implementing a flip-flop. Flip-flops are cross-coupled, the output of both gates feed back into the input of the other gate. This posed a significant design challenge because cross coupling was combined with propagation delay. We had to rework our code multiple times but in the end we made it work.",
          ],
        },
        {
          type: "output",
          label: "The flip-flop, traced",
          body: [
            "Because we were creating a waveform for a flip-flop, our output would have continued flipping back and forth between high and low for eternity so we had to added a maximum simulation length of 50 ns.",
          ],
          diagram: {
            image: {
              src: "/uploads/project-logic-gate-simulator-story-flipflop-diagram.svg",
              alt: "Schematic of the flip-flop circuit — two cross-coupled NOR gates. Inputs R and S each feed one gate; each gate's output feeds the other gate's second input; outputs are O and wire 4.",
              width: 960,
              height: 600,
            },
          },
          output: [
            { label: "R", kind: "input", wave: "-____-_____________________________________________" },
            { label: "S", kind: "input", wave: "--_-_______________________________________________" },
            { label: "O", kind: "output", wave: "xx_x--__--__--__--__--__--__--__--__--__--__--__--_" },
            { label: "4", kind: "output", wave: "xx__-___--__--__--__--__--__--__--__--__--__--__--_" },
          ],
        },
        {
          type: "cta",
          label: "How it wrapped",
          body: [
            "After about 10 hours of work a piece, we finished our logic gate circuit simulator. We earned a 100% on the assignment. This was the first time either of us had really worked with Git and learning how to involve a teammate in a coding project has been an invaluable skill. It also taught us how to design classes in C++, abstract away logic with functions, and deal with pointers. For a more technical explanation of this project, view our source code on GitHub.",
          ],
          ctaLabel: "View source ↗",
          href: "https://github.com/davisbrookscollege/HW8",
        },
      ],
    },
    {
      slug: "study-deck",
      title: "Study Deck",
      summary: "Use any AI to turn your notes into interactive study tools.",
      description:
        "Study Deck turns raw notes into study material you'll actually use — paste in what you're studying and it generates interactive flashcards, worked equations, and graphs instead of a wall of text to re-read. It's model-agnostic, so it works with whichever AI you already have access to instead of locking you into one provider. I built it because re-reading my own notes before a test never worked as well as being quizzed on them.",
      role: "Solo — design & full-stack",
      year: "2026",
      status: "live",
      tags: ["Next.js", "TypeScript", "AI / LLM", "Full-stack"],
      liveUrl: "https://studydeck.brookslanding.com",
      sourceUrl: "https://github.com/DJB1984/StudyDeck",
      featured: false,
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
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "C++", "HTML", "CSS", "C#", "Python"],
    },
    {
      category: "Tools & Platforms",
      items: ["Claude Code", "Git", "Storybook", "Linux", "Vercel", "Docker"],
    },
    {
      category: "Focus Areas",
      items: [
        "UI/UX",
        "Context engineering",
        "Web apps",
        "Cybersecurity",
      ],
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
