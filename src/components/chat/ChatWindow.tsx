"use client";
import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 chat-scroll">
      {messages.map((msg, i) => (
        <ChatBubble key={i} role={msg.role} content={msg.content} />
      ))}
      {isLoading &&
        (messages.length === 0 ||
          messages[messages.length - 1].role === "user") && (
          <TypingIndicator />
        )}
      <div ref={bottomRef} />
    </div>
  );
}
