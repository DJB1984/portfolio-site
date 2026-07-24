"use client";

import { useEffect, useRef } from "react";

/**
 * The Starfield — signature ambient background (see DESIGN.md).
 *
 * Base layer: a static CSS field (rendered by `.starfield`) that always works
 * with no JS and under prefers-reduced-motion.
 *
 * Enhanced layer: a Canvas "Living Star Chart" that takes over when motion is
 * welcome and canvas is supported — parallax depth layers, near-imperceptible
 * twinkle, and a faint constellation whose bright anchor stars stand for the
 * live projects. Calm by design: tiny parallax, low twinkle, pauses when the
 * tab is hidden, and it yields back to the static field under reduced motion.
 */

// Canvas rendering of the --color-ink and --color-starlight tokens. Canvas 2D
// needs numeric rgba (oklch canvas support is not universal), so these mirror
// the DESIGN.md palette as their sRGB equivalents.
const INK = "232, 236, 244";
const STARLIGHT = "150, 180, 235";

type Star = {
  x: number; // normalized 0..1
  y: number;
  r: number;
  base: number; // base alpha
  amp: number; // twinkle amplitude
  phase: number;
  tw: number; // twinkle speed
  pf: number; // parallax factor (depth)
  blue: boolean;
};

type Anchor = { x: number; y: number; r: number; phase: number; pf: number };

export function Starfield({ anchors = 2 }: { anchors?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!containerEl || !canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Non-null locals so the nested animation closures stay well-typed.
    const container = containerEl;
    const canvas = canvasEl;
    const ctx = context;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let anchorPts: Anchor[] = [];
    let startTime = 0;

    // pointer: eased current toward target, normalized -0.5..0.5
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollY = 0;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(240, Math.round((w * h) / 9000));
      const layers = [
        { pf: 0.006, rmin: 0.4, rmax: 0.8, amin: 0.16, amax: 0.36, share: 0.55 },
        { pf: 0.014, rmin: 0.7, rmax: 1.1, amin: 0.28, amax: 0.52, share: 0.3 },
        { pf: 0.026, rmin: 1.0, rmax: 1.7, amin: 0.42, amax: 0.72, share: 0.15 },
      ];
      stars = [];
      for (const L of layers) {
        const n = Math.round(count * L.share);
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random(),
            y: Math.random(),
            r: L.rmin + Math.random() * (L.rmax - L.rmin),
            base: L.amin + Math.random() * (L.amax - L.amin),
            amp: 0.06 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2,
            tw: 0.4 + Math.random() * 0.7,
            pf: L.pf,
            blue: Math.random() < 0.22,
          });
        }
      }

      // Constellation anchors in the hero's upper-right negative space, so they
      // never sit under the (left-aligned) hero text.
      anchorPts = [];
      const n = Math.max(0, anchors);
      for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0.5 : i / (n - 1);
        anchorPts.push({
          x: 0.6 + t * 0.28 + (Math.random() - 0.5) * 0.03,
          y: 0.16 + (i % 2) * 0.1 + (Math.random() - 0.5) * 0.02,
          r: 1.7 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          pf: 0.03,
        });
      }
    }

    function pos(nx: number, ny: number, pf: number): [number, number] {
      const ox = pointer.x * pf * w * 0.6;
      const oy = pointer.y * pf * h * 0.6 + scrollY * pf * 0.5;
      return [nx * w + ox, ny * h + oy];
    }

    function draw(now: number) {
      const t = (now - startTime) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const [x, y] = pos(s.x, s.y, s.pf);
        const a = Math.max(0, Math.min(1, s.base + Math.sin(t * s.tw + s.phase) * s.amp));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.blue ? STARLIGHT : INK}, ${a.toFixed(3)})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (anchorPts.length > 1) {
        ctx.beginPath();
        anchorPts.forEach((p, i) => {
          const [x, y] = pos(p.x, p.y, p.pf);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = `rgba(${STARLIGHT}, 0.16)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const p of anchorPts) {
        const [x, y] = pos(p.x, p.y, p.pf);
        const a = 0.6 + Math.sin(t * 0.8 + p.phase) * 0.18;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r * 6);
        glow.addColorStop(0, `rgba(${STARLIGHT}, ${(a * 0.9).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${STARLIGHT}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${INK}, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running || reduceMq.matches) return;
      running = true;
      if (stars.length === 0) build();
      container.setAttribute("data-canvas", "on");
      if (!startTime) startTime = performance.now();
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      container.removeAttribute("data-canvas");
      ctx.clearRect(0, 0, w, h);
    }

    let resizeTimer = 0;
    function onResize() {
      if (!running) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    }
    function onPointer(e: PointerEvent) {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    }
    function onScroll() {
      scrollY = window.scrollY;
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (!reduceMq.matches) {
        running = false; // allow start() to re-arm
        start();
      }
    }
    function onReduceChange() {
      if (reduceMq.matches) stop();
      else start();
    }

    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", onReduceChange);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", onReduceChange);
      container.removeAttribute("data-canvas");
    };
  }, [anchors]);

  return (
    <div ref={containerRef} className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} className="starfield-canvas" />
    </div>
  );
}
