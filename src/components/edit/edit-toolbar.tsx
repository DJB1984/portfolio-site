"use client";

import { lockAction } from "@/lib/edit-actions";
import { useEditMode } from "@/components/edit/edit-mode-provider";

/**
 * A fixed bar shown only in edit mode. Explains the controls and offers a way
 * out. Never rendered for normal visitors (edit mode is off).
 */
export function EditToolbar() {
  const editMode = useEditMode();
  if (!editMode) return null;

  return (
    <div
      role="region"
      aria-label="Edit mode"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/90 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8">
        <p className="flex items-center gap-2.5 font-mono text-xs text-muted">
          <span aria-hidden="true" className="glow-dot" />
          <span className="text-ink">Edit mode.</span> Click any heading or
          paragraph to edit it, or an image box to upload.
        </p>
        <form action={lockAction}>
          <button type="submit" className="ds-btn ds-btn-secondary">
            Exit edit mode
          </button>
        </form>
      </div>
    </div>
  );
}
