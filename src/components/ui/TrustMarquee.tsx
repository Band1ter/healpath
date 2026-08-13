"use client";

// Real organizations HealPath connects survivors to. A quiet trust signal,
// not a sponsorship claim — these are the sources behind the resource directory.
const SOURCES = [
  "National DV Hotline",
  "RAINN",
  "WomensLaw.org",
  "NJCEDV",
  "Women Aware",
  "Manavi",
  "Center for Empowerment",
  "988 Lifeline",
];

// Rendered as a static, wrapping list rather than a scrolling marquee.
// Auto-moving content is a WCAG 2.2.2 concern and was flagged in review as
// distracting; for readers who may be in distress, stillness is kinder.
export default function TrustMarquee() {
  return (
    <ul className="flex flex-wrap justify-center gap-2.5 list-none p-0 m-0">
      {SOURCES.map((name) => (
        <li
          key={name}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131b2e] border border-[#2a3555] text-sm text-[#94a3b8]"
        >
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#9f7aea]" />
          {name}
        </li>
      ))}
    </ul>
  );
}
