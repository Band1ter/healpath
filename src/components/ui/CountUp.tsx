"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Numeric target. If the stat isn't numeric (e.g. "AI"), pass `text` instead. */
  value?: number;
  text?: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function CountUp({ value, text, suffix = "", prefix = "", duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value !== undefined ? 0 : text ?? "");
  const started = useRef(false);

  useEffect(() => {
    if (text !== undefined || value === undefined) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.round(eased * value));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, text, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
