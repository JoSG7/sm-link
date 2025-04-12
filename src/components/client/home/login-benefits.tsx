"use client"

import React from "react"
import { IconChartHistogram, IconClockX, IconPencilStar, IconShieldLock } from "@tabler/icons-react"

const DetailCard = ({title, children, icon}: {title: string, children: React.ReactNode, icon: React.ReactNode}) => {

  return(

    <article className="w-full flex gap-4">

      <div className="p-1 rounded-lg bg-[#69C757] max-h-12 sm:max-h-16">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-200 sm:text-2xl">{title}</h3>
        <p className="text-base text-wrap text-[#C4CAd4] pt-1 sm:text-xl">
        {children}
        </p>
      </div>

    </article>

  )

}

export function LoginBenefits () {

  return(

    <section className="pt-4 pb-10 flex justify-center sm:pb-16">

      <div className="w-[90%] flex flex-col gap-7 duration-300">

        <DetailCard title="Administra tus smLinks" icon = { <IconPencilStar size={40} color="#4BA838" className="sm:size-14" /> }  >
        Crea, edita y elimina. Todo esto al alcance de tus manos ahora!
        </DetailCard>

        <DetailCard title="Conoce las metricas" icon = { <IconChartHistogram size={40} color="#4BA838" className="sm:size-14" /> } >
        Obten un informe detallado de todas las metricas disponibles!
        </DetailCard>

        <DetailCard title="Usa contraseñas seguras" icon = { <IconShieldLock size={40} color="#4BA838" className="sm:size-14" /> } >
        Protege todos tus smLinks con una contraseña y compartelos solo con personas autorizadas
        </DetailCard>

        <DetailCard title="Establece Expiraciones" icon = { <IconClockX size={40} color="#4BA838" className="sm:size-14" /> } >
        Establece un limite de visitas y bloquea el smLink de forma automatica
        </DetailCard>

      </div>

        
    </section>

  )

}




// Protección con contraseña – Opción para proteger enlaces con contraseña y compartirlos solo con personas autorizadas.

// Expiración de enlaces – Configura enlaces para que expiren después de un tiempo o un número específico de clics.
