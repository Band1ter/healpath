export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 mb-1 ml-1">Sage</span>
        <div className="bg-white border border-lavender-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1 shadow-sm">
          <span className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
