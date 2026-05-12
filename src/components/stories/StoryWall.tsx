"use client";

import { useEffect, useRef, useState } from "react";
import { Story } from "@/types/story";
import { clsx } from "clsx";

const CATEGORY_COLORS: Record<Story["category"], string> = {
  "domestic-violence": "bg-[#1A1030] border-[#3D2B6B] hover:border-[#7C3AED]",
  "sexual-assault":    "bg-[#1A1030] border-[#3D2B6B] hover:border-[#EC4899]",
  both:                "bg-[#1A1030] border-[#3D2B6B] hover:border-[#34D399]",
  other:               "bg-[#1A1030] border-[#3D2B6B] hover:border-[#9B8AC4]",
};

const CATEGORY_BADGE: Record<Story["category"], { bg: string; color: string }> = {
  "domestic-violence": { bg: "#241840", color: "#A78BFA" },
  "sexual-assault":    { bg: "#2e1a28", color: "#EC4899" },
  both:                { bg: "#1a2e1a", color: "#34D399" },
  other:               { bg: "#241830", color: "#9B8AC4" },
};

const CATEGORY_LABELS: Record<Story["category"], string> = {
  "domestic-violence": "Domestic Violence",
  "sexual-assault": "Sexual Assault",
  both: "DV & Sexual Assault",
  other: "Other",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// A single scrolling column
function StoryColumn({
  stories,
  duration,
  reverse,
  onSelect,
}: {
  stories: Story[];
  duration: number;
  reverse: boolean;
  onSelect: (s: Story) => void;
}) {
  // Duplicate for seamless loop
  const doubled = [...stories, ...stories];

  return (
    <div className="flex flex-col gap-3 overflow-hidden relative" style={{ height: "100%" }}>
      <div
        className={clsx(
          "flex flex-col gap-3",
          reverse ? "animate-scroll-up-reverse" : "animate-scroll-up"
        )}
        style={{ "--scroll-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((story, i) => (
          <button
            key={`${story.id}-${i}`}
            onClick={() => onSelect(story)}
            className={clsx(
              "text-left rounded-2xl border p-4 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
              CATEGORY_COLORS[story.category]
            )}
          >
            {story.title && (
              <p className="font-heading font-semibold text-[#F0EBF8] text-sm mb-1 line-clamp-1">
                {story.title}
              </p>
            )}
            <p className="text-[#9B8AC4] text-xs leading-relaxed line-clamp-4">
              {story.body}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: CATEGORY_BADGE[story.category].bg, color: CATEGORY_BADGE[story.category].color }}
              >
                {CATEGORY_LABELS[story.category]}
              </span>
              <span className="text-xs text-[#9B8AC4]">{timeAgo(story.timestamp)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Modal for expanded story view
function StoryModal({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-3xl shadow-2xl max-w-lg w-full p-7 relative animate-modal-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9B8AC4] hover:text-[#F0EBF8] transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: CATEGORY_BADGE[story.category].bg, color: CATEGORY_BADGE[story.category].color }}
          >
            {CATEGORY_LABELS[story.category]}
          </span>
          <span className="text-xs text-[#9B8AC4]">{timeAgo(story.timestamp)}</span>
        </div>

        {story.title && (
          <h2 className="font-heading font-semibold text-[#F0EBF8] text-xl mb-3">
            {story.title}
          </h2>
        )}

        <p className="text-[#9B8AC4] leading-relaxed whitespace-pre-wrap text-sm">
          {story.body}
        </p>

        <p className="mt-6 text-xs text-[#9B8AC4] italic text-center">
          Shared anonymously · This community holds you.
        </p>
      </div>
    </div>
  );
}

interface StoryWallProps {
  stories: Story[];
}

export default function StoryWall({ stories }: StoryWallProps) {
  const [selected, setSelected] = useState<Story | null>(null);

  if (stories.length === 0) {
    return (
      <div className="text-center py-20 text-[#9B8AC4]">
        <p className="text-lg mb-1">No stories yet.</p>
        <p className="text-sm">Be the first to share above.</p>
      </div>
    );
  }

  // Split stories into 3 columns (cycle through)
  const col1 = stories.filter((_, i) => i % 3 === 0);
  const col2 = stories.filter((_, i) => i % 3 === 1);
  const col3 = stories.filter((_, i) => i % 3 === 2);

  // Pad short columns with items from others so animation looks full
  const pad = (arr: Story[], fallback: Story[]) =>
    arr.length >= 2 ? arr : [...arr, ...fallback.slice(0, 2)];

  return (
    <>
      <div className="relative overflow-hidden" style={{ height: "520px" }}>
        {/* Fade masks top and bottom */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0F0A1E] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F0A1E] to-transparent z-10 pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full px-1">
          <StoryColumn stories={pad(col1, stories)} duration={28} reverse={false} onSelect={setSelected} />
          <StoryColumn stories={pad(col2, stories)} duration={34} reverse={true} onSelect={setSelected} />
          <div className="hidden lg:block">
            <StoryColumn stories={pad(col3, stories)} duration={24} reverse={false} onSelect={setSelected} />
          </div>
        </div>
      </div>

      {selected && (
        <StoryModal story={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
