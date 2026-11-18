import { mockCorridorFaqs } from '~/mocks/faqs/corridorFaqs'
import { getCountries, getCountryById } from '~/services/manage-countries/countryService'
import type { Country } from '~/types/country'
import type { CorridorFaq, CorridorFaqCollection } from '~/types/corridorFaq'
import { cloneFaqData, readFaqCollection, writeFaqCollection } from './mockStorage'
import { validateCorridorFaq } from './validation'

const STORAGE_KEY = 'roze-cms-country-corridor-faqs-v1'
const LEGACY_STORAGE_KEY = 'roze-cms-corridor-faqs-v1'
const UNMAPPED_STORAGE_KEY = 'roze-cms-corridor-faqs-unmapped-v1'
const MIGRATION_KEY = 'roze-cms-country-corridor-faqs-migrated-v1'
const LEGACY_COUNTRY_SLUGS: Record<string, string> = {
  'corridor-ghana': 'ghana',
  'corridor-india': 'india',
  'corridor-nigeria': 'nigeria',
  'corridor-senegal': 'senegal',
  'corridor-zambia': 'zambia',
  'corridor-bangladesh': 'bangladesh',
}

interface LegacyCorridorFaqCollection extends Omit<CorridorFaqCollection, 'countryId'> {
  corridorId: string
}

async function requireReceivingCountry(countryId: string): Promise<Country> {
  const country = await getCountryById(countryId)
  if (!country || country.id !== countryId) throw new Error('Country was not found.')
  if (!country.isReceivingCountry) throw new Error('Corridor FAQs are only available for receiving countries.')
  return country
}

async function migrateLegacyCollections(): Promise<CorridorFaqCollection[]> {
  if (typeof window === 'undefined') return cloneFaqData(mockCorridorFaqs)

  const stored = window.localStorage.getItem(STORAGE_KEY)
  const all = stored === null
    ? cloneFaqData(mockCorridorFaqs)
    : readFaqCollection<CorridorFaqCollection>(STORAGE_KEY, mockCorridorFaqs)
  if (window.localStorage.getItem(MIGRATION_KEY) === 'true') return all

  const countries = await getCountries()
  const legacy = readFaqCollection<LegacyCorridorFaqCollection>(LEGACY_STORAGE_KEY, [])
  const unmapped: LegacyCorridorFaqCollection[] = []
  for (const record of legacy) {
    const countrySlug = LEGACY_COUNTRY_SLUGS[record.corridorId]
    const country = countries.find((item) => item.slug === countrySlug)
    if (!country) {
      unmapped.push(record)
      continue
    }

    const { corridorId: _corridorId, ...collection } = record
    const migrated: CorridorFaqCollection = { ...collection, countryId: country.id }
    const index = all.findIndex((item) => item.countryId === country.id)
    if (index < 0) all.push(migrated)
    else if (stored === null) all[index] = migrated
  }

  if (unmapped.length) {
    const archived = readFaqCollection<LegacyCorridorFaqCollection>(UNMAPPED_STORAGE_KEY, [])
    const known = new Set(archived.map((item) => JSON.stringify(item)))
    writeFaqCollection(UNMAPPED_STORAGE_KEY, [
      ...archived,
      ...unmapped.filter((item) => !known.has(JSON.stringify(item))),
    ])
    console.error(
      `Preserved ${unmapped.length} corridor FAQ collection(s) with unknown corridor IDs (${unmapped.map((item) => item.corridorId).join(', ')}) in localStorage key "${UNMAPPED_STORAGE_KEY}".`,
    )
  }

  writeFaqCollection(STORAGE_KEY, all)
  window.localStorage.setItem(MIGRATION_KEY, 'true')
  return all
}

async function collections(): Promise<CorridorFaqCollection[]> {
  const saved = await migrateLegacyCollections()
  for (const seed of mockCorridorFaqs) {
    if (!saved.some((collection) => collection.countryId === seed.countryId)) {
      saved.push(cloneFaqData(seed))
    }
  }
  return saved
}

function current(collection: CorridorFaqCollection): CorridorFaq[] {
  return collection.draft ?? collection.published
}

function ensureCollection(all: CorridorFaqCollection[], countryId: string): number {
  const index = all.findIndex((collection) => collection.countryId === countryId)
  if (index >= 0) return index
  all.push({ countryId, published: [], version: 0, updatedAt: new Date().toISOString() })
  return all.length - 1
}

