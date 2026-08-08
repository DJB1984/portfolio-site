"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ImageSlot as ImageSlotData } from "@/data/site";
import { ImageSlot } from "@/components/image-slot";

type ZoomableImageProps = {
  image: ImageSlotData;
  sizes?: string;
};

/** An image with a click-to-enlarge lightbox. */
export function ZoomableImage({ image, sizes }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!image.src) {
    return <ImageSlot image={image} sizes={sizes} />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block h-full w-full cursor-zoom-in"
        aria-label={`Enlarge image: ${image.alt}`}
      >
        <ImageSlot image={image} sizes={sizes} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-void/70 text-ink backdrop-blur-sm transition-transform duration-200 group-hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.75 3.75h6M3.75 3.75v6M3.75 3.75l6 6M20.25 3.75h-6M20.25 3.75v6M20.25 3.75l-6 6M3.75 20.25h6M3.75 20.25v-6M3.75 20.25l6-6M20.25 20.25h-6M20.25 20.25v-6M20.25 20.25l-6-6" />
          </svg>
        </span>
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={image.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void py-6"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close enlarged image"
              className="absolute right-5 top-5 rounded-full border border-line bg-surface/80 p-2 text-ink hover:text-starlight"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1000}
              sizes="100vw"
              className="h-auto w-auto max-h-[calc(100vh-3rem)] max-w-[100vw] rounded-lg border border-line object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
