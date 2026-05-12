import { createClient } from "@supabase/supabase-js";
import { Story, StoryCategory } from "@/types/story";

// ─── Supabase client (only created when env vars are present) ────────────────
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ─── Seed stories shown when no DB is configured (local dev / demo) ──────────
const SEED_STORIES: Story[] = [
  {
    id: "seed-1",
    title: "The day I realized I deserved better",
    body: "For years I thought what was happening to me was normal. It took a stranger on a bus asking if I was okay to make me stop and think. That one question changed everything. I am safe now and I want others to know: you are not alone.",
    category: "domestic-violence",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "seed-2",
    title: "They believed me",
    body: "I was afraid to go to the hospital because I thought no one would believe me. I finally called the hotline and the advocate who answered made me feel heard for the first time. She helped me get a SANE exam the same night. If you are afraid, please call — they will believe you.",
    category: "sexual-assault",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "seed-3",
    title: "Still healing, still here",
    body: "It has been two years since I left. I have bad days. But I also have good ones now, and that was not something I thought was possible before. Healing is not linear and that is okay.",
    category: "domestic-violence",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "seed-4",
    title: "Finding my voice",
    body: "For so long I stayed silent because I was ashamed. Writing this right now, even anonymously, is the first time I have ever said out loud that it happened to me. This place made me feel like I could. Thank you.",
    category: "sexual-assault",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "seed-5",
    title: "To anyone still inside",
    body: "If you are still in it and reading this — I see you. I was there for eleven years. You are not weak for staying. You are surviving. And there are people who will help you when you are ready.",
    category: "domestic-violence",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "seed-6",
    title: undefined,
    body: "The first person I told was a stranger on this kind of site. Somehow that was easier than telling someone who knew me. This community gave me courage I did not know I had.",
    category: "both",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

// ─── In-memory fallback (used only when SUPABASE_URL is not set) ─────────────
let memoryStories: Story[] = [...SEED_STORIES];

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getStories(): Promise<Story[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("[stories-store] Supabase read error:", error.message);
      return [...SEED_STORIES];
    }
    return (data ?? []) as Story[];
  }

  // No DB — return in-memory list (dev mode)
  return [...memoryStories].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function addStory(data: {
  title?: string;
  body: string;
  category: StoryCategory;
}): Promise<Story> {
  const story: Story = {
    id: crypto.randomUUID(),
    title: data.title?.trim() || undefined,
    body: data.body.trim(),
    category: data.category,
    timestamp: new Date().toISOString(),
  };

  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase.from("stories").insert([story]);
    if (error) {
      console.error("[stories-store] Supabase insert error:", error.message);
      throw new Error("Failed to save story.");
    }
    return story;
  }

  // No DB — save to memory
  memoryStories = [story, ...memoryStories];
  return story;
}

export async function deleteStory(id: string): Promise<boolean> {
  const supabase = getSupabase();

  if (supabase) {
    const { error, count } = await supabase
      .from("stories")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) {
      console.error("[stories-store] Supabase delete error:", error.message);
      return false;
    }
    return (count ?? 0) > 0;
  }

  // No DB — delete from memory
  const before = memoryStories.length;
  memoryStories = memoryStories.filter((s) => s.id !== id);
  return memoryStories.length < before;
}
