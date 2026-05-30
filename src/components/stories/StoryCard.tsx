"use client";
import { useState } from "react";
import { Story } from "@/types/story";

const CATEGORY_LABELS: Record<Story["category"], string> = {
  "domestic-violence": "Domestic Violence",
  "sexual-assault": "Sexual Assault",
  both: "DV & Sexual Assault",
  other: "Other",
};

const CATEGORY_COLORS: Record<Story["category"], { bg: string; color: string }> = {
  "domestic-violence": { bg: "#1c2444", color: "#c4b5fd" },
  "sexual-assault":    { bg: "#1a1a30", color: "#818cf8" },
  both:                { bg: "#0f1e18", color: "#34D399" },
  other:               { bg: "#1c2640", color: "#94a3b8" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const TRUNCATE_LENGTH = 300;

export default function StoryCard({ story }: { story: Story }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = story.body.length > TRUNCATE_LENGTH;
  const displayText = isLong && !expanded ? story.body.slice(0, TRUNCATE_LENGTH) + "…" : story.body;
  const cat = CATEGORY_COLORS[story.category];

  return (
    <div className="bg-[#131b2e] rounded-2xl border border-[#2a3555] p-5 hover:border-[#9f7aea] card-lift">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-lg"
          style={{ background: cat.bg, color: cat.color }}
        >
          {CATEGORY_LABELS[story.category]}
        </span>
        <span className="text-xs text-[#94a3b8]">{timeAgo(story.timestamp)}</span>
      </div>

      {story.title && (
        <h3 className="font-heading font-semibold text-[#f1f5f9] mb-2 text-base">
          {story.title}
        </h3>
      )}

      <p className="text-[#94a3b8] text-sm leading-relaxed">{displayText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-[#c4b5fd] hover:text-white font-medium transition-colors duration-150"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
