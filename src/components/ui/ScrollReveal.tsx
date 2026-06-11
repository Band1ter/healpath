"use client";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Set true when children are a grid/row that should stagger in */
  group?: boolean;
}

export default function ScrollReveal({ children, className = "", group = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = group
      ? Array.from(el.querySelectorAll<HTMLElement>(".reveal"))
      : [el];
    if (!group) el.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [group]);

  return (
    <div ref={ref} className={`${group ? "reveal-group" : ""} ${className}`}>
      {children}
    </div>
  );
}
