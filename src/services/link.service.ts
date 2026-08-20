import { api } from "@/config/axios";
import { LinkDetails } from "@/types/global";

interface SuccessResponse {
  data: string
}

export class LinkServices {

  async getSmLinks() {

    const { data } = await api.get<LinkDetails[]>("links")
    return data

  }

  async createSmLink(original: string) {

    const { data } = await api.post<SuccessResponse>("links", {
      original
    })
    return data

  }

  async deleteSmLink(short: string) {

    const { data } = await api.delete<SuccessResponse>(`links/${short}`)
    return data

  }

  protected = {

    async createPassword({ short, password }: { short: string, password: string }) {

      const { data } = await api.post<SuccessResponse>("links/protected", {
        short,
        password
      })
      return data

    },

    async deletePassword(short: string) {

      const { data } = await api.delete<SuccessResponse>(`links/protected/${short}`)
      return data

    },

    async validatePassword({ short, password }: { short: string, password: string }) {

      const { data } = await api.post<SuccessResponse>("links/protected/validate", {
        short,
        password
      })
      return data

    }

  }

  expiration = {
  
      async createExpiration({ short, expiresAt }: { short: string, expiresAt: string }) {
  
        const { data } = await api.post<SuccessResponse>("links/expirations", {
          short,
          expiresAt
        })
        return data
  
      }
  
    }

}