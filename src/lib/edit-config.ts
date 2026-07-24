/**
 * Shared constants for edit mode. Safe to import from client or server
 * (no secrets, no Node APIs here).
 */

/** httpOnly cookie holding the auth token. Server-only; never read by client JS. */
export const EDIT_TOKEN_COOKIE = "pf_edit_token";

/**
 * Non-httpOnly flag that tells the client to render edit chrome. Forging this
 * only reveals the UI — every write is independently re-authorized server-side
 * (valid token + development only), so a forged flag can never persist anything.
 */
export const EDIT_UI_COOKIE = "pf_edit_ui";

/** Session length for the edit cookies (8 hours). */
export const EDIT_MAX_AGE = 60 * 60 * 8;
