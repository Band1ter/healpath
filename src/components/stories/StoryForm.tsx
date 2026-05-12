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
    <div className="bg-[#1A1030] rounded-2xl border border-[#3D2B6B] p-6 mb-8">
      <h2 className="font-heading font-semibold text-[#F0EBF8] text-lg mb-1">
        Share your story
      </h2>
      <p className="text-sm text-[#9B8AC4] mb-5">
        Anonymous. No name, no account, no tracking.
      </p>

      {success && (
        <div className="mb-4 bg-[#1a2e1a] border border-[#34D399]/30 text-[#34D399] text-sm rounded-xl px-4 py-3">
          Your story has been shared. Thank you for your courage.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="story-title" className="block text-sm font-medium text-[#9B8AC4] mb-1">
            Title <span className="text-[#3D2B6B] font-normal">(optional)</span>
          </label>
          <input
            id="story-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Give your story a title..."
            className="w-full rounded-xl border border-[#3D2B6B] bg-[#241840] px-4 py-2.5 text-sm text-[#F0EBF8] placeholder-[#9B8AC4] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
        </div>

        <div>
          <label htmlFor="story-body" className="block text-sm font-medium text-[#9B8AC4] mb-1">
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
            className="w-full rounded-xl border border-[#3D2B6B] bg-[#241840] px-4 py-3 text-sm text-[#F0EBF8] placeholder-[#9B8AC4] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-none"
          />
          <p className="text-xs text-[#9B8AC4] mt-1 text-right">{body.length}/5000</p>
        </div>

        <div>
          <label htmlFor="story-category" className="block text-sm font-medium text-[#9B8AC4] mb-1">
            Category
          </label>
          <select
            id="story-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="w-full rounded-xl border border-[#3D2B6B] bg-[#241840] px-4 py-2.5 text-sm text-[#F0EBF8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
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
          className="self-start text-white font-medium px-6 py-2.5 rounded-full text-sm transition-opacity hover:opacity-80 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
        >
          {isSubmitting ? "Sharing…" : "Share Anonymously"}
        </button>
      </form>
    </div>
  );
}
