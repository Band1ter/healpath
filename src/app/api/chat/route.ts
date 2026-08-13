import { NextRequest, NextResponse } from "next/server";
import { anthropic, HEALPATH_SYSTEM_PROMPT } from "@/lib/claude";
import {
  getDemoResponse,
  streamDemoResponse,
  isDemoMode,
  hasNoApiKey,
} from "@/lib/sage-demo";

export const runtime = "nodejs";

// GET /api/chat — lets the client ask whether Sage is running in demo mode,
// so the preview banner works without a NEXT_PUBLIC_ build-time variable.
export async function GET() {
  return NextResponse.json(
    { demo: isDemoMode() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    // Check for missing/placeholder API key before hitting Anthropic
    if (hasNoApiKey()) {
      // Demo mode: stream a scripted, trauma-informed response so partners
      // can preview the full chat experience with no API key.
      if (isDemoMode()) {
        const lastUser = [...messages]
          .reverse()
          .find((m: { role: string }) => m.role === "user");
        const demoText = getDemoResponse(lastUser?.content ?? "");
        return new Response(streamDemoResponse(demoText), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      }
      return NextResponse.json(
        { error: "NO_API_KEY" },
        { status: 503 }
      );
    }

    const stream = anthropic.messages.stream({
      model: process.env.CLAUDE_MODEL ?? "claude-sonnet-5",
      max_tokens: 1024,
      // Sage's system prompt is ~5k tokens and identical on every request.
      // Caching it drops the cost of each follow-up message to a fraction of
      // the base rate, which roughly halves the bill for a real conversation.
      system: [
        {
          type: "text",
          text: HEALPATH_SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map(
        (m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })
      ),
    });

    // Eagerly await first event to surface auth errors before we commit to streaming
    const firstEvent = await Promise.race([
      stream[Symbol.asyncIterator]().next(),
      new Promise<never>((_, reject) =>
        stream.on("error", reject)
      ),
    ]) as IteratorResult<unknown>;

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Re-yield the first event if it had content
          const ev = firstEvent?.value as Record<string, unknown> | undefined;
          if (
            ev &&
            ev.type === "content_block_delta" &&
            (ev.delta as Record<string, unknown>)?.type === "text_delta"
          ) {
            controller.enqueue(
              new TextEncoder().encode((ev.delta as Record<string, unknown>).text as string)
            );
          }

          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: unknown) {
    console.error("[/api/chat] Error:", error);
    const status = (error as { status?: number })?.status;
    if (status === 401) {
      return NextResponse.json({ error: "NO_API_KEY" }, { status: 503 });
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
