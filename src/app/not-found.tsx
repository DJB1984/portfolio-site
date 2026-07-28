import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-6 py-24 sm:px-8">
      <SectionLabel>Error 404</SectionLabel>
      <h1 className="mt-5 text-5xl font-bold tracking-[-0.02em] text-ink sm:text-6xl">
        Off the star chart.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
        This page isn&apos;t on the map. Let&apos;s navigate you back to
        something real.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <ButtonLink href="/" variant="primary">
          Back home
        </ButtonLink>
        <Link
          href="/projects"
          className="ds-btn ds-btn-ghost"
        >
          See the projects
        </Link>
      </div>
    </div>
  );
}
