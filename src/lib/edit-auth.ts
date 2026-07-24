// Server-only module: uses node:crypto and next/headers. Never import from a
// Client Component — these APIs are unavailable in the browser bundle.
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { EDIT_TOKEN_COOKIE } from "@/lib/edit-config";

/** Edit mode is only ever available while running the local dev server. */
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * The token we store in the auth cookie: a hash of EDIT_PASSWORD. Forging it
 * requires knowing the password. Returns null if no password is configured.
 */
export function expectedToken(): string | null {
  const password = process.env.EDIT_PASSWORD;
  if (!password) return null;
  return crypto.createHash("sha256").update(password).digest("hex");
}

/** Hash a candidate password the same way, for comparison. */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/** Constant-time compare of two equal-length hex strings. */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * True only when: running in dev, a password is configured, and the request
 * carries a valid auth cookie. This is the gate every write must pass.
 */
export async function isEditAuthorized(): Promise<boolean> {
  if (!isDev()) return false;
  const token = expectedToken();
  if (!token) return false;
  const store = await cookies();
  const cookieToken = store.get(EDIT_TOKEN_COOKIE)?.value;
  if (!cookieToken) return false;
  return safeEqual(cookieToken, token);
}
