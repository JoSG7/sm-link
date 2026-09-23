function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-neutral-800/55 ${className}`} />
}

export function LinksFallback() {
  return (
    <div className="flex flex-col gap-7" aria-label="Loading links" role="status">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="min-h-36 rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5" key={index}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <SkeletonBlock className={index === 2 ? "h-3 w-36" : "h-3 w-24"} />
                <SkeletonBlock className="mt-4 h-10 w-16" />
              </div>
              <SkeletonBlock className="size-11 rounded-xl" />
            </div>
            <SkeletonBlock className="mt-5 h-1 w-full rounded-full" />
          </div>
        ))}
      </div>

      <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950">
        <header className="flex items-center justify-between border-b border-neutral-800/80 p-5 sm:p-6">
          <div>
            <SkeletonBlock className="h-6 w-20" />
            <SkeletonBlock className="mt-3 h-3 w-64" />
          </div>
          <SkeletonBlock className="h-7 w-16 rounded-full" />
        </header>

        <div className="flex items-center justify-between border-b border-neutral-800/80 p-4 sm:p-5">
          <div className="flex items-center gap-2">
              <SkeletonBlock className="h-10 w-14 rounded-lg" />
              <SkeletonBlock className="h-10 w-24 rounded-lg" />
              <SkeletonBlock className="h-10 w-20 rounded-lg" />
              <SkeletonBlock className="h-10 w-64 rounded-md" />
          </div>
          <SkeletonBlock className="h-10 w-32 rounded-lg" />
        </div>

        <div className="overflow-hidden">
          <div className="grid h-14 min-w-240 grid-cols-[40px_1.6fr_1fr_1fr_1.1fr_1.2fr_40px] items-center gap-6 border-b border-neutral-800/80 bg-neutral-900/30 px-5">
            <SkeletonBlock className="size-6 rounded-md" />
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="size-6 rounded-md" />
          </div>
          {Array.from({ length: 3 }, (_, index) => (
            <div className="grid h-20 min-w-240 grid-cols-[40px_1.6fr_1fr_1fr_1.1fr_1.2fr_40px] items-center gap-6 border-b border-neutral-800/80 px-5 last:border-0" key={index}>
              <SkeletonBlock className="size-6 rounded-md" />
              <SkeletonBlock className="h-4 w-44" />
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-6 w-28 rounded-full" />
              <SkeletonBlock className="h-6 w-20 rounded-full" />
              <SkeletonBlock className="size-8 rounded-md" />
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
