"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function ShareProjectDialog() {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState<string[]>(["nextjs"])
  const { toast } = useToast()

  function addTag(t: string) {
    if (!t) return
    setTags((prev) => Array.from(new Set([...prev, t.toLowerCase()])))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Share New Project</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="share-desc" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share New Project</DialogTitle>
          <p id="share-desc" className="text-sm text-muted-foreground">
            Publish a read-only project for others to learn from.
          </p>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project title</Label>
            <Input id="title" placeholder="Awesome project" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" placeholder="What does your project do?" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="libraries">Libraries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Privacy</Label>
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Switch id="privacy" aria-label="Privacy toggle" />
                <div className="text-sm">
                  <div className="font-medium">Public</div>
                  <div className="text-muted-foreground">Toggle to switch to Unlisted</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Code</Label>
            <Textarea placeholder="Paste your code snippet here..." className="font-mono" rows={6} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }}
              />
              <Button
                variant="secondary"
                onClick={() => addTag((document.getElementById("tags") as HTMLInputElement)?.value || "")}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              toast({ title: "Project shared", description: "Your project is live (mock)." })
              setOpen(false)
            }}
            className="bg-green-500 hover:bg-green-600"
          >
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
