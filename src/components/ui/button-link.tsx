import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: "ds-btn ds-btn-primary",
  secondary: "ds-btn ds-btn-secondary",
  ghost: "ds-btn ds-btn-ghost",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Force external behavior; auto-detected for http(s) links otherwise. */
  external?: boolean;
  /** Prompts a file download instead of navigating; forces external (plain anchor) behavior. */
  download?: boolean | string;
} & React.AriaAttributes;

/**
 * A link styled as a button. Uses next/link for internal routes (client-side
 * transitions + prefetch) and a plain anchor for external URLs.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  download,
  ...aria
}: ButtonLinkProps) {
  const isExternal = external ?? (Boolean(download) || /^https?:\/\//.test(href));
  const classes = `${variantClass[variant]} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={classes}
        {...aria}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...aria}>
      {children}
    </Link>
  );
}
