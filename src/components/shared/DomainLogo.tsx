import { IconWorldExclamation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export function DomainLogo({ domain }: { domain: string }) {

  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex items-center justify-end grow" >
        <IconWorldExclamation className="size-12 xs:size-14 lg-2:size-[70px] 2xl:size-16" />
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
        className="size-12 rounded-full xs:size-14 sm:size-14 lg-2:size-[70px] 2xl:size-24"
        onError={() => setError(true)}
      />
    </div>
  )

}