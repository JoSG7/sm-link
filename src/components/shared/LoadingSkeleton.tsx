"use client"

export function LinkCardSkeleton() {

  return (

    <article className="p-4 rounded-xl border border-[#1c1d1d]">
      <div className="flex justify-between items-center relative">
        <div className="flex flex-col gap-3">
          <div className="w-20 py-2 rounded-full bg-neutral-800 animate-pulse lg-2:w-44"></div>
          <div className="w-52 py-5 rounded-xl bg-neutral-800 animate-pulse lg-2:w-96"></div>
          <div className="flex gap-3">
            <div className="size-5 rounded bg-neutral-800 animate-pulse lg-2:size-5"></div>
            <div className="w-12 py-2 rounded-full bg-neutral-800 animate-pulse lg-2:w-20"></div>
          </div>
        </div>

        <div className="absolute top-2 right-0 size-16 rounded-full bg-neutral-800 animate-pulse lg-2:top-0 lg-2:size-20 "></div>
      </div>

      <div className="grid grid-cols-3 gap-3 justify-end pt-4 lg-2:flex lg-2:p-0">
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse lg-2:w-24"></div>
      </div>
    </article>

  )

}