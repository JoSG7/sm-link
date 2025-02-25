import AuthButtonServer from "@/components/auth-button-server"
import { ShortLinkForm } from "@/components/utilities"


export default function Home() {

  return (

    <div className="p-3">

      <ShortLinkForm />

      <AuthButtonServer />
      
    </div>
    
  )

}
