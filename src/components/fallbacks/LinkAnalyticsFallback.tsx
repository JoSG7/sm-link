function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl border border-neutral-700/80 bg-neutral-800/55 shadow-[0_12px_40px_rgba(0,0,0,0.16)] ${className}`} />
}

export function LinkAnalyticsFallback() {
  return (
    <div className="flex min-h-screen flex-col gap-7 py-7 xl:py-8" aria-label="Loading link analytics" role="status">
      <div className="space-y-3">
        <SkeletonBlock className="h-4 w-32 rounded-lg" />
        <SkeletonBlock className="h-9 w-64 rounded-lg" />
        <SkeletonBlock className="h-5 w-96 max-w-full rounded-lg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <SkeletonBlock key={index} className="h-36" />)}
      </div>
      <SkeletonBlock className="h-104 w-full" />
      <div className="grid gap-7 lg:grid-cols-2">
        <SkeletonBlock className="h-96" />
        <SkeletonBlock className="h-96" />
      </div>
      <SkeletonBlock className="h-96 w-full" />
    </div>
  )
}
