/**
 * Sage demo mode — simulated responses for partner previews.
 *
 * When DEMO_MODE=true and no ANTHROPIC_API_KEY is set, /api/chat streams one
 * of these scripted, trauma-informed responses instead of calling the API.
 * This lets partners experience the full chat UX (streaming, tone, resource
 * surfacing) with zero API cost and zero risk of an unsupervised AI reply.
 *
 * Every response models the real system prompt's voice: validating, warm,
 * never directive, resource-aware.
 */

interface DemoRule {
  keywords: string[];
  response: string;
}

const DEMO_RULES: DemoRule[] = [
  // ── Risk rules come FIRST so they win over greetings and general rules. ──
  // A 2025 review by NJCASA found the earlier ordering let "I'd be better off
  // dead" and "what if I hurt him back" fall through to generic replies.
  {
    keywords: [
      "better off dead", "want to die", "kill myself", "hurt myself", "suicide",
      "end it", "end my life", "don't want to be here", "dont want to be here",
      "no point", "better off without me", "want it to stop", "cant do this anymore",
      "can't do this anymore", "harm myself", "not worth living",
    ],
    response:
      "I want to stop and stay with what you just said, because it matters more than anything else right now.\n\nIt sounds like you're thinking about not being here anymore. I'm really glad you told me that, and I'm not going anywhere.\n\nPlease reach out to the 988 Suicide & Crisis Lifeline. You can call or text 988, any time, and texting is there if talking out loud feels like too much. They are people who will listen without judgment.\n\nI want to be honest with you: I can't reach anyone for you, and I can't stay with you the way a person can. That's exactly why I want you to have someone real.\n\nHow long have you been carrying this feeling?",
  },
  {
    keywords: [
      "hurt him back", "hurt her back", "break his legs", "break her legs",
      "want him dead", "want her dead", "kill him", "kill her", "hurt him",
      "hurt her", "get back at", "make him pay", "revenge",
    ],
    response:
      "I'm not going to brush past that, and I'm not going to judge you for it.\n\nAnger at someone who hurt you makes complete sense. Wanting them to feel something of what you've felt is a human response, and having the thought is not the same as being a person who would do it. You're allowed to say it out loud here.\n\nWhat I do want to say, because I care what happens to you: acting on it could put you in real danger, legally and physically, and it could be used against you later in ways that aren't fair. I'd hate to see you carry that on top of everything else.\n\nUsually underneath a feeling like this is something more like powerlessness. Does that fit? What's been happening?",
  },
  {
    keywords: [
      "strangled", "strangle", "choked", "choking", "hands around my neck",
      "threatened to kill", "has a gun", "owns a gun", "gun in the house",
    ],
    response:
      "Thank you for telling me. I want to take that seriously with you.\n\nIf you were strangled or choked, even once, even if it seemed minor at the time, please consider getting seen by a doctor. Injuries from that are often internal and don't always show or hurt right away. You can be seen without making any report.\n\nI also want to gently say that what you're describing is the kind of thing advocates take very seriously. Not to frighten you. It's that talking with a person tonight, rather than someday, could be worth a lot. The National DV Hotline at 1-800-799-7233 has advocates 24/7, and you can chat at thehotline.org instead of calling.\n\nI'm here. What's been going on?",
  },
  {
    keywords: [
      "my daughter", "my son", "my child", "my kid", "my friend", "my sister",
      "my brother", "my student", "someone i know", "how do i help", "help them",
      "told me that she", "told me that he", "disclosed",
    ],
    response:
      "It says a lot about you that you're trying to figure out how to do this well.\n\nBefore anything else: this is heavy to carry, and being the person someone told is its own kind of hard. How are you holding up?\n\nWhat helps most is usually simpler than people expect. Believe them. Thank them for telling you. Don't press for details they haven't offered, and try not to let them see panic or anger, even though you feel it, because people often go quiet to protect the person they told. Let them set the pace, and keep showing up.\n\nIf a child may be involved, New Jersey's State Central Registry at 1-877-NJ-ABUSE (1-877-652-2873) is staffed 24 hours a day and anyone can call. You don't need proof to call and ask what to do. Some adults, like teachers and doctors, are legally required to report, so a school will likely have its own obligation once told.\n\nThe hotlines support people in your position too, not only survivors. You're allowed to call just to figure out how to help.",
  },
  {
    keywords: [
      "forensic exam", "rape kit", "sane", "fne", "evidence", "hospital",
      "should i report", "report it", "sart", "police report",
    ],
    response:
      "I can walk you through what this actually involves, and none of it commits you to anything.\n\nIn New Jersey the exam is done by a Forensic Nurse Examiner, sometimes called a SANE. A few things people often don't know: it's free, and you do NOT have to report to police to have one. It's available in every county, for any age.\n\nIt's also medical care, not only evidence. It covers treatment for injuries, prevention of sexually transmitted infections, and emergency contraception.\n\nYou can decline any part of it, and stop at any point. Consent is ongoing the whole way through.\n\nNew Jersey also allows anonymous reporting, sometimes called Jane Doe, where evidence can be collected while you take your time deciding about police. That keeps the option open without committing you.\n\nEvidence is best collected within about five days, though care and support are there after that too. You can ask for a confidential advocate at any point, including before you decide anything. They work only for you.\n\nWhat would be most useful to know more about?",
  },
  {
    keywords: [
      "don't remember", "dont remember", "can't remember", "cant remember",
      "blacked out", "was drinking", "drugged", "woke up", "not sure what happened",
    ],
    response:
      "Not remembering doesn't mean nothing happened, and it doesn't mean you won't be believed.\n\nGaps like that are a common effect of trauma, and of alcohol or drugs. Your mind not holding onto it is something that happens to people, not a sign that you're unreliable or that you have to be certain before you deserve support.\n\nYou don't need to have the full picture to talk about it, and you don't need to be sure to get care. If you want, I can tell you what a forensic exam involves, or we can just stay with how you're feeling about it. Whichever is more useful.\n\nWhat's today been like for you?",
  },
  {
    keywords: ["911", "emergency", "right now", "danger", "he's here", "she's here", "unsafe now"],
    response:
      "I'm right here with you.\n\nIf you are in immediate danger, please call 911 if you can, or get to somewhere safe — a neighbor, a public place, anywhere you feel safer. You matter, and your safety comes first.\n\nIf calling isn't possible, you can text HOME to 741741 to reach a crisis counselor quietly.\n\nI'm not going anywhere. When you're safe, I'm here to keep talking.",
  },
  {
    keywords: ["restraining order", "legal", "lawyer", "court", "custody", "tro", "rights"],
    response:
      "That's a really understandable thing to be thinking about, and you don't have to figure it out alone.\n\nA few things that might help, whenever you're ready:\n\nWomensLaw.org has plain-language guides about restraining orders, custody, and more — you can read privately, at your own pace, without talking to anyone.\n\nIn New Jersey, anyone can apply for a Temporary Restraining Order at the courthouse, even without a lawyer. And free legal advocates exist for exactly this.\n\nFor your specific situation, a legal advocate would be the right person to guide you — and the Resources page here lists free legal help near you. No pressure, no rush. You're in control of every step.",
  },
  {
    keywords: ["shelter", "leave", "nowhere to go", "move out", "housing"],
    response:
      "Thinking about this is a big step, and it makes complete sense that it feels overwhelming.\n\nI want you to know: there are safe places, and you don't have to have everything figured out to reach out to one. Shelters like Women Aware in NJ can talk through options with you confidentially — even if you're not ready to go anywhere yet. Talking to them commits you to nothing.\n\nThe Resources page here lists shelter and housing help near you, all free.\n\nWhatever pace feels right to you is the right pace. You deserve to feel safe.",
  },
  {
    keywords: ["boyfriend", "girlfriend", "dating", "teen", "school", "my partner checks my phone"],
    response:
      "Thank you for trusting me with that. I want you to hear this clearly: what you're describing matters, and your feelings about it are valid.\n\nDating relationships — at any age — should feel safe. You should be able to speak freely, see your friends, and not feel afraid of how they'll react. Feeling like you're walking on eggshells is not something you have to accept as normal.\n\nIf you ever want to read more, njcedv.org has resources specifically about teen dating violence. And I'm here whenever you want to talk things through.\n\nYou deserve kindness and respect. Full stop.",
  },
  {
    keywords: ["scared", "afraid", "alone", "sad", "crying", "can't sleep", "anxious"],
    response:
      "I hear you. And I'm really glad you shared that with me — I know it isn't easy to put these feelings into words.\n\nWhat you're feeling makes complete sense given what you're carrying. Fear like that is your mind trying to protect you, and it doesn't mean you're weak. It means you've been strong for a long time.\n\nYou don't have to decide anything or do anything right now. This space is yours. If it would help to talk about what's been happening, I'm listening. And if you just want company for a moment, that's okay too.",
  },
  {
    keywords: ["resource", "help", "hotline", "who can i call", "where do i start"],
    response:
      "I'm glad you asked — and there are more ways to reach out than most people realize. Calling is just one option:\n\nThe National DV Hotline (thehotline.org) lets you call, text, or chat online 24/7 — the chat option is there if talking out loud feels like too much right now.\n\nRAINN (rainn.org) supports survivors of sexual assault, free and confidential.\n\nWomensLaw.org lets you read about legal options privately, without talking to anyone.\n\nAnd the Find Help page here lists free local support in NJ and NYC — legal, medical, shelter, and counseling.\n\nWhichever door feels safest to you is the right one. There's no wrong way to start.",
  },
  // Greeting is LAST: it only applies when nothing substantive matched, and
  // its keywords are matched as whole words (see getDemoResponse) so that
  // "break his legs" can never be read as "hi".
  {
    keywords: ["hi", "hello", "hey", "test"],
    response:
      "Hi, I'm so glad you're here.\n\nThis is a safe space — you can share as much or as little as you'd like, and nothing you say is saved anywhere. I'm here to listen without any judgment.\n\nHow are you doing today, really?",
  },
];

