"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { ChatMessage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Paperclip, Send, FileDown, Sparkles, Bug, BookOpenCheck, Code2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function Bubble({ m }: { m: ChatMessage }) {
  const isUser = m.role === "user"
  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow ${isUser ? "bg-blue-500 text-white" : "bg-muted"}`}>
        <p className="whitespace-pre-wrap">{m.content}</p>
        {m.code && (
          <pre
            className={`mt-2 overflow-auto rounded-md border p-3 text-xs ${isUser ? "bg-blue-600/60" : "bg-background"}`}
          >
            <code className="font-mono">{m.code.value}</code>
          </pre>
        )}
        <div className={`mt-1 text-[10px] ${isUser ? "text-white/80" : "text-muted-foreground"}`}>
          {new Date(m.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export function ChatPanel({ initial }: { initial: ChatMessage[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)
  const [text, setText] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages])

  function send(content: string) {
    if (!content.trim()) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content, createdAt: new Date().toISOString() }
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Mock AI: Here's a possible approach.",
      code: { language: "ts", value: `// pseudo solution\nconsole.log("Analyze:", \`${content}\`)` },
      createdAt: new Date().toISOString(),
    }
    setMessages((m) => [...m, userMsg, aiMsg])
    setText("")
  }

  function exportConversation() {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "codehub-conversation.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const text = await f.text()
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: `Uploaded file: ${f.name}`,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Parsed file for analysis (mock).",
        code: { language: "txt", value: text.slice(0, 400) },
        createdAt: new Date().toISOString(),
      },
    ])
    toast({ title: "File uploaded", description: `Analyzed ${f.name} (mock).` })
  }

  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <Card className="mb-4 h-full overflow-auto">
        <CardContent className="p-4">
          {messages.map((m) => (
            <Bubble key={m.id} m={m} />
          ))}
          <div ref={bottomRef} />
        </CardContent>
      </Card>

      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => send("Analyze this code")}>
            <Code2 className="mr-2 h-4 w-4" /> Analyze Code
          </Button>
          <Button variant="secondary" onClick={() => send("Find the bug in my function")}>
            <Bug className="mr-2 h-4 w-4" /> Debug Error
          </Button>
          <Button variant="secondary" onClick={() => send("Explain React useEffect")}>
            <BookOpenCheck className="mr-2 h-4 w-4" /> Explain Concept
          </Button>
          <Button variant="secondary" onClick={() => send("Best practices for API routes")}>
            <Sparkles className="mr-2 h-4 w-4" /> Best Practices
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            aria-label="Type message"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(text)}
          />
          <input ref={fileRef} type="file" className="hidden" onChange={onFile} />
          <Button variant="outline" onClick={() => fileRef.current?.click()} aria-label="Upload file">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => send(text)} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={exportConversation} aria-label="Export conversation">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
