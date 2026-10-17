"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/story";
import { clsx } from "clsx";

const CATEGORY_COLORS: Record<Story["category"], string> = {
  "domestic-violence": "bg-[#131b2e] border-[#2a3555] hover:border-[#9f7aea]",
  "sexual-assault":    "bg-[#131b2e] border-[#2a3555] hover:border-[#818cf8]",
  both:                "bg-[#131b2e] border-[#2a3555] hover:border-[#34D399]",
  other:               "bg-[#131b2e] border-[#2a3555] hover:border-[#94a3b8]",
};

const CATEGORY_BADGE: Record<Story["category"], { bg: string; color: string }> = {
  "domestic-violence": { bg: "#1c2444", color: "#c4b5fd" },
  "sexual-assault":    { bg: "#1a1a30", color: "#818cf8" },
  both:                { bg: "#0f1e18", color: "#34D399" },
  other:               { bg: "#1c2640", color: "#94a3b8" },
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

function StoryCard({
  story,
  onSelect,
}: {
  story: Story;
  onSelect: (s: Story) => void;
}) {
  return (
    <button
      onClick={() => onSelect(story)}
      className={clsx(
        "w-full h-full text-left rounded-2xl border p-4 card-lift cursor-pointer active:scale-[0.98]",
        CATEGORY_COLORS[story.category]
      )}
    >
      {story.title && (
        <p className="font-heading font-semibold text-[#f1f5f9] text-sm mb-1 line-clamp-1">
          {story.title}
        </p>
      )}
      <p className="text-[#94a3b8] text-xs leading-relaxed line-clamp-4">
        {story.body}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: CATEGORY_BADGE[story.category].bg, color: CATEGORY_BADGE[story.category].color }}
        >
          {CATEGORY_LABELS[story.category]}
        </span>
        <span className="text-xs text-[#94a3b8]">{timeAgo(story.timestamp)}</span>
      </div>
    </button>
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
      <div className="bg-[#131b2e] border border-[#2a3555] rounded-2xl shadow-2xl max-w-lg w-full p-7 relative animate-modal-in" style={{ backdropFilter: "blur(12px)" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#f1f5f9] transition-colors duration-150"
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
          <span className="text-xs text-[#94a3b8]">{timeAgo(story.timestamp)}</span>
        </div>

        {story.title && (
          <h2 className="font-heading font-semibold text-[#f1f5f9] text-xl mb-3">
            {story.title}
          </h2>
        )}

        <p className="text-[#94a3b8] leading-relaxed whitespace-pre-wrap text-sm">
          {story.body}
        </p>

        <p className="mt-6 text-xs text-[#94a3b8] italic text-center">
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
      <div className="text-center py-20 text-[#94a3b8]">
        <p className="text-lg mb-1">No stories yet.</p>
        <p className="text-sm">Be the first to share above.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
        {stories.map((story) => (
          <li key={story.id}>
            <StoryCard story={story} onSelect={setSelected} />
          </li>
        ))}
      </ul>

      {selected && (
        <StoryModal story={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
