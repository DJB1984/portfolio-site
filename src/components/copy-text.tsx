import Link from "next/link";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type CopyTextProps = {
  value: string;
  as?: Tag;
  className?: string;
  /** Turn one exact substring into an external link. */
  linkify?: { text: string; href: string; className?: string };
};

/** Renders a copy field from site.ts as the given tag, optionally linkifying one substring. */
export function CopyText({ value, as = "p", className = "", linkify }: CopyTextProps) {
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
