import Image from "next/image";
import type { ImageSlot as ImageSlotData } from "@/data/site";

/**
 * Renders a project image, or — while `src` is null — a self-documenting
 * placeholder panel that shows the alt text describing what belongs there.
 */
export function ImageSlot({
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 640px, 100vw",
}: {
  image: ImageSlotData;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 1000}
        priority={priority}
        sizes={sizes}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${image.alt}`}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-surface p-6 text-center ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m4 16 4.5-4 4 3.5L16 11l4 4.5" />
      </svg>
      <span className="max-w-xs font-mono text-xs leading-relaxed text-muted">
        {image.alt}
      </span>
    </div>
  );
}
