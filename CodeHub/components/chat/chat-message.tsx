export function ChatMessage({ role, content }: { role: "assistant" | "user"; content: string }) {
  const isUser = role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
          isUser ? "bg-sky-500 text-white" : "bg-white/90 text-slate-900 dark:bg-white/10 dark:text-slate-100"
        }`}
        role="article"
        aria-label={isUser ? "User message" : "Assistant message"}
      >
        {content}
      </div>
    </div>
  )
}
