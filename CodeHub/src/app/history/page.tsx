import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockHistory } from "@/lib/mock-data"

export default function HistoryPage() {
  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <div className="flex items-center justify-between gap-3">
          <Input className="max-w-sm" placeholder="Search history..." aria-label="Search history" />
          <Button variant="outline">Export History</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="screen-analysis">Screen Analyses</TabsTrigger>
            <TabsTrigger value="chat">AI Chats</TabsTrigger>
            <TabsTrigger value="project-share">Shared Projects</TabsTrigger>
            <TabsTrigger value="edit">Edits</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockHistory.map((h) => (
              <Card key={h.id}>
                <CardHeader>
                  <CardTitle className="text-base">{h.title}</CardTitle>
                  <div className="text-xs text-muted-foreground">{new Date(h.timestamp).toLocaleString()}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {h.results && <div className="text-sm">{h.results}</div>}
                  {h.changes && (
                    <pre className="overflow-auto rounded-md border bg-muted p-3 text-xs">
                      <code className="font-mono">{h.changes}</code>
                    </pre>
                  )}
                  <div className="flex gap-2">
                    <Button variant="secondary">View Details</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">Restore</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="screen-analysis" />
          <TabsContent value="chat" />
          <TabsContent value="project-share" />
          <TabsContent value="edit" />
        </Tabs>
      </div>
    </main>
  )
}
