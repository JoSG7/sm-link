

export function FeaturesSection() {

  return (

    <section>
      <div className="relative overflow-hidden rounded-t-3xl border-t border-zinc-800 py-16 sm:mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">

        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 max-w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-linear-to-l from-transparent via-cyan-12/50 via-50% to-transparent"></div>

        <div aria-hidden="true" className="pointer-events-none absolute z-1 -top-1 left-1/2 h-[600px] w-full max-w-[200px] -translate-x-1/2 -translate-y-1/2 md:max-w-[500px] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_50%,#0a0a0a_50%),radial-gradient(rgba(180,180,180,0.1)_0%,transparent_80%)]"></div>

        <div className="flex flex-col items-center justify-center gap-14">

          <blockquote className="relative flex w-full max-w-xl flex-col gap-10">
            <p className="text-center text-xl md:text-2xl font-medium leading-[1.4] tracking-[-0.01em] text-gradient text-balance">
              Building email UI is annoyingly difficult, especially trying to make things look correct in all clients. React Email makes this way easier.
            </p>
          </blockquote>

        </div>

      </div>
    </section>


  )

}

// style="background:conic-gradient(from 90deg at 50% 50%, #00000000 50%, #0a0a0a 50%),radial-gradient(rgba(37, 99, 235, 0.1) 0%, transparent 80%)