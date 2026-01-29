export function LinkCardSkeleton() {

  return (

    <article className="p-4 rounded-xl border border-neutral-800
    2xl:p-5 3xl:p-6 4xl:p-8">

      <section className="flex justify-between items-center relative">

        {/* Original and Short section */}
        <article className="flex flex-col gap-3 
        2xl:gap-4 3xl:gap-5 4xl:gap-7">

          {/* Short */}
          <div className="w-12 py-2 rounded-full bg-neutral-800 animate-pulse 
          lg:w-28 2xl:w-32 3xl:w-40 4xl:w-56
          lg:py-3 2xl:py-4 3xl:py-5 4xl:py-6" />

          {/* Original */}
          <div className="w-36 py-5 rounded-xl bg-neutral-800 animate-pulse max-w-[760px]
          lg:w-[30vw] lg:py-7
          2xl:py-9 3xl:py-11 4xl:py-14" />

          {/* Calendar Section */}
          <div className="flex gap-3 
          2xl:gap-4 3xl:gap-5 4xl:gap-6">

            <div className="size-5 rounded bg-neutral-800 animate-pulse 2xl:rounded-lg
            2xl:size-7 3xl:size-9 4xl:size-12" />

            <div className="w-12 py-2 rounded-full bg-neutral-800 animate-pulse 
            2xl:w-16 3xl:w-20 4xl:w-24 " />
          </div>

        </article>

        {/* Img skeleton */}
        <div className="absolute top-2 right-0 size-16 rounded-full bg-neutral-800 animate-pulse 
        xl:min-size-brand-desktop
        2xl:top-6 3xl:top-8 4xl:top-12" />
      </section>

      {/* Buttons Section */}
      <div className="grid grid-cols-3 gap-3 justify-end pt-4 
      lg:flex lg:justify-end 
      2xl:gap-4 3xl:gap-5 4xl:gap-7">

        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse 
        lg:w-12 2xl:w-16 3xl:w-20 4xl:w-28
        3xl:py-5 4xl:py-7" />

        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse 
        lg:w-12 2xl:w-16 3xl:w-20 4xl:w-28
        3xl:py-5 4xl:py-7" />

        <div className=" py-3 rounded-full bg-neutral-800 animate-pulse 
        lg:w-12 2xl:w-16 3xl:w-20 4xl:w-28
        3xl:py-5 4xl:py-7" />

      </div>
    </article>
  )
}





export function ProtectedLinkCardSkeleton() {

  return (
    <article className="p-4 flex rounded-xl border border-graphite
    2xl:p-5 3xl:p-6 4xl:p-8">

      <section className="w-full">

        <div className="flex justify-center pb-3
        2xl:pb-5 3xl:pb-6 4xl:pb-8">

          {/* Img Skeleton */}
          <div className="size-14 rounded-full bg-neutral-900 animate-pulse 
          xl:min-size-brand-desktop" />
        </div>

        <div className="flex justify-center">

          {/* Short Skeleton */}
          <div className="w-20 py-2 bg-neutral-900 animate-pulse rounded-full
          2xl:w-32 3xl:w-40 4xl:w-52
          2xl:py-3 3xl:py-4 4xl:py-6" />
        </div>

      </section>

      <aside>
        <div className="size-7 rounded-md bg-neutral-900 animate-pulse
        2xl:size-9 3xl:size-11 4xl:size-14" />
      </aside>

    </article>
  )

}