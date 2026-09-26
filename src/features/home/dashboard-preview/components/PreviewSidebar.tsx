import {
  IconChartBar,
  IconLayoutDashboard,
  IconLink,
} from "@tabler/icons-react"
import type { PreviewView } from "../preview-data"

const sidebarItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: IconLayoutDashboard },
  { id: "analytics" as const, label: "Analytics", icon: IconChartBar },
  { id: "links" as const, label: "Links", icon: IconLink },
]

interface PreviewSidebarProps {
  activeView: PreviewView
  onViewChange: (view: PreviewView) => void
}

export function PreviewSidebar({ activeView, onViewChange }: PreviewSidebarProps) {
  return (
    <aside className="hidden w-16 shrink-0 border-r border-neutral-800/70 bg-neutral-950 p-3 sm:block">
      <nav aria-label="Dashboard preview sidebar" className="flex flex-col items-center gap-2">
        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            title={label}
            aria-label={label}
            aria-current={activeView === id ? "page" : undefined}
            onClick={() => onViewChange(id)}
            className={`flex size-10 items-center justify-center rounded-lg transition-colors ${activeView === id ? "text-white" : "text-neutral-300 hover:text-white"}`}
          >
            <Icon className="size-5" />
          </button>
        ))}
      </nav>
    </aside>
  )
}