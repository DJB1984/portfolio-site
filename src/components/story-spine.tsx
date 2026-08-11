"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The margin spine for the story — a line of dots tracking how far into the
 * narrative you've scrolled. A dot lights the moment the line reaches it and
 * stays lit; it only goes dark again if you scroll back up past it. Desktop
 * only (lg+) — there's no room for it alongside single-column mobile prose.
 *
 * Dot position and the fill's height are computed from the same measured
 * fraction (each section's real midpoint within the container, vs. how far
 * the viewport's center has scrolled through it) rather than two independent
 * systems — a flex-evenly-spaced dot next to a CSS scroll-timeline fill will
 * drift apart the moment sections have unequal heights, lighting a dot
 * before the line visually reaches it.
 *
 * Finds its sibling sections via `[data-story-section]` rather than taking
 * refs as props, so the section markup in project-story.tsx can stay plain
 * server-rendered JSX.
 */
export function StorySpine({ count }: { count: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => (count > 1 ? i / (count - 1) : 0)),
  );

  useEffect(() => {
    const container = rootRef.current?.parentElement;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-story-section]"),
    );
    if (sections.length === 0) return;

    let frame = 0;

    function measure() {
      frame = 0;
      const containerRect = container!.getBoundingClientRect();
      const containerHeight = containerRect.height || 1;
      const viewportCenter = window.innerHeight / 2;

      setProgress(
        Math.min(1, Math.max(0, (viewportCenter - containerRect.top) / containerHeight)),
      );
      setPositions(
        sections.map((section) => {
          const rect = section.getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2 - containerRect.top;
          return Math.min(1, Math.max(0, midpoint / containerHeight));
        }),
      );
    }

    function onChange() {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="story-spine pointer-events-none absolute top-0 bottom-0 left-0 hidden w-px lg:block"
    >
      <div className="story-spine-track absolute inset-0 bg-line" />
      <div
        className="story-spine-fill absolute top-0 left-0 w-full bg-starlight"
        style={{ height: `${progress * 100}%` }}
      />
      <div className="relative h-full">
        {positions.map((position, index) => (
          <span
            key={index}
            className="story-spine-dot absolute -ml-[3px] h-[7px] w-[7px] shrink-0 -translate-y-1/2 rounded-full border transition-colors duration-300"
            style={{ top: `${position * 100}%` }}
            data-active={progress >= position}
          />
        ))}
      </div>
    </div>
  );
}
