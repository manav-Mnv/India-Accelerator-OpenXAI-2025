"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Role = "user" | "assistant"
type Msg = { id: string; role: Role; content: string }

export function OllamaChat({
  placeholder = "Ask anything…",
  initialMessage = "How can I help you today?",
  model = "llama3.2:3b",
}: {
  placeholder?: string
  initialMessage?: string
  model?: string
}) {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const abortRef = React.useRef<AbortController | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  function append(role: Role, content: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, content }])
  }

  function updateLastAssistant(content: string) {
    setMessages((prev) => {
      const next = [...prev]
      const idx = [...next].reverse().findIndex((m) => m.role === "assistant")
      const lastIdx = idx === -1 ? -1 : next.length - 1 - idx
      if (lastIdx === -1) {
        next.push({ id: crypto.randomUUID(), role: "assistant", content })
      } else {
        next[lastIdx] = { ...next[lastIdx], content }
      }
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const prompt = input.trim()
    if (!prompt || isLoading) return

    // Add user message
    append("user", prompt)
    setInput("")
    setIsLoading(true)

    // Add empty assistant message immediately to prevent consecutive user messages
    append("assistant", "")

    const ac = new AbortController()
    abortRef.current = ac

    try {
      const res = await fetch("/api/ollama/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          message: prompt,
        }),
        signal: ac.signal,
      })

      if (!res.ok) {
        updateLastAssistant(`\n[error ${res.status}] ${await res.text().catch(() => "request failed")}`)
        setIsLoading(false)
        return
      }

      const data = await res.json()
      
      if (data.error) {
        updateLastAssistant(`\n[error] ${data.error}`)
      } else {
        // Ensure we have a proper response
        const responseContent = data.content || data.message || "No response received"
        updateLastAssistant(responseContent)
      }
    } catch (err: any) {
      updateLastAssistant(`\n[network error] ${err?.message || String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  function stop() {
    abortRef.current?.abort()
    setIsLoading(false)
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
      <div
        className={cn(
          "rounded-2xl border",
          "bg-white/70 dark:bg-zinc-900/60",
          "backdrop-blur-xl",
          "border-zinc-200/60 dark:border-zinc-800/60",
          "shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
        )}
      >
        <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Local model: {model} (Ollama)</div>
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Stop
            </button>
          ) : null}
        </header>

        <div className="h-[52vh] min-h-[320px] w-full overflow-y-auto px-4 pb-4 pt-0 md:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{initialMessage}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {messages.map((m) => (
                <li key={m.id} className="flex w-full">
                  <div
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-auto max-w-[85%] bg-sky-500 text-white dark:bg-sky-600"
                        : "mr-auto max-w-[85%] bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
                    )}
                    aria-live={m.role === "assistant" ? "polite" : undefined}
                  >
                    {m.content || (isLoading && m.role === "assistant" ? "..." : "")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t border-zinc-200/70 px-4 py-3 dark:border-zinc-800/60 md:px-6"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none",
              "border-zinc-200/70 bg-white/90 text-zinc-900 placeholder:text-zinc-400",
              "focus:ring-2 focus:ring-sky-300 dark:border-zinc-800/60 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-sky-700",
            )}
          />
          <button
            type="submit"
            className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-50 dark:bg-sky-600 dark:hover:bg-sky-500"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default OllamaChat
