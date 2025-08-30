import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { FeatureCard } from "@/components/landing/feature-card"
import { Activity, Bot, FolderGit2, MonitorSmartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockStats } from "@/lib/mock-data"

export default function LandingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-pretty text-3xl font-semibold leading-8 md:text-4xl">
              CodeHub — Collaborate, Analyze, and Share Code with AI
            </h1>
            <p className="mt-3 text-muted-foreground">
              Real-time screen analysis, AI chat, and a community-driven project hub. Build faster with clear insights.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                href="/screen-analysis"
              >
                Start Analyzing
              </Link>
              <Link className="rounded-md border px-4 py-2 transition hover:bg-muted" href="/dashboard">
                View Dashboard
              </Link>
              <Link
                className="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                href="/projects"
              >
                Browse Projects
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary">{(mockStats?.users ?? 0).toLocaleString()} users</Badge>
              <Badge variant="secondary">{mockStats?.projects ?? 0} projects shared</Badge>
              <Badge variant="secondary">{mockStats?.errorsSolved ?? 0}+ errors solved</Badge>
            </div>
          </div>
          <div>
            <div
              className="aspect-video w-full rounded-xl border bg-[url('/codehub-product-preview.png')] bg-cover bg-center"
              aria-label="Product screenshot placeholder"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-balance text-2xl font-semibold">How it works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {["Capture", "Analyze", "Chat", "Share"].map((s, i) => (
            <Card key={s} className="bg-background/60 backdrop-blur transition hover:shadow">
              <CardContent className="p-4">
                <div className="text-xl font-bold text-black dark:text-white">
                  {i + 1} - {s}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold">Feature highlights</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <FeatureCard
            icon={<MonitorSmartphone className="h-5 w-5" />}
            title="Real-time Analysis"
            href="/screen-analysis"
          >
            Capture your screen and get instant insights on errors and performance.
          </FeatureCard>
          <FeatureCard icon={<Bot className="h-5 w-5" />} title="AI Chat" href="/chat">
            Ask questions, debug issues, and learn best practices with an AI assistant.
          </FeatureCard>
          <FeatureCard icon={<FolderGit2 className="h-5 w-5" />} title="Project Sharing" href="/projects">
            Share read-only code with docs, tags, and copy-friendly snippets.
          </FeatureCard>
          <FeatureCard icon={<Activity className="h-5 w-5" />} title="Screen Capture" href="/screen-analysis#capture">
            Upload images or start a session; get structured, actionable results.
          </FeatureCard>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CodeHub</p>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
            <Link href="/chat" className="hover:underline">
              AI Chat
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
