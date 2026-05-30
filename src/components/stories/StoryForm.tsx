"use client";
import { useState } from "react";
import { Story, StoryCategory } from "@/types/story";

interface StoryFormProps {
  onStoryAdded: (story: Story) => void;
}

export default function StoryForm({ onStoryAdded }: StoryFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<StoryCategory>("domestic-violence");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (body.trim().length < 10) {
      setError("Please write at least a few words before sharing.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const newStory: Story = await res.json();
      onStoryAdded(newStory);
      setTitle("");
      setBody("");
      setCategory("domestic-violence");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#131b2e] rounded-2xl border border-[#2a3555] p-6 mb-8">
      <h2 className="font-heading font-semibold text-[#f1f5f9] text-lg mb-1">
        Share your story
      </h2>
      <p className="text-sm text-[#94a3b8] mb-5">
        Anonymous. No name, no account, no tracking.
      </p>

      {success && (
        <div className="mb-4 bg-[#1a2e1a] border border-[#34D399]/30 text-[#34D399] text-sm rounded-xl px-4 py-3">
          Your story has been shared. Thank you for your courage.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="story-title" className="block text-sm font-medium text-[#94a3b8] mb-1">
            Title <span className="text-[#3D2B6B] font-normal">(optional)</span>
          </label>
          <input
            id="story-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Give your story a title..."
            className="w-full rounded-xl border border-[#2a3555] bg-[#1c2640] px-4 py-2.5 text-sm text-[#f1f5f9] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
          />
        </div>

        <div>
          <label htmlFor="story-body" className="block text-sm font-medium text-[#94a3b8] mb-1">
            Your story <span className="text-[#FF4D6A]">*</span>
          </label>
          <textarea
            id="story-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            maxLength={5000}
            placeholder="Share what you feel comfortable sharing..."
            className="w-full rounded-xl border border-[#2a3555] bg-[#1c2640] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#9f7aea] resize-none"
          />
          <p className="text-xs text-[#94a3b8] mt-1 text-right">{body.length}/5000</p>
        </div>

        <div>
          <label htmlFor="story-category" className="block text-sm font-medium text-[#94a3b8] mb-1">
            Category
          </label>
          <select
            id="story-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="w-full rounded-xl border border-[#2a3555] bg-[#1c2640] px-4 py-2.5 text-sm text-[#F0EBF8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          >
            <option value="domestic-violence">Domestic Violence</option>
            <option value="sexual-assault">Sexual Assault</option>
            <option value="both">Both</option>
            <option value="other">Other</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-[#FF4D6A] bg-[#2e1a1a] border border-[#FF4D6A]/30 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start flex items-center gap-2 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
        >
          {isSubmitting && (
            <svg className="animate-spin w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {isSubmitting ? "Sharing…" : "Share Anonymously"}
        </button>
      </form>
    </div>
  );
}
