import { mockFaqCategories } from '~/mocks/faqs/faqCategories'
import type { FaqCategory, FaqCategoryRecord } from '~/types/genericFaq'
import { cloneFaqData, readFaqCollection, writeFaqCollection } from './mockStorage'
import { validateFaqCategory } from './validation'

const STORAGE_KEY = 'roze-cms-faq-categories-v1'

function categories(): FaqCategoryRecord[] {
  const saved = readFaqCollection(STORAGE_KEY, mockFaqCategories)
  for (const seed of mockFaqCategories) {
    if (!saved.some((record) => record.id === seed.id)) saved.push(cloneFaqData(seed))
  }
  const ids = new Set<string>()
  for (const record of saved) {
    if (!record.id.trim() || ids.has(record.id)) throw new Error('FAQ category IDs must be present and unique.')
    ids.add(record.id)
  }
  return saved
}

function content(record: FaqCategoryRecord): FaqCategory | undefined {
  return record.draft ?? record.published
}

function validateUnique(category: FaqCategory, all: FaqCategoryRecord[], currentId?: string): void {
  const slugs = all
    .filter((record) => record.id !== currentId)
    .map(content)
    .filter((item): item is FaqCategory => !!item)
    .map((item) => item.slug)
  validateFaqCategory(category, slugs)
}

export async function getFaqCategories(): Promise<FaqCategoryRecord[]> {
  return cloneFaqData(categories())
}

export async function getFaqCategoryById(id: string): Promise<FaqCategoryRecord | undefined> {
  const record = categories().find((item) => item.id === id)
  return record ? cloneFaqData(record) : undefined
}

export async function getPublishedFaqCategoryBySlug(slug: string): Promise<FaqCategory | undefined> {
  const record = categories().find((item) => item.published?.slug === slug)
  return record?.published ? cloneFaqData(record.published) : undefined
}

export async function createFaqCategory(data: FaqCategory): Promise<FaqCategoryRecord> {
  const all = categories()
  validateUnique(data, all)
  const record: FaqCategoryRecord = {
    id: `faq-category-${crypto.randomUUID()}`,
    status: 'draft',
    draft: cloneFaqData(data),
    version: 0,
    updatedAt: new Date().toISOString(),
  }
  all.push(record)
  writeFaqCollection(STORAGE_KEY, all)
  return cloneFaqData(record)
}

export async function updateFaqCategory(id: string, data: FaqCategory): Promise<FaqCategoryRecord> {
  const all = categories()
  const index = all.findIndex((record) => record.id === id)
  if (index < 0) throw new Error('FAQ category was not found.')
  validateUnique(data, all, id)
  all[index] = {
    ...all[index],
    draft: cloneFaqData(data),
    updatedAt: new Date().toISOString(),
  }
  writeFaqCollection(STORAGE_KEY, all)
  return cloneFaqData(all[index])
}

export async function deleteFaqCategory(id: string, confirmQuestions = false): Promise<void> {
  const all = categories()
  const index = all.findIndex((record) => record.id === id)
  if (index < 0) throw new Error('FAQ category was not found.')
  const category = content(all[index])
  if (category?.questions.length && !confirmQuestions) {
    throw new Error('Confirm deleting this category and its questions.')
  }
  all.splice(index, 1)
  writeFaqCollection(STORAGE_KEY, all)
}

export async function publishFaqCategory(id: string): Promise<FaqCategoryRecord> {
  const all = categories()
  const index = all.findIndex((record) => record.id === id)
  if (index < 0 || !all[index].draft) throw new Error('Save a category draft before publishing.')
  validateUnique(all[index].draft!, all, id)
  all[index] = {
    ...all[index],
    published: cloneFaqData(all[index].draft!),
    draft: undefined,
    status: 'published',
    version: all[index].version + 1,
    updatedAt: new Date().toISOString(),
  }
  writeFaqCollection(STORAGE_KEY, all)
  return cloneFaqData(all[index])
}

export function getFaqCategoryContent(record: FaqCategoryRecord): FaqCategory | undefined {
  const value = content(record)
  return value ? cloneFaqData(value) : undefined
}
