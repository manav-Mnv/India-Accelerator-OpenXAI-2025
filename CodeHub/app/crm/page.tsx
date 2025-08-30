import type { Metadata } from "next"
import { Sidebar } from "@/components/crm/sidebar"
import { ContactList } from "@/components/crm/contact-list"
import { SalesTarget } from "@/components/crm/sales-target"
import { QuickActions } from "@/components/crm/quick-actions"
import { RecentActivity } from "@/components/crm/recent-activity"
import { UpgradeCard } from "@/components/crm/upgrade-card"

export const metadata: Metadata = {
  title: "CRM Dashboard — Frontend Only",
}

export default function CRMPage() {
  return (
    <main className="min-h-screen" aria-label="CRM dashboard">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Sidebar */}
          <aside className="md:w-64">
            <Sidebar />
          </aside>

          {/* Center content */}
          <section className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ContactList />
              </div>
              <div>
                <SalesTarget />
              </div>
            </div>

            <UpgradeCard />
          </section>

          {/* Right column */}
          <aside className="md:w-80">
            <div className="flex flex-col gap-6">
              <QuickActions />
              <RecentActivity />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
