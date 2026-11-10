import { toRaw } from 'vue'
import { mockTermsConditions } from '~/mocks/manage-countries/termsConditions'
import type { LegalDocumentRecord, TermsConditionsDocument } from '~/types/legalDocuments'
import { readMockCollection, writeMockCollection } from './mockStorage'
import { validateTermsConditions } from './legalDocumentValidation'

const STORAGE_KEY = 'roze-cms-terms-conditions-v1'
const records = () => {
  const saved = readMockCollection(STORAGE_KEY, mockTermsConditions)
  for (const seed of mockTermsConditions) {
    if (!saved.some((record) => record.countryId === seed.countryId && record.type === seed.type)) {
      saved.push(structuredClone(seed))
    }
  }
  return saved
}

export async function getTermsConditions(): Promise<LegalDocumentRecord<TermsConditionsDocument>[]> {
  return records()
}

export async function getTermsConditionsByCountry(
  countryId: string,
  countryCode?: string,
  countrySlug?: string,
): Promise<LegalDocumentRecord<TermsConditionsDocument> | undefined> {
  const all = records().filter((record) => record.type === 'terms')
  const code = countryCode?.toLowerCase()
  const slug = countrySlug?.toLowerCase()
  const belongsToCountry = (record: LegalDocumentRecord<TermsConditionsDocument>) => {
    const document = record.draft ?? record.published
    return (
      record.countryId === countryId ||
      (!!code && document?.code.toLowerCase() === code) ||
      (!!slug && document?.slug.toLowerCase() === slug)
    )
  }
  const saved = all.find(belongsToCountry)
  const activeDocument = saved?.draft ?? saved?.published
  if (activeDocument?.sections.length) return saved

  return mockTermsConditions.find(
    (record) =>
      record.type === 'terms' &&
      ((record.countryId === countryId && !saved) ||
        (!!code && record.published?.code.toLowerCase() === code) ||
        (!!slug && record.published?.slug.toLowerCase() === slug)),
  ) ?? saved
}

export async function createTermsConditions(
  countryId: string,
  document: TermsConditionsDocument,
): Promise<LegalDocumentRecord<TermsConditionsDocument>> {
  validateTermsConditions(document)
  const all = records()
  if (all.some((record) => record.countryId === countryId)) throw new Error('A Terms & Conditions record already exists.')
  const record: LegalDocumentRecord<TermsConditionsDocument> = {
    id: `document-terms-${crypto.randomUUID()}`,
    countryId,
    type: 'terms',
    status: 'draft',
    draft: structuredClone(toRaw(document)),
    version: 0,
    updatedAt: new Date().toISOString(),
  }
  all.push(record)
  writeMockCollection(STORAGE_KEY, all)
  return record
}

export async function updateTermsConditions(
  countryId: string,
  document: TermsConditionsDocument,
): Promise<LegalDocumentRecord<TermsConditionsDocument>> {
  return saveTermsConditionsDraft(countryId, document)
}

export async function saveTermsConditionsDraft(
  countryId: string,
  document: TermsConditionsDocument,
): Promise<LegalDocumentRecord<TermsConditionsDocument>> {
  validateTermsConditions(document)
  const all = records()
  const index = all.findIndex((record) => record.countryId === countryId && record.type === 'terms')
  if (index < 0) return createTermsConditions(countryId, document)
  all[index] = {
    ...all[index],
    draft: structuredClone(toRaw(document)),
    updatedAt: new Date().toISOString(),
  }
  writeMockCollection(STORAGE_KEY, all)
  return all[index]
}

export async function publishTermsConditions(
  countryId: string,
): Promise<LegalDocumentRecord<TermsConditionsDocument>> {
  const all = records()
  const index = all.findIndex((record) => record.countryId === countryId && record.type === 'terms')
  if (index < 0 || !all[index].draft) throw new Error('Save a Terms & Conditions draft before publishing.')
  validateTermsConditions(all[index].draft)
  const nextVersion = all[index].version + 1
  all[index] = {
    ...all[index],
    draft: undefined,
    published: structuredClone(all[index].draft),
    status: 'published',
    version: nextVersion,
    updatedAt: new Date().toISOString(),
  }
  writeMockCollection(STORAGE_KEY, all)
  return all[index]
}
