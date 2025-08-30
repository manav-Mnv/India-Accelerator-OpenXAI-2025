import type { AnalysisResult, Activity, ChatMessage, HistoryEntry, Project } from "./types"

const now = () => new Date().toISOString()

export const mockStats = {
  users: 18240,
  projects: 36,
  errorsSolved: 542,
  analyses: 128,
}

export const mockChat: ChatMessage[] = [
  { id: "1", role: "user", content: "Explain useEffect cleanup.", createdAt: now() },
  {
    id: "2",
    role: "assistant",
    content: "Cleanup runs before unmount or before next effect run.",
    code: {
      language: "tsx",
      value: `useEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id)\n}, [])`,
    },
    createdAt: now(),
  },
]

export const mockChatHistoryTitles = ["Debug hydration mismatch", "Best practices: API routes", "Fix slow render"]

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Realtime Chat App",
    description: "WebSocket rooms and presence tracking.",
    language: "TypeScript",
    sharedAt: now(),
    views: 1240,
    tags: ["realtime", "nextjs", "ws"],
    category: "Web",
    privacy: "public",
    likes: 86,
    code: { language: "ts", value: `type Message={user:string;text:string}\nconst clients=new Set<WebSocket>()` },
  },
  {
    id: "p2",
    title: "Image Optimizer CLI",
    description: "Batch image compression with Sharp.",
    language: "JavaScript",
    sharedAt: now(),
    views: 642,
    tags: ["cli", "images", "node"],
    category: "Tools",
    privacy: "public",
    likes: 51,
    code: { language: "js", value: `import sharp from 'sharp'\nexport async function optimize(path){/* ... */}` },
  },
  {
    id: "p3",
    title: "SQL Helpers",
    description: "Typed helpers for parameterized SQL.",
    language: "TypeScript",
    sharedAt: now(),
    views: 310,
    tags: ["sql", "db", "types"],
    category: "Libraries",
    privacy: "unlisted",
    likes: 23,
    code: { language: "ts", value: `export const q=(s:TemplateStringsArray,...v:any[])=>{/* ... */}` },
  },
]

export const mockAnalyses: AnalysisResult[] = [
  {
    id: "a1",
    createdAt: now(),
    source: "screen",
    extractedText: "TypeError: cannot read properties of undefined (reading 'map')",
    errors: [
      { message: "Undefined value passed into map", severity: "high" },
      { message: "Missing defensive checks", severity: "medium" },
    ],
    steps: ["Ensure data defined", "Default to []", "Verify API shape"],
    suggestions: [{ language: "tsx", value: `const items=(data?.items??[]).map(i=><li key={i.id}>{i.name}</li>)` }],
    performance: ["Memoize derived lists", "Avoid re-mapping each render"],
  },
]

export const mockActivities: Activity[] = [
  {
    id: "act1",
    type: "screen-analysis",
    timestamp: now(),
    title: "Screen Analysis",
    summary: "Detected undefined map",
    resultId: "a1",
  },
  {
    id: "act2",
    type: "project-share",
    timestamp: now(),
    title: "Shared: Realtime Chat",
    summary: "Published publicly",
    projectId: "p1",
  },
  {
    id: "act3",
    type: "chat",
    timestamp: now(),
    title: "Hydration mismatch help",
    summary: "Resolved via client-only check",
  },
]

export const mockHistory: HistoryEntry[] = [
  {
    id: "h1",
    type: "screen-analysis",
    timestamp: now(),
    title: "Build failed",
    results: "Missing NEXT_PUBLIC_API_URL",
    changes: `- process.env.API_URL\n+ process.env.NEXT_PUBLIC_API_URL`,
  },
  {
    id: "h2",
    type: "project-share",
    timestamp: now(),
    title: "Shared: Optimizer CLI",
    changes: `+ README\n+ --quality flag`,
  },
  { id: "h3", type: "chat", timestamp: now(), title: "Explain TS utility types", results: "Partial, Pick, Record" },
]
