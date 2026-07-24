/**
 * Starfield — the signature ambient background (see DESIGN.md).
 * Pure CSS, fixed behind all content. Static by default; a barely-perceptible
 * drift is added only under `prefers-reduced-motion: no-preference` (in CSS).
 */
export function Starfield() {
  return <div className="starfield" aria-hidden="true" />;
}
