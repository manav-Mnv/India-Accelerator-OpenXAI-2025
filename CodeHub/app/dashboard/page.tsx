import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageChart } from "@/components/charts/usage-chart"
import { Bot, FolderGit2, MonitorSmartphone, Sparkles } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/mock-api"

export default function DashboardPage() {
  const stats = api.getStats()
  const activities = api.getActivities(5)

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <section className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Analyses done: <Badge variant="secondary">{stats.analyses}</Badge>
              <br />
              Projects shared: <Badge variant="secondary">{stats.projects}</Badge>
              <br />
              Errors solved: <Badge variant="secondary">{stats.errorsSolved}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Link href="/screen-analysis">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <MonitorSmartphone className="mr-2 h-4 w-4" /> New Analysis
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="secondary">
                  <Bot className="mr-2 h-4 w-4" /> AI Chat
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary">
                  <FolderGit2 className="mr-2 h-4 w-4" /> Share Project
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" /> View History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageChart />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activities.length > 0 ? (
                activities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                    <div>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-muted-foreground">{a.summary}</div>
                    </div>
                    <Badge variant="secondary">{a.type}</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No recent activity. Start by analyzing some code or sharing a project!
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Theme and preferences are available via the header menu.
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="tips">
          <TabsList>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="tips" className="text-sm text-muted-foreground">
            Use AI Chat to explain stack traces; reference analysis history to track regressions.
          </TabsContent>
          <TabsContent value="news" className="text-sm text-muted-foreground">
            New: Real-time screen capture and analysis with Ollama integration!
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
