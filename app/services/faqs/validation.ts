import type { CorridorFaq, CorridorPart } from '~/types/corridorFaq'
import type {
  FaqCategory,
  FaqListItem,
  FaqPart,
  FaqQuestion,
  StructuredFaqAnswer,
} from '~/types/genericFaq'

function validUrl(value: string, type: 'link' | 'email' = 'link'): boolean {
  try {
    const url = new URL(value)
    if (type === 'email') return url.protocol === 'mailto:'
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function validateParts(parts: unknown, path: string, allowed: string[]): asserts parts is CorridorPart[] | FaqPart[] {
  if (!Array.isArray(parts)) throw new Error(`${path} must be an array.`)
  for (const [index, item] of parts.entries()) {
    if (!item || typeof item !== 'object' || Array.isArray(item) ||
      !hasOnlyKeys(item, ['type', 'text', 'href']) ||
      !allowed.includes(item.type) || typeof item.text !== 'string' || !item.text.trim()) {
      throw new Error(`${path} part ${index + 1} needs a supported type and text.`)
    }
    if (item.type === 'text' && item.href !== undefined) throw new Error(`${path} text parts cannot contain a link destination.`)
    if (item.type !== 'text' && (typeof item.href !== 'string' || !validUrl(item.href, item.type))) {
      throw new Error(`${path} part ${index + 1} needs a valid ${item.type} destination.`)
    }
  }
}

function hasOnlyKeys(value: object, allowed: string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key))
}

export function validateCorridorFaq(faq: CorridorFaq): void {
  if (!faq || typeof faq !== 'object' || typeof faq.question !== 'string' || !faq.question.trim()) {
    throw new Error('Question is required.')
  }
  if (!hasOnlyKeys(faq, ['id', 'question', 'content'])) throw new Error('FAQ contains unsupported fields.')
  if (faq.id !== undefined && (!Number.isInteger(faq.id) || faq.id < 0)) throw new Error('FAQ ID must be a non-negative number.')
  if (!Array.isArray(faq.content)) throw new Error('FAQ content must be an array.')
  faq.content.forEach((block, index) => {
    const path = `Content block ${index + 1}`
    if (!block || typeof block !== 'object') throw new Error(`${path} must be a supported content block.`)
    if (block.type === 'paragraph') {
      if (!hasOnlyKeys(block, ['type', 'text', 'parts'])) throw new Error(`${path} contains unsupported paragraph fields.`)
      if (block.text !== undefined && typeof block.text !== 'string') throw new Error(`${path} text must be a string.`)
      if (block.parts) validateParts(block.parts, `${path} parts`, ['text', 'link'])
      if (!block.text?.trim() && !block.parts?.length) throw new Error(`${path} needs text or parts.`)
    } else if (block.type === 'list') {
      if (!hasOnlyKeys(block, ['type', 'items'])) throw new Error(`${path} contains unsupported list fields.`)
      if (!Array.isArray(block.items)) throw new Error(`${path} items must be an array.`)
      block.items.forEach((item, itemIndex) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
          throw new Error(`${path}, item ${itemIndex + 1} must be an object with text or parts.`)
        }
        if ('text' in item && !('parts' in item) && hasOnlyKeys(item, ['text']) &&
          typeof item.text === 'string' && item.text.trim()) return
        if ('parts' in item && !('text' in item)) {
          if (!hasOnlyKeys(item, ['parts'])) throw new Error(`${path}, item ${itemIndex + 1} contains unsupported fields.`)
          if (!Array.isArray(item.parts) || item.parts.length === 0) {
            throw new Error(`${path}, item ${itemIndex + 1} needs at least one text or link part.`)
          }
          validateParts(item.parts, `${path}, item ${itemIndex + 1}`, ['text', 'link'])
          return
        }
        throw new Error(`${path}, item ${itemIndex + 1} needs text or parts.`)
      })
    } else if (block.type === 'table') {
      if (!hasOnlyKeys(block, ['type', 'headers', 'rows'])) throw new Error(`${path} contains unsupported table fields.`)
      if (!Array.isArray(block.headers) || block.headers.length < 1 || block.headers.some((cell) => typeof cell !== 'string' || !cell.trim())) {
        throw new Error(`${path} needs at least one non-empty table header.`)
      }
      if (!Array.isArray(block.rows)) throw new Error(`${path} rows must be an array.`)
      block.rows.forEach((row, rowIndex) => {
        if (!Array.isArray(row) || row.length !== block.headers.length || row.some((cell) => typeof cell !== 'string')) {
          throw new Error(`${path}, row ${rowIndex + 1} must contain ${block.headers.length} text cells.`)
        }
      })
    } else {
      throw new Error(`${path} has an unsupported block type.`)
    }
  })
}

function validateFaqParts(parts: unknown, path: string): asserts parts is FaqPart[] {
  validateParts(parts, path, ['text', 'link', 'email'])
}

