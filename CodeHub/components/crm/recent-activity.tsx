const items = [
  { label: "New contact added", time: "2 min ago" },
  { label: "Deal closed", time: "1 hour ago" },
  { label: "Meeting scheduled", time: "3 hours ago" },
  { label: "Email sent", time: "5 hours ago" },
]

export function RecentActivity() {
  return (
    <section
      aria-labelledby="recent-activity"
      className="rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:bg-white/10"
    >
      <h2 id="recent-activity" className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Recent Activity
      </h2>
      <ul className="grid gap-2">
        {items.map((i) => (
          <li
            key={i.label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/70 px-3 py-2 text-sm dark:bg-white/10"
          >
            <span className="text-slate-900 dark:text-slate-100">{i.label}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">{i.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
