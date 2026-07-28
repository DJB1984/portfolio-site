import type { Metadata } from "next";
import { site } from "@/data/site";
import { loadContent } from "@/content/manifest";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SkillList } from "@/components/skill-list";
import { SocialLinks } from "@/components/social-links";
import { EditableText } from "@/components/edit/editable-text";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.profile.name} — ${site.profile.role}.`,
};

export default async function AboutPage() {
  const content = await loadContent();
  const { profile } = content.site;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <header className="max-w-2xl">
        <SectionLabel>About</SectionLabel>
        <EditableText
          path="profile.name"
          value={profile.name}
          as="h1"
          className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
        />
        <p className="mt-3 font-mono text-sm text-muted">{profile.location}</p>
        <div className="mt-6">
          <AvailabilityBadge />
        </div>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-[1fr_240px]">
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-ink">
            {profile.longBio.map((paragraph, i) => (
              <EditableText
                key={i}
                path={`profile.longBio.${i}`}
                value={paragraph}
                as="p"
                multiline
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <aside>
            <SectionLabel>Find me</SectionLabel>
            <SocialLinks className="mt-4 flex-col gap-y-3" />
          </aside>
        </Reveal>
      </div>

      <section className="mt-20 border-t border-line pt-12">
        <Reveal>
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
            What I build with.
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-8">
          <SkillList />
        </Reveal>
      </section>

      <section className="mt-16">
        <Reveal>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/projects" variant="primary">
              See the projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
