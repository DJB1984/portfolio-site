"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  EDIT_MAX_AGE,
  EDIT_TOKEN_COOKIE,
  EDIT_UI_COOKIE,
} from "@/lib/edit-config";
import {
  expectedToken,
  hashPassword,
  isDev,
  isEditAuthorized,
  safeEqual,
} from "@/lib/edit-auth";
import { readManifestFresh, writeManifest } from "@/content/manifest";

export type UnlockState = { error?: string };

/** Validate the password, then turn on edit mode via cookies. */
export async function unlockAction(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  if (!isDev()) {
    return { error: "Editing is only available while running locally (npm run dev)." };
  }
  const token = expectedToken();
  if (!token) {
    return { error: "EDIT_PASSWORD is not set. Add it to .env.local and restart." };
  }
  const password = String(formData.get("password") ?? "");
  if (!safeEqual(hashPassword(password), token)) {
    return { error: "Incorrect password." };
  }

  const store = await cookies();
  const base = {
    path: "/",
    sameSite: "lax" as const,
    maxAge: EDIT_MAX_AGE,
  };
  // Auth proof — httpOnly so page scripts can't read it.
  store.set(EDIT_TOKEN_COOKIE, token, { ...base, httpOnly: true });
  // UI flag — readable by the client so it can show edit chrome.
  store.set(EDIT_UI_COOKIE, "1", { ...base, httpOnly: false });

  redirect("/");
}

/** Turn edit mode off. */
export async function lockAction(): Promise<void> {
  const store = await cookies();
  store.delete(EDIT_TOKEN_COOKIE);
  store.delete(EDIT_UI_COOKIE);
  redirect("/");
}

export type SaveResult = { ok: boolean; error?: string };

/** Persist a text edit into the content manifest. */
export async function saveTextAction(
  fieldPath: string,
  value: string,
): Promise<SaveResult> {
  if (!(await isEditAuthorized())) {
    return { ok: false, error: "Not authorized." };
  }
  if (!fieldPath || typeof value !== "string") {
    return { ok: false, error: "Invalid edit." };
  }
  const manifest = await readManifestFresh();
  const trimmed = value.replace(/\r\n/g, "\n");
  if (trimmed.trim() === "") {
    // Clearing a field resets it to the site.ts default.
    delete manifest.text[fieldPath];
  } else {
    manifest.text[fieldPath] = trimmed;
  }
  await writeManifest(manifest);
  return { ok: true };
}

export type ImageSaveResult = { ok: boolean; src?: string; error?: string };

const ALLOWED_EXT = new Set(["png", "jpg", "jpeg", "webp", "gif", "avif", "svg"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/** Save an uploaded image into /public/uploads and record it in the manifest. */
export async function saveImageAction(
  formData: FormData,
): Promise<ImageSaveResult> {
  if (!(await isEditAuthorized())) {
    return { ok: false, error: "Not authorized." };
  }

  const fieldPath = String(formData.get("path") ?? "");
  const file = formData.get("file");
  if (!fieldPath) return { ok: false, error: "Missing field path." };
  if (!(file instanceof File)) return { ok: false, error: "No file provided." };
  if (file.size === 0) return { ok: false, error: "Empty file." };
  if (file.size > MAX_BYTES) return { ok: false, error: "Image is larger than 8 MB." };

  const ext = (file.name.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!ALLOWED_EXT.has(ext)) {
    return { ok: false, error: `Unsupported file type (.${ext || "?"}).` };
  }

  const safeBase = fieldPath.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const suffix = crypto.randomBytes(4).toString("hex");
  const fileName = `${safeBase}-${suffix}.${ext}`;

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), bytes);

  const publicPath = `/uploads/${fileName}`;
  const manifest = await readManifestFresh();
  manifest.images[fieldPath] = publicPath;
  await writeManifest(manifest);

  return { ok: true, src: publicPath };
}
