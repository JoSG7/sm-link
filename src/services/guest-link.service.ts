import { api } from "@/config/axios";
import { LinkDetails } from "@/global";

interface ApiResponse {
  response: string
}

export class GuestLinkServices {

  async getLinks() {

    const { data } = await api.get<LinkDetails[]>("guest-links")
    return data

  }


  async createSmLink(original: string) {

    const { data } = await api.post<ApiResponse>("guest-links", {
      original
    })
    return data
  }


  async deleteSmLink(short: string) {

    const { data } = await api.delete<ApiResponse>(`guest-links/${short}`)
    return data

  }


  protected = {

    async createSmLinkPassword(short: string, password: string) {

      const { data } = await api.post<ApiResponse>("guest-links/protected", {
        short,
        password
      })
      return data

    },


    async deleteSmLinkPassword(short: string) {

      const { data } = await api.delete<ApiResponse>(`guest-links/protected/${short}`)
      return data

    },


    async validateSmLinkPassword(short: string, password: string) {

      const { data } = await api.post<ApiResponse>("guest-links/protected/validate", {
        short,
        password
      })
      return data

    }
  }


  expiration = {

    async createSmLinkExpiration(short: string, expiresAt: string) {

      const { data } = await api.post<ApiResponse>("guest-links/expiration", {
        short,
        expiresAt
      })
      return data

    }

  }
}