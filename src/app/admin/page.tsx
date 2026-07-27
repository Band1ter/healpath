"use client";
import { useState } from "react";
import { Story } from "@/types/story";

interface Metrics {
  sessions: number;
  messages: number;
}

const CATEGORY_LABELS: Record<Story["category"], string> = {
  "domestic-violence": "Domestic Violence",
  "sexual-assault": "Sexual Assault",
  both: "Both",
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

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const res = await fetch("/api/stories");
    if (res.ok) {
      const data = await res.json();
      setStories(data);
      setAuthenticated(true);
      // Load impact metrics (anonymous counters)
      fetch("/api/metrics")
        .then((r) => (r.ok ? r.json() : null))
        .then((m) => m && setMetrics(m))
        .catch(() => {});
    } else {
      setAuthError("Could not load stories.");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this story? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch("/api/stories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": secret,
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setStories((prev) => prev.filter((s) => s.id !== id));
    } else {
      const data = await res.json();
      alert(
        data.error === "Unauthorized"
          ? "Wrong admin secret. Check ADMIN_SECRET in .env.local."
          : `Delete failed: ${data.error}`
      );
    }
    setDeletingId(null);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F0A1E]">
        <div className="bg-[#1A1030] rounded-2xl border border-[#3D2B6B] p-8 max-w-sm w-full">
          <h1 className="font-heading font-semibold text-[#F0EBF8] text-xl mb-1">
            Story Admin
          </h1>
          <p className="text-sm text-[#9B8AC4] mb-6">
            Enter your <code className="bg-[#241840] px-1 rounded text-[#A78BFA]">ADMIN_SECRET</code> from <code className="bg-[#241840] px-1 rounded text-[#A78BFA]">.env.local</code>
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin secret..."
              className="rounded-xl border border-[#3D2B6B] bg-[#241840] px-4 py-2.5 text-sm text-[#F0EBF8] placeholder-[#9B8AC4] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              required
            />
            {authError && <p className="text-xs text-[#FF4D6A]">{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="text-white rounded-full py-2.5 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
            >
              {loading ? "Loading…" : "Enter Admin Panel"}
            </button>
          </form>
          <p className="text-xs text-[#9B8AC4] mt-4 text-center">
            Default secret: <code className="text-[#A78BFA]">healpath-dev-secret</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-[#F0EBF8]">
            Story Moderation
          </h1>
          <p className="text-sm text-[#9B8AC4] mt-1">
            {stories.length} stories · Delete any that are harmful or spammy
          </p>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-xs text-[#9B8AC4] hover:text-[#F0EBF8] border border-[#3D2B6B] hover:border-[#7C3AED] px-3 py-1.5 rounded-full transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Impact metrics — anonymous aggregate counters */}
      <div className="mb-8">
        <h2 className="font-heading text-lg font-semibold text-[#F0EBF8] mb-1">
          Impact
        </h2>
        <p className="text-xs text-[#9B8AC4] mb-3">
          Anonymous totals since launch. No message content is ever stored.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl px-5 py-4">
            <p className="font-heading text-3xl font-semibold text-[#A78BFA]">
              {metrics ? metrics.sessions.toLocaleString() : "—"}
            </p>
            <p className="text-xs text-[#9B8AC4] mt-1">Chat sessions</p>
          </div>
          <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl px-5 py-4">
            <p className="font-heading text-3xl font-semibold text-[#A78BFA]">
              {metrics ? metrics.messages.toLocaleString() : "—"}
            </p>
            <p className="text-xs text-[#9B8AC4] mt-1">Messages to Sage</p>
          </div>
        </div>
      </div>

      <h2 className="font-heading text-lg font-semibold text-[#F0EBF8] mb-3">
        Story moderation
      </h2>

      {stories.length === 0 ? (
        <p className="text-center text-[#9B8AC4] py-16">No stories to moderate.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {stories.map((story) => {
            const cat = CATEGORY_COLORS[story.category];
            return (
              <div
                key={story.id}
                className="bg-[#1A1030] rounded-2xl border border-[#3D2B6B] p-5 flex gap-4 items-start"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: cat.bg, color: cat.color }}
                    >
                      {CATEGORY_LABELS[story.category]}
                    </span>
                    <span className="text-xs text-[#9B8AC4]">{timeAgo(story.timestamp)}</span>
                  </div>
                  {story.title && (
                    <p className="font-medium text-[#F0EBF8] text-sm mb-1">{story.title}</p>
                  )}
                  <p className="text-[#9B8AC4] text-xs leading-relaxed line-clamp-3">
                    {story.body}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(story.id)}
                  disabled={deletingId === story.id}
                  className="shrink-0 text-xs text-[#FF4D6A] hover:text-white border border-[#FF4D6A]/30 hover:border-[#FF4D6A] px-3 py-1.5 rounded-full transition-colors disabled:opacity-40"
                >
                  {deletingId === story.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
