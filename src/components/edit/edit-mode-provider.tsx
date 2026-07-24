"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { EDIT_UI_COOKIE } from "@/lib/edit-config";

const EditModeContext = createContext<boolean>(false);

/** The cookie only changes across full navigations (unlock/lock redirect). */
function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c === `${EDIT_UI_COOKIE}=1`);
}

/** Server and first client render agree on read-only, avoiding a mismatch. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Provides edit-mode state, derived from the (non-secret) UI flag cookie via
 * useSyncExternalStore so SSR renders read-only and the client hydrates cleanly,
 * then reveals edit chrome for the authenticated editor. Writes stay gated by
 * the httpOnly token on the server regardless of this flag.
 */
export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const editMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <EditModeContext.Provider value={editMode}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode(): boolean {
  return useContext(EditModeContext);
}
