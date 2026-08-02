import Link from "next/link";
import { loadContent } from "@/content/manifest";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SkillList } from "@/components/skill-list";
import { EditableText } from "@/components/edit/editable-text";

export default async function HomePage() {
  const content = await loadContent();
  const { profile, projects } = content.site;
  const featured = projects.filter((p) => p.featured);
  const live = projects.filter((p) => p.status === "live");

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
          <EditableText
            path="home.hero.headline"
            value={content.text("home.hero.headline", "I build real things,")}
            as="span"
          />{" "}
          <EditableText
            path="home.hero.accent"
            value={content.text("home.hero.accent", "not alone.")}
            as="span"
            className="text-starlight"
          />
        </h1>

        <EditableText
          path="home.hero.sub"
          value={content.text(
            "home.hero.sub",
            "Davis Brooks — Computer Science sophomore at Cedarville University. I build real software, work on a professional engineering team this summer at Tektonux, and lead outside of class too. Two of my projects are live right now.",
          )}
          as="p"
          multiline
          className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          linkify={{
            text: "Tektonux",
            href: "https://tektonux.com/",
            className:
              "text-ember underline decoration-ember/40 underline-offset-[3px] transition-colors hover:decoration-ember",
          }}
        />

        <div
          className="hero-rise mt-9 flex flex-wrap items-center gap-4"
          style={{ ["--rise-delay" as string]: "240ms" }}
        >
          <ButtonLink href="/projects" variant="primary">
            View the projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>

        {/* Currently-shipping strip */}
        <div
          className="hero-rise mt-14 flex flex-col gap-3 border-t border-line pt-6"
          style={{ ["--rise-delay" as string]: "320ms" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Currently live
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
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
        </div>
      </section>

      {/* ---------- Selected projects ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Selected projects</SectionLabel>
              <EditableText
                path="home.projects.heading"
                value={content.text("home.projects.heading", "Real problems, real code.")}
                as="h2"
                className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              />
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
          <EditableText
            path="home.toolkit.heading"
            value={content.text("home.toolkit.heading", "What I build with.")}
            as="h2"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <SkillList />
        </Reveal>
      </section>

      {/* ---------- Contact CTA ---------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-line bg-surface p-10 sm:p-14">
            <SectionLabel>Next</SectionLabel>
            <EditableText
              path="home.contact.heading"
              value={content.text(
                "home.contact.heading",
                "Looking for a summer 2027 intern who ships?",
              )}
              as="h2"
              className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
            <EditableText
              path="profile.availability.detail"
              value={profile.availability.detail}
              as="p"
              multiline
              className="mt-4 max-w-xl text-muted"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary">
                Get in touch
              </ButtonLink>
              <ButtonLink href="/projects" variant="ghost">
                See the projects first
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
