"use client"

import { cn } from "@/lib/utils"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function MessageBubble({
  role,
  content,
}: {
  role: ChatMessage["role"]
  content: string
}) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-wrap rounded-2xl border p-3 text-sm leading-relaxed shadow-md backdrop-blur-xl",
          isUser
            ? "border-sky-400/30 bg-sky-500/20 text-foreground dark:text-white"
            : "border-white/30 bg-white/60 text-foreground dark:border-white/15 dark:bg-white/10 dark:text-white/90",
        )}
        role="article"
        aria-label={isUser ? "User message" : "Assistant message"}
      >
        {content}
      </div>
    </div>
  )
}
