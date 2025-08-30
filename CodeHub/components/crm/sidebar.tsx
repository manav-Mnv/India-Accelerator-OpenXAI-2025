"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

const mainItems = [
  { label: "Contacts", icon: "👥" },
  { label: "Analytics", icon: "📊" },
  { label: "Sales Pipeline", icon: "🪜" },
  { label: "Calendar", icon: "📅" },
  { label: "Campaigns", icon: "📣" },
] as const

const tools = [
  { label: "Reports", icon: "📑" },
  { label: "Deals", icon: "💼" },
  { label: "Messages", icon: "💬" },
  { label: "Data Import", icon: "⬇️" },
  { label: "Forecasting", icon: "📈" },
] as const

export function Sidebar() {
  const [active, setActive] = useState<(typeof mainItems)[number]["label"]>("Contacts")

  return (
    <nav
      aria-label="Main menu"
      className="rounded-2xl border border-white/10 bg-white/60 p-3 shadow-sm backdrop-blur-sm dark:bg-white/10"
    >
      <div className="px-3 py-2">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">CRM Pro</div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Customer Management</div>
      </div>

      <Section title="Main Menu">
        {mainItems.map((it) => (
          <button
            key={it.label}
            onClick={() => setActive(it.label)}
            className={cn(
              "w-full rounded-xl px-3 py-2 text-left text-sm transition",
              active === it.label
                ? "bg-sky-500/15 text-sky-600 dark:text-sky-300"
                : "text-slate-700 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/10",
            )}
            aria-current={active === it.label ? "page" : undefined}
          >
            <span className="mr-2" aria-hidden>
              {it.icon}
            </span>
            {it.label}
          </button>
        ))}
      </Section>

      <Section title="CRM Tools">
        {tools.map((it) => (
          <button
            key={it.label}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <span className="mr-2" aria-hidden>
              {it.icon}
            </span>
            {it.label}
          </button>
        ))}
      </Section>

      <Section title="Administration">
        <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-white/60 transition dark:text-slate-300 dark:hover:bg-white/10">
          ⚙️ Settings
        </button>
        <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-white/60 transition dark:text-slate-300 dark:hover:bg-white/10">
          🔔 Automations
        </button>
      </Section>
    </nav>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="px-3 pb-2 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">{title}</div>
      <div className="grid gap-1">{children}</div>
    </div>
  )
}
