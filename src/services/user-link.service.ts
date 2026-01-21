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

  async deleteUserSmLinks({ shorts }: { shorts?: string[] }) {

    const { data } = await api.delete<ApiResponse>("user-links", {
      params: {
        short: shorts
      }
    })
    return data

  }

  protected = {

    async insertUserSmLinkPassword({ short, password }: { short: string, password: string }) {

      const { data } = await api.post<ApiResponse>("user-links/protected", {
        short,
        password
      })
      return data

    },

    async editUserSmLinkPassword({ short, currentPassword, newPassword }: {
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

} 