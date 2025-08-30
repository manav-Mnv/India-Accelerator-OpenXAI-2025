// TypeScript types for CodeHub

export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  code?: { language: string; value: string }
  createdAt: string
}

export type Project = {
  id: string
  title: string
  description: string
  language: string
  sharedAt: string
  views: number
  tags: string[]
  category: string
  privacy: "public" | "unlisted"
  code: { language: string; value: string }
  likes: number
  bookmarked?: boolean
}

export type AnalysisResult = {
  id: string
  createdAt: string
  source: "screen" | "image"
  extractedText: string
  errors: { message: string; severity: "low" | "medium" | "high" }[]
  steps: string[]
  suggestions: { language: string; value: string }[]
  performance: string[]
  previewUrl?: string
}

export type Activity =
  | {
      id: string
      type: "screen-analysis"
      timestamp: string
      title: string
      summary: string
      resultId: string
    }
  | { id: string; type: "chat"; timestamp: string; title: string; summary: string }
  | { id: string; type: "project-share"; timestamp: string; title: string; summary: string; projectId: string }
  | { id: string; type: "edit"; timestamp: string; title: string; summary: string }

export type HistoryEntry = {
  id: string
  type: Activity["type"]
  timestamp: string
  title: string
  changes?: string
  results?: string
  restoreHint?: string
}
