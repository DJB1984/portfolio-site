import Link from "next/link";
import { getProject, site, type Project } from "@/data/site";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SkillList } from "@/components/skill-list";
import { CopyText } from "@/components/copy-text";

/** Order matters — Regression Reader leads, Storybook (data pending) follows. */
const internshipProjectSlugs = ["regression-reader", "storybook"];

export default function HomePage() {
  const { profile, experience, projects } = site;
  const featured = projects.filter((p) => p.featured);
  const live = projects.filter((p) => p.status === "live");
  const internshipProjects = internshipProjectSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 pb-20 pt-16 sm:px-8 sm:pt-24 md:min-h-[78vh]">
        <div className="hero-rise" style={{ ["--rise-delay" as string]: "0ms" }}>
          <AvailabilityBadge />
        </div>

        <h1
          className="hero-rise mt-7 max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl md:text-7xl"
          style={{ ["--rise-delay" as string]: "80ms" }}
        >
          <span>Solving problems with</span>{" "}
          <span className="text-starlight">diligence and integrity</span>
        </h1>

        <CopyText
          value="I'm Davis Brooks, a sophomore studying computer science with a dual focus in cybersecurity and AI with a minor in the Bible. I'm passionate about solving problems with the end user in mind and building products with attention to detail."
          as="p"
          className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        />

        <div
          className="hero-rise mt-9 flex flex-wrap items-center gap-4"
          style={{ ["--rise-delay" as string]: "240ms" }}
        >
          <ButtonLink href="/projects" variant="primary">
            View My Projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get In Touch
          </ButtonLink>
        </div>
      </section>

      {/* ---------- Professional experience ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Professional Experience
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-8 max-w-2xl">
          {experience.body.map((paragraph, i) => (
            <CopyText
              key={i}
              value={paragraph}
              as="p"
              className="mt-4 text-lg leading-relaxed text-muted"
              linkify={
                paragraph.includes(experience.company)
                  ? {
                      text: experience.company,
                      href: experience.companyUrl,
                      className:
                        "text-ember underline underline-offset-4 decoration-ember/40 transition-colors hover:text-ink hover:decoration-ink/40",
                    }
                  : undefined
              }
            />
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-14 border-t border-line pt-10">
          <SectionLabel>INTERNSHIP PROJECT SHOWCASE</SectionLabel>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {internshipProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- Selected projects ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Projects</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Real problems, real code.
              </h2>
            </div>
            <Link href="/projects" className="font-mono text-sm text-starlight hover:text-ink">
              All projects ↗
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Toolkit ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What I build with.
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <SkillList />
        </Reveal>
      </section>

      {/* ---------- Currently live ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <SectionLabel>Currently live</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Shipped, and still running.
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {live.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-starlight"
                >
                  <span aria-hidden="true" className="glow-dot" />
                  <span className="font-medium">{project.title}</span>
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-starlight">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------- Contact CTA ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-line bg-surface p-10 sm:p-14">
            <SectionLabel>Next</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Looking for a Summer 2027 intern?
            </h2>
            <CopyText
              value={profile.availability.detail}
              as="p"
              className="mt-4 max-w-xl text-muted"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary">
                Get in touch
              </ButtonLink>
              {profile.resumeUrl ? (
                <ButtonLink href={profile.resumeUrl} variant="secondary" download>
                  Download Resume
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
