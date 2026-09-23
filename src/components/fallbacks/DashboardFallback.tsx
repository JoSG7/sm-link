function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-neutral-800/55 ${className}`} />
}

export function DashboardFallback() {
  return (
    <div className="flex flex-col gap-7" aria-label="Loading dashboard" role="status">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <article className="relative min-h-36 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5" key={index}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <SkeletonBlock className={index === 1 ? "h-3 w-32" : index === 2 ? "h-3 w-24" : "h-3 w-28"} />
                <SkeletonBlock className="mt-4 h-10 w-20" />
              </div>
              <SkeletonBlock className="size-11 rounded-xl" />
            </div>
            <SkeletonBlock className="absolute inset-x-5 bottom-5 h-1" />
          </article>
        ))}
      </div>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
        <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950">
          <header className="flex items-center justify-between border-b border-neutral-800/80 p-5 sm:p-6">
            <div>
              <SkeletonBlock className="h-6 w-28" />
              <SkeletonBlock className="mt-3 h-3 w-64" />
            </div>
            <SkeletonBlock className="h-4 w-14" />
          </header>
          <div className="divide-y divide-neutral-800/80">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="flex h-20 items-center gap-4 px-5 sm:px-6" key={index}>
                <SkeletonBlock className="size-10 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <SkeletonBlock className="h-4 w-28" />
                  <SkeletonBlock className="mt-2 h-3 w-52 max-w-full" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <SkeletonBlock className="h-4 w-8" />
                  <SkeletonBlock className="h-3 w-12" />
                </div>
                <SkeletonBlock className="size-4" />
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950">
          <header className="border-b border-neutral-800/80 p-5 sm:p-6">
            <SkeletonBlock className="h-6 w-32" />
            <SkeletonBlock className="mt-3 h-3 w-52" />
          </header>
          <div className="grid gap-4 p-5 sm:p-6">
            {Array.from({ length: 2 }, (_, index) => (
              <div className="flex h-20 items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4" key={index}>
                <SkeletonBlock className="size-9 rounded-lg" />
                <div className="flex-1">
                  <SkeletonBlock className="h-3 w-24" />
                  <SkeletonBlock className="mt-3 h-5 w-10" />
                </div>
                <SkeletonBlock className="h-3 w-12" />
              </div>
            ))}
            <div className="border-t border-neutral-800/80 pt-4">
              <SkeletonBlock className="h-3 w-28" />
              <SkeletonBlock className="mt-4 h-4 w-48 max-w-full" />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
