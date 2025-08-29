import { SiteHeader } from "@/components/site-header"
import { ProjectCard } from "@/components/projects/project-card"
import { ShareProjectDialog } from "@/components/projects/share-project-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProjects } from "@/lib/mock-data"

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search projects..." aria-label="Search projects" />
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="libraries">Libraries</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ShareProjectDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mockProjects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </main>
  )
}
