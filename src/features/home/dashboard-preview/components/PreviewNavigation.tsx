import {
  IconChartBar,
  IconLayoutDashboard,
  IconLink,
} from "@tabler/icons-react"
import type { PreviewView } from "../preview-data"
import { previewViews } from "../preview-data"

interface PreviewNavigationProps {
  activeView: PreviewView
  onViewChange: (view: PreviewView) => void
}

export function PreviewNavigation({ activeView, onViewChange }: PreviewNavigationProps) {
  return (
    <nav className="grid w-fit grid-cols-3 bg-card rounded-t-2xl shadow-card border border-b-0 border-[#ffffff1a] "
      aria-label="Dashboard preview navigation">
      {previewViews.map((view) => (
        <button
          key={view.id}
          type="button"
          aria-current={activeView === view.id ? "page" : undefined}
          onClick={() => onViewChange(view.id)}
          className={`flex min-h-14 items-center justify-center gap-2  px-4 text-sm font-semibold transition-colors last:border-r-0 sm:min-h-16 sm:text-base ${activeView === view.id ? "text-neutral-100" : "text-moss-copy hover:text-neutral-100"}`}
        >
          {view.id === "dashboard" && <IconLayoutDashboard className="size-5" />}
          {view.id === "analytics" && <IconChartBar className="size-5" />}
          {view.id === "links" && <IconLink className="size-5" />}
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </nav>
  )
}