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
  "domestic-violence": { bg: "#241840", color: "#A78BFA" },
  "sexual-assault":    { bg: "#2e1a28", color: "#EC4899" },
  both:                { bg: "#1a2e1a", color: "#34D399" },
  other:               { bg: "#241830", color: "#9B8AC4" },
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
    <div className="bg-[#1A1030] rounded-2xl border border-[#3D2B6B] p-5 hover:border-[#7C3AED] transition-colors">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: cat.bg, color: cat.color }}
        >
          {CATEGORY_LABELS[story.category]}
        </span>
        <span className="text-xs text-[#9B8AC4]">{timeAgo(story.timestamp)}</span>
      </div>

      {story.title && (
        <h3 className="font-heading font-semibold text-[#F0EBF8] mb-2 text-base">
          {story.title}
        </h3>
      )}

      <p className="text-[#9B8AC4] text-sm leading-relaxed">{displayText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-[#A78BFA] hover:text-white font-medium transition-colors"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
