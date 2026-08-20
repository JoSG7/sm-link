import { IconWorldExclamation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export function DomainLogo({ domain, className }: { domain: string, className?: string }) {

  const [error, setError] = useState(false)

  if (error) {
    return (
      <IconWorldExclamation className={`min-size-brand ${className}`} />
    )
  }

  return (
    
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt="Logo"
        width={40}
        height={40}        
        className={`min-size-brand rounded-full ${className}`}
        onError={() => setError(true)}
      />
    
  )

}