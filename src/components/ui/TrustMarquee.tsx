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

export default function TrustMarquee() {
  const items = [...SOURCES, ...SOURCES];
  return (
    <div className="marquee-mask marquee-pause overflow-hidden">
      <div className="animate-marquee flex w-max gap-3">
        {items.map((name, i) => (
          <span
            key={i}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131b2e] border border-[#2a3555] text-sm text-[#94a3b8] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9f7aea]" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
