export function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions"
      className="rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:bg-white/10"
    >
      <h2 id="quick-actions" className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Quick Actions
      </h2>
      <div className="grid gap-2">
        <Action label="Schedule Call" />
        <Action label="Send Email" />
        <Action label="Book Meeting" />
        <Action label="Add Note" />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-sky-500/10 p-4">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Talk to our new AI</div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Xperia</div>
        <button className="mt-3 w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600">
          Start Chat
        </button>
      </div>
    </section>
  )
}

function Action({ label }: { label: string }) {
  return (
    <button className="w-full rounded-lg border border-white/10 bg-white/70 px-3 py-2 text-left text-sm hover:bg-white dark:bg-white/10">
      {label}
    </button>
  )
}
