import { api } from "@/config/axios";
import { LinkDetails } from "@/global";


interface ApiResponse {
  response?: string
  error?: string
}


export class UserLinkServices {

  async claim(linksID: string[]) {

    try {

      const res = await api.post("user-links/claim", { linksID })
      const response = res.data
      
      return response as ApiResponse

    } catch (e) {
      
      console.log(e)
      return { error: "Error in server" }

    }
  }


  async getUserLinks() {

    try {

      const res = await api.get("user-links")
      const response = res.data

      return response as LinkDetails[]
      
    } catch(e) {
      
      console.log(e)
      return []

    }
  }
}