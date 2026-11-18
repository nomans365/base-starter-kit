import { mockFaqCategories } from '~/mocks/faqs/faqCategories'
import type { FaqCategory, FaqCategoryRecord, FaqQuestion } from '~/types/genericFaq'
import { cloneFaqData, readFaqCollection, writeFaqCollection } from './mockStorage'
import { validateFaqCategory, validateGenericFaq } from './validation'

const STORAGE_KEY = 'roze-cms-faq-categories-v1'

function categories(): FaqCategoryRecord[] {
  const saved = readFaqCollection(STORAGE_KEY, mockFaqCategories)
  for (const seed of mockFaqCategories) {
    if (!saved.some((record) => record.id === seed.id)) saved.push(cloneFaqData(seed))
  }
  return saved
}

function current(record: FaqCategoryRecord): FaqCategory | undefined {
  return record.draft ?? record.published
}

function writeDraft(all: FaqCategoryRecord[], index: number, category: FaqCategory): void {
  const slugs = all.filter((record) => record.id !== all[index].id).map(current)
    .filter((item): item is FaqCategory => !!item).map((item) => item.slug)
  validateFaqCategory(category, slugs)
  all[index] = { ...all[index], draft: cloneFaqData(category), updatedAt: new Date().toISOString() }
  writeFaqCollection(STORAGE_KEY, all)
}

function categoryIndex(all: FaqCategoryRecord[], categoryId: string): number {
  const index = all.findIndex((record) => record.id === categoryId)
  if (index < 0 || !current(all[index])) throw new Error('FAQ category was not found.')
  return index
}

export async function getGenericFaqs(categoryId: string): Promise<FaqQuestion[]> {
  const all = categories()
  const category = current(all[categoryIndex(all, categoryId)])
  return cloneFaqData(category?.questions ?? [])
}

export async function getPublishedGenericFaqs(categoryId: string): Promise<FaqQuestion[]> {
  const record = categories().find((item) => item.id === categoryId)
  return cloneFaqData(record?.published?.questions ?? [])
}

export async function getGenericFaqById(categoryId: string, faqId: number): Promise<FaqQuestion | undefined> {
  return (await getGenericFaqs(categoryId))[faqId]
}

export async function createGenericFaq(categoryId: string, data: FaqQuestion): Promise<FaqQuestion[]> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  validateGenericFaq(data)
  const category = cloneFaqData(current(all[index])!)
  category.questions.push(cloneFaqData(data))
  writeDraft(all, index, category)
  return cloneFaqData(category.questions)
}

export async function updateGenericFaq(categoryId: string, faqId: number, data: FaqQuestion): Promise<FaqQuestion[]> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  const category = cloneFaqData(current(all[index])!)
  if (!category.questions[faqId]) throw new Error('Generic FAQ was not found.')
  validateGenericFaq(data)
  category.questions[faqId] = cloneFaqData(data)
  writeDraft(all, index, category)
  return cloneFaqData(category.questions)
}

export async function deleteGenericFaq(categoryId: string, faqId: number): Promise<FaqQuestion[]> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  const category = cloneFaqData(current(all[index])!)
  if (!category.questions[faqId]) throw new Error('Generic FAQ was not found.')
  category.questions.splice(faqId, 1)
  writeDraft(all, index, category)
  return cloneFaqData(category.questions)
}

export async function reorderGenericFaqs(categoryId: string, orderedIds: number[]): Promise<FaqQuestion[]> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  const category = cloneFaqData(current(all[index])!)
  if (orderedIds.length !== category.questions.length || new Set(orderedIds).size !== orderedIds.length ||
    orderedIds.some((id) => !Number.isInteger(id) || id < 0 || id >= category.questions.length)) {
    throw new Error('The reordered FAQ positions must include every question exactly once.')
  }
  category.questions = orderedIds.map((id) => category.questions[id])
  writeDraft(all, index, category)
  return cloneFaqData(category.questions)
}

export async function saveGenericFaqDraft(categoryId: string, data: FaqQuestion[]): Promise<FaqQuestion[]> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  const category = cloneFaqData(current(all[index])!)
  data.forEach(validateGenericFaq)
  category.questions = cloneFaqData(data)
  writeDraft(all, index, category)
  return cloneFaqData(category.questions)
}

export async function publishGenericFaqs(categoryId: string): Promise<FaqCategoryRecord> {
  const all = categories()
  const index = categoryIndex(all, categoryId)
  if (!all[index].draft) throw new Error('Save a FAQ draft before publishing.')
  all[index].draft!.questions.forEach(validateGenericFaq)
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
