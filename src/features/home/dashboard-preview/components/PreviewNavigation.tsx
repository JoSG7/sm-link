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
    <nav aria-label="Dashboard preview navigation" className="grid w-full grid-cols-3 border-b border-moss-border bg-moss-800">
      {previewViews.map((view) => (
        <button
          key={view.id}
          type="button"
          aria-current={activeView === view.id ? "page" : undefined}
          onClick={() => onViewChange(view.id)}
          className={`flex min-h-14 items-center justify-center gap-2 border-r border-moss-border px-3 text-sm font-semibold transition-colors last:border-r-0 sm:min-h-16 sm:text-base ${activeView === view.id ? "bg-moss-900 text-green-300 shadow-[inset_0_-1px_0_rgba(74,222,128,0.35)]" : "text-moss-copy hover:bg-moss-850 hover:text-neutral-100"}`}
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