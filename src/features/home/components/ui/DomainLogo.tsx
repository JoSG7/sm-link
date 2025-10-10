import { IconWorldExclamation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export function DomainLogo({ domain }: { domain: string }) {

  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex items-center justify-end grow" >
        <IconWorldExclamation className="min-size-brand  " />
      </div>
    )
  }

  return (
    <div className="flex justify-end items-center grow">
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt="Logo"
        width={40}
        height={40}
        className="min-size-brand rounded-full "
        onError={() => setError(true)}
      />
    </div>
  )

}