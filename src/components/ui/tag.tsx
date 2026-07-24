/** Tag — a small mono chip for tech/labels. Token-only styling. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line px-2 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
