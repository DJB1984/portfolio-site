import { site } from "@/data/site";

/** Renders the profile's external links as a labelled row. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {site.profile.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-2 text-ink transition-colors hover:text-starlight"
          >
            <span className="font-medium">{link.label}</span>
            {link.handle && (
              <span className="font-mono text-xs text-muted transition-colors group-hover:text-starlight">
                {link.handle}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
