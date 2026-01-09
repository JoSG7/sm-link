import { GuestLinks } from "./components/GuestLinks";



export function LinksOverview() {



  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <header>
        <h1 className="text-4xl font-semibold">
          SmLinks Overview
        </h1>

        <p className="pt-2 text-neutral-300">
          Welcome back to your smlinks features, here you can manage  
        </p>
      </header>

      <GuestLinks />

    </section>

  )

}