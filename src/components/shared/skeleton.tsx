
export function LinkCardSkeleton() {

  return (

    <article className="p-4 rounded-xl border border-[#1c1d1d]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <div className="lg-2:w-44 py-2 rounded-full bg-neutral-800 animate-pulse"></div>
          <div className="lg-2:w-96 py-5 rounded-xl bg-neutral-800 animate-pulse"></div>
          <div className="flex gap-3">
            <div className="lg-2:size-5 rounded bg-neutral-800 animate-pulse"></div>
            <div className="lg-2:w-20 py-2 rounded-full bg-neutral-800 animate-pulse"></div>
          </div>
        </div>

        <div className="lg-2:size-16 rounded-full bg-neutral-800 animate-pulse"></div>
      </div>

      <div className="flex gap-3 justify-end">
        <div className="lg-2:w-24 py-3 rounded-full bg-neutral-800 animate-pulse"></div>
        <div className="lg-2:w-24 py-3 rounded-full bg-neutral-800 animate-pulse"></div>
        <div className="lg-2:w-24 py-3 rounded-full bg-neutral-800 animate-pulse"></div>
      </div>
    </article>

  )

}