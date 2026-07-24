import type { Metadata } from "next";
import { site } from "@/data/site";
import { loadContent } from "@/content/manifest";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SocialLinks } from "@/components/social-links";
import { EditableText } from "@/components/edit/editable-text";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.profile.name}.`,
};

export default async function ContactPage() {
  const content = await loadContent();
  const { profile } = content.site;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <header>
        <SectionLabel>Contact</SectionLabel>
        <EditableText
          path="contact.heading"
          value={content.text("contact.heading", "Let's talk.")}
          as="h1"
          className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl"
        />
        <EditableText
          path="contact.intro"
          value={content.text(
            "contact.intro",
            "Whether you're hiring, collaborating, or just want to try one of my apps — the fastest way to reach me is email.",
          )}
          as="p"
          multiline
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
        />
        <div className="mt-6">
          <AvailabilityBadge />
        </div>
      </header>

      <Reveal className="mt-12">
        <div className="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Email
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block text-2xl font-semibold text-ink transition-colors hover:text-starlight sm:text-3xl"
          >
            {profile.email}
          </a>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`mailto:${profile.email}`} variant="primary" external>
              Send an email
            </ButtonLink>
            {profile.resumeUrl ? (
              <ButtonLink href={profile.resumeUrl} variant="secondary" external>
                Download resume ↗
              </ButtonLink>
            ) : (
              <span className="ds-btn ds-btn-secondary cursor-default opacity-60">
                Resume — coming soon
              </span>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <SectionLabel>Elsewhere</SectionLabel>
        <SocialLinks className="mt-5" />
      </Reveal>
    </div>
  );
}
