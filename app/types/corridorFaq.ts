export interface CorridorPart {
  type: 'text' | 'link'
  text: string
  href?: string
}

export interface CorridorParagraphBlock {
  type: 'paragraph'
  text?: string
  parts?: CorridorPart[]
}

export type CorridorListItem = { text: string } | { parts: CorridorPart[] }

export interface CorridorListBlock {
  type: 'list'
  items: CorridorListItem[]
}

export interface CorridorTableBlock {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export type CorridorContentBlock =
  | CorridorParagraphBlock
  | CorridorListBlock
  | CorridorTableBlock

export interface CorridorFaq {
  id?: number
  question: string
  content: CorridorContentBlock[]
}

export interface CorridorFaqCollection {
  countryId: string
  draft?: CorridorFaq[]
  published: CorridorFaq[]
  version: number
  updatedAt: string
}

export interface CorridorFaqRecord {
  id: string
  countryId: string
  position: number
  status: 'draft' | 'published'
  content: CorridorFaq
}
