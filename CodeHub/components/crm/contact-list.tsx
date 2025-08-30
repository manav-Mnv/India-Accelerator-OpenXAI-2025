"use client"

import { useState } from "react"

type Contact = {
  id: string
  name: string
  company: string
  phone: string
  amount: string
  status: "Active" | "Prospect" | "Inactive"
  initials: string
}

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    phone: "+1 (555) 123-4567",
    amount: "$12.5K",
    status: "Active",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "StartupHub",
    phone: "+1 (555) 987-6543",
    amount: "$8.2K",
    status: "Prospect",
    initials: "MC",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Creative Agency",
    phone: "+1 (555) 456-7890",
    amount: "$15.7K",
    status: "Active",
    initials: "ER",
  },
  {
    id: "4",
    name: "David Kim",
    company: "TechSolutions",
    phone: "+1 (555) 321-0987",
    amount: "$3.1K",
    status: "Inactive",
    initials: "DK",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    company: "Design Studio",
    phone: "+1 (555) 654-3210",
    amount: "$9.8K",
    status: "Active",
    initials: "LT",
  },
]

export function ContactList() {
  const [filter, setFilter] = useState<"All" | Contact["status"]>("All")
  const filtered = filter === "All" ? CONTACTS : CONTACTS.filter((c) => c.status === filter)

  return (
    <section
      aria-labelledby="recent-contacts"
      className="rounded-2xl border border-white/10 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:bg-white/10"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 id="recent-contacts" className="text-base font-semibold text-slate-900 dark:text-slate-100 text-balance">
          Recent Contacts
        </h2>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="filter">
            Filter contacts
          </label>
          <select
            id="filter"
            className="rounded-lg border border-white/10 bg-white/60 px-2 py-1 text-sm dark:bg-white/10"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Prospect</option>
            <option>Inactive</option>
          </select>
          <button className="rounded-lg border border-white/10 bg-white/60 px-2 py-1 text-sm hover:bg-white/80 dark:bg-white/10">
            Export
          </button>
        </div>
      </header>

      <ul className="grid gap-3">
        {filtered.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-white/10 bg-white/80 p-3 shadow-sm transition hover:bg-white dark:bg-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm dark:bg-slate-700">
                  {c.initials}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">{c.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {c.company} • {c.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.amount}</div>
                <StatusBadge status={c.status} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StatusBadge({ status }: { status: Contact["status"] }) {
  const styles =
    status === "Active"
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
      : status === "Prospect"
        ? "bg-sky-500/15 text-sky-600 dark:text-sky-300"
        : "bg-slate-500/15 text-slate-600 dark:text-slate-300"

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>{status}</span>
}
