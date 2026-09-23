function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-neutral-800/55 ${className}`} />
}

export function LinkAnalyticsFallback() {
  return (
    <div className="flex min-h-screen flex-col gap-7 py-7 xl:py-8" aria-label="Loading link analytics" role="status">
      <div className="space-y-3">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-9 w-64" />
        <SkeletonBlock className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <article className="relative min-h-36 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5" key={index}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <SkeletonBlock className={index === 2 ? "h-3 w-32" : "h-3 w-28"} />
                <SkeletonBlock className="mt-4 h-10 w-20" />
              </div>
              <SkeletonBlock className="size-11 rounded-xl" />
            </div>
            <SkeletonBlock className="absolute inset-x-5 bottom-5 h-1" />
          </article>
        ))}
      </div>

      <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950">
        <header className="flex items-start justify-between gap-4 border-b border-neutral-800/80 p-5 sm:p-6">
          <div>
            <SkeletonBlock className="h-6 w-44" />
            <SkeletonBlock className="mt-3 h-3 w-64" />
          </div>
          <SkeletonBlock className="h-9 w-40 rounded-md" />
        </header>
        <SkeletonBlock className="mx-5 my-5 h-80 rounded-lg sm:mx-7" />
      </article>

      <div className="grid gap-7 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950" key={index}>
            <header className="border-b border-neutral-800/80 p-5 sm:p-6">
              <SkeletonBlock className="h-6 w-28" />
              <SkeletonBlock className="mt-3 h-3 w-44" />
            </header>
            <div className="flex h-80 flex-col items-center justify-center gap-5 p-5 sm:p-6">
              <SkeletonBlock className="size-52 rounded-full" />
              <div className="flex gap-4">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-3 w-16" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950">
        <header className="flex items-center justify-between border-b border-neutral-800/80 p-5 sm:p-6">
          <div>
            <SkeletonBlock className="h-6 w-28" />
            <SkeletonBlock className="mt-3 h-3 w-64" />
          </div>
          <SkeletonBlock className="h-7 w-16 rounded-full" />
        </header>
        <SkeletonBlock className="h-14 w-full rounded-none" />
        {Array.from({ length: 3 }, (_, index) => (
          <div className="flex h-16 items-center gap-8 border-b border-neutral-800/80 px-5 last:border-0 sm:px-7" key={index}>
            <SkeletonBlock className="h-4 w-40" />
            <SkeletonBlock className="h-6 w-24 rounded-full" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-20" />
          </div>
        ))}
      </article>
    </div>
  )
}
