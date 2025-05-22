"use client"

import React from "react"
import { IconChartHistogram, IconClockExclamation, IconFolderCog, IconListSearch, IconPencilStar, IconShieldLock } from "@tabler/icons-react"
import { LoginTitle } from "./Title"
import { GitHubAuthButton, GoogleAuthButton } from "./AuthButtonClient"

const DetailCard = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) => {

  return (

    <article className="w-full">

      {/* Card for 360px to 768px */}
      <section className="md:hidden flex gap-4">
        <div className="p-1 rounded-lg bg-[#69C757] max-h-12 sm:max-h-16">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-200 sm:text-2xl">{title}</h3>
          <p className="text-base text-wrap text-[#C4CAd4] pt-1 sm:text-xl">
            {children}
          </p>
        </div>
      </section>
      {/* Card for 768px to 1024px */}
      <section className="p-4 hidden rounded-lg border border-blue-950 flex-col gap-2 md:flex lg-2:hidden">
        <div className="w-full hidden justify-between items-center md:flex">
          <p className="text-xl font-semibold text-gray-200 lg:text-2xl">{title}</p>
          <div>
            {icon}
          </div>
        </div>
        <p className="text-lg text-wrap text-[#C4CAd4]">
          {children}
        </p>
      </section>
      {/* Card for 1272px */}
      <section className="max-w-[565px] p-4 hidden rounde border-gradient-rd-2xl border-[1.5px] border-transparent gap-2 lg-2:flex">
        <div className="w-full hidden flex-col md:flex gap-2">
          <p className="text-xl font-semibold text-gray-200">{title}</p>
          <p className="text-lg text-wrap text-[#C4CAd4]">{children}</p>
        </div>
        <div className="flex items-center justify-center">
          {icon}
        </div>
      </section>

    </article>

  )

}

export function LoginBenefits() {

  return (

    <section className="duration-300 flex justify-center
    sm:pb-20 md:gap-5 lg-2:pb-0">

      <div className="w-[90%] max-w-5xl md:w-[94%] md:flex md:gap-5 lg:gap-6 lg-2:pt-36 lg-2:justify-between lg-2:pb-20">
        <div className="">
          <div className="flex flex-col pt-14">
            <LoginTitle />

            <div className="flex gap-5 pb-5">
              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconChartHistogram className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>

              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconShieldLock className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>

              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconClockExclamation className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>

              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconPencilStar className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>

              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconListSearch className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>

              <article className="p-2 rounded-xl border border-[#1c1d1d] hover:border-transparent">
                <IconFolderCog className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
              </article>
            </div>

            <div className="flex gap-5">
              <GitHubAuthButton />
              <GoogleAuthButton />
            </div>
          </div>
        </div>
        <div className="w-[400px] flex items-center">
          <img src="imgs/login6.png" alt="logo" className="w-full fade lg-2:max-h-[500px]" />
        </div>
      </div>

    </section>

  )

}




// Protección con contraseña – Opción para proteger enlaces con contraseña y compartirlos solo con personas autorizadas.

// Expiración de enlaces – Configura enlaces para que expiren después de un tiempo o un número específico de clics.


{/* <section className="pt-4 pb-10 flex justify-center sm:pb-16 md:pt-0 md:pb-20">

      <div className="w-[90%] max-w-[1080px] flex flex-col gap-7 duration-300 
      md:w-[94%] md:grid md:grid-cols-2 md:gap-5 lg:gap-6">

        <DetailCard title="Administra tus smLinks" 
        icon = { <IconPencilStar size={40} className="sm:size-14 md:size-9 lg:size-12 text-[#4BA838] lg-2:text-purple-800 
        md:text-sky-700 lg-2:size-16" /> } >
        Crea, edita y elimina. Todo esto al alcance de tus manos ahora!
        </DetailCard>

        <DetailCard title="Conoce las metricas" 
        icon = { <IconChartHistogram size={40} className="sm:size-14 md:size-9 lg:size-12 text-[#4BA838] lg-2:text-purple-800 
        md:text-sky-700 lg-2:size-16" /> } >
        Obten un informe detallado de todas las metricas disponibles!
        </DetailCard>

        <DetailCard title="Usa contraseñas seguras" 
        icon = { <IconShieldLock size={40} className="sm:size-14 md:size-9 lg:size-12 text-[#4BA838] lg-2:text-purple-800 
        md:text-sky-700 lg-2:size-16" /> } >
        Protege todos tus smLinks con una contraseña y compartelos solo con personas autorizadas
        </DetailCard>

        <DetailCard title="Establece Expiraciones" 
        icon = { <IconClockX size={40} className="sm:size-14 md:size-9 lg:size-12 text-[#4BA838] lg-2:text-purple-800 
        md:text-sky-700 lg-2:size-16" /> } >
        Establece un limite de visitas y bloquea el smLink de forma automatica
        </DetailCard>

      </div>
        
    </section> */}



    // linear-gradient(var(--bg-color),var(--bg-color)) padding-box,linear-gradient(107.65deg,#17C969 17.53%,#005DBB 94.64%) border-box


// linear-gradient(var(--bg-color),var(--bg-color)) padding-box,linear-gradient(120.55deg,#FF4040 18.56%,#A20BD8 98.01%) border-box
