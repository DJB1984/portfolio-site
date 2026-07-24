import Link from "next/link";
import { site } from "@/data/site";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-mono text-sm text-ink"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-starlight shadow-[0_0_10px_var(--color-starlight)]"
            />
            <span className="font-semibold">{site.profile.name}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.profile.role}. Building real, usable products.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/work" className="text-ink hover:text-starlight">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink hover:text-starlight">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink hover:text-starlight">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Elsewhere
            </p>
            <SocialLinks className="mt-4 flex-col gap-y-2" />
          </div>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 sm:px-8">
        <p className="font-mono text-xs text-muted">
          © {year} {site.profile.name}. Charted with Next.js.
        </p>
      </div>
    </footer>
  );
}
