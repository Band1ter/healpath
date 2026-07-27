import { NextRequest, NextResponse } from "next/server";
import { incrementMetric, getMetrics, MetricName } from "@/lib/metrics-store";

export const runtime = "nodejs";

// POST /api/metrics  { event: "session" | "message" }
// Fire-and-forget increment. No body content is ever read or stored.
export async function POST(req: NextRequest) {
  try {
    const { event } = await req.json();

    const metric: MetricName | null =
      event === "session" ? "sessions" : event === "message" ? "messages" : null;

    if (!metric) {
      return NextResponse.json({ error: "invalid event" }, { status: 400 });
    }

    await incrementMetric(metric);
    return NextResponse.json({ ok: true });
  } catch {
    // Never let metrics failures surface to the user
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

// GET /api/metrics — read aggregate counts (for an impact dashboard)
export async function GET() {
  const metrics = await getMetrics();
  return NextResponse.json(metrics, {
    headers: { "Cache-Control": "no-store" },
  });
}
