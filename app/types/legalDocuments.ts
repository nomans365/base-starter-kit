export interface TextPart {
  type: 'text'
  text: string
}

export interface PrivacyLinkPart {
  type: 'link'
  text: string
  href: string
}

export interface PrivacyEmailPart {
  type: 'email'
  text: string
  href: string
}

export type PrivacyContentPart = TextPart | PrivacyLinkPart | PrivacyEmailPart
export type PrivacyParagraph = string | { parts: PrivacyContentPart[] }

export interface PrivacyPolicySubsection {
  id: string
  title: string
  description?: PrivacyParagraph[]
}

export interface PrivacyPolicySection {
  id: number
  title: string
  description?: PrivacyParagraph[]
  subsections?: PrivacyPolicySubsection[]
}

export interface PrivacyPolicyDocument {
  title: string
  slug: string
  code: string
  lastUpdated: string
  sections: PrivacyPolicySection[]
}

export interface TermsContentPart {
  type: 'text' | 'link' | 'email'
  text: string
  href?: string
}

export type TermsParagraph = string | { parts: TermsContentPart[] }

export interface NestedDefinitionItem {
  term: string
  meaning: string
}

export interface SectionDefinitionItem {
  term?: string
  meaning: string
}

export interface SubsectionDefinitionItem {
  term: string
  meaning: string
  children?: NestedDefinitionItem[]
}

export interface TermsSubsection {
  id: string
  title?: string
  description?: string | TermsParagraph[]
  list?: SubsectionDefinitionItem[]
}

export interface TermsSection {
  id: number
  title: string
  SubTitle?: string
  description?: string | TermsParagraph[]
  list?: SectionDefinitionItem[]
  subsections?: TermsSubsection[]
}

export interface TermsConditionsDocument {
  title: string
  slug: string
  code: string
  lastUpdated: string
  sections: TermsSection[]
}

export type LegalDocumentStatus = 'draft' | 'published'
export type LegalDocumentType = 'privacy' | 'terms'

export interface LegalDocumentRecord<TDocument> {
  id: string
  countryId: string
  type: LegalDocumentType
  status: LegalDocumentStatus
  draft?: TDocument
  published?: TDocument
  version: number
  updatedAt: string
}
