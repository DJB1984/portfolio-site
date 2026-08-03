import Link from "next/link";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type EditableTextProps = {
  /** Stable field path, e.g. "profile.shortBio" or "home.hero.headline". Kept
   * for call-site parity with the dev-only editable component; unused here. */
  path: string;
  /** Resolved current value (already merged with overrides at build time). */
  value: string;
  as?: Tag;
  className?: string;
  multiline?: boolean;
  /** Turn one exact substring into an external link. */
  linkify?: { text: string; href: string; className?: string };
};

/**
 * Static, read-only render of a content field. The in-browser edit mode
 * (click-to-edit + Server Actions) only exists on the `main` branch, which
 * runs under `next dev` / Vercel — this branch builds a static export for
 * HostGator, where Server Actions can't run, so this component just renders
 * the resolved value.
 */
export function EditableText({
  value,
  as = "p",
  className = "",
  linkify,
}: EditableTextProps) {
  const Tag = as as React.ElementType;

  if (linkify && value.includes(linkify.text)) {
    const [before, after] = splitOnce(value, linkify.text);
    return (
      <Tag className={className}>
        {before}
        <Link
          href={linkify.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkify.className}
        >
          {linkify.text}
        </Link>
        {after}
      </Tag>
    );
  }
  return <Tag className={className}>{value}</Tag>;
}

/** Splits on the first occurrence of `needle`, dropping the needle itself. */
function splitOnce(haystack: string, needle: string): [string, string] {
  const i = haystack.indexOf(needle);
  return [haystack.slice(0, i), haystack.slice(i + needle.length)];
}
