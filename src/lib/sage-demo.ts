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
  {
    keywords: ["911", "emergency", "right now", "danger", "he's here", "she's here", "unsafe now"],
    response:
      "I'm right here with you.\n\nIf you are in immediate danger, please call 911 if you can, or get to somewhere safe — a neighbor, a public place, anywhere you feel safer. You matter, and your safety comes first.\n\nIf calling isn't possible, you can text HOME to 741741 to reach a crisis counselor quietly.\n\nI'm not going anywhere. When you're safe, I'm here to keep talking.",
  },
  {
    keywords: ["hurt myself", "suicide", "kill myself", "end it", "don't want to be here"],
    response:
      "I'm so glad you told me that. What you're carrying sounds incredibly heavy, and you don't have to carry it alone.\n\nPlease reach out to the 988 Suicide & Crisis Lifeline — you can call or text 988 any time, day or night. They truly care and they will listen.\n\nYou reached out here, and that took courage. That part of you that reached out matters. I'm here with you.",
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

/** Pick a scripted demo response based on simple keyword matching. */
export function getDemoResponse(userMessage: string): string {
  const text = userMessage.toLowerCase();

  for (const rule of DEMO_RULES) {
    if (rule.keywords.some((k) => text.includes(k))) {
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

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true";
}
