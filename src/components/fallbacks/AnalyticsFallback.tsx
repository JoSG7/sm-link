function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-neutral-800/55 ${className}`} />
}

export function AnalyticsFallback() {
  return (
    <div className="flex flex-col gap-7" aria-label="Loading analytics" role="status">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <article className="relative min-h-36 flex-1 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5" key={index}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <SkeletonBlock className={index === 1 ? "h-3 w-32" : index === 2 ? "h-3 w-24" : "h-3 w-28"} />
                <SkeletonBlock className="mt-4 h-10 w-20" />
              </div>
              <SkeletonBlock className="size-11 rounded-xl" />
            </div>
            <SkeletonBlock className="absolute inset-x-5 bottom-5 h-1 rounded-full" />
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <SkeletonBlock className="h-6 w-56" />
            <SkeletonBlock className="mt-3 h-3 w-36" />
          </div>
          <SkeletonBlock className="h-9 w-16 rounded-full" />
        </div>

        <div className="flex h-72 items-end gap-5 border-b border-neutral-800/80 px-8 pb-8 pt-4">
          {Array.from({ length: 7 }, (_, index) => (
            <SkeletonBlock
              className={`flex-1 rounded-t-md rounded-b-none ${index % 3 === 0 ? "h-28" : index % 3 === 1 ? "h-44" : "h-20"}`}
              key={index}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SkeletonBlock className="h-9 w-36 rounded-md" />
          <SkeletonBlock className="h-9 w-44 rounded-md" />
          <SkeletonBlock className="h-9 w-36 rounded-md" />
          <SkeletonBlock className="h-9 w-64 rounded-md" />
        </div>
      </article>
    </div>
  )
}
