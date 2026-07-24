import { site } from "@/data/site";

/** A small "available" pill with a live status dot. */
export function AvailabilityBadge({ className = "" }: { className?: string }) {
  const { availability } = site.profile;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted backdrop-blur-sm ${className}`}
    >
      <span
        className={availability.open ? "glow-dot" : "glow-dot glow-dot--ember"}
      />
      {availability.label}
    </span>
  );
}
