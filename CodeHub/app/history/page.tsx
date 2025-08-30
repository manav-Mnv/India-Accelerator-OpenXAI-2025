import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, ImageIcon, Clock } from "lucide-react"
import { api } from "@/lib/mock-api"

export default function HistoryPage() {
  const activities = api.getActivities(20)
  const analyses = api.getAnalyses(20)

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">History</h1>
        </div>

        <Tabs defaultValue="analyses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analyses">Analyses ({analyses.length})</TabsTrigger>
            <TabsTrigger value="activities">Activities ({activities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="analyses" className="space-y-4">
            {analyses.length > 0 ? (
              analyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {analysis.source === "screen" ? (
                          <Camera className="mr-2 inline h-5 w-5" />
                        ) : (
                          <ImageIcon className="mr-2 inline h-5 w-5" />
                        )}
                        Analysis • {new Date(analysis.createdAt).toLocaleString()}
                      </CardTitle>
                      <Badge variant="secondary">{analysis.source}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-3 bg-muted">
                      <div className="text-sm font-medium mb-2">Extracted Content:</div>
                      <div className="text-sm text-muted-foreground">{analysis.extractedText}</div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-sm font-medium mb-2">Steps:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {analysis.steps.map((step, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Performance:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {analysis.performance.map((perf, i) => (
                            <li key={i}>• {perf}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {analysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="rounded-md border p-3">
                        <div className="text-sm font-medium mb-2">Suggestion {i + 1}:</div>
                        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                          <code>{suggestion.value}</code>
                        </pre>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-muted-foreground">
                    No analyses yet. Start by analyzing some code or uploading an image!
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.summary}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="secondary">{activity.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-muted-foreground">
                    No activities yet. Start using the app to see your activity history!
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