function saveDraft(all: CorridorFaqCollection[], index: number, faqs: CorridorFaq[]): void {
  faqs.forEach(validateCorridorFaq)
  all[index] = {
    ...all[index],
    draft: cloneFaqData(faqs),
    updatedAt: new Date().toISOString(),
  }
  writeFaqCollection(STORAGE_KEY, all)
}

export async function getCountryFaqs(countryId: string): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const collection = (await collections()).find((item) => item.countryId === countryId)
  return collection ? cloneFaqData(current(collection)) : []
}

export async function getPublishedCorridorFaqs(countrySlug: string): Promise<CorridorFaq[]> {
  const country = await getCountryById(countrySlug)
  if (!country || country.slug !== countrySlug) throw new Error('Receiving country was not found.')
  await requireReceivingCountry(country.id)
  const collection = (await collections()).find((item) => item.countryId === country.id)
  return collection ? cloneFaqData(collection.published) : []
}

export async function getCountryFaqCollection(countryId: string): Promise<CorridorFaqCollection | undefined> {
  await requireReceivingCountry(countryId)
  const collection = (await collections()).find((item) => item.countryId === countryId)
  return collection ? cloneFaqData(collection) : undefined
}

export async function getCountryFaqById(countryId: string, faqId: number): Promise<CorridorFaq | undefined> {
  return (await getCountryFaqs(countryId)).find((faq) => faq.id === faqId)
}

export async function createCountryFaq(countryId: string, data: CorridorFaq): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = ensureCollection(all, countryId)
  const faqs = current(all[index])
  const nextId = Math.max(0, ...faqs.map((faq) => faq.id ?? 0)) + 1
  const created = { ...cloneFaqData(data), id: data.id ?? nextId }
  validateCorridorFaq(created)
  saveDraft(all, index, [...faqs, created])
  return cloneFaqData(all[index].draft!)
}

export async function updateCountryFaq(countryId: string, faqId: number, data: CorridorFaq): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = ensureCollection(all, countryId)
  const faqs = current(all[index])
  const faqIndex = faqs.findIndex((faq) => faq.id === faqId)
  if (faqIndex < 0) throw new Error('Corridor FAQ was not found for this country.')
  const updated = [...faqs]
  updated[faqIndex] = { ...cloneFaqData(data), id: faqId }
  saveDraft(all, index, updated)
  return cloneFaqData(all[index].draft!)
}

export async function deleteCountryFaq(countryId: string, faqId: number): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = ensureCollection(all, countryId)
  const faqs = current(all[index])
  if (!faqs.some((faq) => faq.id === faqId)) throw new Error('Corridor FAQ was not found for this country.')
  saveDraft(all, index, faqs.filter((faq) => faq.id !== faqId))
  return cloneFaqData(all[index].draft!)
}

export async function reorderCountryFaqs(countryId: string, orderedIds: number[]): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = ensureCollection(all, countryId)
  const faqs = current(all[index])
  if (orderedIds.length !== faqs.length || new Set(orderedIds).size !== orderedIds.length) {
    throw new Error('The reordered FAQ IDs must include every question exactly once.')
  }
  const ordered = orderedIds.map((id) => {
    const faq = faqs.find((item) => item.id === id)
    if (!faq) throw new Error('A corridor FAQ could not be found while reordering.')
    return faq
  })
  saveDraft(all, index, ordered)
  return cloneFaqData(all[index].draft!)
}

export async function saveCountryFaqDraft(countryId: string, data: CorridorFaq[]): Promise<CorridorFaq[]> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = ensureCollection(all, countryId)
  saveDraft(all, index, data)
  return cloneFaqData(all[index].draft!)
}

export async function publishCountryFaqs(countryId: string): Promise<CorridorFaqCollection> {
  await requireReceivingCountry(countryId)
  const all = await collections()
  const index = all.findIndex((collection) => collection.countryId === countryId)
  if (index < 0 || !all[index].draft) throw new Error('Save a corridor FAQ draft before publishing.')
  all[index].draft!.forEach(validateCorridorFaq)
  all[index] = {
    ...all[index],
    published: cloneFaqData(all[index].draft!),
    draft: undefined,
    version: all[index].version + 1,
    updatedAt: new Date().toISOString(),
  }
  writeFaqCollection(STORAGE_KEY, all)
  return cloneFaqData(all[index])
}
