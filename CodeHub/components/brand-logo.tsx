import { Code2 } from "lucide-react"

export function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <Code2 className="h-6 w-6 text-blue-500" aria-hidden />
      <span className="font-semibold tracking-tight">CodeHub</span>
    </div>
  )
}
