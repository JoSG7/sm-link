export interface GuestLinks {
  id: string
  short: string
  original: string
  created_at: string
}

export interface ShortLink {
  id: string
  original: string
  short: string
  guess_id: string
  created_at: string
  user_id: string | null
}

export interface Metric {
  id: string
  views: number
  year: number
  month: number
  link_id: string
  created_at: string
}