"use client"

type Item = { id: string; title: string; time: string }

const items: Item[] = [
  { id: "t1", title: "New Chat", time: "just now" },
  { id: "t2", title: "Research: vector DBs", time: "10m ago" },
  { id: "t3", title: "Prompt library — onboarding", time: "15m ago" },
  { id: "t4", title: "Bug triage notes", time: "1h ago" },
]

export function ChatSidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (title: string) => void
}) {
  return (
    <nav aria-label="Chats" className="flex h-full flex-col">
      <div className="px-2 pb-2">
        <input
          type="search"
          placeholder="Search…"
          className="w-full rounded-lg border border-white/10 bg-white/70 px-2 py-1 text-sm dark:bg-white/10"
          aria-label="Search chats"
        />
      </div>
      <button className="mx-2 mb-2 rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600">
        + Start New Chat
      </button>
      <ul className="flex-1 space-y-1 overflow-auto">
        {items.map((it) => (
          <li key={it.id}>
            <button
              onClick={() => onSelect(it.title)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                active === it.title
                  ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                  : "hover:bg-white/60 dark:hover:bg-white/10"
              }`}
              aria-current={active === it.title ? "page" : undefined}
            >
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-slate-500">{it.time}</div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Sidebar(props: { active: string; onSelect: (title: string) => void }) {
  return <ChatSidebar {...props} />
}
