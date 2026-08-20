import { api } from "@/config/axios";
import { LinkDetails } from "@/types/global";


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

  async deleteUserSmLinks({ shorts }: { shorts?: string[] }) {

    const { data } = await api.delete<ApiResponse>("user-links", {
      params: {
        short: shorts
      }
    })
    return data

  }

  protected = {

    async createUserSmLinkPassword({ short, password }: { short: string, password: string }) {

      const { data } = await api.post<ApiResponse>("user-links/protected", {
        short,
        password
      })
      return data

    },

    async updateUserSmLinkPassword({ short, currentPassword, newPassword }: {
      short: string,
      currentPassword: string,
      newPassword: string
    }) {

      const { data } = await api.patch<ApiResponse>(`user-links/protected/${short}`, {
        currentPassword,
        newPassword
      })
      return data

    }

  }

  expiration = {

    async createUserSmLinkExpiration({ short, expirationDate }: { short: string, expirationDate: string }) {

      const { data } = await api.post<ApiResponse>("user-links/expiration", {
        short,
        expirationDate
      })

      return data

    },

    async updateUserSmLinkExpiration({ short, newExpirationDate }: { short: string, newExpirationDate: string }) {

      const { data } = await api.patch<ApiResponse>(`user-links/expiration/${short}`, {
        newExpirationDate
      })

      return data

    }

  }

} 