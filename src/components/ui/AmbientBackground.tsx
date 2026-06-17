"use client";
import { useEffect, useRef } from "react";

/**
 * Soft floating gradient orbs that drift on their own and react gently to the
 * pointer (parallax). Purely decorative, sits behind content, pointer-events none.
 */
export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el!.style.setProperty("--px", `${x * 18}px`);
        el!.style.setProperty("--py", `${y * 18}px`);
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ transform: "translate(var(--px,0), var(--py,0))", transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div
        className="ambient-orb float-slow"
        style={{ width: 420, height: 420, top: "-6%", left: "-8%", background: "radial-gradient(circle, rgba(159,122,234,0.30), transparent 70%)" }}
      />
      <div
        className="ambient-orb float-slower"
        style={{ width: 360, height: 360, top: "30%", right: "-10%", background: "radial-gradient(circle, rgba(129,140,248,0.26), transparent 70%)" }}
      />
      <div
        className="ambient-orb float-slow"
        style={{ width: 300, height: 300, bottom: "-8%", left: "20%", background: "radial-gradient(circle, rgba(196,181,253,0.18), transparent 70%)" }}
      />
    </div>
  );
}
