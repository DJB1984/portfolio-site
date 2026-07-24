"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ImageSlot as ImageSlotData } from "@/data/site";
import { ImageSlot } from "@/components/image-slot";
import { useEditMode } from "@/components/edit/edit-mode-provider";
import { saveImageAction } from "@/lib/edit-actions";

type EditableImageProps = {
  /** Image-slot path, e.g. "project.study-deck.cover". */
  path: string;
  image: ImageSlotData;
  priority?: boolean;
  sizes?: string;
};

type Status = "idle" | "uploading" | "error";

/**
 * In read-only mode this is exactly an ImageSlot. In edit mode, the slot
 * becomes a clickable dropzone: choose a file and it uploads into /public and
 * persists to the manifest. Keyboard-accessible via a real button + input.
 */
export function EditableImage({ path, image, priority, sizes }: EditableImageProps) {
  const editMode = useEditMode();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  if (!editMode) {
    return <ImageSlot image={image} priority={priority} sizes={sizes} />;
  }

  const shown = preview ? { ...image, src: preview } : image;

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setStatus("uploading");
    setError(null);

    const formData = new FormData();
    formData.set("path", path);
    formData.set("file", file);

    try {
      const result = await saveImageAction(formData);
      if (result.ok) {
        setStatus("idle");
        router.refresh();
      } else {
        setStatus("error");
        setError(result.error ?? "Upload failed.");
        setPreview(null);
      }
    } catch {
      setStatus("error");
      setError("Upload failed — check that the dev server is running.");
      setPreview(null);
    }
    // allow re-selecting the same file
    event.target.value = "";
  }

  const label = status === "uploading"
    ? "Uploading…"
    : image.src
      ? "Replace image"
      : "Upload image";

  return (
    <div className="group relative h-full w-full">
      <ImageSlot image={shown} priority={priority} sizes={sizes} />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status === "uploading"}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-void/70 font-mono text-xs text-ink opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 disabled:cursor-wait"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-starlight"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        {label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
        className="sr-only"
        onChange={onFile}
        aria-label={`Upload image: ${image.alt}`}
      />

      {error && (
        <p
          role="alert"
          className="absolute inset-x-0 bottom-0 bg-void/80 px-3 py-2 text-center font-mono text-xs text-nebula"
        >
          {error}
        </p>
      )}
    </div>
  );
}
