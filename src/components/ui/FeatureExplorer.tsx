"use client";
import { useState } from "react";
import Link from "next/link";

interface Feature {
  id: string;
  tab: string;
  title: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
  accent: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    id: "sage",
    tab: "Talk to Sage",
    title: "A companion that listens, any hour",
    body: "Sage is a trauma-informed AI trained to hold space without judgment. Start whenever you're ready — no account, nothing saved.",
    bullets: ["Available 24/7, instantly", "Never stores your conversation", "Gently points to real resources"],
    href: "/chat",
    cta: "Start a chat",
    accent: "#9f7aea",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    id: "stories",
    tab: "Read Stories",
    title: "You are not the only one",
    body: "Real, anonymous stories from other survivors. Reading them can make the first step feel less lonely — and you can add yours when you're ready.",
    bullets: ["Fully anonymous, always", "Filter by what you relate to", "Share your own in seconds"],
    href: "/stories",
    cta: "Read stories",
    accent: "#818cf8",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "resources",
    tab: "Find Help",
    title: "Free help, mapped for you",
    body: "Over 30 vetted hotlines, legal aid offices, shelters, and clinics across NJ and NYC. Filter by what you need and where you are.",
    bullets: ["Free or low-cost, no police report needed", "Legal, medical, shelter, and crisis lines", "Teen-, LGBTQ+-, and language-aware"],
    href: "/resources",
    cta: "Browse resources",
    accent: "#34D399",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

export default function FeatureExplorer() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FEATURES.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded-xl text-sm font-medium border transition-[background,color,border-color] duration-200"
            style={
              active === i
                ? { background: `${f.accent}1f`, borderColor: f.accent, color: "#f1f5f9" }
                : { borderColor: "#2a3555", color: "#94a3b8", background: "transparent" }
            }
          >
            {f.tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        key={feature.id}
        className="grid sm:grid-cols-[auto,1fr] gap-6 items-start bg-[#131b2e] border border-[#2a3555] rounded-2xl p-7 animate-modal-in"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${feature.accent}1f`, color: feature.accent }}
        >
          {feature.icon}
        </div>
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#f1f5f9] mb-2">
            {feature.title}
          </h3>
          <p className="text-[#94a3b8] leading-relaxed mb-5">{feature.body}</p>
          <ul className="flex flex-col gap-2 mb-6">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[#f1f5f9]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={feature.accent} className="w-4 h-4 mt-0.5 shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <Link
            href={feature.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm tilt-hover"
            style={{ background: `linear-gradient(135deg, ${feature.accent}, #818cf8)` }}
          >
            {feature.cta}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
