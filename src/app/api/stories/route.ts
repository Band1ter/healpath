import { NextRequest, NextResponse } from "next/server";
import { getStories, addStory, deleteStory } from "@/lib/stories-store";
import { StoryCategory } from "@/types/story";

const VALID_CATEGORIES: StoryCategory[] = [
  "domestic-violence",
  "sexual-assault",
  "both",
  "other",
];

export async function GET() {
  const stories = await getStories();
  return NextResponse.json(stories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, body: storyBody, category } = body;

    if (!storyBody || typeof storyBody !== "string" || storyBody.trim().length < 10) {
      return NextResponse.json(
        { error: "Story body must be at least 10 characters." },
        { status: 400 }
      );
    }

    if (storyBody.trim().length > 5000) {
      return NextResponse.json(
        { error: "Story body must be under 5,000 characters." },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const story = await addStory({
      title: title || undefined,
      body: storyBody,
      category,
    });

    return NextResponse.json(story, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save story." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("x-admin-secret");
  const adminSecret = process.env.ADMIN_SECRET ?? "healpath-dev-secret";

  if (authHeader !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const deleted = await deleteStory(id);
    if (!deleted) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete story." }, { status: 500 });
  }
}
