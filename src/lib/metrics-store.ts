import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous impact metrics for HealPath.
 *
 * We store ONLY aggregate counters — never message content, never anything
 * that could identify a person. This preserves the "zero data / no trace"
 * promise while still letting Rishika measure reach:
 *   - sessions: number of chats where someone actually engaged Sage
 *   - messages: total messages people sent to Sage
 *
 * Storage: a single-row `metrics` table in Supabase, incremented atomically
 * via the `increment_metric` Postgres function. Falls back to in-memory
 * counters when no database is configured (local dev).
 */

export type MetricName = "sessions" | "messages";

export interface MetricsSnapshot {
  sessions: number;
  messages: number;
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// In-memory fallback (dev mode, resets on server restart)
const memoryMetrics: MetricsSnapshot = { sessions: 0, messages: 0 };

/** Atomically add `by` to a counter. Returns quietly on failure — metrics
 *  must never break the chat experience. */
export async function incrementMetric(name: MetricName, by = 1): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase.rpc("increment_metric", {
      metric_name: name,
      increment_by: by,
    });
    if (error) {
      console.error("[metrics-store] increment error:", error.message);
    }
    return;
  }

  memoryMetrics[name] += by;
}

export async function getMetrics(): Promise<MetricsSnapshot> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("metrics")
      .select("sessions, messages")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.error("[metrics-store] read error:", error?.message);
      return { sessions: 0, messages: 0 };
    }
    return { sessions: data.sessions ?? 0, messages: data.messages ?? 0 };
  }

  return { ...memoryMetrics };
}
