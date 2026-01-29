export interface SmLink {
  id: string
  original: string
  short: string
}

export interface Metric {
  id: string
  views: number
  year: number
  month: number
  link_id: string
  created_at: string
}

export interface LinkDetails {
  id: string
  original: string
  short: string
  created_at: string
  has_password: boolean
  has_expiration: boolean
  has_user_id: boolean
  expires_at: string | null
  is_expired: boolean
}