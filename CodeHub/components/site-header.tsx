"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { BrandLogo } from "./brand-logo"
import { ThemeToggle } from "./theme-toggle"
import { ChevronRight, Search, User, LogOut } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { mockProjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils" // add cn for conditional classes

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "AI Chat", href: "/chat" },
  ]

  const parts = pathname.split("/").filter(Boolean)

  const results = mockProjects.filter(
    (p) =>
      q.length > 1 &&
      (p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase()) ||
        p.tags.join(" ").toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link href="/" aria-label="Go to CodeHub home">
          <BrandLogo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-xl border bg-background/60 px-1 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:flex"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            aria-label="Search"
            placeholder="Search projects, concepts, errors..."
            className="pl-9"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setOpen(true)
            }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          {open && results.length > 0 && (
            <div className="absolute top-10 w-full rounded-md border bg-background p-2 shadow">
              {results.slice(0, 6).map((r) => (
                <button
                  key={r.id}
                  className="flex w-full items-center justify-between rounded px-2 py-2 text-left hover:bg-muted"
                  onMouseDown={() => router.push(`/projects/${r.id}`)}
                >
                  <span>{r.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Open profile menu">
                <Avatar>
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manav</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      <div className="mx-auto hidden max-w-6xl px-4 pb-3 md:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </BreadcrumbItem>
            {parts.map((p, i) => {
              const href = "/" + parts.slice(0, i + 1).join("/")
              const isLast = i === parts.length - 1
              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="capitalize">{p.replaceAll("-", " ")}</BreadcrumbPage>
                    ) : (
                      <Link href={href} className="capitalize text-muted-foreground hover:text-foreground">
                        {p.replaceAll("-", " ")}
                      </Link>
                    )}
                  </BreadcrumbItem>
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
