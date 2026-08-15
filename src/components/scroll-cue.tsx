"use client";

import { useEffect, useState } from "react";

/**
 * A quiet "more below" chevron pinned to the viewport bottom. Visible only
 * near the top of the page; fades out as soon as the visitor scrolls, and
 * stays dismissed even if they scroll back up to the top.
 */
export function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 24) setVisible(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      data-visible={visible ? "true" : "false"}
      className="scroll-cue pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center sm:bottom-8"
    >
      <svg
        width="18"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        className="scroll-cue-mark text-starlight"
      >
        <path
          d="M9 1V16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M3.5 14L9 20L14.5 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
