import type {
  PrivacyParagraph,
  PrivacyPolicyDocument,
  TermsConditionsDocument,
  TermsParagraph,
} from '~/types/legalDocuments'

function validDestination(href: string, email = false): boolean {
  if (email) return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href)
  try {
    const url = new URL(href)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function validateParagraph(paragraph: PrivacyParagraph | TermsParagraph, path: string): void {
  if (typeof paragraph === 'string') return
  if (!paragraph || !Array.isArray(paragraph.parts)) {
    throw new Error(`${path} must be plain text or a rich paragraph with parts.`)
  }
  paragraph.parts.forEach((part, index) => {
    if (!part || !['text', 'link', 'email'].includes(part.type) || !part.text?.trim()) {
      throw new Error(`${path}, part ${index + 1} needs a valid type and text.`)
    }
    if (part.type !== 'text' && (!part.href || !validDestination(part.href, part.type === 'email'))) {
      throw new Error(`${path}, part ${index + 1} needs a valid ${part.type === 'email' ? 'email' : 'web'} destination.`)
    }
  })
}

function validateParagraphArray(
  value: unknown,
  path: string,
): asserts value is PrivacyParagraph[] | TermsParagraph[] {
  if (!Array.isArray(value)) throw new Error(`${path} must be an array of paragraphs.`)
  value.forEach((paragraph, index) => validateParagraph(paragraph as PrivacyParagraph, `${path}, paragraph ${index + 1}`))
}

export function validatePrivacyPolicy(document: PrivacyPolicyDocument): void {
  if (!document.title.trim() || !document.slug.trim() || !document.code.trim()) {
    throw new Error('Document title, slug, and country code are required.')
  }
  if (!Array.isArray(document.sections)) throw new Error('Privacy Policy sections must be an array.')
  document.sections.forEach((section, index) => {
    const path = `Section ${index + 1}`
    if (!Number.isInteger(section.id)) throw new Error(`${path} ID must be numeric.`)
    if (!section.title.trim()) throw new Error(`${path} title is required.`)
    if (section.description !== undefined) validateParagraphArray(section.description, `${path} description`)
    section.subsections?.forEach((subsection, subsectionIndex) => {
      const subsectionPath = `${path}, subsection ${subsectionIndex + 1}`
      if (typeof subsection.id !== 'string' || !subsection.id.trim()) {
        throw new Error(`${subsectionPath} ID is required.`)
      }
      if (!subsection.title.trim()) throw new Error(`${subsectionPath} title is required.`)
      if (subsection.description !== undefined) {
        validateParagraphArray(subsection.description, `${subsectionPath} description`)
      }
    })
  })
}

function validateTermsDescription(description: string | TermsParagraph[], path: string): void {
  if (typeof description === 'string') return
  validateParagraphArray(description, path)
}

export function validateTermsConditions(document: TermsConditionsDocument): void {
  if (!document.title.trim() || !document.slug.trim() || !document.code.trim()) {
    throw new Error('Document title, slug, and country code are required.')
  }
  if (!Array.isArray(document.sections)) throw new Error('Terms & Conditions sections must be an array.')
  document.sections.forEach((section, index) => {
    const path = `Section ${index + 1}`
    if (!Number.isInteger(section.id)) throw new Error(`${path} ID must be numeric.`)
    if (!section.title.trim()) throw new Error(`${path} title is required.`)
    if (section.description !== undefined) validateTermsDescription(section.description, `${path} description`)
    section.list?.forEach((item, itemIndex) => {
      if (!item.meaning.trim()) throw new Error(`${path}, list item ${itemIndex + 1} needs a meaning.`)
    })
    section.subsections?.forEach((subsection, subsectionIndex) => {
      const subsectionPath = `${path}, subsection ${subsectionIndex + 1}`
      if (typeof subsection.id !== 'string' || !subsection.id.trim()) {
        throw new Error(`${subsectionPath} ID is required.`)
      }
      if (subsection.description !== undefined) {
        validateTermsDescription(subsection.description, `${subsectionPath} description`)
      }
      subsection.list?.forEach((item, itemIndex) => {
        if (!item.term.trim() || !item.meaning.trim()) {
          throw new Error(`${subsectionPath}, list item ${itemIndex + 1} needs a term and meaning.`)
        }
        item.children?.forEach((child, childIndex) => {
          if (!child.term.trim() || !child.meaning.trim()) {
            throw new Error(`${subsectionPath}, nested item ${childIndex + 1} needs a term and meaning.`)
          }
        })
      })
    })
  })
}
