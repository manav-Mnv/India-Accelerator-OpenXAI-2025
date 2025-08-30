export function SalesTarget() {
  return (
    <section
      aria-labelledby="sales-target"
      className="rounded-2xl border border-white/10 bg-slate-50/80 p-4 shadow-sm backdrop-blur-sm dark:bg-black/30"
    >
      <header className="mb-2">
        <h2 id="sales-target" className="text-base font-semibold text-slate-900 dark:text-slate-100 text-balance">
          Sales Target
        </h2>
      </header>

      <div className="space-y-4">
        <GoalRow label="Monthly Target" value="$125K" pct={68} color="bg-sky-500" note="$85K achieved" />
        <GoalRow label="Quarterly Target" value="$375K" pct={45} color="bg-amber-500" note="$168K achieved" />
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/70 p-4 text-center dark:bg-white/10">
        <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">12</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Days left in month</div>
      </div>
    </section>
  )
}

function GoalRow({
  label,
  value,
  pct,
  color,
  note,
}: {
  label: string
  value: string
  pct: number
  color: string
  note: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>{label}</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">{value}</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">{note}</div>
    </div>
  )
}
