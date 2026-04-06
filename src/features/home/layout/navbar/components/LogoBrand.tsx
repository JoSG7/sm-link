import Image from "next/image";


export function LogoBrand() {

  return (

    <div className="flex items-center gap-1
    lg:gap-2 ">

      <Image className="w-10 h-7 "
        src="/imgs/Espada1.png"
        alt="Icono"
        width={40}
        height={28} />

      <p className="text-lg font-medium sm:text-xl">
        SmLink
      </p>
    </div>

  )

}