"use client"

import { useMemo, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { ChatPanel } from "@/components/chat/chat-panel"
import { ChatSidebar } from "@/components/chat/sidebar"
import { mockChat } from "@/lib/mock-data"

export default function ChatPage() {
  // Active conversation title (frontend-only mock state)
  const [threads] = useState([
    { id: "t1", title: "New Chat" },
    { id: "t2", title: "Weekly summary" },
    { id: "t3", title: "Product ideas" },
  ])
  const [active, setActive] = useState<string>(threads[0].title)
  const activeTitle = useMemo(() => threads.find((t) => t.title === active)?.title ?? "New Chat", [threads, active])

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto grid h-[100dvh] max-w-6xl grid-rows-[auto,1fr] gap-4 p-4 md:grid-cols-[280px,1fr] md:grid-rows-1">
        {/* Left: Glass Sidebar */}
        <aside
          aria-label="Conversations"
          className="rounded-2xl border border-white/20 bg-white/60 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
        >
          <ChatSidebar active={active} onSelect={setActive} />
        </aside>

        {/* Right: Glass Chat Area */}
        <section
          aria-label="Chat"
          className="relative flex h-[calc(100dvh-2rem)] flex-col rounded-2xl border border-white/20 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
        >
          {/* Header */}
          <header className="flex items-center justify-between gap-3 border-b border-white/20 px-4 py-3 dark:border-white/10">
            <h1 className="text-pretty text-base font-medium">{activeTitle}</h1>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
                Connected
              </span>
              <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-700 dark:text-amber-300">
                Frontend only
              </span>
            </div>
          </header>

          {/* Messages + Composer */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel initial={mockChat} />
          </div>
        </section>
      </div>
    </main>
  )
}
