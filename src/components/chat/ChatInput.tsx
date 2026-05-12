"use client";
import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  return (
    <div className="border-t border-[#3D2B6B] bg-[#1A1030] px-4 py-3">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          rows={1}
          placeholder="Type what's on your mind..."
          className="flex-1 resize-none rounded-2xl border border-[#3D2B6B] bg-[#241840] px-4 py-3 text-sm text-[#F0EBF8] placeholder-[#9B8AC4] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] disabled:opacity-50 leading-relaxed"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex-shrink-0 text-white rounded-full w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-30"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 rotate-90">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.343 4.033a.75.75 0 0 0 .705.527h7.168a.75.75 0 0 1 0 1.5H4.327a.75.75 0 0 0-.705.527l-1.343 4.033a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.199-7.501.75.75 0 0 0 0-1.065 28.897 28.897 0 0 0-15.199-7.5Z" />
          </svg>
        </button>
      </div>
      <p className="text-center text-xs text-[#9B8AC4] mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
