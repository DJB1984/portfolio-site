import type { Metadata } from "next";
import { site } from "@/data/site";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.profile.name}.`,
};

export default function ContactPage() {
  const { profile } = site;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-10 pt-16 sm:px-8 sm:pt-24">
      <header>
        <SectionLabel>Contact</SectionLabel>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Whether you&apos;re hiring, collaborating, or just want to try one of my apps — the
          fastest way to reach me is email.
        </p>
        <div className="mt-6">
          <AvailabilityBadge />
        </div>
      </header>

      <Reveal className="mt-12">
        <div className="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <ObfuscatedEmail
            user={profile.emailUser}
            domain={profile.emailDomain}
            resumeUrl={profile.resumeUrl}
          />
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <SectionLabel>Elsewhere</SectionLabel>
        <SocialLinks className="mt-5" />
      </Reveal>
    </div>
  );
}
