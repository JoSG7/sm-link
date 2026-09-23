function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-800/70 ${className}`} />
}

function LinkCardSkeletonContent({ protectedLink = false }: { protectedLink?: boolean }) {
  return (
    <article className="relative isolate overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] xl:p-5">
      <section className="flex items-start gap-4 pb-5">
        <div className="flex min-w-0 grow flex-col gap-2">
          <SkeletonBlock className="h-4 w-44" />
          <SkeletonBlock className="h-10 w-full max-w-md" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
        <SkeletonBlock className="size-10 shrink-0 rounded-full lg:size-15" />
      </section>

      <footer className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          {protectedLink && <SkeletonBlock className="h-6 w-20 rounded-full" />}
        </div>
        <div className="flex gap-2">
          <SkeletonBlock className="size-8 rounded-xl" />
          {!protectedLink && <SkeletonBlock className="size-8 rounded-xl" />}
        </div>
      </footer>
    </article>
  )
}

export function LinkCardSkeleton() {
  return <LinkCardSkeletonContent />
}

export function ProtectedLinkCardSkeleton() {
  return <LinkCardSkeletonContent protectedLink />
}
