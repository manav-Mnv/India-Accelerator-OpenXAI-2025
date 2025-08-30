import type { NextRequest } from "next/server"
import ollama from "ollama"

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}) as any)) ?? {}

    const model = typeof body.model === "string" ? body.model : "llama3.2:3b"
    const temperature = typeof body.temperature === "number" ? body.temperature : 0.3
    const system = body.system

    const singleInput: unknown = body.message ?? body.prompt ?? body.input ?? body.content ?? body.text
    const rawMessages: any[] = Array.isArray(body.messages) ? body.messages : []

    let prompt = ""
    if (typeof singleInput === "string" && singleInput.trim().length > 0) {
      prompt = singleInput.trim()
    } else if (rawMessages.length > 0) {
      prompt = rawMessages
        .map((m) => {
          const role = typeof m?.role === "string" ? m.role : "user"
          const content =
            typeof m?.content === "string"
              ? m.content
              : Array.isArray(m?.content)
                ? m.content.map((p: any) => (typeof p?.text === "string" ? p.text : "")).join(" ")
                : ""
          return `${role}: ${content}`.trim()
        })
        .filter(Boolean)
        .join("\n")
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Message required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
    }

    const response = await ollama.chat({
      model,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      options: {
        temperature,
        ...(system && { system }),
      },
    })

    // Return in the format expected by the frontend
    return new Response(JSON.stringify({
      id: Math.random().toString(36).substring(7),
      content: response.message.content,
      message: response.message.content, // Also include as 'message' for compatibility
      model: response.model,
      timestamp: new Date().toISOString(),
    }), {
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error("Ollama API error:", error)
    return new Response(JSON.stringify({ 
      error: "Failed to process request. Make sure Ollama is running on http://localhost:11434",
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 })
}