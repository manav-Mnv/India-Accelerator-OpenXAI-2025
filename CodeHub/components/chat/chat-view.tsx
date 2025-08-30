"use client"

import { useEffect, useRef, useState } from "react"
import { ChatSidebar } from "@/components/chat/sidebar"
import { ChatMessage } from "@/components/chat/chat-message"
import { MessageComposer } from "@/components/chat/message-composer"

export type ChatMessageT = { id: string; role: "assistant" | "user"; content: string }

const initialMessages: ChatMessageT[] = [
  { id: "m1", role: "assistant", content: "Hi! I’m your AI assistant. Ask me anything about your project." },
]

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessageT[]>(initialMessages)
  const [activeThread, setActiveThread] = useState("New Chat")
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function handleSend(text: string) {
    const id = crypto.randomUUID()
    setMessages((prev) => [...prev, { id, role: "user", content: text }])

    // Mock AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Thanks! This is a frontend-only demo. You can wire this to your model or API later.",
        },
      ])
    }, 600)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="grid grid-rows-[1fr_auto] gap-4 md:grid-cols-[260px_1fr] md:grid-rows-1">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-white/60 p-3 shadow-sm backdrop-blur-sm dark:bg-white/10">
          <ChatSidebar active={activeThread} onSelect={setActiveThread} />
        </aside>

        {/* Chat panel */}
        <section className="flex min-h-[60vh] flex-col rounded-2xl border border-white/10 bg-white/70 shadow-sm backdrop-blur-sm dark:bg-white/10">
          <header className="flex items-center justify-between border-b px-4 py-2">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{activeThread}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Frontend only</div>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}
          </div>

          <footer className="border-t p-3">
            <MessageComposer onSend={handleSend} />
          </footer>
        </section>
      </div>
    </div>
  )
}
