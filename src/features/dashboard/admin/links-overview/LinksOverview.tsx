import { UnclaimedLinks } from "./components/UnclaimedLinks";



export function LinksOverview() {



  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <header>
        <h1 className="text-4xl font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-sky-500">SmLinks </span> 
          Overview
        </h1>

        <p className="pt-2 text-neutral-300">
          Welcome back to your smlinks features, here you can manage them
        </p>
      </header>

      {/* <section className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">




      </section> */}



      <UnclaimedLinks />

    </section>

  )

}