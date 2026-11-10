export interface Country {
  id: string
  name: string
  slug: string
  code: string
  logoUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CountryInput {
  name: string
  slug: string
  code: string
  isActive: boolean
  logoFile?: File | null
}
