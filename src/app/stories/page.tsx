"use client";
import { useState, useEffect, useRef } from "react";
import { Story } from "@/types/story";
import StoryForm from "@/components/stories/StoryForm";
import StoryWall from "@/components/stories/StoryWall";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stories")
      .then((r) => r.json())
      .then((data) => setStories(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleStoryAdded(story: Story) {
    setStories((prev) => [story, ...prev]);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pb-20">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#F0EBF8] mb-2">
          Stories from our community
        </h1>
        <p className="text-[#9B8AC4] leading-relaxed max-w-xl mx-auto">
          Every story here is anonymous. These words take courage. Click any card to read it in full.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#9B8AC4]">
          <p>Loading stories…</p>
        </div>
      ) : (
        <div
          ref={wallRef}
          className={paused ? "story-wall-paused" : ""}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <StoryWall stories={stories} />
        </div>
      )}

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 border-t border-[#3D2B6B]" />
        <span className="text-sm text-[#9B8AC4] shrink-0">Share your story</span>
        <div className="flex-1 border-t border-[#3D2B6B]" />
      </div>

      <div className="max-w-2xl mx-auto">
        <StoryForm onStoryAdded={handleStoryAdded} />
      </div>
    </div>
  );
}
