"use client";
import { useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi, I'm Sage. I'm so glad you're here.\n\nThis is a safe space — you can share as much or as little as you'd like. I'm here to listen, without any judgment.\n\nHow are you doing today?",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(text: string) {
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
              "Sage isn't connected yet — the API key in .env.local is still a placeholder.\n\nTo activate Sage, open healpath/.env.local, replace 'your-api-key-here' with a real key from console.anthropic.com, then restart the server with npm run dev.";
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
    <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
      {/* Sidebar */}
      <aside className="lg:w-64 lg:border-r border-[#3D2B6B] bg-[#1A1030] px-5 py-6 flex flex-col gap-4 shrink-0 overflow-y-auto">
        <div>
          <h1 className="font-heading font-semibold text-[#F0EBF8] text-lg mb-1">
            You&apos;re talking to Sage
          </h1>
          <p className="text-sm text-[#9B8AC4] leading-relaxed">
            Sage is here to listen without judgment. Share as much or as little as you&apos;re comfortable with.
          </p>
        </div>
        <div className="bg-[#241840] rounded-xl p-3 text-xs text-[#9B8AC4] leading-relaxed border border-[#3D2B6B]">
          This chat is not saved anywhere. Close the tab to erase it completely.
        </div>

        {/* Legal disclaimer */}
        <div className="bg-[#2e1a28] border border-[#EC4899]/30 rounded-xl p-3 text-xs text-[#9B8AC4] leading-relaxed">
          General legal information only — not legal advice. For your specific situation, consult a licensed attorney or call a hotline.
        </div>

        <div className="mt-auto">
          <p className="text-xs font-medium text-[#9B8AC4] mb-2">Need immediate help?</p>
          <div className="flex flex-col gap-1.5">
            <a href="tel:18007997233" className="text-xs text-[#A78BFA] hover:text-white hover:underline transition-colors">
              DV Hotline: 1-800-799-7233
            </a>
            <a href="tel:18006564673" className="text-xs text-[#A78BFA] hover:text-white hover:underline transition-colors">
              RAINN: 1-800-656-4673
            </a>
            <a href="sms:741741" className="text-xs text-[#A78BFA] hover:text-white hover:underline transition-colors">
              Text HOME → 741741
            </a>
            <a href="tel:988" className="text-xs text-[#A78BFA] hover:text-white hover:underline transition-colors">
              Crisis Line: 988
            </a>
          </div>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-[#0F0A1E] min-h-0">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
