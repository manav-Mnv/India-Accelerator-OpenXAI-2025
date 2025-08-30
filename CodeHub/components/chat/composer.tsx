"use client"

import type React from "react"
import { useState } from "react"

export default function Composer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("")

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const t = value.trim()
      if (t) {
        onSend(t)
        setValue("")
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-white/30 bg-white/60 p-2 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10">
        <textarea
          rows={3}
          aria-label="Message"
          placeholder="How can I help?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-24 w-full resize-none rounded-xl bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/60 focus:outline-none dark:text-white/90"
        />
        <div className="flex items-center justify-between gap-2 px-2 pb-1">
          <div className="flex items-center gap-2 text-xs opacity-80">
            <span className="rounded-md bg-white/60 px-1.5 py-0.5 dark:bg-white/10">Enter</span>
            to send
            <span className="rounded-md bg-white/60 px-1.5 py-0.5 dark:bg-white/10">Shift</span>+
            <span className="rounded-md bg-white/60 px-1.5 py-0.5 dark:bg-white/10">Enter</span> for newline
          </div>
          <button
            onClick={() => {
              const t = value.trim()
              if (!t) return
              onSend(t)
              setValue("")
            }}
            className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
