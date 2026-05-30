interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";
  const paragraphs = content.split("\n").filter((p) => p.trim() !== "");

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div
          className="max-w-xs sm:max-w-md lg:max-w-lg text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm leading-relaxed"
          style={{ background: "linear-gradient(135deg, #9f7aea, #818cf8)" }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="flex flex-col max-w-xs sm:max-w-md lg:max-w-lg">
        <span className="text-xs text-[#94a3b8] mb-1 ml-1">Sage</span>
        <div className="bg-[#1c2640] border border-[#2a3555] rounded-2xl rounded-tl-none px-4 py-3 text-[#f1f5f9] text-sm leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
