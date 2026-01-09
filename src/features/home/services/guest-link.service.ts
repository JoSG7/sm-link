import { api } from "@/config/axios";
import { LinkDetails } from "@/global";

interface ApiResponse {
  response: string
  error: string
}

export class GuestLinkServices {

  async getLinks() {

    try {
      
      const res = await api.get("guest-links")
      return res.data as LinkDetails[]

    } catch (e) {
      
      console.log(e)
      return []

    }
  }


  async createLink(original: string) {

    const res = await api.post("guest-links", {
      original
    })
    return res.data as ApiResponse
  }


  async deleteLink(short: string) {

    const res = await api.delete(`guest-links/${short}`)
    return res.data as ApiResponse

  }


  protected = {

    async createLink(short: string, password: string) {

      const res = await api.post("guest-links/protected", {
        short,
        password
      })
      return res.data as ApiResponse

    },


    async deleteLink(short: string) {

      const res = await api.delete(`guest-links/protected/${short}`)
      return res.data as ApiResponse

    },


    async validatePassword(short: string, password: string) {

      const res = await api.post("guest-links/protected/validate", {
        short,
        password
      })
      return res.data as ApiResponse

    }
  }


  expiration = {

    async createLink(short: string, expiresAt: string) {

      const res = await api.post("guest-links/expiration", {
        short,
        expiresAt
      })
      return res.data as ApiResponse

    }

  }
}