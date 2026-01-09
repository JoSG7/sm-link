import { api } from "@/config/axios";


interface ApiResponse {

  response?: string
  error?: string

}


export class UserLinkServices {

  async claim(linksID: string[]) {

    try {

      const res = await api.post("user-links/claim", {
        linksID
      })
      const response = res.data
      
      return response as ApiResponse

    } catch (e) {
      
      console.log(e)
      return { error: "Error in server" }

    }
  }
}