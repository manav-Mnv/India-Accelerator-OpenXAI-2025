"use client"

import type React from "react"

import { useState } from "react"

export function MessageComposer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("")
  const canSend = value.trim().length > 0

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSend) return
    onSend(value.trim())
    setValue("")
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <label htmlFor="composer" className="sr-only">
        Message
      </label>
      <input
        id="composer"
        className="min-h-10 flex-1 rounded-lg border border-white/10 bg-white/70 px-3 py-2 text-sm dark:bg-white/10"
        placeholder="How can I help you today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!canSend}
        className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  )
}
