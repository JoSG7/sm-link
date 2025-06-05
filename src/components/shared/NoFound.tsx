import Image from "next/image";


export function NoFound() {

  return (

    <section className="">

      <div className="flex justify-center">
        <Image src="/svg/a.svg" alt="No found image" width={230} height={230} />
      </div>

      <p className="text-center break-words">Aun no has creado ningun smLink</p>


    </section>

  )

}