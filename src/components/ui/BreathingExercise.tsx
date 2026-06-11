"use client";
import { useEffect, useRef, useState } from "react";

// 4s inhale, 4s hold, 6s exhale — must match guidedBreath keyframes (14s total)
const PHASES = [
  { label: "Breathe in", duration: 4000 },
  { label: "Hold", duration: 4000 },
  { label: "Breathe out", duration: 6000 },
] as const;

export default function BreathingExercise() {
  const [active, setActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    timerRef.current = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, phaseIndex]);

  function toggle() {
    if (active) {
      setActive(false);
      setPhaseIndex(0);
    } else {
      setActive(true);
      setPhaseIndex(0);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Breathing circle */}
      <button
        onClick={toggle}
        aria-label={active ? "Stop breathing exercise" : "Start breathing exercise"}
        className="relative w-44 h-44 flex items-center justify-center focus-visible:outline-offset-8 rounded-full"
      >
        {/* Outer glow ring */}
        <span
          className={`absolute inset-0 rounded-full blur-xl ${active ? "animate-guided-breath" : ""}`}
          style={{
            background: "radial-gradient(circle, rgba(159,122,234,0.35), rgba(129,140,248,0.15))",
            transform: active ? undefined : "scale(0.7)",
          }}
        />
        {/* Main circle */}
        <span
          className={`relative w-32 h-32 rounded-full flex items-center justify-center ${active ? "animate-guided-breath" : ""}`}
          style={{
            background: "radial-gradient(circle at 35% 35%, #c4b5fd, #9f7aea 55%, #818cf8)",
            boxShadow: "0 0 32px rgba(159,122,234,0.35)",
            transform: active ? undefined : "scale(0.7)",
            transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="text-white text-sm font-semibold tracking-wide">
            {active ? PHASES[phaseIndex].label : "Begin"}
          </span>
        </span>
      </button>

      <p className="text-[#94a3b8] text-xs leading-relaxed text-center max-w-xs" aria-live="polite">
        {active
          ? "Follow the circle. In for 4, hold for 4, out for 6. Tap to stop."
          : "A slow breath can steady you in a hard moment. Tap the circle to begin."}
      </p>
    </div>
  );
}
