export interface SmLink {
  id: string
  short: string
  original: string | null
  has_password: boolean
  is_expired: boolean
}


export interface LinkDetails {
  id: string
  short: string
  original: string
  has_password: boolean
  expires_at: string | null
  is_expired: boolean
  has_user_id: boolean
  created_at: string
}

