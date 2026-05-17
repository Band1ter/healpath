export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="flex flex-col">
        <span className="text-xs text-[#9B8AC4] mb-1 ml-1">Sage</span>
        <div className="bg-[#241840] border border-[#3D2B6B] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
