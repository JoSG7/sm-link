export function DashboardFallback() {
  return (
    <div className="grid gap-7" aria-label="Loading dashboard" role="status">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-2xl border border-neutral-700/80 bg-neutral-800/55 shadow-[0_12px_40px_rgba(0,0,0,0.16)]" />
        ))}
      </div>
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
        <div className="h-80 animate-pulse rounded-2xl border border-neutral-700/80 bg-neutral-800/55 shadow-[0_12px_40px_rgba(0,0,0,0.16)]" />
        <div className="h-80 animate-pulse rounded-2xl border border-neutral-700/80 bg-neutral-800/55 shadow-[0_12px_40px_rgba(0,0,0,0.16)]" />
      </div>
    </div>
  )
}
