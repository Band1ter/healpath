"use client";
import { useEffect, useRef } from "react";

interface InactivityPopupProps {
  onStillHere: () => void;
  onClose: () => void;
}

export default function InactivityPopup({ onStillHere, onClose }: InactivityPopupProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Focus the button when popup appears
  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#131b2e] border border-[#2a3555] rounded-2xl p-8 max-w-sm w-full text-center animate-modal-in shadow-2xl" style={{ backdropFilter: "blur(12px)" }}>
        {/* Pulse dot */}
        <div className="flex justify-center mb-5">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-50" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#9f7aea]" />
          </span>
        </div>

        <h2 className="font-heading text-xl font-semibold text-[#f1f5f9] mb-2">
          Are you still there?
        </h2>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
          Sage is still here whenever you&apos;re ready. Take all the time you need — there&apos;s no rush.
        </p>

        <div className="flex flex-col gap-3">
          <button
            ref={btnRef}
            onClick={onStillHere}
            className="w-full py-3 rounded-2xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
          >
            I&apos;m still here
          </button>
          <a
            href="https://www.google.com"
            className="w-full py-3 rounded-2xl text-[#94a3b8] text-sm border border-[#2a3555] hover:border-[#9f7aea] hover:text-[#c4b5fd] transition-[border-color,color] duration-150"
          >
            Leave this page safely ↗
          </a>
        </div>
      </div>
    </div>
  );
}
