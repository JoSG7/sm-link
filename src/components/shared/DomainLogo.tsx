import { IconWorldExclamation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export function DomainLogo ({ domain }: { domain: string }) {

  const [error, setError] = useState(false)

  if(error){
    return(
      <div className="size-12 bg-neutral-900 rounded-full flex items-center justify-center sm:size-14" >
        <IconWorldExclamation className="size-10" />
      </div>
    )
  }

  return(
    <Image 
    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
    alt="Logo"
    width={60}
    height={60}
    className="size-12 rounded-full sm:size-14"
    onError={() => setError(true)}
    />
  )

}