import { api } from "@/config/axios";
import { LinkDetails } from "@/types/global";

interface SuccessResponse {
  data: string
}

export class LinkServices {

  async getSmLinks(isGuest?: boolean) {

    const { data } = await api.get<LinkDetails[]>("links", {
      params: {
        guest: isGuest || false
      }
    })
    return data

  }

  async createSmLink({ original, short }: { original: string, short?: string }) {

    const { data } = await api.post<SuccessResponse>("links", {
      original,
      short
    })
    return data

  }

  async deleteSmLink(short: string) {

    const { data } = await api.delete<SuccessResponse>(`links/${short}`)
    return data

  }

  async claim(linksID: string[]) {

    const { data } = await api.post<SuccessResponse>("links/claim", { linksID })
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

    async updatePassword({ short, currentPassword, newPassword }: { short: string, currentPassword: string, newPassword: string }) {

      const { data } = await api.patch<SuccessResponse>(`links/protected/${short}`, {
        currentPassword,
        newPassword
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