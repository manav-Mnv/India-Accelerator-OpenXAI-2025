import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"
import Link from "next/link"

export function FeatureCard({
  icon,
  title,
  children,
  href,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  href?: string
}) {
  const CardInner = (
    <Card className="h-full bg-background/60 backdrop-blur transition hover:shadow group">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="rounded-md bg-blue-500/10 p-2 text-blue-500">{icon}</div>
        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  )

  // If href provided, render as full-card link with focus ring
  return href ? (
    <Link
      href={href}
      aria-label={`${title} — open`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {CardInner}
    </Link>
  ) : (
    CardInner
  )
}
