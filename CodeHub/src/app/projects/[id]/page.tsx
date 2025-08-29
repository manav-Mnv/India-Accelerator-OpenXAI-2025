import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockProjects } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const p = mockProjects.find((x) => x.id === params.id)
  if (!p) return notFound()

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-5xl space-y-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="mt-1 text-sm text-muted-foreground">{p.description}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">{p.language}</Badge>
              {p.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Like</Button>
            <Button className="bg-green-500 hover:bg-green-600">Copy Project</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Code Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md border bg-muted p-4 text-sm">
              <code className="font-mono">{p.code.value}</code>
            </pre>
            <div className="mt-4 text-sm text-muted-foreground">
              Shared on {new Date(p.sharedAt).toLocaleString()} • {p.views} views
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-pretty text-muted-foreground">
            This is a sample project description. Add usage instructions, setup steps, and API references here.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
