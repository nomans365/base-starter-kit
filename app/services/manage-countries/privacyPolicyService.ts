import { toRaw } from 'vue'
import { mockPrivacyPolicies } from '~/mocks/manage-countries/privacyPolicies'
import type { LegalDocumentRecord, PrivacyPolicyDocument } from '~/types/legalDocuments'
import { readMockCollection, writeMockCollection } from './mockStorage'
import { validatePrivacyPolicy } from './legalDocumentValidation'

const STORAGE_KEY = 'roze-cms-privacy-policies-v1'
const records = () => {
  const saved = readMockCollection(STORAGE_KEY, mockPrivacyPolicies)
  for (const seed of mockPrivacyPolicies) {
    if (!saved.some((record) => record.countryId === seed.countryId && record.type === seed.type)) {
      saved.push(structuredClone(seed))
    }
  }
  return saved
}

export async function getPrivacyPolicies(): Promise<LegalDocumentRecord<PrivacyPolicyDocument>[]> {
  return records()
}

export async function getPrivacyPolicyByCountry(
  countryId: string,
  countryCode?: string,
  countrySlug?: string,
): Promise<LegalDocumentRecord<PrivacyPolicyDocument> | undefined> {
  const all = records().filter((record) => record.type === 'privacy')
  const code = countryCode?.toLowerCase()
  const slug = countrySlug?.toLowerCase()
  const belongsToCountry = (record: LegalDocumentRecord<PrivacyPolicyDocument>) => {
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

  return mockPrivacyPolicies.find(
    (record) =>
      record.type === 'privacy' &&
      ((record.countryId === countryId && !saved) ||
        (!!code && record.published?.code.toLowerCase() === code) ||
        (!!slug && record.published?.slug.toLowerCase() === slug)),
  ) ?? saved
}

export async function createPrivacyPolicy(
  countryId: string,
  document: PrivacyPolicyDocument,
): Promise<LegalDocumentRecord<PrivacyPolicyDocument>> {
  validatePrivacyPolicy(document)
  const all = records()
  if (all.some((record) => record.countryId === countryId)) throw new Error('A Privacy Policy record already exists.')
  const record: LegalDocumentRecord<PrivacyPolicyDocument> = {
    id: `document-privacy-${crypto.randomUUID()}`,
    countryId,
    type: 'privacy',
    status: 'draft',
    draft: structuredClone(toRaw(document)),
    version: 0,
    updatedAt: new Date().toISOString(),
  }
  all.push(record)
  writeMockCollection(STORAGE_KEY, all)
  return record
}

export async function updatePrivacyPolicy(
  countryId: string,
  document: PrivacyPolicyDocument,
): Promise<LegalDocumentRecord<PrivacyPolicyDocument>> {
  return savePrivacyPolicyDraft(countryId, document)
}

export async function savePrivacyPolicyDraft(
  countryId: string,
  document: PrivacyPolicyDocument,
): Promise<LegalDocumentRecord<PrivacyPolicyDocument>> {
  validatePrivacyPolicy(document)
  const all = records()
  const index = all.findIndex((record) => record.countryId === countryId && record.type === 'privacy')
  if (index < 0) return createPrivacyPolicy(countryId, document)
  all[index] = {
    ...all[index],
    draft: structuredClone(toRaw(document)),
    updatedAt: new Date().toISOString(),
  }
  writeMockCollection(STORAGE_KEY, all)
  return all[index]
}

export async function publishPrivacyPolicy(
  countryId: string,
): Promise<LegalDocumentRecord<PrivacyPolicyDocument>> {
  const all = records()
  const index = all.findIndex((record) => record.countryId === countryId && record.type === 'privacy')
  if (index < 0 || !all[index].draft) throw new Error('Save a Privacy Policy draft before publishing.')
  validatePrivacyPolicy(all[index].draft)
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
