# HealPath Impact Metrics — Setup

HealPath tracks two anonymous numbers so Rishika can measure impact:

- **Chat sessions** — how many people actually started a conversation with Sage
- **Messages** — total messages people sent to Sage

**No message content is ever stored.** Only these two running counters. This
keeps the "zero data / no trace" promise intact.

## How it works

- The chat page calls `POST /api/metrics` with `{ "event": "session" }` the
  first time someone sends a message, and `{ "event": "message" }` on every
  message. These are fire-and-forget — if metrics fail, the chat is unaffected.
- `GET /api/metrics` returns `{ sessions, messages }`, shown in the admin panel
  at `/admin` (after entering the admin secret).
- With **no** Supabase configured, counters live in memory and reset when the
  server restarts (fine for local dev). For real, persistent numbers in
  production, set up the Supabase table below.

## Supabase setup (one time)

In your Supabase project → **SQL Editor**, run this once:

```sql
-- Single-row table holding the running totals
create table if not exists metrics (
  id        int  primary key default 1,
  sessions  bigint not null default 0,
  messages  bigint not null default 0,
  constraint metrics_singleton check (id = 1)
);

-- Ensure the row exists
insert into metrics (id, sessions, messages)
values (1, 0, 0)
on conflict (id) do nothing;

-- Atomic increment so concurrent chats never lose a count
create or replace function increment_metric(metric_name text, increment_by int)
returns void
language plpgsql
as $$
begin
  if metric_name = 'sessions' then
    update metrics set sessions = sessions + increment_by where id = 1;
  elsif metric_name = 'messages' then
    update metrics set messages = messages + increment_by where id = 1;
  end if;
end;
$$;
```

## Environment variables

These must be set both in `.env.local` (dev) and in Vercel (production):

```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SECRET=choose-a-strong-secret
```

The service-role key is server-only (used in API routes) and is never exposed
to the browser. Find both values in Supabase → **Project Settings → API**.

## Viewing the numbers

Go to `/admin`, enter your `ADMIN_SECRET`, and the Impact panel shows the live
session and message totals.
