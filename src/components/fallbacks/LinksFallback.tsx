function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl border border-neutral-700/80 bg-neutral-800/55 shadow-[0_12px_40px_rgba(0,0,0,0.16)] ${className}`} />
}

export function LinksFallback() {
  return (
    <div className="flex flex-col gap-7" aria-label="Loading links" role="status">
      <div className="grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <SkeletonBlock key={index} className="h-36" />)}
      </div>

      <SkeletonBlock className="h-16" />

      <SkeletonBlock className="h-120 w-full" />
    </div>
  )
}
