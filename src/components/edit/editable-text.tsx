"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "@/components/edit/edit-mode-provider";
import { saveTextAction } from "@/lib/edit-actions";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type EditableTextProps = {
  /** Stable field path, e.g. "profile.shortBio" or "home.hero.headline". */
  path: string;
  /** Resolved current value (already merged with overrides on the server). */
  value: string;
  as?: Tag;
  className?: string;
  /** Allow newlines (paragraphs). Single-line by default (headings). */
  multiline?: boolean;
};

type Status = "idle" | "saving" | "saved" | "error";

/**
 * Click-to-edit inline text. In read-only mode it renders a plain element. In
 * edit mode the element becomes editable: type to change, blur or ⌘/Ctrl+Enter
 * to save, Escape to cancel. Saves persist into the content manifest.
 */
export function EditableText({
  path,
  value,
  as = "p",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const editMode = useEditMode();
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Keep the DOM text in sync when the server sends a new value (after refresh).
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const Tag = as as React.ElementType;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  async function commit() {
    const next = (ref.current?.innerText ?? "").replace(/ /g, " ").trim();
    if (next === value) {
      setStatus("idle");
      return;
    }
    setStatus("saving");
    try {
      const result = await saveTextAction(path, next);
      if (result.ok) {
        setStatus("saved");
        router.refresh();
        window.setTimeout(() => setStatus("idle"), 1600);
      } else {
        setStatus("error");
      }
    } catch {
      // Network / server-action failure — keep the typed value, surface error.
      setStatus("error");
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (ref.current) ref.current.innerText = value;
      ref.current?.blur();
      return;
    }
    if (event.key === "Enter" && (!multiline || event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      ref.current?.blur();
    }
  }

  const statusMessage =
    status === "saving"
      ? "Saving…"
      : status === "saved"
        ? "Saved."
        : status === "error"
          ? "Couldn't save. Check that the dev server is running and try again."
          : "";

  return (
    <>
      <Tag
        ref={ref}
        className={`editable-text ${className}`}
        data-status={status}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        role="textbox"
        aria-multiline={multiline}
        aria-label={`Edit ${path}`}
        title="Click to edit · Esc to cancel · clear to reset"
        tabIndex={0}
        onBlur={commit}
        onKeyDown={onKeyDown}
      >
        {value}
      </Tag>
      <span role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </span>
    </>
  );
}
