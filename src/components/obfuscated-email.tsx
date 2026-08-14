"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/button-link";

type ObfuscatedEmailProps = {
  user: string;
  domain: string;
  resumeUrl: string | null;
};

const subscribeNoop = () => () => {};
const COPIED_DURATION_MS = 1800;

/**
 * Reassembles the email address client-side so it never appears as a plain
 * string in server-rendered HTML — keeps address scrapers from reading it
 * directly out of the page source. useSyncExternalStore gives an SSR-safe
 * "is this the client, post-hydration" flag without setState-in-effect.
 */
export function ObfuscatedEmail({ user, domain, resumeUrl }: ObfuscatedEmailProps) {
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const email = isClient ? `${user}@${domain}` : null;

  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, []);

  async function handleCopy() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setCopied(false), COPIED_DURATION_MS);
  }

  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Email</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={email ? `mailto:${email}` : undefined}
          aria-disabled={!email}
          className="text-2xl font-semibold text-ink transition-colors hover:text-starlight sm:text-3xl"
        >
          {email ?? `${user} [at] ${domain}`}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!email}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-starlight disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={`inline-flex transition-transform duration-200 ${
              copied ? "scale-110 text-signal" : "scale-100"
            }`}
          >
            {copied ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8.75" y="8.75" width="10.5" height="10.5" rx="1.75" />
                <path d="M15.25 8.75V6.75A1.5 1.5 0 0 0 13.75 5.25h-8A1.5 1.5 0 0 0 4.25 6.75v8a1.5 1.5 0 0 0 1.5 1.5h2" />
              </svg>
            )}
          </span>
        </button>

        <span
          aria-live="polite"
          className={`font-mono text-xs uppercase tracking-[0.16em] text-signal transition-opacity duration-200 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          {copied ? "Copied" : ""}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink
          href={email ? `mailto:${email}` : "#"}
          variant="primary"
          external={Boolean(email)}
          aria-disabled={!email}
        >
          Send an email
        </ButtonLink>
        {resumeUrl ? (
          <ButtonLink href={resumeUrl} variant="secondary" download>
            Download Resume
          </ButtonLink>
        ) : (
          <span className="ds-btn ds-btn-secondary cursor-default opacity-60">
            Resume — coming soon
          </span>
        )}
      </div>
    </>
  );
}
