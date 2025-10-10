"use client"

export function LinkCardSkeleton() {

  return (

    <article className="p-4 rounded-xl border border-neutral-800">
      
      <section className="flex justify-between items-center relative">

        {/* Original and Short section */}
        <article className="flex flex-col gap-3">
          <div className="w-12 py-2 rounded-full bg-neutral-800 animate-pulse " />
          <div className="w-36 py-5 rounded-xl bg-neutral-800 animate-pulse " />
          <div className="flex gap-3">
            <div className="size-5 rounded bg-neutral-800 animate-pulse " />
            <div className="w-12 py-2 rounded-full bg-neutral-800 animate-pulse " />
          </div>
        </article>

        <div className="absolute top-2 right-0 size-16 rounded-full bg-neutral-800 animate-pulse "></div>
      </section>

      <div className="grid grid-cols-3 gap-3 justify-end pt-4 lg-2:flex lg-2:p-0">
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
      </div>
    </article>
  )
}

export function ProtectedLinkCardSkeleton() {

  return (
    <article className="rounded-xl border border-graphite p-3 flex">
      <section className="w-full">
        <div className="flex justify-center pb-3">
          <div className="size-14 rounded-full bg-neutral-900 animate-pulse"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-20 py-2 bg-neutral-900 animate-pulse rounded-full"></div>
        </div>
      </section>
      <aside>
        <div className="size-7 rounded-md bg-neutral-900 animate-pulse"></div>
      </aside>
    </article>
  )

}