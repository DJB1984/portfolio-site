"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { WaveformRow } from "@/data/site";

const MIN_THUMB_FRACTION = 0.08;

/**
 * Renders literal program output — exact per-row traces preserved, never
 * wired through the edit system (see StoryOutputSection). Presented as a
 * single `role="img"` unit with a descriptive label, since a
 * character-by-character screen-reader read of ASCII waveform art isn't
 * usable content. Rows are colored by kind (input vs. output) rather than
 * left as one flat block, so the trace reads the way the circuit behaves.
 *
 * The trace never wraps — wrapped rows lose the alignment that makes a
 * waveform readable. On narrow viewports it overflows into a synced
 * horizontal scrubber instead, so wire labels stay pinned while only the
 * trace itself scrolls.
 */
export function WaveformPanel({ label, rows }: { label: string; rows: WaveformRow[] }) {
  const inputs = rows.filter((row) => row.kind === "input").map((row) => row.label);
  const outputs = rows.filter((row) => row.kind === "output").map((row) => row.label);

  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ scrollLeft: 0, maxScroll: 0, fraction: 1 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function measure() {
      const node = el!;
      setMetrics({
        scrollLeft: node.scrollLeft,
        maxScroll: Math.max(0, node.scrollWidth - node.clientWidth),
        fraction: node.scrollWidth > 0 ? node.clientWidth / node.scrollWidth : 1,
      });
    }

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [rows]);

  const canScroll = metrics.maxScroll > 1;
  const thumbFraction = Math.min(1, Math.max(MIN_THUMB_FRACTION, metrics.fraction));
  const thumbPosition = metrics.maxScroll > 0 ? metrics.scrollLeft / metrics.maxScroll : 0;

  function scrollToClientX(clientX: number) {
    const track = trackRef.current;
    const el = scrollRef.current;
    if (!track || !el) return;
    const rect = track.getBoundingClientRect();
    const usableWidth = Math.max(1, rect.width * (1 - thumbFraction));
    const fraction = Math.min(
      1,
      Math.max(0, (clientX - rect.left - (rect.width * thumbFraction) / 2) / usableWidth),
    );
    el.scrollLeft = fraction * metrics.maxScroll;
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToClientX(event.clientX);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.buttons !== 1) return;
    scrollToClientX(event.clientX);
  }

  return (
    <div
      role="img"
      aria-label={`${label} — simulator output waveform. Inputs: ${inputs.join(", ")}. Outputs: ${outputs.join(", ")}.`}
      className="rounded-lg border border-line bg-surface p-6 sm:p-10"
    >
      <div aria-hidden="true" className="flex gap-3">
        <div className="flex shrink-0 flex-col gap-3 font-mono text-xs leading-6 sm:text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex gap-3">
              <span className="w-4 text-right text-muted">{row.label}</span>
              <span className="text-line-strong">|</span>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div
            ref={scrollRef}
            className="flex flex-col gap-3 overflow-x-auto font-mono text-xs leading-6 tracking-normal [-ms-overflow-style:none] [scrollbar-width:none] sm:text-sm [&::-webkit-scrollbar]:hidden"
          >
            {rows.map((row) => (
              <span
                key={row.label}
                className={`whitespace-pre ${row.kind === "output" ? "text-starlight" : "text-ink"}`}
              >
                {row.wave}
              </span>
            ))}
          </div>

          {canScroll && (
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              className="relative mt-1 h-4 shrink-0 cursor-pointer touch-none select-none"
            >
              <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-line" />
              <div
                className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-starlight transition-[left,box-shadow] duration-75 hover:shadow-[0_0_6px_oklch(0.75_0.14_250/0.5)]"
                style={{
                  width: `${thumbFraction * 100}%`,
                  left: `${thumbPosition * (1 - thumbFraction) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <p aria-hidden="true" className="mt-6 border-t border-line pt-4 font-mono text-xs text-muted">
        <span className="text-ink">-</span> high &nbsp;·&nbsp;{" "}
        <span className="text-ink">_</span> low &nbsp;·&nbsp;{" "}
        <span className="text-ink">x</span> undefined
      </p>
    </div>
  );
}
