"use client"

import { useMemo, useState } from "react"
import Sidebar from "./sidebar"
import MessageBubble, { type ChatMessage } from "./message-bubble"
import Composer from "./composer"

const seedMessages: ChatMessage[] = [
  { id: "m1", role: "assistant", content: "Hi! How can I help you today?" },
  { id: "m2", role: "user", content: "Summarize the weekly report in 3 bullets." },
  {
    id: "m3",
    role: "assistant",
    content: "• Revenue grew 8% WoW\n• Support resolution time down 12%\n• Launch readiness: on track for Friday",
  },
]

export default function ChatShell() {
  const [threads] = useState([
    { id: "t1", title: "New Chat", preview: "No messages yet", updatedAt: "now" },
    { id: "t2", title: "Weekly summary", preview: "Revenue grew 8% WoW…", updatedAt: "1h" },
    { id: "t3", title: "Product ideas", preview: "Brainstorm features…", updatedAt: "3h" },
  ])

  const [activeId, setActiveId] = useState("t2")
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages)

  const activeTitle = useMemo(() => threads.find((t) => t.id === activeId)?.title ?? "New Chat", [threads, activeId])

  function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: trimmed }])

    // Mock assistant reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Thanks! Here’s a quick take:\n1) Good momentum\n2) Watch churn\n3) Prioritize top feedback",
        },
      ])
    }, 500)
  }

  return (
    <div className="mx-auto grid h-[100dvh] max-w-7xl grid-rows-[auto,1fr] gap-4 px-4 py-4 md:grid-cols-[290px,1fr] md:grid-rows-1">
      {/* Sidebar (glass card) */}
      <aside
        aria-label="Conversations"
        className="rounded-2xl border border-white/30 bg-white/50 p-3 text-foreground shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
      >
        <Sidebar
          items={threads}
          activeId={activeId}
          onSelect={(id) => {
            setActiveId(id)
            setMessages(seedMessages)
          }}
          onNew={() => {
            setActiveId("t1")
            setMessages([{ id: "m0", role: "assistant", content: "Start a new conversation" }])
          }}
        />
      </aside>

      {/* Chat area (glass card) */}
      <section
        aria-label="Chat"
        className="relative flex h-[calc(100dvh-2rem)] flex-col rounded-2xl border border-white/30 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-white/30 px-4 py-3 dark:border-white/10">
          <h1 className="text-pretty text-base font-medium"> {activeTitle} </h1>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
              Connected
            </span>
            <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-700 dark:text-amber-300">
              Frontend only
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <ol className="mx-auto flex max-w-3xl flex-col gap-3">
            {messages.map((m) => (
              <li key={m.id}>
                <MessageBubble role={m.role} content={m.content} />
              </li>
            ))}
          </ol>
        </div>

        {/* Composer */}
        <div className="border-t border-white/30 p-3 dark:border-white/10">
          <Composer onSend={handleSend} />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Tip: Press Enter to send, Shift+Enter for newline
          </p>
        </div>
      </section>
    </div>
  )
}
