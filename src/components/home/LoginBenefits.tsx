"use client"

import { IconChartHistogram, IconClockExclamation, IconFolderCog, IconListSearch, IconPencilStar, IconShieldLock } from "@tabler/icons-react"
import React from "react"
import { LoginTitle } from "./Title"
import { GitHubAuthButton, GoogleAuthButton } from "./AuthButtonClient"
import Image from "next/image"

export function LoginBenefits() {

  return (

    <section className="duration-300 flex justify-center
    sm:pb-20 md:gap-5 lg-2:pb-0">

      <div className="w-[87vw] max-w-5xl py-12 md:w-[94vw] lg-2:flex lg-2:pt-36 lg-2:justify-between lg-2:pb-20">
        <div className="">
          <div className="flex flex-col lg-2:pt-14">
            <LoginTitle />

            <div className="grid grid-cols-5 gap-5 pb-5 lg-2:flex">
              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconChartHistogram className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
                
                <p className="absolute -top-11 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full 
                border border-[#1c1d1d] pointer-events-none">
                  Metrics
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconShieldLock className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Protected Links
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconClockExclamation className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Expirations
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconPencilStar className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Customizing
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconListSearch className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Audit
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconFolderCog className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />
                
                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Management
                </p>
              </article>
            </div>

            <div className="flex gap-5">
              <GitHubAuthButton />
              <GoogleAuthButton />
            </div>
          </div>
        </div>

        <div className="w-[400px] flex items-center">
          <Image src="imgs/login6.png" alt="logo" width={400} className="hidden w-full fade lg-2:block lg-2:max-h-[500px]" />
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
