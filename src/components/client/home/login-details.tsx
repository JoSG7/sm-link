"use client"

import React from "react"
import { IconSparkles } from "@tabler/icons-react"

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

    <section className="px-4 pt-4 pb-10 flex flex-col gap-4">

      <article className="w-full flex gap-3">

        

      </article>
        
    </section>

  )

}




{/* <DetailCard title="Personaliza tus links">
        Cambia tus links cortos para darle un enfoque más único y personalizalos a tu gusto
      </DetailCard>
      
      <DetailCard title="Administra, edita y elimina">
        Realiza un seguimiento a tus links, controla todas las metricas disponibles
      </DetailCard>
      
      <DetailCard title="Crea hasta 50 links cortos">
        Inicia Sesion para poder crear muchos mas links (limite de 10 links sin inicio de sesion)
      </DetailCard> */}
