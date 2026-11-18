export interface FaqPart {
  type: 'text' | 'link' | 'email'
  text: string
  href?: string
}

export interface FaqEmailListItem {
  title?: string
  href: string
  text: string
}

export interface FaqTitleDescriptionListItem {
  title: string
  text: string
}

export interface FaqNestedListItem {
  text: string
  subList?: string[]
}

export type FaqListItem =
  | string
  | FaqEmailListItem
  | FaqTitleDescriptionListItem
  | FaqNestedListItem

export interface FaqStatusRow {
  status: string
  description: string
}

export interface FaqStatusTable {
  headers: string[]
  rows: FaqStatusRow[]
}

export interface StructuredFaqAnswer {
  parts?: FaqPart[]
  intro?: string | FaqPart[]
  list?: FaqListItem[]
  table?: FaqStatusTable
  outro?: string | FaqPart[]
}

export interface FaqQuestion {
  question: string
  answer: string | StructuredFaqAnswer
}

export interface FaqCategory {
  title: string
  slug: string
  image: string
  seo?: {
    title?: string
    description?: string
  }
  questions: FaqQuestion[]
}

export interface FaqCategoryRecord {
  id: string
  status: 'draft' | 'published'
  draft?: FaqCategory
  published?: FaqCategory
  version: number
  updatedAt: string
}
