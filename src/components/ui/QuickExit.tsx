"use client";
import { useEffect } from "react";

export default function QuickExit() {
  // Also trigger on pressing Escape 3 times rapidly
  useEffect(() => {
    let escCount = 0;
    let escTimer: ReturnType<typeof setTimeout>;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        escCount++;
        clearTimeout(escTimer);
        escTimer = setTimeout(() => { escCount = 0; }, 1000);
        if (escCount >= 3) {
          window.location.href = "https://www.google.com";
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <a
      href="https://www.google.com"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2.5 rounded-2xl shadow-lg transition-opacity duration-150 hover:opacity-90"
      style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)", boxShadow: "0 0 20px rgba(159,122,234,0.35)" }}
      title="Leave this page quickly (or press Escape 3 times)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
      Leave quickly
    </a>
  );
}
