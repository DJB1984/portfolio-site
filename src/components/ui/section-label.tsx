/**
 * SectionLabel — the mono "coordinate" that announces a section (see DESIGN.md,
 * The Mono-Label Rule). Small, uppercase, with a single starlight point.
 */
export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-starlight shadow-[0_0_8px_var(--color-starlight)]"
      />
      {children}
    </p>
  );
}
