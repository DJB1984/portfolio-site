"use client";

import { useActionState } from "react";
import { unlockAction, type UnlockState } from "@/lib/edit-actions";

const initialState: UnlockState = {};

export function UnlockForm() {
  const [state, formAction, pending] = useActionState(unlockAction, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <label htmlFor="password" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        aria-describedby={state.error ? "unlock-error" : undefined}
        className="w-full rounded-md border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-starlight focus-visible:ring-2 focus-visible:ring-starlight/25"
        placeholder="Enter edit password"
      />

      {state.error && (
        <p id="unlock-error" role="alert" className="font-mono text-xs text-nebula">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="ds-btn ds-btn-primary mt-2 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Unlocking…" : "Unlock edit mode"}
      </button>
    </form>
  );
}
