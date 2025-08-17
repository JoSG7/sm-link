import { IconWorldExclamation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export function DomainLogo({ domain }: { domain: string }) {

  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex items-center justify-end grow" >
        <IconWorldExclamation className="min-size-[48px] 
        xs:min-size-[56px] 
        lg:min-size-[70px] 
        2xl:min-size-[90px]
        3xl:min-size-[110px]" />
      </div>
    )
  }

  return (
    <div className="flex justify-end items-center grow">
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt="Logo"
        width={60}
        height={60}
        className="min-size-[48px] rounded-full 
        xs:min-size-[56px] 
        lg:min-size-[70px] 
        2xl:min-size-[90px]
        3xl:min-size-[110px]
        4xl:min-size-[150px]"
        onError={() => setError(true)}
      />
    </div>
  )

}