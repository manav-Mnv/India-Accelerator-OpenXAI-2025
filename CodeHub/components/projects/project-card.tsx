import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Heart, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/types"

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link href={`/projects/${p.id}`} className="hover:underline">
            {p.title}
          </Link>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-xs">
              <Eye className="h-4 w-4" /> {p.views}
            </span>
            <span className="inline-flex items-center gap-1 text-xs">
              <Heart className="h-4 w-4" /> {p.likes}
            </span>
          </div>
        </CardTitle>
        <div className="text-xs text-muted-foreground">{new Date(p.sharedAt).toLocaleDateString()}</div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-pretty">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">{p.language}</Badge>
          {p.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Link href={`/projects/${p.id}`} className="text-sm text-blue-500 hover:underline">
          View Details
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bookmark className="h-5 w-5" aria-label="Bookmark project" />
        </div>
      </CardFooter>
    </Card>
  )
}
