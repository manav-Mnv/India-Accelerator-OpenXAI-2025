export function UpgradeCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-amber-500/10 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <div className="text-base font-semibold text-slate-900 dark:text-slate-100">Upgrade to CRM Pro Premium</div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Unlock advanced analytics, unlimited contacts, and premium integrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">$79/month</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Save 20% billed annually</div>
          </div>
          <button className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600">
            Upgrade Now
          </button>
        </div>
      </div>
    </section>
  )
}
