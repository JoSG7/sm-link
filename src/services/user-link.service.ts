import { api } from "@/config/axios";
import { LinkDetails } from "@/global";


interface ApiResponse {
  response: string
}


export class UserLinkServices {

  async claim(linksID: string[]) {

    const { data } = await api.post<ApiResponse>("user-links/claim", { linksID })
    return data

  }

  async getUserLinks() {

    const { data } = await api.get<LinkDetails[]>("user-links")
    return data

  }

  async createUserSmLink({ original, short }: { original: string, short: string }) {

    const { data } = await api.post<ApiResponse>("user-links", {
      original,
      short
    })
    return data
    
  }
}