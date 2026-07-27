"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import InactivityPopup from "@/components/chat/InactivityPopup";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi, I'm Sage. I'm so glad you're here.\n\nThis is a safe space — you can share as much or as little as you'd like. I'm here to listen, without any judgment.\n\nHow are you doing today?",
};

const INACTIVITY_MS = 3 * 60 * 1000; // 3 minutes

// Fire-and-forget anonymous impact metric. Never blocks the chat, never
// sends any message content — only the event name.
function trackEvent(event: "session" | "message") {
  try {
    fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore — metrics must never affect the user
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInactivity, setShowInactivity] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionCounted = useRef(false);
  const [isDemo, setIsDemo] = useState(false);

  // Ask the server whether Sage is in demo mode. Doing this at runtime (rather
  // than via a NEXT_PUBLIC_ build-time variable) means the preview banner is
  // always in sync with what the API actually does.
  useEffect(() => {
    fetch("/api/chat")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setIsDemo(Boolean(d.demo)))
      .catch(() => {});
  }, []);

  // Reset inactivity timer on any user activity
  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowInactivity(false);
    inactivityTimer.current = setTimeout(() => {
      setShowInactivity(true);
    }, INACTIVITY_MS);
  }, []);

  // Start timer on mount, clear on unmount
  useEffect(() => {
    resetTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetTimer]);

  function clearChat() {
    setMessages([INITIAL_MESSAGE]);
    resetTimer();
  }

  async function handleSend(text: string) {
    resetTimer();

    // Anonymous impact tracking: count the session once (first real message),
    // and count every message the person sends. No content is transmitted.
    if (!sessionCounted.current) {
      sessionCounted.current = true;
      trackEvent("session");
    }
    trackEvent("message");

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        let errorMsg =
          "I'm sorry, something went wrong. Please try sending your message again.";
        try {
          const errData = await res.clone().json();
          if (errData?.error === "NO_API_KEY") {
            errorMsg =
              "I'm so sorry — I can't respond right now.\n\nPlease know that support is still available any time: the National DV Hotline is 1-800-799-7233, or you can chat at thehotline.org. You can also text HOME to 741741.\n\nYou can try again in a little while, and I'll be here.";
          }
        } catch {
          // ignore parse errors
        }
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: errorMsg };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "I'm sorry, I couldn't reach the server. Please check your connection and try again.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showInactivity && (
        <InactivityPopup
          onStillHere={() => { setShowInactivity(false); resetTimer(); }}
          onClose={() => { setShowInactivity(false); resetTimer(); }}
        />
      )}

      <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:border-r border-[#2a3555] bg-[#131b2e] px-5 py-6 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div>
            <h1 className="font-heading font-semibold text-[#f1f5f9] text-lg mb-1">
              You&apos;re talking to Sage
            </h1>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Sage is here to listen without judgment. Share as much or as little as you&apos;re comfortable with.
            </p>
          </div>

          {isDemo && (
            <div className="bg-[#1c2444] border border-[#9f7aea]/40 rounded-xl p-3 text-xs leading-relaxed">
              <p className="text-[#c4b5fd] font-semibold mb-1">Partner preview</p>
              <p className="text-[#94a3b8]">
                Sage&apos;s responses are simulated in this demo. The live version
                will be powered by a trauma-informed AI with the same voice and
                safety guidelines.
              </p>
            </div>
          )}

          <div className="bg-[#1c2640] rounded-xl p-3 text-xs text-[#94a3b8] leading-relaxed border border-[#2a3555]">
            This chat is not saved anywhere. Close the tab to erase it completely.
          </div>

          {/* Legal disclaimer */}
          <div className="bg-[#1e0f1a] border border-[#f472b6]/20 rounded-xl p-3 text-xs text-[#94a3b8] leading-relaxed">
            General information only — not legal advice. For your specific situation, consult a licensed attorney or call a hotline.
          </div>

          {/* Clear chat */}
          <button
            onClick={clearChat}
            className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#f1f5f9] border border-[#2a3555] hover:border-[#9f7aea] px-3 py-2 rounded-xl transition-[border-color,color] duration-150 w-full justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Clear conversation
          </button>

          <div className="mt-auto">
            <p className="text-xs font-medium text-[#94a3b8] mb-2">Need help right now?</p>
            <p className="text-xs text-[#94a3b8] mb-2 leading-relaxed">
              There are many ways to reach out — calling is just one option.
            </p>
            <div className="flex flex-col gap-1.5">
              <a href="tel:18007997233" className="text-xs text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150">
                DV Hotline: 1-800-799-7233
              </a>
              <a href="https://www.thehotline.org" target="_blank" rel="noopener noreferrer" className="text-xs text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150">
                Chat online: thehotline.org
              </a>
              <a href="sms:741741" className="text-xs text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150">
                Text HOME to 741741
              </a>
              <a href="https://www.womenslaw.org" target="_blank" rel="noopener noreferrer" className="text-xs text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150">
                Legal info: womenslaw.org
              </a>
              <a href="tel:988" className="text-xs text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150">
                Crisis Line: 988
              </a>
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-[#0b1326] min-h-0">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </>
  );
}