function validateListItem(item: FaqListItem, path: string): void {
  if (typeof item === 'string') {
    if (!item.trim()) throw new Error(`${path} cannot be empty.`)
    return
  }
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    throw new Error(`${path} must use a supported list item structure.`)
  }
  if ('href' in item) {
    if (!hasOnlyKeys(item, ['title', 'href', 'text'])) throw new Error(`${path} contains unsupported linked-item fields.`)
    if (typeof item.href !== 'string' || typeof item.text !== 'string' || !item.text.trim() ||
      !validUrl(item.href, item.href.startsWith('mailto:') ? 'email' : 'link')) {
      throw new Error(`${path} needs link text and a valid destination.`)
    }
    if (item.title !== undefined && (typeof item.title !== 'string' || !item.title.trim())) throw new Error(`${path} title cannot be empty.`)
    return
  }
  if ('title' in item) {
    if (!hasOnlyKeys(item, ['title', 'text'])) throw new Error(`${path} contains unsupported title-description fields.`)
    if (typeof item.title !== 'string' || typeof item.text !== 'string' || !item.title.trim() || !item.text.trim()) {
      throw new Error(`${path} needs a title and description.`)
    }
    return
  }
  if (!hasOnlyKeys(item, ['text', 'subList'])) throw new Error(`${path} contains unsupported nested-item fields.`)
  if (typeof item.text !== 'string' || !item.text.trim()) throw new Error(`${path} text is required.`)
  if (item.subList !== undefined && (!Array.isArray(item.subList) || item.subList.some((entry) => typeof entry !== 'string' || !entry.trim()))) {
    throw new Error(`${path} nested entries must be non-empty strings.`)
  }
}

function validateStructuredAnswer(answer: StructuredFaqAnswer, path: string): void {
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) {
    throw new Error(`${path} must be an object.`)
  }
  if (!hasOnlyKeys(answer, ['parts', 'intro', 'list', 'table', 'outro'])) {
    throw new Error(`${path} contains unsupported fields.`)
  }
  if (answer.parts !== undefined) validateFaqParts(answer.parts, `${path} parts`)
  for (const key of ['intro', 'outro'] as const) {
    const value = answer[key]
    if (value !== undefined && typeof value !== 'string') validateFaqParts(value, `${path} ${key}`)
  }
  if (answer.list !== undefined && !Array.isArray(answer.list)) throw new Error(`${path} list must be an array.`)
  answer.list?.forEach((item, index) => validateListItem(item, `${path} list item ${index + 1}`))
  if (answer.table) {
    if (!hasOnlyKeys(answer.table, ['headers', 'rows'])) throw new Error(`${path} table contains unsupported fields.`)
    if (!Array.isArray(answer.table.headers) || answer.table.headers.length !== 2 ||
      answer.table.headers[0] !== 'Status' || answer.table.headers[1] !== 'Description' ||
      !Array.isArray(answer.table.rows)) {
      throw new Error(`${path} table headers must be "Status" and "Description".`)
    }
    answer.table.rows.forEach((row, index) => {
      if (!row || !hasOnlyKeys(row, ['status', 'description']) ||
        typeof row.status !== 'string' || typeof row.description !== 'string') {
        throw new Error(`${path} table row ${index + 1} needs status and description text.`)
      }
    })
  }
}

export function validateGenericFaq(question: FaqQuestion): void {
  if (!question || typeof question !== 'object' || typeof question.question !== 'string' || !question.question.trim()) {
    throw new Error('Question is required.')
  }
  if (!hasOnlyKeys(question, ['question', 'answer'])) throw new Error('FAQ contains unsupported fields.')
  if (typeof question.answer === 'string') {
    if (!question.answer.trim()) throw new Error('Answer is required.')
    return
  }
  if (!question.answer || typeof question.answer !== 'object' || Array.isArray(question.answer)) {
    throw new Error('Answer must be text or a supported structured answer.')
  }
  validateStructuredAnswer(question.answer, 'Answer')
}

export function validateFaqCategory(category: FaqCategory, existingSlugs: string[] = []): void {
  if (!category || typeof category !== 'object' || !hasOnlyKeys(category, ['title', 'slug', 'image', 'seo', 'questions'])) {
    throw new Error('Category contains unsupported fields.')
  }
  if (typeof category.title !== 'string' || typeof category.slug !== 'string' || typeof category.image !== 'string') {
    throw new Error('Category title, slug, and image must be text.')
  }
  if (!category.title.trim()) throw new Error('Category title is required.')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug)) throw new Error('Use lowercase letters, numbers, and hyphens for the category slug.')
  if (!category.image.trim()) throw new Error('Category image is required.')
  if (existingSlugs.some((slug) => slug.toLowerCase() === category.slug.toLowerCase())) {
    throw new Error('That category slug is already in use.')
  }
  if (category.seo !== undefined) {
    if (!category.seo || typeof category.seo !== 'object' || !hasOnlyKeys(category.seo, ['title', 'description']) ||
      (category.seo.title !== undefined && typeof category.seo.title !== 'string') ||
      (category.seo.description !== undefined && typeof category.seo.description !== 'string')) {
      throw new Error('SEO title and description must be text.')
    }
  }
  if (!Array.isArray(category.questions)) throw new Error('Category questions must be an array.')
  category.questions.forEach(validateGenericFaq)
}
