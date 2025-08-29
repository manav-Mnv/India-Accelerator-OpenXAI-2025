import { SiteHeader } from "@/components/site-header"
import { AnalysisPanel } from "@/components/screen/analysis-panel"

export default function ScreenAnalysisPage() {
  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl p-4">
        <AnalysisPanel />
      </div>
    </main>
  )
}
