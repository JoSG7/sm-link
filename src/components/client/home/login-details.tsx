import React from "react"
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react"

const DetailCard = ({title, children}: {title: string, children: React.ReactNode}) => {

  return(

    <article className="w-full px-4 py-3 rounded-xl border flex gap-1 border-neutral-900 bg-neutral-950 hover:border-amber-300">

      <div>

        <span className="font-semibold">{title}</span>
        <p className="text-sm text-gray-400 pt-1">
          {children}
        </p>

      </div>

    </article>

  )

}

export function LoginDetails () {

  return(

    <section className="p-4 flex flex-col gap-4">

      <DetailCard title="Personaliza tus links">
        Cambia tus links cortos para darle un enfoque más único y personalizalos a tu gusto
      </DetailCard>
      
      <DetailCard title="Administra, edita y elimina">
        Realiza un seguimiento a tus links, controla todas las metricas disponibles
      </DetailCard>
      
      <DetailCard title="Crea hasta 50 links cortos">
        Inicia Sesion para poder crear muchos mas links (limite de 10 links sin inicio de sesion)
      </DetailCard>

      <div className="grid grid-cols-2 gap-4">

        <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-[#1a1d1f] 
        border border-neutral-800">

          <IconBrandGithubFilled size={20}></IconBrandGithubFilled>
          Git Hub

        </button>

        <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-red-700 border border-red-800">

          <IconBrandGoogleFilled size={20}></IconBrandGoogleFilled>
          Gmail

        </button>

      </div>
        
    </section>

  )

}