const DEMO_FALLBACKS: string[] = [
  "Thank you for sharing that with me. I hear you, and I want you to know that what you're feeling makes complete sense.\n\nYou don't have to have the right words or a plan. This space is yours, at your pace. Would you like to tell me more about what's been happening?",
  "I'm listening, and I believe you.\n\nWhat you experienced was not okay, and it was not your fault. Those aren't just words — they're the truth, even on the days it's hard to feel them.\n\nWhatever you'd like to talk about next, I'm here.",
  "That sounds incredibly hard, and I'm glad you didn't have to say it into silence.\n\nYou deserve to be treated with kindness and respect — in every relationship, without exception. If and when you ever want to explore what support could look like, there are gentle first steps, like reading privately at thehotline.org. But there's no rush. Right now, I'm just here with you.",
];

let fallbackIndex = 0;

/** Escape a string for safe use inside a RegExp. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Match a keyword on word boundaries rather than as a bare substring.
 * Substring matching previously let "hi" match inside "break his legs" and
 * "test" match inside "greatest", routing risk messages to a greeting.
 */
function matches(text: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegex(keyword)}\\b`).test(text);
}

/** Pick a scripted demo response. Rules are ordered risk-first. */
export function getDemoResponse(userMessage: string): string {
  const text = userMessage.toLowerCase();

  for (const rule of DEMO_RULES) {
    if (rule.keywords.some((k) => matches(text, k))) {
      return rule.response;
    }
  }

  const response = DEMO_FALLBACKS[fallbackIndex % DEMO_FALLBACKS.length];
  fallbackIndex++;
  return response;
}

/** Stream a demo response word-by-word so the UI behaves exactly like the
 *  real streaming API (typing indicator, incremental render). */
export function streamDemoResponse(text: string): ReadableStream<Uint8Array> {
  const words = text.split(/(?<=\s)/); // keep whitespace attached
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        // 15–45ms per word ≈ natural typing rhythm
        await new Promise((r) => setTimeout(r, 15 + Math.random() * 30));
      }
      controller.close();
    },
  });
}

/** True when the server has no usable Anthropic key. */
export function hasNoApiKey(): boolean {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  // Treat empty, placeholder, or obviously-not-a-key values as absent.
  return !key || !key.startsWith("sk-ant-");
}

/**
 * Demo mode is the default whenever Sage has no usable API key — showing a
 * scripted, trauma-informed reply is always better than showing an error to
 * someone who reached out. Set DEMO_MODE=false to opt out and surface the
 * NO_API_KEY error instead (useful while debugging a real key locally).
 */
export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "false") return false;
  return hasNoApiKey();
}
